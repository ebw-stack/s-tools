(function() {
    var params = window.location.search;
    var path = window.location.pathname;
    var currentKey = "index";
    if (path.indexOf("/search") !== -1) currentKey = "search";
    else if (path.indexOf("/register") !== -1) currentKey = "register";
    var base = currentKey !== "index" ? "../" : "";
    var links = [
        { href: base, key: "index", label: "마진 계산기" },
        { href: base + "register/", key: "register", label: "등록 가격" },
        { href: base + "search/", key: "search", label: "아마존 검색" }
    ];
    var nav = document.getElementById("nav");
    if (!nav) return;
    links.forEach(function(link) {
        var a = document.createElement("a");
        a.href = link.href + params;
        a.textContent = link.label;
        if (link.key === currentKey) a.className = "active";
        nav.appendChild(a);
    });
})();
