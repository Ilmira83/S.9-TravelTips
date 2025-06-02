/* import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingHarness} from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter, RouterLink } from '@angular/router';
import { BlogsListComponent } from '../../blogs/blogs-list/blogs-list.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../shared/models/user';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profilepage:any
  let harness: RouterTestingHarness
  let mockAuthService: any;


  beforeEach(async () => {
  mockAuthService = {
    userId: signal('testUID')
  };
    await TestBed.configureTestingModule({
      imports: [ProfileComponent, ToastrModule.forRoot() ],
      providers: [provideHttpClientTesting(), provideHttpClient() , { provide: AuthService, useValue: mockAuthService },
         provideRouter([
          {
            path: '', component: ProfileComponent
          },
          {
            path:'app-blogs-list', component: BlogsListComponent
          }
        ])
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    profilepage = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', ProfileComponent)



    component.userList   = signal<User[]>([
      {
        id: 1,
        fbUID: 'testFBUID',
        username: 'Test User', 
        userPhoto: 'test.jpg' 
      }      
        ]
    ); 


  fixture.detectChanges(); 
  await fixture.whenStable(); 

  }); */

/*   it('should have correct site-navigation items', (() => {  */

/*   const linkElements  = fixture.debugElement.queryAll(By.css('[test-id="my-router-link"]'));
  const routerLinks  = linkElements .map(it => it.attributes['ng-reflect-router-link']);


 expect(routerLinks).toContain('/app-blogs-list'); */
/*   expect(routerLinks.length).toBe(2); */
/*   expect(routerLinks[0].routerLink).toBe("/app-blogs-list"); */


/*   }));
}); */


