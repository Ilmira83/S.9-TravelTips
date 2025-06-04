import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingHarness} from '@angular/router/testing';
import { ProfileComponent } from './profile.component';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { BlogsListComponent } from '../../blogs/blogs-list/blogs-list.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { computed, signal } from '@angular/core';
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
            path: 'app-blogs-list', component: BlogsListComponent 
          }
        ]) 
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    profilepage = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
  


component['userList'] = signal<User[]>([
  { id: 1, fbUID: 'testFBUID', username: 'Test User', userPhoto: 'test.jpg' }
]);
component['userId'] = signal('testFBUID');
component['currentUser'] = computed(() => component['userList']().find(u => u.fbUID === component['userId']()));



  fixture.detectChanges(); 
  await fixture.whenStable(); 
  
    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', ProfileComponent)

  }); 

  it('should have correct site-navigation items', (() => {  

  const linkElements  = fixture.debugElement.queryAll(By.css('[test-id="my-router-link"]'));
 
  expect(linkElements.length).toBe(6); 

  }));
  it('should have correct routerlink items', (() => {  

  const linkElements  = fixture.debugElement.queryAll(By.css('[test-id="my-router-link"]'));
  const routerLinks  = linkElements .map(it => it.attributes['ng-reflect-router-link']); 

  expect(routerLinks[0]).toContain("/app-blogs-list"); 
  expect(routerLinks[1]).toContain("/app-plan-list"); 

  }));
  it('when click My Blogs link, should navigate to blog-list page', waitForAsync(async() => {

    const linkItem = harness.routeDebugElement?.query(By.css('[test-id="my-router-link"]'));
    linkItem!.triggerEventHandler('click', {button: 0});
  
    await fixture.whenStable();

    expect(TestBed.inject(Router).url.startsWith('/app-blogs-list')).toBeTrue()
  }));

}); 


