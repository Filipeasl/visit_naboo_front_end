import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('authGuard', () => {
  let mockRouter: Router;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule], // Import the RouterTestingModule
    });
    mockRouter = TestBed.inject(Router);

    // Mock the navigate method
    spyOn(mockRouter, 'navigate').and.returnValue(Promise.resolve(true));
  });

  it('should allow access if token exists', () => {
    // Mock the localStorage getItem method to return a token
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    
    // Expect the guard to return true
    expect(executeGuard({} as any, {} as any)).toBe(true);
  });

  it('should deny access and redirect to login if token does not exist', () => {
    // Mock the localStorage getItem method to return null
    spyOn(localStorage, 'getItem').and.returnValue(null);
    
    // Expect the guard to return false
    expect(executeGuard({} as any, {} as any)).toBe(false);

    // Expect the router to navigate to the login page
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: undefined } });
  });
});
