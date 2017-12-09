import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite-component',
  templateUrl: './favorite-component.component.html'
})
export class FavoriteComponentComponent implements OnInit {
  @Input('is-favorite') isFavorite: boolean;
  @Output() changed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClick(){
    this.isFavorite = !this.isFavorite;
    this.changed.emit({msg: 'Hi from favorite!'});
  }
}

export interface FavoriteChangedEventArgs {
  msg: string
}
