import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  private _title = 'Lacerta';

  public updateTitle = new Subject<string>();

  constructor() {
    this.updateTitle.subscribe(newTitle => this._title = newTitle);
  }

  set title(newTitle: string) {
    this.updateTitle.next(newTitle);
  }

  get title() {
    return this._title;
  }

}
