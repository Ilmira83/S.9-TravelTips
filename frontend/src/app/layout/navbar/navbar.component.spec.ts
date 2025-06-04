import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let navbarpage:any
  let harness: RouterTestingHarness

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, ToastrModule.forRoot()],
      providers:[
        provideRouter([
          {
            path: '', component: NavbarComponent
          },
        ])
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    navbarpage = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/', NavbarComponent)
  });

  it('should have correct site-navigation items', () => {

    const navItems = fixture.debugElement.queryAll(By.directive(RouterLink));


    expect(navItems.length).toBe(3);


  });
  it('should have correct routerlink items', () => {

    const linkItems = fixture.debugElement.queryAll(By.directive(RouterLink));
    const links = linkItems.map(it => it.injector.get(RouterLink));

    expect(links[0].href).toBe("/");
    expect(links[1].href).toBe("/app-blogs");
    expect(links[2].href).toBe("/app-about");


  });


});
