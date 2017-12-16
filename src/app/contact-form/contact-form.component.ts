import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  isChecked: boolean;
  contactMethods = [
    {id: 1, name: 'Email'},
    {id: 2, name: 'Phone'}
  ];

  constructor() {
  }

  ngOnInit() {

  }

  log(el){
    console.log(el);
  }

  onSubmit(f, $event){
    $event.preventDefault();
    let formInputControls = f.controls;
    let select = formInputControls.contactMethod.value > 0
      ? formInputControls.contactMethod.value
      : 0;
    console.log('select = ' + select)
    console.log(f)
  }

}
