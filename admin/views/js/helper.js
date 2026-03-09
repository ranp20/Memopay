var domainbyadm = (function () {
  var base = new URL(window.location.href).origin + "/admin/";
  return {
    controllers: base + "controllers/",
    views:       base + "views/",
    models:      base + "models/",
  };
})();