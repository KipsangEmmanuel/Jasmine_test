import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserDetails } from '../interfaces/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user', inject(
    [HttpTestingController, AuthService],
    (httpMock: HttpTestingController, authService: AuthService) => {
      const mockUser: UserDetails = {
        username: 'testuser',
        password: 'testpassword',
        _id: '',
        email: '',
        role: ''
      };

      authService.createUser(mockUser).subscribe();

      const req = httpMock.expectOne('http://localhost:8000/user/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockUser);

      req.flush({}); // You can customize the response if needed
    }
  ));

  it('should handle errors during user registration', inject(
    [HttpTestingController, AuthService],
    (httpMock: HttpTestingController, authService: AuthService) => {
      const mockUser: UserDetails = {
        username: 'testuser',
        password: 'testpassword',
        _id: '',
        email: '',
        role: ''
      };

      authService.createUser(mockUser).subscribe(
        () => fail('should have failed with the 404 error'),
        (error: { status: any; }) => {
          expect(error.status).toBe(404);
        }
      );

      const req = httpMock.expectOne('http://localhost:8000/user/register');
      req.flush('Invalid request parameters', { status: 404, statusText: 'Not Found' });
    }
  ));
});

