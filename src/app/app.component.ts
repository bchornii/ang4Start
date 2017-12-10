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
  courses2 = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'}
  ];

  onFavoriteChange(obj: FavoriteChangedEventArgs){
    console.log(obj.msg);
  }

  onAddCourse(){
    let newId = this.courses2[(this.courses2.length - 1)].id + 1;
    this.courses2.push({id: newId, name: 'course' + newId})
  }

  onRemoveCourse(course){
    let index = this.courses2.indexOf(course);
    this.courses2.splice(index, 1);
  }
}
