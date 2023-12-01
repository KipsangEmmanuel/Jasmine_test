
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginService } from './login.service';
import { loginUser } from '../interfaces/login'; 
describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', fakeAsync(async () => {
    const mockUserLogin: loginUser = {
      email: 'testuser@example.com', 
      password: 'testpassword',
    };

    const mockToken = 'mock-token';
    const mockResponse = { token: mockToken };

    spyOn(window, 'fetch').and.returnValue(Promise.resolve({
      json: () => Promise.resolve(mockResponse),
    } as Response));

    let loginResponse: any;

    service.login(mockUserLogin).then((response) => {
      loginResponse = response;
    });

    tick();

    expect(loginResponse).toEqual(mockResponse);
    expect(localStorage.getItem('token')).toEqual(mockToken);

    const expectedUrl = 'http://localhost:8000/user/login';
    const expectedOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(mockUserLogin),
    };

    expect(window.fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
  }));
});
