(function() {
    var params = window.location.search;
    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    var links = [
        { href: "search.html", label: "아마존 검색" },
        { href: "index.html", label: "마진 계산기" }
    ];
    var nav = document.getElementById("nav");
    if (!nav) return;
    links.forEach(function(link) {
        var a = document.createElement("a");
        a.href = link.href + params;
        a.textContent = link.label;
        if (currentPage === link.href) a.className = "active";
        nav.appendChild(a);
    });
})();
