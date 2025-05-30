import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../shared/models/user';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserApiService } from '../../shared/services/APIs/user-api.service';
import { BlogsAPIService } from '../../shared/services/APIs/blogs-api.service';
import { Blog } from '../../shared/models/blog';
import { PlanApiService } from '../../shared/services/APIs/plan-api.service';
import { Plan } from '../../shared/models/plan';


@Component({
  selector: 'app-profile',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  blogsService = inject(BlogsAPIService);
  userService = inject(UserApiService);
  authService = inject(AuthService);
  planService = inject(PlanApiService);
  route = inject(ActivatedRoute);
  userId = this.authService.userId;
  router = inject(Router);

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);
  currentUser = computed(() => this.userList()!.find((authUser: User) => authUser.fbUID === this.userId()));
  
  blogsList = computed(() => this.blogsService.blogsList.value() ?? [] as Blog[]);
  userBloglist = computed(()=> this.blogsList().filter(blog => blog.userID === this.userId()));

  plansList = computed(() => this.planService.plansList.value() ?? [] as Plan[]);
  userPlanlist = computed(()=> this.plansList().filter(plan => plan.userID === this.userId()));


  deleteAccount(id:number){
    this.userService.deleteUser(id).subscribe(()=>
      this.userService.userList.reload())
  }

  navigateToBlogDetails(id: number) {
  this.router.navigate(['/app-blog-details', id], { 
    queryParams: { from: 'app-blogs-list' } 
  });
}
  navigateToPlanDetails(id: number) {
  this.router.navigate(['/app-plan-details', id], { 
    queryParams: { from: 'app-plan-list' } 
  });
}

  logOut(){
    this.authService.logOut()!
  }

}
