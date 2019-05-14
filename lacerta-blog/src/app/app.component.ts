import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { PageService } from './page/page.service';
import { PageTitleService } from "./page-title/page-title.service";
import { PageComponent } from './page/page.component';

// import { getURLSegmentObject as getURLSegmentArray } from '../utils/url-segment-object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private titleService: PageTitleService,
    private pageService: PageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.config.unshift(
      ...this.pageService.getPosts().map(p => {
        let permalink = p.permalink;
        permalink = permalink.startsWith('/') ? permalink.substring(1) : permalink;
        permalink = permalink.endsWith('/') ? permalink.substr(0, permalink.length - 1) : permalink;
        return {
          path: permalink,
          component: PageComponent,
          pathMatch: 'full'
        };
      })
    );
  }

  // ngOnInit(): void {
  //   this.pageService.getPosts().forEach(p => {
  //     const segments = getURLSegmentArray(p.permalink);
  //     const route = this.generateRoute(segments);
  //     this.appendRoute(route, this.router.config);
  //     console.log(this.router.parseUrl('/frontend-interview/interview/interview-preparation/job-seeking'));
  //   });
  // }

  // private appendRoute(route: Route, scopedRoutes: Route[]) {
  //   const existingRoute = scopedRoutes.find(r => r.path === route.path);
  //   if (existingRoute) {
  //     if (existingRoute.children && existingRoute.children.length > 0) {
  //       if (route.children && route.children.length > 0) {
  //         route.children.forEach(r => this.appendRoute(r, existingRoute.children));
  //       }
  //     } else {
  //       if (route.children && route.children.length > 0) {
  //         existingRoute.children = route.children;
  //       }
  //     }
  //   } else {
  //     scopedRoutes.unshift(route);
  //   }
  // }

  // private generateRoute(s: string[]) {
  //   const result: Route = {
  //     path: s[0] || '',
  //     component: PageComponent,
  //   };
  //   const rest = s.slice(1);
  //   if (rest.length > 0) {
  //     result.children = [this.generateRoute(rest)]
  //   }
  //   return result;
  // }

  get pages() {
    const result = this.pageService.getPages();
    return result;
  }

  get title() {
    return this.titleService.title;
  }
}
