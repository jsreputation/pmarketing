import { NavigationExtras, UrlTree } from "@angular/router";

export class AppRouter
// extends Router 
{
  public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    const tree = this.createUrlTree(commands, extras);
    return this.navigateByUrl(tree, extras);
  }

  // @ts-ignore
  public createUrlTree(commands: any[], navigationExtras?: NavigationExtras): UrlTree {
    const res = new UrlTree();
    return res;
  }

  // @ts-ignore
  public navigateByUrl(url: string | UrlTree, extras?: NavigationExtras): Promise<boolean> {
    const urlParams = new URLSearchParams(window.location.search);
    let redirectUri = urlParams.get('redirect_uri');
    if (redirectUri) {
      if (!redirectUri.includes('://')) {
        redirectUri = `https://${redirectUri}`;
      }
      console.log(`redirecting to ${redirectUri}`);
      window.location.href = redirectUri;
      return Promise.resolve(true);
    }
    return Promise.reject('Missing redirect_uri');
  }
}
