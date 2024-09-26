import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup): any {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  passwordsDoNotMatch(): boolean {
    return this.signupForm.hasError('mismatch') && !!this.signupForm.get('confirmPassword')?.touched;
  }

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;
      const visitNabooDomainRegex = /^[a-zA-Z0-9._%+-]+@visitnaboo\.com$/i;
      const role = visitNabooDomainRegex.test(email) ? "ADMIN" : "STANDARD";

      try {
        const response = await this.authService.register({ login: email, password, role });
        console.log('Signup successful:', response);

        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  }
}
