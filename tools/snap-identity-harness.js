#!/usr/bin/env node
/**
 * Snap identity + mover true-face harness (#31 / #34).
 *
 * Suites:
 *   1) Rect identity (6480): pre-#31 frozen bbox vs shipping rect short-circuit path.
 *   2) #34 (a) cut-corner mover chamfer-led onto rect (~192).
 *   3) #34 (b) 8D36-shaped asymmetric mover (~96).
 *   4) #34 (c) GK1935 mover control (~96).
 *
 * Shipping helpers are live-extracted from Portable-Solution-Site-Mapping-Tool.html.
 *
 * Pass tolerances (rect identity): position ≤ 1 cm, angle ≤ 0.01°.
 * Mover-chamfer suites: chamfer edge wins; presentation normals match desired (≥0.999);
 * mids ≤ 1 cm.
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
const NORMAL_ALIGN = 0.999;

const WIDTHS = [6, 10, 20];
const LENGTHS = [8, 15, 30];
const ANGLES = [0, 15, 45, 90, 127, 180, 270, 33.7];
const INTENT_BASE = [0, 30, 45, 90, 135, 180];

const FT_TO_M = 0.3048;

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
    'isClockwiseHullEdgeLocal',
    'bearingFromNormal',
    'rotateVec2',
    'angDiffAbs',
    'getOuterSnapEdges',
    'getOuterSnapEdgesAt',
    'getOuterSnapEdgesLocal',
    'proposeSnapFlushToEdge',
    'proposeSnapFlushMoverEdge',
    'desiredMoverNormalForIntent',
    'selectMoverEdgeFlush',
    'snapStickyEpsilonM'
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

/** Shipping path for one rect target: outer edges → nearest mid → propose (rect-mover bbox). */
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

function isChamferEdgeIndex(i) {
  return (i % 2) === 1;
}

/**
 * Length+ face of a rect (matches pre-#31 faces[0] normal).
 */
function rectLengthPlusEdge(api, anchor) {
  const edges = api.getOuterSnapEdges(anchor);
  const A = api.normalizeAngle(anchor.angleDeg || 0);
  let best = null;
  let bestDiff = Infinity;
  for (let i = 0; i < edges.length; i += 1) {
    const d = api.angDiffAbs(edges[i].faceBearing, A);
    if (d < bestDiff - 1e-9 || (Math.abs(d - bestDiff) <= 1e-9 && edges[i].len > (best ? best.len : 0))) {
      bestDiff = d;
      best = edges[i];
    }
  }
  return best;
}

/**
 * Intents (deg) where selectMoverEdgeFlush returns this chamfer against the length+ face
 * of a 0°-rect probe. Used so harness intents sit inside real angular basins (flush θ
 * alone is not a fixed point — it often re-quantizes into another presentation).
 */
function intentsWhereChamferWins(api, moverSpec, chamferEdgeIndex, maxCount) {
  const probe = {
    id: 1,
    shape: 'rect',
    widthM: 10,
    lengthM: 20,
    angleDeg: 0,
    latlng: api.L.latLng(38.5, -121.5)
  };
  const targetEdge = rectLengthPlusEdge(api, probe);
  const local = api.getOuterSnapEdgesLocal(moverSpec);
  const hits = [];
  for (let i = 0; i < 360; i += 1) {
    const won = api.selectMoverEdgeFlush(targetEdge, local, i);
    if (won && won.moverEdgeIndex === chamferEdgeIndex) hits.push(i);
  }
  if (!hits.length) return [];
  // Spread samples across the basin list.
  const out = [];
  const step = Math.max(1, Math.floor(hits.length / maxCount));
  for (let k = 0; k < maxCount; k += 1) {
    out.push(hits[Math.min(hits.length - 1, k * step)]);
  }
  return out;
}

/**
 * Chamfer-led case: intent from a basin where this chamfer wins; free standoff outside
 * flush so nearest mid is the target face. Anchor may be rotated — intent is offset by
 * anchor face bearing so the relative presentation matches the 0° probe basin.
 */
function runChamferLedCase(api, moverSpec, anchor, chamferEdgeIndex, basinIntent0, standoffM) {
  const targetEdge = rectLengthPlusEdge(api, anchor);
  if (!targetEdge) return { ok: false, reason: 'no-anchor-edge' };
  const local = api.getOuterSnapEdgesLocal(moverSpec);
  const me = local.find(e => e.edgeIndex === chamferEdgeIndex);
  if (!me) return { ok: false, reason: 'missing-chamfer', chamferEdgeIndex };

  // basinIntent0 was measured against faceBearing 0; shift by live face bearing.
  const intent = api.normalizeAngle(basinIntent0 + targetEdge.faceBearing);

  const result = api.selectMoverEdgeFlush(targetEdge, local, intent);
  if (!result) return { ok: false, reason: 'no-flush' };

  const wonChamfer = isChamferEdgeIndex(result.moverEdgeIndex);
  const wonTarget = result.moverEdgeIndex === chamferEdgeIndex;

  const [desiredNx, desiredNy] = api.desiredMoverNormalForIntent(
    targetEdge,
    api.roundRelativeAngleTo90(api.normalizeAngle(intent - targetEdge.faceBearing))
  );
  const wonLocal = local.find(e => e.edgeIndex === result.moverEdgeIndex);
  const [wnx, wny] = api.rotateVec2(wonLocal.nx, wonLocal.ny, result.angleDeg);
  const align = wnx * desiredNx + wny * desiredNy;

  const [mmx, mmy] = api.rotateVec2(wonLocal.midLocal[0], wonLocal.midLocal[1], result.angleDeg);
  const midPair = api.metersToDeg(result.latlng, mmx, mmy);
  const midWorld = api.L.latLng(midPair[0], midPair[1]);
  const midErr = distM(api, midWorld, targetEdge.mid);

  const freePair = api.metersToDeg(
    result.latlng,
    targetEdge.nx * standoffM,
    targetEdge.ny * standoffM
  );
  const free = api.L.latLng(freePair[0], freePair[1]);
  const aEdges = api.getOuterSnapEdges(anchor);
  let nearest = null;
  let nearestDist = Infinity;
  for (let e = 0; e < aEdges.length; e += 1) {
    const d = free.distanceTo(aEdges[e].mid);
    if (
      d < nearestDist - 1e-9 ||
      (Math.abs(d - nearestDist) <= 1e-9 && aEdges[e].len > (nearest ? nearest.len : 0))
    ) {
      nearestDist = d;
      nearest = aEdges[e];
    }
  }
  const faceOk = nearest && nearest.edgeIndex === targetEdge.edgeIndex;

  const ok = wonTarget && wonChamfer && align >= NORMAL_ALIGN && midErr <= POS_TOL_M && faceOk;
  return {
    ok,
    wonChamfer,
    wonTarget,
    moverEdgeIndex: result.moverEdgeIndex,
    align,
    midErr,
    faceOk,
    intent,
    reason: ok
      ? null
      : (!wonTarget
        ? 'wrong-edge'
        : (!wonChamfer
          ? 'not-chamfer'
          : (align < NORMAL_ALIGN
            ? 'normal'
            : (midErr > POS_TOL_M ? 'mid' : 'face'))))
  };
}

function suiteRectIdentity(api, center) {
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
  return {
    name: 'rect-identity',
    ok: fail === 0 && n === expected,
    n,
    expected,
    fail,
    pass: n - fail,
    samples
  };
}

/**
 * (a) 192: 4 anchor angles × 4 basin intents × 3 standoffs × 4 chamfers.
 */
function suiteCutCornerChamferLed(api, center) {
  const moverSpec = {
    id: 2,
    shape: 'cut-corner-rectangle',
    widthM: 6,
    lengthM: 10,
    cornerCutW: 1.5 / FT_TO_M,
    cornerCutL: 1.5 / FT_TO_M,
    angleDeg: 0,
    latlng: center
  };
  const anchorAngles = [0, 45, 90, 180];
  const standoffs = [1.0, 1.5, 2.0];
  const chamfers = [1, 3, 5, 7];
  const basinByChamfer = {};
  for (let ci = 0; ci < chamfers.length; ci += 1) {
    basinByChamfer[chamfers[ci]] = intentsWhereChamferWins(api, moverSpec, chamfers[ci], 4);
    if (basinByChamfer[chamfers[ci]].length < 4) {
      throw new Error('suite a: chamfer ' + chamfers[ci] + ' basin too small');
    }
  }

  let n = 0;
  let fail = 0;
  const samples = [];

  for (let ai = 0; ai < anchorAngles.length; ai += 1) {
    const anchor = {
      id: 1,
      shape: 'rect',
      widthM: 10,
      lengthM: 20,
      angleDeg: anchorAngles[ai],
      latlng: center
    };
    for (let ci = 0; ci < chamfers.length; ci += 1) {
      const intents = basinByChamfer[chamfers[ci]];
      for (let ii = 0; ii < intents.length; ii += 1) {
        for (let si = 0; si < standoffs.length; si += 1) {
          const r = runChamferLedCase(
            api, moverSpec, anchor, chamfers[ci], intents[ii], standoffs[si]
          );
          n += 1;
          if (!r.ok) {
            fail += 1;
            if (samples.length < 12) {
              samples.push({
                suite: 'a',
                A: anchorAngles[ai],
                basin0: intents[ii],
                chamfer: chamfers[ci],
                standoff: standoffs[si],
                ...r
              });
            }
          }
        }
      }
    }
  }

  return {
    name: 'cut-corner-chamfer-led',
    ok: fail === 0 && n === 192,
    n,
    expected: 192,
    fail,
    pass: n - fail,
    samples
  };
}

/**
 * (b)/(c) 96: 4 anchor angles × 4 basin intents × 2 standoffs × 3 chamfers.
 */
function suiteAsymmetricMover(api, center, name, widthFt, lengthFt, cutW, cutL, expected) {
  const moverSpec = {
    id: 2,
    shape: 'cut-corner-rectangle',
    widthM: widthFt * FT_TO_M,
    lengthM: lengthFt * FT_TO_M,
    cornerCutW: cutW,
    cornerCutL: cutL,
    angleDeg: 0,
    latlng: center
  };
  const anchorAngles = [0, 30, 45, 90];
  const standoffs = [1.5, 2.5];
  const chamfers = [1, 3, 5];
  const basinByChamfer = {};
  for (let ci = 0; ci < chamfers.length; ci += 1) {
    basinByChamfer[chamfers[ci]] = intentsWhereChamferWins(api, moverSpec, chamfers[ci], 4);
    if (basinByChamfer[chamfers[ci]].length < 4) {
      throw new Error(name + ': chamfer ' + chamfers[ci] + ' basin too small');
    }
  }

  let n = 0;
  let fail = 0;
  const samples = [];

  for (let ai = 0; ai < anchorAngles.length; ai += 1) {
    const anchor = {
      id: 1,
      shape: 'rect',
      widthM: 12,
      lengthM: 24,
      angleDeg: anchorAngles[ai],
      latlng: center
    };
    for (let ci = 0; ci < chamfers.length; ci += 1) {
      const intents = basinByChamfer[chamfers[ci]];
      for (let ii = 0; ii < intents.length; ii += 1) {
        for (let si = 0; si < standoffs.length; si += 1) {
          const r = runChamferLedCase(
            api, moverSpec, anchor, chamfers[ci], intents[ii], standoffs[si]
          );
          n += 1;
          if (!r.ok) {
            fail += 1;
            if (samples.length < 10) {
              samples.push({
                suite: name,
                A: anchorAngles[ai],
                basin0: intents[ii],
                chamfer: chamfers[ci],
                ...r
              });
            }
          }
        }
      }
    }
  }

  return {
    name,
    ok: fail === 0 && n === expected,
    n,
    expected,
    fail,
    pass: n - fail,
    samples
  };
}

function main() {
  const api = loadShippingApi();
  const center = api.L.latLng(38.5, -121.5);

  const rect = suiteRectIdentity(api, center);
  const a = suiteCutCornerChamferLed(api, center);
  const b = suiteAsymmetricMover(api, center, '8d36-asymmetric', 31, 37, 8.4, 13.2, 96);
  const c = suiteAsymmetricMover(api, center, 'gk1935-control', 18.583, 33.917, 5.421, 5.421, 96);

  const result = {
    ok: rect.ok && a.ok && b.ok && c.ok,
    suites: { rect, a, b, c },
    totals: {
      n: rect.n + a.n + b.n + c.n,
      fail: rect.fail + a.fail + b.fail + c.fail,
      pass: rect.pass + a.pass + b.pass + c.pass
    },
    posTolM: POS_TOL_M,
    angTolDeg: ANG_TOL_DEG,
    stickyEpsilon: 'clamp(0.25*engageM, 0.15, 0.25) m'
  };
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exit(1);
}

main();
