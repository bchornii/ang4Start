import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from './favorite-component/favorite-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  post = {
    isFavorite: true
  };

  onFavoriteChange(obj: FavoriteChangedEventArgs){
    console.log(obj.msg);
  }
}
