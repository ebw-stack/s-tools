// 기존 계산기 검증용 (임시) - 제거 시 이 파일 삭제 + HTML에서 legacy 섹션 제거

// 기존 미국 배송료 (calus 원본)
var legacyUsShipping = {
    1.0: 13600, 1.5: 16100, 2.0: 18500, 2.5: 21000, 3.0: 23400,
    3.5: 25900, 4.0: 28300, 4.5: 30800, 5.0: 33200, 5.5: 35600,
    6.0: 38100, 6.5: 40500, 7.0: 42900, 7.5: 45400, 8.0: 47900,
    8.5: 50400, 9.0: 52900, 9.5: 55400, 10.0: 57900, 10.5: 60400,
    11.0: 62900, 11.5: 65400, 12.0: 67900, 12.5: 70400, 13.0: 72900,
    13.5: 75400, 14.0: 77900, 14.5: 80400, 15.0: 82900, 15.5: 85400,
    16.0: 87900, 16.5: 90400, 17.0: 92900, 17.5: 95400, 18.0: 97900,
    18.5: 100400, 19.0: 102900, 19.5: 105400, 20.0: 107900
};

// 기존 독일 배송료 (europecal 원본)
var legacyDeShipping = {
    0.5: 10130, 1.0: 12510, 1.5: 15760, 2.0: 17160, 2.5: 19150,
    3.0: 21040, 3.5: 24100, 4.0: 26570, 4.5: 29050, 5.0: 31420,
    6.0: 37530, 7.0: 42680, 8.0: 47910, 9.0: 53150, 10.0: 60430,
    11.0: 67990, 12.0: 73420, 13.0: 78760, 14.0: 84190, 15.0: 89530,
    16.0: 94960, 17.0: 100390, 18.0: 105730, 19.0: 111160, 20.0: 116590,
    21.0: 123960, 22.0: 129390, 23.0: 134830, 24.0: 140160, 25.0: 145590,
    26.0: 151990, 27.0: 157430, 28.0: 162760, 29.0: 168190, 30.0: 173630
};

// 기존 영국 배송료 (europecal 원본)
var legacyUkShipping = {
    0.5: 10230, 1.0: 12700, 1.5: 15180, 2.0: 17550, 2.5: 20900,
    3.0: 24250, 3.5: 27540, 4.0: 30450, 4.5: 33560, 5.0: 36180,
    6.0: 44420, 7.0: 50820, 8.0: 57320, 9.0: 63720, 10.0: 70710,
    11.0: 79150, 12.0: 85740, 13.0: 92240, 14.0: 98740, 15.0: 105240,
    16.0: 111740, 17.0: 118340, 18.0: 124830, 19.0: 131330, 20.0: 137830,
    21.0: 146270, 22.0: 152870, 23.0: 159370, 24.0: 165870, 25.0: 172360,
    26.0: 178860, 27.0: 185460, 28.0: 191960, 29.0: 198460, 30.0: 204960
};

function legacyAgencyFee(localPrice) {
    if (localPrice <= 30) return 6000;
    if (localPrice <= 50) return 8000;
    return 10000;
}

function legacyCompare() {
    var sellingPrice = getSellingPrice();
    var weight = getWeight();
    var usPrice = parseFloat(document.getElementById("usPrice").value);
    var dePrice = parseFloat(document.getElementById("dePrice").value);
    var ukPrice = parseFloat(document.getElementById("ukPrice").value);
    var usRate = parseFloat(document.getElementById("usRate").value);
    var deRate = parseFloat(document.getElementById("deRate").value);
    var ukRate = parseFloat(document.getElementById("ukRate").value);

    var usEl = document.getElementById("legacyUs");
    var deEl = document.getElementById("legacyDe");
    var ukEl = document.getElementById("legacyUk");

    // 미국 (기존: 수량 없음, 배송료 테이블 직접 조회)
    if (sellingPrice && !isNaN(usPrice) && !isNaN(weight)) {
        var usFee = legacyUsShipping[weight];
        if (usFee !== undefined) {
            var usCost = usPrice * usRate * 1.024 + usFee;
            var usProfit = Math.floor(sellingPrice * 0.95 - usCost);
            usEl.textContent = usProfit.toLocaleString() + "원";
            usEl.className = "result " + (usProfit >= 0 ? "red" : "blue");
        } else {
            usEl.textContent = "-";
            usEl.className = "result gray";
        }
    } else {
        usEl.textContent = "";
    }

    // 독일 (기존: 수량 없음)
    if (sellingPrice && !isNaN(dePrice) && !isNaN(weight)) {
        var deFee = legacyDeShipping[weight];
        if (deFee !== undefined) {
            var deAgency = legacyAgencyFee(dePrice);
            var deCost = (dePrice / 1.19) * deRate * 1.085;
            var deProfit = Math.floor(sellingPrice * 0.95 - deCost - deFee - deAgency);
            deEl.textContent = deProfit.toLocaleString() + "원";
            deEl.className = "result " + (deProfit >= 0 ? "red" : "blue");
        } else {
            deEl.textContent = "-";
            deEl.className = "result gray";
        }
    } else {
        deEl.textContent = "";
    }

    // 영국 (기존: 수량 없음)
    if (sellingPrice && !isNaN(ukPrice) && !isNaN(weight)) {
        var ukFee = legacyUkShipping[weight];
        if (ukFee !== undefined) {
            var ukAgency = legacyAgencyFee(ukPrice);
            var ukCost = (ukPrice / 1.20) * ukRate * 1.085;
            var ukProfit = Math.floor(sellingPrice * 0.95 - ukCost - ukFee - ukAgency);
            ukEl.textContent = ukProfit.toLocaleString() + "원";
            ukEl.className = "result " + (ukProfit >= 0 ? "red" : "blue");
        } else {
            ukEl.textContent = "-";
            ukEl.className = "result gray";
        }
    } else {
        ukEl.textContent = "";
    }
}

// calculateAll 호출 시 같이 실행되도록 원본 함수 래핑
var _originalCalculateAll = calculateAll;
calculateAll = function() {
    _originalCalculateAll();
    legacyCompare();
};

var _originalCalculateUS = calculateUS;
calculateUS = function() {
    _originalCalculateUS();
    legacyCompare();
};

var _originalCalculateDE = calculateDE;
calculateDE = function() {
    _originalCalculateDE();
    legacyCompare();
};

var _originalCalculateUK = calculateUK;
calculateUK = function() {
    _originalCalculateUK();
    legacyCompare();
};
