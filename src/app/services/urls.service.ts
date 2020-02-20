import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class UrlService {
  private image: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public image$: Observable<string> = this.image.asObservable();

  constructor() { }

  updateUrlList(newImage: string) {
    this.image.next(newImage);
  }
}
