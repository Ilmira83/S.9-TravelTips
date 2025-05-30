/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingHarness} from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginpage:any
  let harness: RouterTestingHarness

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ToastrModule.forRoot()],
      providers: [
        provideRouter([
          {
            path: 'app-login', component: LoginComponent
          },

        ])
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 */