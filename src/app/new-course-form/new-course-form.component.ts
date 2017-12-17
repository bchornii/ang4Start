import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html'
})
export class NewCourseFormComponent {
  form = new FormGroup({
    topics: new FormArray([])
  });

  addTopic(topic: HTMLInputElement){
    let topics = this.topics;
    let newTopic = this.getNewTopic(topic);
    topics.push(newTopic);
    topic.value = '';
  }

  removeTopic(topic: FormControl){
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  get topics(){
    return this.form.get('topics') as FormArray;
  }

  private getNewTopic(topic: HTMLInputElement){
    return new FormControl(topic.value);
  }
}
