import { Component, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.css']
})
export class PasswordCheckComponent {
  @Input() password!: string;
  passwordStrength!: PasswordStrength | null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['password']) {
      this.checkPassword();
    }
  }

  checkPassword() {
    const passwordLength = this.password.length;

    if (passwordLength < 5) {
      this.passwordStrength = {
        strength: 'weak',
        color: 'bg-red',
        width: 'w-3/12',
        message: 'Contraseña débil'
      };
    } else if (passwordLength >= 5 && passwordLength < 8) {
      this.passwordStrength = {
        strength: 'safe',
        color: 'bg-yellow-200',
        width: 'w-1/2',
        message: 'Contraseña segura'
      };
    } else if (passwordLength >= 8) {
      this.passwordStrength = {
        strength: 'good',
        color: 'bg-green-400',
        width: 'w-full',
        message: 'Contraseña fuerte'
      };
    } else {
      this.passwordStrength = null;
    }
  }

  getStrengthClass() {
    if (this.password && this.passwordStrength) {
      return this.passwordStrength.color + ' ' + this.passwordStrength.width;
    } else {
      return '';
    }
  }
}


interface PasswordStrength {
  strength: string;
  color: string;
  width: string;
  message: string;
}