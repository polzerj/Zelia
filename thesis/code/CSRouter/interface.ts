class Router {
  private registeredEvents;
  private rootELement;
  constructor(rootELement: HTMLElement);
  /**
   * Redirect Page
   * @param path path to redirect to.
   * E.g.: "/login"
   * When path not known -> render 404 page
   * @param silentHistory Set to true when
   */
  public redirect(path: string, silentHistory?: boolean): void;
  /**
   * Register action which gets executed when path is routed
   */
  public on(path: string, action: RoutedAction): void;
  public get currentPath(): string;
}
