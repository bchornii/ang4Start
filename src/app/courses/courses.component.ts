import { Component } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'courses',
  template: `
    {{text | summary:10:true }}
  `
})
export class CoursesComponent {
  text = 'Some veryyyyyyyyyyyy looooooooooooooong teexxxxxxxxttttttttttttttttt';
}
