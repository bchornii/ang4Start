import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import { 
  tap, 
  debounceTime, 
  distinctUntilChanged, 
  switchMap 
} from 'rxjs/operators'
import { Input } from '@angular/core';

@Component({
  selector: 'name-search',
  templateUrl: './name-search.component.html'
})
export class NameSearchComponent implements OnInit {  
  private searchTerms = new Subject<string>();
  names$: Observable<string[]>;

  @Input('names') names: string[];

  constructor() { }

  ngOnInit() {
    this.names$ = this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this.getNames(term)),
      tap(x => console.log(x))
    );
  }

  search(text: string): void {
    this.searchTerms.next(text);
  }

  private getNames(term: string): Observable<string[]>{
    if(!term.trim()){
      return of([]);
    }
    return new Observable(s => {
      setTimeout(() => {        
        let names = this.names.filter(n => n.startsWith(term));
        s.next(names);
      }, 1000);
    });
  }
}
