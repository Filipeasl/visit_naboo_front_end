import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]  // Add CommonModule here
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      try {
        // Ajuste o nome do campo para "login" em vez de "username"
        const response = await this.authService.login({ login: email, password }); // Pass email as login
        localStorage.setItem('token', response.token); // Caso a resposta esteja em response.data
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
  
}
