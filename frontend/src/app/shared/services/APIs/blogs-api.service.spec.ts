import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { BlogsAPIService } from './blogs-api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';


describe('BlogsAPIService', () => {
  let service: BlogsAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClientTesting(), provideHttpClient(), BlogsAPIService ]
    });
    service = TestBed.inject(BlogsAPIService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    // check if !unresolved req.
    httpMock.verify();
  });

  it('should return an array', () => {
    const data = service.blogsList.value();
    expect(data === undefined || Array.isArray(data)).toBeTrue();
    
  });
 

});
