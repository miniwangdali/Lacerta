import { Injectable } from '@angular/core';
import posts from '../../../posts.json';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private _pages: typeof posts;
  private _posts: typeof posts;

  constructor() {
    this._posts = posts.filter(p => p.permalink)
      .sort((a, b) => {
        if (a.permalink === '/') return -1;
        if (b.permalink === '/') return 1;
        if (a.permalink.startsWith('/about')) return 1;
        if (b.permalink.startsWith('/about')) return -1;
        return a.permalink.localeCompare(b.permalink);
      });
    this._pages = this._posts.filter(p => p.permalink.split("/").filter(s => s.length > 0).length < 2);
  }

  public getPages() {
    return this._pages;
  }

  public getPosts() {
    return this._posts;
  }
}
