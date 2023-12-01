// import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { UserService } from './user.service';
// import { UserDetails } from '../interfaces/user';

// describe('UserService', () => {
//   let service: UserService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [UserService],
//     });

//     service = TestBed.inject(UserService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should fetch user details and return the role', fakeAsync(() => {
//     const mockResponse = { info: { role: 'admin' } };
//     let role: string | undefined;

//     service.checkDetails().then((result) => {
//       role = result;
//     });

//     const req = httpTestingController.expectOne('http://localhost:8000/user/check_user_details');
//     expect(req.request.method).toEqual('GET');

//     req.flush(mockResponse);

//     tick();

//     expect(role).toEqual('admin');
//   }));

//   it('should get users', () => {
//     const mockUsers: UserDetails[] = [
//       { id: 1, name: 'User 1', email: 'user1@example.com' },
//       { id: 2, name: 'User 2', email: 'user2@example.com' },
//     ];

//     service.getUsers().subscribe((users) => {
//       expect(users).toEqual(mockUsers);
//     });

//     const req = httpTestingController.expectOne('http://localhost:8000/user');
//     expect(req.request.method).toEqual('GET');

//     req.flush(mockUsers);
//   });
// });
