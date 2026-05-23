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
        weightEl.appendChild(opt);
    });

    populateSelect(document.getElementById("usRate"), 1200, 1700, 10, 1600);
    populateSelect(document.getElementById("deRate"), 1450, 1900, 10, 1850);
    populateSelect(document.getElementById("ukRate"), 1650, 2200, 10, 2100);
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
    document.getElementById("weight").selectedIndex = 0;
    document.getElementById("quantity").value = "1";
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
