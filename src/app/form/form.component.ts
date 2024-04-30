import { CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators,ReactiveFormsModule, AbstractControl, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
   integerRegex = /^\d+$/;
   emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


   signupForm = new FormGroup({
    Fname : new FormControl ('',[Validators.required, Validators.maxLength(32)]),
    email : new FormControl ('',[Validators.required, Validators.maxLength(32),Validators.pattern(this.emailRegex)]),
    Password : new FormControl ('',[Validators.required, Validators.maxLength(32),this.passwordValidator()]),
    confirm : new FormControl ('',[Validators.required, Validators.maxLength(32),this.passwordValidator()]),


  })
  passwordValidator(): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value || '';
      const hasNumber = /\d/.test(value);
      const hasUpper = /[A-Z]/.test(value);
      const hasLower = /[a-z]/.test(value);

      const valid = hasNumber && hasUpper && hasLower && value.length <= 8;

      return valid ? null : { invalidPassword: true };
    };
  }

  getControl(name : any): AbstractControl | null {
      return this.signupForm.get(name)
  }

  signup(){
   console.log(this.signupForm.value);
   
  }
}
