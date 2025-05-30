import { Component, inject, model, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Blog } from '../../shared/models/blog';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BlogFormComponent } from "../../shared/forms/blog-form/blog-form.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { DailyPlanFormComponent } from "../../shared/forms/daily-plan-form/daily-plan-form.component";
import { UserApiService } from '../../shared/services/APIs/user-api.service';
import { BlogsAPIService } from '../../shared/services/APIs/blogs-api.service';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';
import { DailyPlan } from '../../shared/models/daily-plan';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-editor',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, BlogFormComponent, DailyPlanFormComponent],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css'
})
export class BlogEditorComponent {
  @ViewChild(BlogFormComponent) blogForm!: BlogFormComponent; 
  @ViewChild(DailyPlanFormComponent) dailyPlanForm!: DailyPlanFormComponent;
  
  dailyPlanService = inject(DailyPlanApiService);
  blogsService = inject(BlogsAPIService);    
  toastrservice = inject(ToastrService);
  userService = inject(UserApiService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  imageData = signal<string>('');  
  isFormValid = model<boolean>(false);

  blogID = this.blogsService.blogID;
  userId = this.authService.userId;

    
  setImageData(data: string){
    this.imageData.set(data);
  }

  addBlog() {
    const blogData = this.blogForm.onSubmit();
    if(!this.isFormValid()){ this.toastrservice.warning('Please complete all the fields with asteriscs(*).',
       'Warn', {closeButton: true, positionClass: 'toast-bottom-right'});
    return;}
    if(!blogData) return;

    const blog: Blog = {
      userID: this.userId(),
      title: blogData.title,
      destination: blogData.destination,
      country: blogData.country,
      city: blogData.city,
      description: blogData.description,
      travelers: blogData.travelers,
      costs: blogData.costs,
      month: blogData.month,
      year: blogData.year,
      nDays: blogData.nDays,
      image: this.imageData(),
    };
    this.blogsService.addBlog(blog).subscribe({
      next: (createdBlog) => {
        this.blogID.set(createdBlog.id!);
        this.addDailyPlan();
        this.blogsService.blogsList.reload();
        this.router.navigate(['app-blogs-list'])
      }
    }); 
  } 

  ngOnInit() {
    if(this.blogID()){
      this.getBlogByID(this.blogID());
      this.getDailyPlanByBlogID()
    }
  }

  getBlogByID(id:number){
    this.blogsService.getBlogByID(id).subscribe({
      next: (response: Blog) => {
        this.blogForm.get('country')?.setValue(response.country);
         const fakeEvent = {
        target: { value: response.country }
      } as unknown as Event;  

      this.blogForm.onCountryChange(fakeEvent);  
    setTimeout(() => {
      this.blogForm.setValue({
        title: response.title,
        destination: response.destination,
        city: response.city,
        description: response.description,
        travelers: response.travelers,
        month: response.month,
        year: response.year,
        nDays: response.nDays,
     });
    }, 100 );
  }
    }); 
  }

  updateBlog(){
    const blogData = this.blogForm.onSubmit();
    if(!blogData) return;
    const blog: Partial<Blog> = {
      title: blogData.title,
      destination: blogData.destination,
      country: blogData.country,
      city: blogData.city,
      description: blogData.description,
      travelers: blogData.travelers,
      costs: blogData.costs,
      month: blogData.month,
      year: blogData.year,
      nDays: blogData.nDays,

    }
    this.blogsService.updateBlog(this.blogID()!, blog).subscribe({
      next: () => {  
        this.updateDailyPlansByBlogID();    
        this.blogsService.blogsList.reload();        
        this.router.navigate(['/app-blogs-list'])
        this.blogForm.resetForm()
      }
    });
  }

  addDailyPlan(){
    this.dailyPlanForm.onSubmitDailyPlan();  
    const dailyPlanData = this.dailyPlanForm.dailyPlanData();
    if(!dailyPlanData) return;
    this.dailyPlanService.addDailyPlan(dailyPlanData).subscribe({
      next: () => {
        this.dailyPlanService.dailyPlanList.reload();
      }
    }); 
  }

  getDailyPlanByBlogID(){
    this.dailyPlanService.getDailyPlansByBlogID(this.blogID()).subscribe((response: DailyPlan[]) =>
      this.dailyPlanForm.setValue(response)  
    ); 
  }

  updateDailyPlansByBlogID(){
    this.dailyPlanForm.onSubmitDailyPlan();
    const dailyPlanData = this.dailyPlanForm.dailyPlanData();
     if(!dailyPlanData) return;
    this.dailyPlanService.updateDailyPlansByBlogID(this.blogID(), dailyPlanData).subscribe({
        next: () => {
          this.dailyPlanService.dailyPlanList.reload();
        }
      }); 
  }
}


