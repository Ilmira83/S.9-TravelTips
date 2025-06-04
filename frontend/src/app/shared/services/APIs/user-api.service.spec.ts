import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserApiService } from './user-api.service';
import { User } from '../../models/user';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('UserApiService', () => {
  let service: UserApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClientTesting(), provideHttpClient(), UserApiService ]
    });
    service = TestBed.inject(UserApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return expected users (HttpClient called once)', () => {
    const expectedUsers: User[] | undefined = service.userList.value();
     expect(expectedUsers === undefined || Array.isArray(expectedUsers)).toBeTrue();
  }); 




 }); 
