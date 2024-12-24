import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from './localstorage.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageService = inject(LocalStorageService);

  // Retrieve authentication status from localStorage
  const isAuthenticated = localStorageService.getItem('token');

  if (isAuthenticated === 'true') {
    return true;
  }

  // Redirect to login page if not authenticated
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};