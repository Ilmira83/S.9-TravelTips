import { Component, computed, inject } from '@angular/core';
import { Blog } from '../shared/models/blog';
import { RouterLink } from '@angular/router';
import { BlogsAPIService } from '../shared/services/APIs/blogs-api.service';
import { User } from '../shared/models/user';
import { UserApiService } from '../shared/services/APIs/user-api.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogsService = inject(BlogsAPIService);
  userService = inject(UserApiService);

  
  blogsList = computed(() => {
  const blogs = this.blogsService.blogsList.value() ?? [] as Blog[];
  return [...blogs].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);

}
