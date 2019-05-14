import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { PageService } from './page.service';
import { PageTitleService } from '../page-title/page-title.service';
import { isEqual } from 'lodash';

import Remarkable from 'remarkable';
const md = new Remarkable('full', {
  breaks: true,
  langPrefix: 'language-',
  linkify: true,
  typographer: true
});

@Component({
  selector: 'page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements OnInit, AfterViewInit {

  private pagePath = '';
  public pageContent = '';

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private titleService: PageTitleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.url.subscribe((urls: UrlSegment[]) => {
      this.pagePath = '/';
      const paths = urls.map(url => url.path);
      const data = this.pageService.getPosts().find(d =>
        isEqual(d.permalink.split('/').filter(s => s.length > 0), paths)
      );
      let markdown = data.markdown;
      markdown = markdown.replace(/{{ site.baseurl }}{% link /gi, '/');
      markdown = markdown.replace(/.md %}/gi, '');
      this.pageContent = md.render(markdown);
      this.titleService.title = data.title;
    });
  }

  ngAfterViewInit() {
    const markdownSection = document.getElementById('markdown_section');
    const anchors = markdownSection.getElementsByTagName('a');
    const head = new RegExp(/^.+:/);
    Array.from(anchors).forEach(a => {
      if (a.href && a.href.length > 0 && !head.test(a.getAttribute('href'))) {
        a.addEventListener('click', this.onMarkdownLinkClicked.bind(this));
      }
    });
  }

  public onMarkdownLinkClicked(e: MouseEvent): boolean {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const anchor = event.target as HTMLAnchorElement;
    this.router.navigateByUrl(anchor.getAttribute('href'));
    return false;
  }
}
