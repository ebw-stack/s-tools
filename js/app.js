// 기본(실제 구매용) 환율
const purchaseRates = { us: 1520, de: 1760, uk: 2020 };
// 판매용 환율 = 현재 환율 × 가산율
const sellingMargins = { us: 1.05, de: 1.07, uk: 1.07 };
let liveRates = null;  // 조회한 현재 환율 캐시

function populateSelect(el, start, end, step, defaultVal) {
    for (let i = start; i <= end; i += step) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = i;
        if (i === defaultVal) opt.selected = true;
        el.appendChild(opt);
    }
}

function initDropdowns() {
    const weightEl = document.getElementById("weight");
    validWeights.forEach(w => {
        const opt = document.createElement("option");
        opt.value = w;
        opt.textContent = w.toFixed(1);
        if (w === 1.0) opt.selected = true;
        weightEl.appendChild(opt);
    });

    populateSelect(document.getElementById("usRate"), 1200, 1700, 10, purchaseRates.us);
    populateSelect(document.getElementById("deRate"), 1450, 1900, 10, purchaseRates.de);
    populateSelect(document.getElementById("ukRate"), 1650, 2200, 10, purchaseRates.uk);
}

// 10원 단위로 반올림하고 셀렉트 범위를 벗어나면 양 끝값으로 맞춘다
function setRate(elId, value) {
    const el = document.getElementById(elId);
    const opts = Array.from(el.options).map(o => Number(o.value));
    const rounded = Math.round(value / 10) * 10;
    el.value = Math.min(Math.max(rounded, opts[0]), opts[opts.length - 1]);
}

async function fetchLiveRates() {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    const krw = data.rates.KRW;
    return {
        us: krw,
        de: krw / data.rates.EUR,
        uk: krw / data.rates.GBP,
        updated: data.time_last_update_unix
    };
}

async function applyRateMode() {
    const checkbox = document.getElementById("sellingRate");
    const statusEl = document.getElementById("rateStatus");

    // 해제 → 기본(실제 구매용) 환율로 복귀
    if (!checkbox.checked) {
        setRate("usRate", purchaseRates.us);
        setRate("deRate", purchaseRates.de);
        setRate("ukRate", purchaseRates.uk);
        statusEl.textContent = "";
        calculateAll();
        return;
    }

    // 체크 → 현재 환율에 가산율 적용
    checkbox.disabled = true;
    statusEl.textContent = "현재 환율 불러오는 중...";
    try {
        if (!liveRates) liveRates = await fetchLiveRates();
        setRate("usRate", liveRates.us * sellingMargins.us);
        setRate("deRate", liveRates.de * sellingMargins.de);
        setRate("ukRate", liveRates.uk * sellingMargins.uk);
        calculateAll();

        const d = new Date(liveRates.updated * 1000);
        statusEl.textContent = `${d.getMonth() + 1}/${d.getDate()} 기준 `
            + `${Math.round(liveRates.us)} / ${Math.round(liveRates.de)} / ${Math.round(liveRates.uk)}`;
    } catch (e) {
        checkbox.checked = false;
        statusEl.textContent = "환율을 불러오지 못했습니다.";
    } finally {
        checkbox.disabled = false;
    }
}

function resetFields() {
    document.getElementById("sellingPrice").value = "";
    document.getElementById("usPrice").value = "";
    document.getElementById("dePrice").value = "";
    document.getElementById("ukPrice").value = "";
    document.getElementById("usResult").textContent = "";
    document.getElementById("deResult").textContent = "";
    document.getElementById("ukResult").textContent = "";
    document.getElementById("usRate2").textContent = "";
    document.getElementById("deRate2").textContent = "";
    document.getElementById("ukRate2").textContent = "";
    document.getElementById("weight").value = "1";
    document.getElementById("baseQty").value = "1";
    document.getElementById("usQty").value = "1";
    document.getElementById("deQty").value = "1";
    document.getElementById("ukQty").value = "1";
    updateAdjustedPrice(0, 1);
    document.getElementById("sellingPrice").focus();
}

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") resetFields();
});

window.onload = function() {
    initDropdowns();
    if (new URLSearchParams(window.location.search).has("admin")) {
        document.getElementById("rateSettings").style.display = "";
    }
};
