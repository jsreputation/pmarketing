import { NavigationExtras, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { oc } from 'ts-optchain';

export class AppRouter implements Partial<Router> {
  public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    const tree = this.createUrlTree(commands, extras);
    return this.navigateByUrl(tree, extras);
  }

  // @ts-ignore
  public createUrlTree(commands: any[], navigationExtras?: NavigationExtras): UrlTree {
    const res = new UrlTree();
    const segments: UrlSegment[] = [];
    commands.forEach((c: string) => {
      // do not handle subgroups for now
      if (!c.startsWith('(')) {
        const segs: string[] = c.split('/').filter(seg => seg !== '');
        segs.forEach(seg => segments.push(new UrlSegment(seg, {})));
      }
    });
    res.root = new UrlSegmentGroup(segments, {});
    res.queryParams = oc(navigationExtras).queryParams({});
    res.fragment = oc(navigationExtras).fragment() || null;
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
