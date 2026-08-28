#!/usr/bin/env node
/**
 * Rect-identity harness for #31 true-face snap.
 *
 * Compares:
 *   - Pre-#31 bbox attach (frozen reference in this file — the old
 *     getSnapAttachLatLng face table + object-relative intent), versus
 *   - Shipping ring + dual-path proposal for shape:"rect"
 *     (getOuterSnapEdges → nearest mid → proposeSnapFlushToEdge),
 *     loaded live from Portable-Solution-Site-Mapping-Tool.html.
 *
 * Approach: extract shipping helpers from the HTML at run time (not a
 * duplicated copy). Why: a single-file app has no module exports; live
 * extract guarantees the harness exercises whatever is currently in the
 * working tree. The pre-#31 bbox path stays frozen here as the identity
 * baseline (intentionally NOT loaded from HTML — that code was replaced).
 *
 * Sync obligation: none for the shipping side (always re-read from HTML).
 * If extract names/signatures change, this harness fails loudly at load.
 *
 * Case grid: sizes × angles × intents × free-offsets = 6480
 *   widths  [6, 10, 20]
 *   lengths [8, 15, 30]
 *   angles  [0, 15, 45, 90, 127, 180, 270, 33.7]
 *   intents [0, 30, 45, 90, 135, 180, A, A+90, A+45, A+22]
 *   offsets 9 positions relative to target (face-adjacent + corners)
 *
 * Pass tolerances: position ≤ 1 cm (0.01 m), angle ≤ 0.01°.
 *
 * Run (from repo root):
 *   node tools/snap-identity-harness.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'Portable-Solution-Site-Mapping-Tool.html');

const POS_TOL_M = 0.01;
const ANG_TOL_DEG = 0.01;

const WIDTHS = [6, 10, 20];
const LENGTHS = [8, 15, 30];
const ANGLES = [0, 15, 45, 90, 127, 180, 270, 33.7];
const INTENT_BASE = [0, 30, 45, 90, 135, 180];

// ─── Extract shipping source from HTML ─────────────────────────────────────────

function extractConst(html, name) {
  const re = new RegExp('const\\s+' + name + '\\s*=\\s*([^;]+);');
  const m = html.match(re);
  if (!m) throw new Error('Could not extract const ' + name + ' from HTML');
  return m[0];
}

function extractFunction(html, name) {
  const startRe = new RegExp('function\\s+' + name + '\\s*\\(');
  const m = startRe.exec(html);
  if (!m) throw new Error('Could not find function ' + name + ' in HTML');
  let i = m.index;
  const brace = html.indexOf('{', i);
  if (brace < 0) throw new Error('No body for ' + name);
  let depth = 0;
  for (let j = brace; j < html.length; j += 1) {
    const ch = html[j];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return html.slice(i, j + 1);
    }
  }
  throw new Error('Unbalanced braces for ' + name);
}

function loadShippingApi() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const names = [
    'getFootprintLocalOffsets',
    'getFootprintEdgeRing',
    'metersToDeg',
    'latlngToMeters',
    'rotateOffsets',
    'normalizeAngle',
    'roundRelativeAngleTo90',
    'resolveSnapMate',
    'isClockwiseHullEdge',
    'getOuterSnapEdges',
    'proposeSnapFlushToEdge'
  ];
  const parts = [
    extractConst(html, 'FT_TO_M'),
    extractConst(html, 'SNAP_MIN_EDGE_LEN_M'),
    ...names.map(n => extractFunction(html, n))
  ];

  function latLng(a, b) {
    const lat = typeof a === 'object' ? a.lat : a;
    const lng = typeof a === 'object' ? a.lng : b;
    return {
      lat,
      lng,
      distanceTo(other) {
        const [x, y] = sandbox.latlngToMeters(lat, lng, other.lat, other.lng);
        return Math.hypot(x, y);
      }
    };
  }

  const sandbox = {
    L: { latLng },
    Math,
    Number,
    console
  };
  vm.createContext(sandbox);
  vm.runInContext(parts.join('\n\n'), sandbox, { filename: 'psmt-snap-extract.js' });

  for (const n of names) {
    if (typeof sandbox[n] !== 'function') {
      throw new Error('Shipping extract missing function: ' + n);
    }
  }
  return sandbox;
}

// ─── Frozen pre-#31 bbox attach (identity baseline) ────────────────────────────

function oldBboxSnap(target, newLengthM, newWidthM, free, intent, api) {
  const tHL = target.lengthM / 2;
  const tHW = target.widthM / 2;
  const A = api.normalizeAngle(target.angleDeg || 0);
  const rad = A * Math.PI / 180;
  const sinA = Math.sin(rad);
  const cosA = Math.cos(rad);
  const c = target.latlng;
  const faces = [
    { pt: ll(api.metersToDeg(c, -tHL * sinA, tHL * cosA)), axis: 'length', dir: 1 },
    { pt: ll(api.metersToDeg(c, tHL * sinA, -tHL * cosA)), axis: 'length', dir: -1 },
    { pt: ll(api.metersToDeg(c, -tHW * cosA, -tHW * sinA)), axis: 'width', dir: -1 },
    { pt: ll(api.metersToDeg(c, tHW * cosA, tHW * sinA)), axis: 'width', dir: 1 }
  ];
  let nearest = null;
  let nearestDist = Infinity;
  for (let i = 0; i < faces.length; i += 1) {
    const d = free.distanceTo(faces[i].pt);
    if (d < nearestDist) {
      nearestDist = d;
      nearest = faces[i];
    }
  }
  const snappedRel = api.roundRelativeAngleTo90(
    api.normalizeAngle((intent || 0) - A)
  );
  const { moverAxis } = api.resolveSnapMate(nearest.axis, snappedRel);
  const newHalf = moverAxis === 'length' ? newLengthM / 2 : newWidthM / 2;
  const posArr = nearest.axis === 'length'
    ? api.metersToDeg(nearest.pt, -newHalf * sinA * nearest.dir, newHalf * cosA * nearest.dir)
    : api.metersToDeg(nearest.pt, newHalf * cosA * nearest.dir, newHalf * sinA * nearest.dir);
  const pos = ll(posArr);
  return {
    latlng: pos,
    angleDeg: api.normalizeAngle(A + snappedRel),
    moverAxis,
    mid: nearest.pt
  };
}

function ll(pairOrObj) {
  if (pairOrObj && typeof pairOrObj.lat === 'number') return pairOrObj;
  return { lat: pairOrObj[0], lng: pairOrObj[1], distanceTo() { throw new Error('bare ll'); } };
}

function distM(api, a, b) {
  const [x, y] = api.latlngToMeters(a.lat, a.lng, b.lat, b.lng);
  return Math.hypot(x, y);
}

function angDiff(api, a, b) {
  let d = Math.abs(api.normalizeAngle(a) - api.normalizeAngle(b));
  return d > 180 ? 360 - d : d;
}

/** Shipping path for one rect target: outer edges → nearest mid → propose. */
function shippingRectSnap(api, target, newLengthM, newWidthM, free, intent) {
  const edges = api.getOuterSnapEdges(target);
  if (!edges.length) throw new Error('getOuterSnapEdges returned no edges for rect');
  let nearest = null;
  let nearestDist = Infinity;
  for (let e = 0; e < edges.length; e += 1) {
    const d = free.distanceTo(edges[e].mid);
    if (
      d < nearestDist - 1e-9 ||
      (Math.abs(d - nearestDist) <= 1e-9 && (!nearest || edges[e].len > nearest.len))
    ) {
      nearestDist = d;
      nearest = edges[e];
    }
  }
  return api.proposeSnapFlushToEdge(
    nearest,
    newLengthM,
    newWidthM,
    intent,
    target.angleDeg || 0
  );
}

// ─── Run ───────────────────────────────────────────────────────────────────────

function main() {
  const api = loadShippingApi();
  const center = api.L.latLng(38.5, -121.5);

  let n = 0;
  let fail = 0;
  const samples = [];

  for (let wi = 0; wi < WIDTHS.length; wi += 1) {
    const w = WIDTHS[wi];
    for (let li = 0; li < LENGTHS.length; li += 1) {
      const l = LENGTHS[li];
      for (let ai = 0; ai < ANGLES.length; ai += 1) {
        const A = ANGLES[ai];
        const intents = INTENT_BASE.concat([A, A + 90, A + 45, A + 22]);
        const freeOffs = [
          [0, l / 2 + 2],
          [0, -(l / 2 + 2)],
          [w / 2 + 2, 0],
          [-(w / 2 + 2), 0],
          [w / 2 + 1, l / 2 + 1],
          [0, l / 2 + 0.5],
          [w / 4, l / 2 + 1.5],
          [w / 2 + 0.3, 0],
          [-(w / 2 + 0.3), l / 4]
        ];
        for (let ii = 0; ii < intents.length; ii += 1) {
          const intent = intents[ii];
          for (let fi = 0; fi < freeOffs.length; fi += 1) {
            const freeOff = freeOffs[fi];
            const target = {
              id: 1,
              shape: 'rect',
              widthM: w,
              lengthM: l,
              angleDeg: A,
              latlng: center
            };
            const freePair = api.metersToDeg(center, freeOff[0], freeOff[1]);
            const free = api.L.latLng(freePair[0], freePair[1]);

            const oldR = oldBboxSnap(target, 12, 5, free, intent, api);
            const newR = shippingRectSnap(api, target, 12, 5, free, intent);

            n += 1;
            const posErr = distM(api, oldR.latlng, newR.latlng);
            const angErr = angDiff(api, oldR.angleDeg, newR.angleDeg);
            const midErr = distM(api, oldR.mid, newR.faceMid);
            if (
              posErr > POS_TOL_M ||
              angErr > ANG_TOL_DEG ||
              midErr > POS_TOL_M ||
              oldR.moverAxis !== newR.moverAxis
            ) {
              fail += 1;
              if (samples.length < 8) {
                samples.push({
                  w, l, A, intent, freeOff, posErr, angErr, midErr,
                  oAng: oldR.angleDeg,
                  nAng: newR.angleDeg,
                  oAx: oldR.moverAxis,
                  nAx: newR.moverAxis
                });
              }
            }
          }
        }
      }
    }
  }

  const expected = WIDTHS.length * LENGTHS.length * ANGLES.length *
    (INTENT_BASE.length + 4) * 9;
  const result = {
    ok: fail === 0 && n === expected,
    n,
    expected,
    fail,
    pass: n - fail,
    posTolM: POS_TOL_M,
    angTolDeg: ANG_TOL_DEG,
    samples
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exit(1);
}

main();
