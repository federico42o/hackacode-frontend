import { ElementRef } from "@angular/core";

export const  restrictionDate = (birthdate: ElementRef) => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1;
    let dd: string | number = today.getDate();
  
    if (mm < 10) {
      mm = '0' + mm;
    }
  
    if (dd < 10) {
      dd = '0' + dd;
    }
  
    const maxDate = yyyy + '-' + mm + '-' + dd;
    birthdate.nativeElement.setAttribute('max', maxDate);
  }