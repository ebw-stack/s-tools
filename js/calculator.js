function calculateUS() {
    const sellingPrice = getSellingPrice();
    const localPrice = parseFloat(document.getElementById("usPrice").value);
    const exchangeRate = parseFloat(document.getElementById("usRate").value);
    const weight = getWeight();
    const quantity = parseInt(document.getElementById("usQty").value) || 1;
    const baseQty = getBaseQty();
    const resultEl = document.getElementById("usResult");

    if (!sellingPrice || isNaN(localPrice) || isNaN(weight)) {
        resultEl.textContent = "";
        return;
    }

    const totalWeight = weight * baseQty;
    const shippingFee = getShippingFee(usShippingFees, totalWeight);
    if (shippingFee === null) {
        resultEl.textContent = "무게 초과 (미국 최대 20.0kg)";
        resultEl.className = "result gray";
        return;
    }

    const totalLocalPrice = localPrice * quantity * baseQty;
    const cost = totalLocalPrice * exchangeRate * 1.024 + shippingFee;
    const totalRevenue = sellingPrice * baseQty * 0.95;
    const profit = Math.floor(totalRevenue - cost);
    showResult("usResult", "usRate2", profit, sellingPrice * baseQty);
}

function calculateDE() {
    const sellingPrice = getSellingPrice();
    const localPrice = parseFloat(document.getElementById("dePrice").value);
    const exchangeRate = parseFloat(document.getElementById("deRate").value);
    const weight = getWeight();
    const quantity = parseInt(document.getElementById("deQty").value) || 1;
    const baseQty = getBaseQty();
    const resultEl = document.getElementById("deResult");

    if (!sellingPrice || isNaN(localPrice) || isNaN(weight)) {
        resultEl.textContent = "";
        return;
    }

    const totalWeight = weight * baseQty;
    const shippingCost = getShippingFee(deShippingFees, totalWeight);
    if (shippingCost === null) {
        resultEl.textContent = "무게 초과 (독일 최대 200.0kg)";
        resultEl.className = "result gray";
        return;
    }

    const totalLocalPrice = localPrice * quantity * baseQty;
    const agencyFee = getAgencyFee(totalLocalPrice);
    const localCost = (totalLocalPrice / 1.19) * exchangeRate * 1.085;
    const totalRevenue = sellingPrice * baseQty * 0.95;
    const profit = Math.floor(totalRevenue - localCost - shippingCost - agencyFee);
    showResult("deResult", "deRate2", profit, sellingPrice * baseQty);
}

function calculateUK() {
    const sellingPrice = getSellingPrice();
    const localPrice = parseFloat(document.getElementById("ukPrice").value);
    const exchangeRate = parseFloat(document.getElementById("ukRate").value);
    const weight = getWeight();
    const quantity = parseInt(document.getElementById("ukQty").value) || 1;
    const baseQty = getBaseQty();
    const resultEl = document.getElementById("ukResult");

    if (!sellingPrice || isNaN(localPrice) || isNaN(weight)) {
        resultEl.textContent = "";
        return;
    }

    const totalWeight = weight * baseQty;
    const shippingCost = getShippingFee(ukShippingFees, totalWeight);
    if (shippingCost === null) {
        resultEl.textContent = "무게 초과 (영국 최대 200.0kg)";
        resultEl.className = "result gray";
        return;
    }

    const totalLocalPrice = localPrice * quantity * baseQty;
    const agencyFee = getAgencyFee(totalLocalPrice);
    const localCost = (totalLocalPrice / 1.20) * exchangeRate * 1.085;
    const totalRevenue = sellingPrice * baseQty * 0.95;
    const profit = Math.floor(totalRevenue - localCost - shippingCost - agencyFee);
    showResult("ukResult", "ukRate2", profit, sellingPrice * baseQty);
}

function calculateAll() {
    calculateUS();
    calculateDE();
    calculateUK();
}
