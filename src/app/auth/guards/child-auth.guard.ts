import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const ChildAuthGuard: CanActivateChildFn = () => {
  const authService = inject( AuthService );
  const router = inject( Router );

  if (!authService.chechAuthentication) {
          router.navigate(['/auth/login']);
          return false;
        }
        return true;
}
