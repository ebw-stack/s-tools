function parseNumber(str) {
    return parseInt(str.replace(/,/g, "")) || 0;
}

function sanitizeInput(input) {
    const pos = input.selectionStart;
    const before = input.value;
    input.value = before.replace(/[^0-9.,]/g, "");
    if (input.value !== before) {
        input.selectionStart = input.selectionEnd = pos - (before.length - input.value.length);
    }
}

function formatInput(input) {
    sanitizeInput(input);
    let val = input.value.replace(/,/g, "");
    if (!isNaN(val) && val !== "") {
        input.value = parseInt(val).toLocaleString();
    }
}

function getAgencyFee(localPrice) {
    if (localPrice <= 30) return 6000;
    if (localPrice <= 50) return 8000;
    return 10000;
}

function getShippingFee(table, weight) {
    if (table[weight] !== undefined) return table[weight];
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    for (const k of keys) {
        if (k > weight) return table[k];
    }
    return null;
}

function getSellingPrice() {
    return parseNumber(document.getElementById("sellingPrice").value);
}

function getWeight() {
    return parseFloat(document.getElementById("weight").value);
}


function showResult(elId, rateElId, profit, sellingPrice) {
    const el = document.getElementById(elId);
    const rateEl = document.getElementById(rateElId);
    const color = profit >= 0 ? "red" : "blue";

    el.textContent = Math.floor(profit).toLocaleString() + "원";
    el.className = "result " + color;

    if (sellingPrice) {
        const marginRate = Math.round((profit / sellingPrice) * 100);
        rateEl.textContent = marginRate + "%";
        rateEl.className = "margin-rate " + color;
    }
}
