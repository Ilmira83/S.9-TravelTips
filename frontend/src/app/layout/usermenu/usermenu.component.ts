import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../shared/models/user';
import { UserApiService } from '../../shared/services/APIs/user-api.service';

@Component({
  selector: 'app-usermenu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './usermenu.component.html',
  styleUrl: './usermenu.component.css'
})
export class UsermenuComponent {
  authService = inject(AuthService);
  userService = inject(UserApiService);
  userId = this.authService.userId;

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);

  currentUser = computed(() => this.userList()!.find((authUser: User) => authUser.fbUID === this.userId())
  );

  logOut(){
    this.authService.logOut()!
  }
}
