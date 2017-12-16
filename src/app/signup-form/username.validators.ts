import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators{
  static cannotContainSpace(c: AbstractControl): ValidationErrors | null{
    if((c.value as string).indexOf(' ') >= 0){
      return {
        cannotContainSpace: true
      }
    }
    return null;
  }
}
