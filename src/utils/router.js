class Router {
  constructor(mainContent, routes) {
    this._mainContent = mainContent;
    this._routes = routes;
  }
  async renderPage() {
    const path = location.hash.slice(1).toLowerCase() || '/';
    const Presenter = this._routes[path] || this._routes['/'];
    const update = async () => {
      if (Presenter) {
        const presenter = new Presenter(this._mainContent);
        await presenter.render();
      } else {
        this._mainContent.innerHTML = '<p>Halaman tidak ditemukan.</p>';
      }
    };
    if (!document.startViewTransition) { await update(); return; }
    document.startViewTransition(() => { update(); });
  }
}
export default Router;
