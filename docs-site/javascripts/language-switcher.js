(function () {
  const scriptPath = new URL(document.currentScript.src).pathname;
  const projectRoot = scriptPath.replace(/(?:pt-BR\/)?javascripts\/language-switcher\.js$/, "");

  function equivalentPath(language) {
    let relative = window.location.pathname.startsWith(projectRoot)
      ? window.location.pathname.slice(projectRoot.length)
      : "";
    relative = relative.replace(/^pt-BR\//, "");
    return `${projectRoot}${language === "pt-BR" ? "pt-BR/" : ""}${relative}`;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[hreflang]");
    if (!link || !["en", "pt-BR"].includes(link.hreflang)) return;
    event.preventDefault();
    window.location.assign(equivalentPath(link.hreflang));
  });
})();
