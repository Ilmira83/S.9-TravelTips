import { Component, computed, inject } from '@angular/core';
import { User } from '../../../shared/models/user';
import { Blog } from '../../../shared/models/blog';
import { BlogsAPIService } from '../../../shared/services/APIs/blogs-api.service';
import { UserApiService } from '../../../shared/services/APIs/user-api.service';
import { RouterLink } from '@angular/router';
import { BlogsUtilsService } from '../../../shared/services/utils/blogs-utils.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink,  FormsModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  blogsService = inject(BlogsAPIService);
  userService = inject(UserApiService);
  blogsUtils = inject(BlogsUtilsService);
  search = this.blogsUtils.searchCriteria;
  isSorted = this.blogsUtils.isSorted;
  isDateAsc:boolean = false;

  blogsList = computed(() => {
  const blogs = this.blogsService.blogsList.value() ?? [] as Blog[];
  return [...blogs].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

  userList = computed(() => this.userService.userList.value() ?? [] as User[]);

  filetredByDestination(destination:string){
/*     this.blogsUtils.selectedDestination.set(destination); */
    this.blogsUtils.filetredBlogList()
  }
  dateSorted =()=> {
    this.isDateAsc = !this.isDateAsc;
    this.isSorted.update(v => !v);
    this.blogsUtils.dateSorted();
  }
    


   
  

}
