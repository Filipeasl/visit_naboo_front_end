import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  // Check if the user is authenticated (token exists)
  if (token) {
    return true; // Allow access to the route
  } else {
    // Redirect to login page
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false; // Block access to the route
  }
};
