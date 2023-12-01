import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user details', (done) => {
    const mockToken = 'mock-token';
    localStorage.setItem('token', mockToken);

    const mockResponse = { info: { role: 'admin' } };

    service.checkDetails().then((role) => {
      expect(role).toEqual('admin');
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:8000/user/check_user_details');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('token')).toBe(mockToken);

    req.flush(mockResponse);
  });

  it('should get users', (done) => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:8000/user');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
