(function() {
    var params = window.location.search;
    var path = window.location.pathname;
    var isSearch = path.indexOf("/search") !== -1;
    var base = isSearch ? "../" : "";
    var links = [
        { href: base + "search/", key: "search", label: "아마존 검색" },
        { href: base, key: "index", label: "마진 계산기" }
    ];
    var currentKey = isSearch ? "search" : "index";
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
