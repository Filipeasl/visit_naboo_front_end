import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080';

  constructor() { }

  // Method to check if the user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const response = await axios.get(`${this.apiUrl}/auth/is-authenticated`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // If the backend response indicates success, the user is authenticated
      return response.status === 200;
    } catch (error) {
      // If an error occurs, assume the token is invalid or expired
      console.error('Token validation failed:', error);
      localStorage.removeItem('token'); // Remove the token if it's invalid
      return false;
    }
  }

  async login(credentials: { login: string, password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/login`, credentials);
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error.response || error);
      throw error;
    }
  }
  
  async register(user: { login: string, password: string, role: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/auth/register`, user);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }

  async logout(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${this.apiUrl}/auth/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      localStorage.removeItem('token');
    } catch (error: any) {
      console.error('Logout failed:', error.response || error);
      throw error;
    }
  }
}
