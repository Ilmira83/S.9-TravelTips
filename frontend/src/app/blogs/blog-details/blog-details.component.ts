import { Component, computed, inject, model } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blog } from '../../shared/models/blog';
import { AuthService } from '../../core/services/auth/auth.service';
import { DailyPlanComponent } from "../../shared/daily-plan/daily-plan.component";
import { BlogsAPIService } from '../../shared/services/APIs/blogs-api.service';
import { UserApiService } from '../../shared/services/APIs/user-api.service';
import { User } from '../../shared/models/user';
import { BlogsUtilsService } from '../../shared/services/utils/blogs-utils.service';


@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, DailyPlanComponent],
  templateUrl: './blog-details.component.html',
  styles: `.section-divider {
              border: 0;
              height: 3px;
              width: 100%; 
              background-image: linear-gradient(to right, rgba(0,0,0,0), #0e2d45, rgba(0,0,0,0));
              margin: 20px 0;
            }`
})
export class BlogDetailsComponent {
  authService = inject(AuthService);
  userService = inject(UserApiService);
  blogService = inject(BlogsAPIService);
  blogsUtilsService = inject (BlogsUtilsService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  selectedBlog = model<Blog | undefined>(undefined);

  blogID = this.blogService.blogID;
  loggedIn = this.authService.loggedIn;  
  breadcrumbs: { label: string, url: string }[] = [];  
  userID = this.authService.userId;

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);
  currentUser = computed(() => this.userList()!.find((blogAuthor: User) => blogAuthor.fbUID === this.selectedBlog()?.userID));

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.blogID.set(params['id']);

    this.route.queryParams.subscribe(queryParams => {
      const from = queryParams['from'];
      this.generateBreadcrumbs(from); 
    });
  });
  this.getBlog(this.blogID())
}

  getBlog(id:number){
    this.blogID.set(id);
    this.blogService.getBlogByID(id).subscribe(response =>
      this.selectedBlog.set({
        id: response.id,
        userID:response.userID,
        title: response.title,
        destination: response.destination,
        country: response.country,
        city: response.city,
        description: response.description,
        travelers: response.travelers,
        costs: response.costs,
        month: response.month,
        year: response.year,
        nDays: response.nDays,
        image: response.image,
        updatedAt: response.updatedAt
     })
    );
  }

  generateBreadcrumbs(from: string) {
    const baseCrumbs = [
      { label: 'Home', url: '/' },
      { label: 'Blog details', url: `/app-blog-details/${this.blogID()}` }
    ];

    if(from === 'app-blogs'){
      this.breadcrumbs = [
      { label: 'Blogs', url: '/app-blogs' },
      { label: 'Blog details', url: `/app-blog-details/${this.blogID()}` }
    ];
    }

    else if (from === 'app-profile') {
      this.breadcrumbs = [
        { label: 'My profile', url: `/app-profile/${this.userID()}` },
        { label: 'My blogs', url: '/app-blogs-list' }, 
        { label: 'Blog details', url: `/app-blog-details/${this.blogID()}` }
      ];
    } 
    else if (from === 'app-blogs-list') {
      this.breadcrumbs = [
        { label: 'My profile', url: `/app-profile/${this.userID()}` },
        { label: 'My blogs', url: '/app-blogs-list' },
        { label: 'Blog details', url: `/app-blog-details/${this.blogID()}` }
      ];
    } 
    else {
      this.breadcrumbs = baseCrumbs;
    }
  }

}
