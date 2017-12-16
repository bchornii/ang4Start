import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  isChecked: boolean;

  constructor() { }

  ngOnInit() {
  }

  log(el){
    console.log(el);
  }

  onSubmit(f){
    console.log(f)
  }

}
