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
  courses = [1, 2, 3];
  viewMode = 'map';

  onFavoriteChange(obj: FavoriteChangedEventArgs){
    console.log(obj.msg);
  }
}
