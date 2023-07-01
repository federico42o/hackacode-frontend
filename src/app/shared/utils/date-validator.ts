import { FormControl, ValidationErrors } from '@angular/forms';

export class DateValidator {

   static isAfter(control: FormControl): ValidationErrors | null {
        let today : Date = new Date();

       if (new Date(control.value) > today)
           return { "isAfter": true };

       return null;
   }
}