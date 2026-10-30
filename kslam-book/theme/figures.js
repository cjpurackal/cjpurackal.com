// Number figures per chapter ("Figure 2.1") from the chapter number in the page's h1.
(function () {
  const h1 = document.querySelector("main h1");
  const m = h1 && h1.textContent.match(/^\s*(\d+)\./);
  if (m) document.querySelector("main").style.setProperty("--chapter", `"${m[1]}."`);
})();
