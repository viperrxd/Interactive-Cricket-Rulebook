// ===== DLS RESOURCE TABLE (Standard Edition Approximations) =====
const DLS_ANCHORS = [
    { o: 0,  v: [0,0,0,0,0,0,0,0,0,0] },
    { o: 1,  v: [3.9,3.9,3.8,3.8,3.7,3.6,3.5,3.3,2.9,2.0] },
    { o: 2,  v: [7.6,7.5,7.5,7.4,7.3,7.1,6.7,6.1,5.1,3.4] },
    { o: 3,  v: [10.9,10.8,10.7,10.6,10.4,10.0,9.3,8.2,6.6,3.9] },
    { o: 5,  v: [17.2,17.0,16.8,16.5,16.0,15.2,13.8,11.7,8.7,4.4] },
    { o: 8,  v: [26.2,25.8,25.2,24.4,23.2,21.3,18.5,14.5,9.9,4.6] },
    { o: 10, v: [32.1,31.6,30.8,29.8,28.3,25.9,22.3,17.0,10.8,4.6] },
    { o: 13, v: [39.4,38.5,37.3,35.7,33.3,30.0,25.1,18.4,11.2,4.7] },
    { o: 15, v: [45.2,44.1,42.6,40.3,37.2,33.0,26.9,19.2,11.4,4.7] },
    { o: 18, v: [51.7,50.2,48.2,45.3,41.4,36.1,28.8,20.0,11.6,4.7] },
    { o: 20, v: [56.6,54.8,52.4,48.9,44.4,38.2,30.0,20.5,11.7,4.7] },
    { o: 23, v: [62.3,59.9,56.9,52.7,47.4,40.4,31.2,20.9,11.8,4.7] },
    { o: 25, v: [66.5,63.9,60.5,55.8,49.7,42.0,32.0,21.2,11.8,4.7] },
    { o: 28, v: [71.5,68.3,64.4,58.9,52.1,43.5,32.7,21.5,11.9,4.7] },
    { o: 30, v: [75.1,71.8,67.3,61.6,54.1,44.7,33.2,21.6,11.9,4.7] },
    { o: 33, v: [79.5,75.6,70.7,64.3,56.1,45.9,33.7,21.7,11.9,4.7] },
    { o: 35, v: [82.7,78.6,73.2,66.3,57.7,46.8,34.1,21.8,11.9,4.7] },
    { o: 38, v: [86.4,81.8,75.9,68.2,59.0,47.3,34.3,21.8,11.9,4.7] },
    { o: 40, v: [89.3,84.2,77.8,69.6,59.5,47.6,34.4,21.8,11.9,4.7] },
    { o: 43, v: [92.4,87.0,80.1,71.2,60.5,48.0,34.6,21.9,11.9,4.7] },
    { o: 45, v: [95.0,89.0,81.7,72.4,61.2,48.4,34.7,21.9,11.9,4.7] },
    { o: 48, v: [97.8,91.5,83.6,73.8,62.0,48.7,34.8,22.0,11.9,4.7] },
    { o: 50, v: [100.0,93.4,85.1,74.9,62.7,49.0,34.9,22.0,11.9,4.7] }
];

function getResource(overs, wicketsLost) {
    if (overs <= 0 || wicketsLost >= 10) return 0;
    if (overs >= 50 && wicketsLost === 0) return 100;
    const w = Math.min(wicketsLost, 9);
    let lo = DLS_ANCHORS[0], hi = DLS_ANCHORS[DLS_ANCHORS.length - 1];
    for (let i = 0; i < DLS_ANCHORS.length - 1; i++) {
        if (overs >= DLS_ANCHORS[i].o && overs <= DLS_ANCHORS[i + 1].o) {
            lo = DLS_ANCHORS[i]; hi = DLS_ANCHORS[i + 1]; break;
        }
    }
    if (lo.o === hi.o) return lo.v[w];
    const t = (overs - lo.o) / (hi.o - lo.o);
    return +(lo.v[w] + t * (hi.v[w] - lo.v[w])).toFixed(1);
}

// ===== DLS UI =====
const dlsOvers = document.getElementById('dls-overs');
const dlsWickets = document.getElementById('dls-wickets');
const dlsScore = document.getElementById('dls-score');
const dlsOversVal = document.getElementById('dls-overs-val');
const dlsWicketsVal = document.getElementById('dls-wickets-val');
const dlsTarget = document.getElementById('dls-target');
const dlsSub = document.getElementById('dls-sub');
const dlsExplanation = document.getElementById('dls-explanation');
const gaugePct = document.getElementById('gauge-pct');
const gaugeFill = document.getElementById('gauge-fill');

function updateDLS() {
    const overs = +dlsOvers.value;
    const wickets = +dlsWickets.value;
    const score = +dlsScore.value || 0;
    dlsOversVal.textContent = overs;
    dlsWicketsVal.textContent = wickets;
    const resource = getResource(overs, wickets);
    const par = Math.ceil(score * resource / 100);
    const target = par + 1;
    dlsTarget.textContent = wickets >= 10 || overs <= 0 ? '—' : target;
    dlsSub.textContent = wickets >= 10 || overs <= 0
        ? 'All out or no overs — no target'
        : `Team 2 needs ${target} runs in ${overs} over${overs !== 1 ? 's' : ''}`;
    gaugePct.textContent = resource + '%';
    gaugeFill.style.width = resource + '%';
    // Color the gauge based on resource level
    if (resource > 60) gaugeFill.style.background = 'linear-gradient(90deg,#059669,#14b8a6)';
    else if (resource > 30) gaugeFill.style.background = 'linear-gradient(90deg,#f59e0b,#eab308)';
    else gaugeFill.style.background = 'linear-gradient(90deg,#ef4444,#f97316)';
    const wicketsInHand = 10 - wickets;
    dlsExplanation.innerHTML = `With <strong>${overs} over${overs !== 1 ? 's' : ''}</strong> remaining and <strong>${wicketsInHand} wicket${wicketsInHand !== 1 ? 's' : ''}</strong> in hand, Team 2 has <strong>${resource}%</strong> of their batting resources. The target is scaled: <em>${score} × ${resource}% = ${par}</em>, so they need <strong>${target}</strong> to win.`;
    updateHeatmapHighlight(overs, wickets);
}

// ===== HEATMAP =====
const HEATMAP_OVERS = [50,45,40,35,30,25,20,15,10,5,1];
function buildHeatmap() {
    const table = document.getElementById('heatmap-table');
    let html = '<thead><tr><th></th>';
    HEATMAP_OVERS.forEach(o => html += `<th>${o} ov</th>`);
    html += '</tr></thead><tbody>';
    for (let w = 0; w <= 9; w++) {
        html += `<tr><td class="row-header">${w} wkt${w !== 1 ? 's' : ''}</td>`;
        HEATMAP_OVERS.forEach(o => {
            const val = getResource(o, w);
            const hue = val > 50 ? 145 : val > 25 ? 40 : 0;
            const sat = 70, light = 15 + val * 0.25;
            html += `<td data-o="${o}" data-w="${w}" style="background:hsla(${hue},${sat}%,${light}%,0.6);color:rgba(255,255,255,${0.5 + val / 200})">${val}</td>`;
        });
        html += '</tr>';
    }
    html += '</tbody>';
    table.innerHTML = html;
}

function updateHeatmapHighlight(overs, wickets) {
    document.querySelectorAll('.heatmap-table td.active').forEach(el => el.classList.remove('active'));
    // Find closest heatmap over
    let closest = HEATMAP_OVERS.reduce((a, b) => Math.abs(b - overs) < Math.abs(a - overs) ? b : a);
    const cell = document.querySelector(`.heatmap-table td[data-o="${closest}"][data-w="${wickets}"]`);
    if (cell) cell.classList.add('active');
}

// ===== LBW SIMULATOR =====
const pitchSvg = document.getElementById('pitch-svg');
const markersGroup = document.getElementById('lbw-markers');
const stepIndicator = document.getElementById('lbw-step');
const verdictPanel = document.getElementById('verdict-panel');
const explanationPanel = document.getElementById('explanation-panel');
const toggleShot = document.getElementById('toggle-shot');
const toggleHand = document.getElementById('toggle-hand');

// Pitch coordinate constants
const LEG_STUMP = 139;
const OFF_STUMP = 161;
const MID_STUMP = 150;
const STUMP_Y = 425; // y-line of stumps
const STUMP_WIDTH_HALF = 13; // half-width of stump set for hit zone
const UMPIRE_CALL_MARGIN = 5; // extra margin for clipping

let lbwState = { step: 0, pitching: null, impact: null, shotOffered: true, rightHand: true };

function getSvgPoint(e) {
    const rect = pitchSvg.getBoundingClientRect();
    const scaleX = 300 / rect.width;
    const scaleY = 480 / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}

function isOutsideLeg(x) {
    return lbwState.rightHand ? x < LEG_STUMP : x > OFF_STUMP;
}
function isOutsideOff(x) {
    return lbwState.rightHand ? x > OFF_STUMP : x < LEG_STUMP;
}
function isInLine(x) {
    return x >= LEG_STUMP && x <= OFF_STUMP;
}

function projectToStumps(pitch, impact) {
    if (impact.y === pitch.y) return impact.x;
    const t = (STUMP_Y - pitch.y) / (impact.y - pitch.y);
    return pitch.x + t * (impact.x - pitch.x);
}

function checkHittingStumps(projectedX) {
    const left = MID_STUMP - STUMP_WIDTH_HALF;
    const right = MID_STUMP + STUMP_WIDTH_HALF;
    if (projectedX >= left && projectedX <= right) return 'hitting';
    // Umpire's call zone
    if (projectedX >= left - UMPIRE_CALL_MARGIN && projectedX <= right + UMPIRE_CALL_MARGIN) return 'clipping';
    return 'missing';
}

function evaluateLBW() {
    const { pitching, impact, shotOffered } = lbwState;
    const steps = [];
    let decision = '';

    // Step 1: Pitching
    if (isOutsideLeg(pitching.x)) {
        steps.push({ icon: 'fail', text: 'Ball pitched outside leg stump — automatic Not Out.' });
        decision = 'notout';
        return { decision, label: 'NOT OUT', steps };
    }
    steps.push({ icon: 'pass', text: isInLine(pitching.x) ? 'Ball pitched in line with stumps ✓' : 'Ball pitched outside off stump — OK, continue ✓' });

    // Step 2: Impact
    if (isOutsideOff(impact.x) && shotOffered) {
        steps.push({ icon: 'fail', text: 'Impact outside off stump AND shot was offered — Not Out.' });
        decision = 'notout';
        return { decision, label: 'NOT OUT', steps };
    }
    if (isInLine(impact.x)) {
        steps.push({ icon: 'pass', text: 'Impact in line with stumps ✓' });
    } else if (isOutsideOff(impact.x)) {
        steps.push({ icon: 'pass', text: 'Impact outside off but NO shot offered — continue ✓' });
    } else {
        // Impact outside leg — this is unusual but technically in-line check failed
        steps.push({ icon: 'warn', text: 'Impact outside leg stump — marginal.' });
    }

    // Step 3: Trajectory — would it hit stumps?
    const projX = projectToStumps(pitching, impact);
    const hitResult = checkHittingStumps(projX);
    if (hitResult === 'hitting') {
        steps.push({ icon: 'fail', text: 'Ball projected to hit the stumps — OUT!' });
        decision = 'out';
        return { decision, label: 'OUT', steps };
    } else if (hitResult === 'clipping') {
        steps.push({ icon: 'warn', text: 'Ball marginally clipping the stumps — UMPIRE\'S CALL.' });
        decision = 'umpires-call';
        return { decision, label: "UMPIRE'S CALL", steps };
    } else {
        steps.push({ icon: 'pass', text: 'Ball going on to miss the stumps — Not Out.' });
        decision = 'notout';
        return { decision, label: 'NOT OUT', steps };
    }
}

function drawMarker(x, y, color, id) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x); circle.setAttribute('cy', y);
    circle.setAttribute('r', '8'); circle.setAttribute('fill', color);
    circle.setAttribute('stroke', '#fff'); circle.setAttribute('stroke-width', '2');
    circle.setAttribute('opacity', '0.9');
    circle.id = id;
    // Pulse animation
    const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    anim.setAttribute('attributeName', 'r'); anim.setAttribute('values', '8;11;8');
    anim.setAttribute('dur', '1.5s'); anim.setAttribute('repeatCount', 'indefinite');
    circle.appendChild(anim);
    markersGroup.appendChild(circle);
}

function drawTrajectory(pitch, impact, projX) {
    // Ball path: pitch → impact
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', pitch.x); line1.setAttribute('y1', pitch.y);
    line1.setAttribute('x2', impact.x); line1.setAttribute('y2', impact.y);
    line1.setAttribute('stroke', '#fff'); line1.setAttribute('stroke-width', '2');
    line1.setAttribute('stroke-dasharray', '6,3'); line1.setAttribute('opacity', '0.7');
    markersGroup.appendChild(line1);

    // Projected path: impact → stumps
    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', impact.x); line2.setAttribute('y1', impact.y);
    line2.setAttribute('x2', projX); line2.setAttribute('y2', STUMP_Y);
    line2.setAttribute('stroke-width', '2.5'); line2.setAttribute('opacity', '0.6');
    line2.setAttribute('stroke-dasharray', '4,4');
    const hitResult = checkHittingStumps(projX);
    line2.setAttribute('stroke', hitResult === 'hitting' ? '#ef4444' : hitResult === 'clipping' ? '#f59e0b' : '#10b981');
    markersGroup.appendChild(line2);

    // Projected impact circle at stumps
    const endCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    endCircle.setAttribute('cx', projX); endCircle.setAttribute('cy', STUMP_Y);
    endCircle.setAttribute('r', '7');
    endCircle.setAttribute('fill', hitResult === 'hitting' ? 'rgba(239,68,68,0.4)' : hitResult === 'clipping' ? 'rgba(245,158,11,0.4)' : 'rgba(16,185,129,0.4)');
    endCircle.setAttribute('stroke', hitResult === 'hitting' ? '#ef4444' : hitResult === 'clipping' ? '#f59e0b' : '#10b981');
    endCircle.setAttribute('stroke-width', '2');
    markersGroup.appendChild(endCircle);
}

function showVerdict(result) {
    verdictPanel.className = 'verdict-panel ' + result.decision;
    let decClass = result.decision === 'out' ? 'out' : result.decision === 'umpires-call' ? 'umpires-call' : 'notout';
    let emoji = result.decision === 'out' ? '🔴' : result.decision === 'umpires-call' ? '🟡' : '🟢';
    verdictPanel.innerHTML = `<div class="verdict-decision ${decClass}">${emoji} ${result.label}</div>`;

    explanationPanel.style.display = 'block';
    explanationPanel.innerHTML = '<div style="font-size:0.85rem;font-weight:600;color:var(--accent-gold);margin-bottom:0.5rem;">📋 Decision Breakdown</div>' +
        result.steps.map(s =>
            `<div class="explanation-step"><div class="step-icon ${s.icon}">${s.icon === 'pass' ? '✓' : s.icon === 'fail' ? '✗' : '!'}</div><span>${s.text}</span></div>`
        ).join('');
}

function resetLBW() {
    lbwState.step = 0;
    lbwState.pitching = null;
    lbwState.impact = null;
    markersGroup.innerHTML = '';
    stepIndicator.textContent = '① Click to set pitching point';
    verdictPanel.className = 'verdict-panel waiting';
    verdictPanel.innerHTML = '<div style="color:var(--text-muted);font-size:0.9rem;">🏏 Click on the pitch to begin</div>';
    explanationPanel.style.display = 'none';
}

function runPreset(name) {
    resetLBW();
    const presets = {
        'classic-out':        { pitch: {x:150, y:200}, impact: {x:148, y:370} },
        'outside-leg':        { pitch: {x:110, y:190}, impact: {x:120, y:360} },
        'impact-outside-off': { pitch: {x:165, y:210}, impact: {x:185, y:360} },
        'missing-stumps':     { pitch: {x:180, y:200}, impact: {x:195, y:365} },
        'umpires-call':       { pitch: {x:155, y:195}, impact: {x:170, y:370} }
    };
    if (!lbwState.rightHand) {
        // Mirror for left-hand
        const p = presets[name];
        p.pitch.x = 300 - p.pitch.x;
        p.impact.x = 300 - p.impact.x;
    }
    const p = presets[name];
    lbwState.pitching = p.pitch;
    lbwState.impact = p.impact;
    lbwState.step = 2;
    drawMarker(p.pitch.x, p.pitch.y, '#3b82f6', 'pitch-marker');
    drawMarker(p.impact.x, p.impact.y, '#f59e0b', 'impact-marker');
    const projX = projectToStumps(p.pitch, p.impact);
    drawTrajectory(p.pitch, p.impact, projX);
    stepIndicator.textContent = '✓ Scenario loaded';
    const result = evaluateLBW();
    showVerdict(result);
}

// Event: Pitch click
pitchSvg.addEventListener('click', function(e) {
    const pt = getSvgPoint(e);
    if (pt.y < 30 || pt.y > 450) return; // out of play area

    if (lbwState.step === 0) {
        lbwState.pitching = pt;
        lbwState.step = 1;
        drawMarker(pt.x, pt.y, '#3b82f6', 'pitch-marker');
        stepIndicator.textContent = '② Click to set impact point';
        verdictPanel.className = 'verdict-panel waiting';
        verdictPanel.innerHTML = '<div style="color:var(--text-muted);font-size:0.9rem;">📍 Pitching point set. Now click where it hits the pad.</div>';
    } else if (lbwState.step === 1) {
        if (pt.y <= lbwState.pitching.y + 20) return; // impact must be below pitching
        lbwState.impact = pt;
        lbwState.step = 2;
        drawMarker(pt.x, pt.y, '#f59e0b', 'impact-marker');
        const projX = projectToStumps(lbwState.pitching, lbwState.impact);
        drawTrajectory(lbwState.pitching, lbwState.impact, projX);
        stepIndicator.textContent = '✓ Result below';
        const result = evaluateLBW();
        showVerdict(result);
    } else {
        resetLBW();
    }
});

// Toggle handlers
toggleShot.addEventListener('click', function() {
    const active = this.dataset.active === 'true';
    this.dataset.active = !active;
    this.classList.toggle('active');
    lbwState.shotOffered = !active;
    if (lbwState.step === 2) {
        // Re-evaluate
        markersGroup.innerHTML = '';
        drawMarker(lbwState.pitching.x, lbwState.pitching.y, '#3b82f6', 'pitch-marker');
        drawMarker(lbwState.impact.x, lbwState.impact.y, '#f59e0b', 'impact-marker');
        const projX = projectToStumps(lbwState.pitching, lbwState.impact);
        drawTrajectory(lbwState.pitching, lbwState.impact, projX);
        showVerdict(evaluateLBW());
    }
});

toggleHand.addEventListener('click', function() {
    const active = this.dataset.active === 'true';
    this.dataset.active = !active;
    this.classList.toggle('active');
    lbwState.rightHand = !active;
    // Update zone labels
    const labels = pitchSvg.querySelectorAll('text');
    if (lbwState.rightHand) {
        labels[0].textContent = 'LEG SIDE';
        labels[2].textContent = 'OFF SIDE';
    } else {
        labels[0].textContent = 'OFF SIDE';
        labels[2].textContent = 'LEG SIDE';
    }
    if (lbwState.step === 2) {
        markersGroup.innerHTML = '';
        drawMarker(lbwState.pitching.x, lbwState.pitching.y, '#3b82f6', 'pitch-marker');
        drawMarker(lbwState.impact.x, lbwState.impact.y, '#f59e0b', 'impact-marker');
        const projX = projectToStumps(lbwState.pitching, lbwState.impact);
        drawTrajectory(lbwState.pitching, lbwState.impact, projX);
        showVerdict(evaluateLBW());
    }
});

document.getElementById('lbw-reset').addEventListener('click', resetLBW);

// Preset buttons
document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => runPreset(btn.dataset.preset));
});

// ===== DLS EVENT LISTENERS =====
dlsOvers.addEventListener('input', updateDLS);
dlsWickets.addEventListener('input', updateDLS);
dlsScore.addEventListener('input', updateDLS);

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ===== INIT =====
buildHeatmap();
updateDLS();
