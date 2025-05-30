import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { UsermenuComponent } from './usermenu.component';
import { signal } from '@angular/core';
import { User } from '../../shared/models/user';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router, RouterLink } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth/auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('UsermenuComponent', () => {
  let component: UsermenuComponent;
  let fixture: ComponentFixture<UsermenuComponent>;
  let usermenupage: any;
  let harness: RouterTestingHarness;
  let mockAuthService: any;

  beforeEach(async () => {
    mockAuthService = {
      userId: signal('testUID'),
      logOut: jasmine.createSpy('logOut')
    };
    await TestBed.configureTestingModule({
      imports: [UsermenuComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: AuthService, useValue: mockAuthService },
        provideRouter([
          {
            path: '',
            component: UsermenuComponent,
          },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', UsermenuComponent);

    component.currentUser = signal<User>(
      {
        id: 1,
        fbUID: 'testFBUID',
        username: 'Test User',
        userPhoto: 'test.jpg',
      },
    );

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should have correct site-navigation items', () => {
    const linkItems = fixture.debugElement.queryAll(By.directive(RouterLink));
   
    expect(linkItems.length).toBe(3);

  });

  it('when opens drop-down menu', () => {

  const dropdownMenu = fixture.debugElement.query(By.css('.dropdown-menu'));
  const dropDownLinks = dropdownMenu.queryAll(By.directive(RouterLink));
  const dropDownLinkItems = dropDownLinks.map(it => it.injector.get(RouterLink));

  expect(dropDownLinks).toBeTruthy();

  expect(dropDownLinkItems[0].href).toBe("/app-profile/testUID");
  expect(dropDownLinkItems[1].href).toBe("/app-blogs-list");
  expect(dropDownLinkItems[2].href).toBe("/app-plan-list");

  });

  it('when click Logout button', fakeAsync(() => {
  const dropDownBtn = harness.routeDebugElement?.query(By.css('[test-id = "logout-button"]'));
  dropDownBtn!.triggerEventHandler('click', {button: 0});

   tick();
 expect(mockAuthService.logOut).toHaveBeenCalled();  
  expect(TestBed.inject(Router).url).toBe('/')
 
  }));


});