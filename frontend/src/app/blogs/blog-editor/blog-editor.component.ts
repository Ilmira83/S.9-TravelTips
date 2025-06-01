import { Component, inject, model, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { DailyPlanFormComponent } from "../../shared/forms/daily-plan-form/daily-plan-form.component";
import { UserApiService } from '../../shared/services/APIs/user-api.service';
import { BlogsAPIService } from '../../shared/services/APIs/blogs-api.service';
import { DailyPlanApiService } from '../../shared/services/APIs/dailyPlan-api.service';
import { DailyPlan } from '../../shared/models/daily-plan';
import { ToastrService } from 'ngx-toastr';
import { EditFormComponent } from "../../shared/forms/edit-form/edit-form.component";
import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-blog-editor',
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, DailyPlanFormComponent, EditFormComponent],
  templateUrl: './blog-editor.component.html',
  styleUrl: './blog-editor.component.css'
})
export class BlogEditorComponent {
  @ViewChild(EditFormComponent) editForm!: EditFormComponent; 
  @ViewChild(DailyPlanFormComponent) dailyPlanForm!: DailyPlanFormComponent;
  
  dailyPlanService = inject(DailyPlanApiService);
  blogsService = inject(BlogsAPIService);    
  toastrservice = inject(ToastrService);
  userService = inject(UserApiService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  imageData = model<string>('');  
  isFormValid = model<boolean>(false);

  blogID = this.blogsService.blogID;
  userId = this.authService.userId;

    
  setImageData(data: string){
    this.imageData.set(data);
  }

  addBlog() {
    const blogData = this.editForm.onSubmit();

    if(!blogData) { this.toastrservice.warning('Please complete all the fields with asteriscs(*).',
       'Warn', {closeButton: true, positionClass: 'toast-bottom-right'});
    return};   

    const blog: Post = {
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
        if(!this.addDailyPlan()) return;
        this.toastrservice.info(`Blog ${createdBlog.title} was  created.`,
        'Info', { closeButton: true, positionClass: 'toast-bottom-right' } );
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
      next: (response: Post) => {
        this.editForm.get('country')?.setValue(response.country);
         const fakeEvent = {
        target: { value: response.country }
      } as unknown as Event;  

      this.editForm.onCountryChange(fakeEvent);  
    setTimeout(() => {
      this.editForm.setValue({
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
    const blogData = this.editForm.onSubmit();
    if(!blogData) return;
    const blog: Partial<Post> = {
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
        this.toastrservice.info(`Blog ${blog.title} was  updated.`,
        'Info', { closeButton: true, positionClass: 'toast-bottom-right' } );  
        this.blogsService.blogsList.reload();        
        this.router.navigate(['/app-blogs-list'])
        this.editForm.resetForm()
      }
    });
  }

  addDailyPlan(){
    const dailyPlanData = this.dailyPlanForm.onSubmitDailyPlan();
    if(!dailyPlanData) return false;

    this.dailyPlanService.addDailyPlan(dailyPlanData).subscribe({
      next: () => {
        this.dailyPlanService.dailyPlanList.reload();
      }
    }); 
    return true;
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


