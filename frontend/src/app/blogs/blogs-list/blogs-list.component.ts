import { Component, computed, inject, ViewChild } from '@angular/core';
import { Blog } from '../../shared/models/blog';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { BlogsAPIService } from '../../shared/services/APIs/blogs-api.service';
import { BlogsUtilsService } from '../../shared/services/utils/blogs-utils.service';
import { FormsModule } from '@angular/forms';
import { BlogFormComponent } from '../../shared/forms/blog-form/blog-form.component';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';

@Component({
  selector: 'app-blogs-list',
  imports: [ RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './blogs-list.component.html',
  styleUrl: './blogs-list.component.css'
})
export class BlogsListComponent {
  blogsService = inject(BlogsAPIService);
  authService = inject(AuthService);
  router = inject(Router);
  dailyPlanService = inject(DailyPlanApiService);
  userId = this.authService.userId;
  blogsUtils = inject(BlogsUtilsService);
  search = this.blogsUtils.searchCriteria;
  isSorted = this.blogsUtils.isSorted;
  @ViewChild(BlogFormComponent) blogForm!: BlogFormComponent; 
  blogID = this.blogsService.blogID;

  blogsList = computed(() => {
  const blogs = this.blogsService.blogsList.value() ?? [] as Blog[];
  return [...blogs].sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
});

  userBloglist = computed(()=> this.blogsUtils.filetredBlogList().filter(blog => blog.userID === this.userId()))

  filetredByDestination(destination:string){
    this.blogsUtils.selectedDestination.set(destination);
  }

  deleteBlog(id:number){
    this.blogID.set(id);    
    this.blogsService.deleteBlog(id).subscribe(()=> 
    this.blogsService.blogsList.reload());
    this.deleteDailyPlan();
  }

  getBlogByID(id:number){
    this.blogID.set(id);
    this.router.navigate(['/app-blog-editor'])
  }

  navigateToBlogDetails(id: number) {
    this.router.navigate(['/app-blog-details', id], { 
      queryParams: { from: 'app-blogs-list' } 
      
    });
  }

  resetCurrentID(){
    this.blogID.set(0)
  }

  deleteDailyPlan(){
    const dailyPlanToDelete = this.dailyPlanService.dailyPlanList.value()?.filter((item)=> item.blogID === this.blogID());
   
     dailyPlanToDelete?.forEach(element => { this.dailyPlanService.deleteDailyPlan(element.id!).subscribe(()=> 
    this.dailyPlanService.dailyPlanList.reload())  
    }); 
  }
}
