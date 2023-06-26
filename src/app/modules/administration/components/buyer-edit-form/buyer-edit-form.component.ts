import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buyer-edit-form',
  templateUrl: './buyer-edit-form.component.html',
  styleUrls: ['./buyer-edit-form.component.css']
})
export class BuyerEditFormComponent {

  buyerForm!: FormGroup;

  onSubmit():void{};

}
