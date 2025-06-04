import { computed, inject, Injectable, signal } from '@angular/core';
import { BlogsAPIService } from '../APIs/blogs-api.service';
import { Blog } from '../../models/blog';
import { PlanApiService } from '../APIs/plan-api.service';
import { Plan } from '../../models/plan';

@Injectable({
  providedIn: 'root'
})
export class BlogsUtilsService {
  blogService = inject(BlogsAPIService);
  selectedDestination = signal('');
  searchCriteria = signal('')
  isSorted = signal<boolean>(false);
  planService = inject(PlanApiService)


/*   destinations: string[] = ['', 'Africa', 'America', 'Asia', 'Europe', 'Oceania']; */
  months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('en-US', { month: 'long' })
    );
  years = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() -10 + i);
  travelers = Array.from({ length: 100 }, (_, i) => 1 + i);
  days = Array.from({ length: 100 }, (_, i) => 1 + i);

  blogsList = computed(() => this.blogService.blogsList.value() ?? [] as Blog[]);

  planList = computed(()=> this.planService.plansList.value() ?? [] as Plan[]);
   
  
  filetredBlogList = computed(() => {
    let result = this.blogsList()
/*     if(this.selectedDestination()){
     result = this.blogsList().filter(blog => blog.country.includes(this.selectedDestination().trim()) )
    } */
    if(this.searchCriteria()){
      result = this.blogsList().filter((blog) => 
/*       blog.destination.toLowerCase().includes(this.searchCriteria().toLowerCase()) || */
      blog.title.toLowerCase().includes(this.searchCriteria().toLowerCase()) ||
      blog.country.toLowerCase().includes(this.searchCriteria().toLowerCase()) ||
      blog.year.toLowerCase().includes(this.searchCriteria().toLowerCase()) 
    )}
    return result;
  })

  dateSorted = ()=>{  this.filetredBlogList().sort((a, b) => {
    if(this.isSorted()){
      let x = a.createdAt?.toLowerCase();
      let y = b.createdAt?.toLowerCase();
      if (x! > y!) {return -1;}
      if (x! < y!) {return 1;}
      return 0;
    } else {
      let x = a.createdAt?.toLowerCase();
      let y = b.createdAt?.toLowerCase();
      if (x! < y!) {return -1;}
      if (x! > y!) {return 1;}
      return 0;
    }
  })
  };


    filetredPlanList = computed(() => {
      let result = this.planList()
      if(this.selectedDestination()){
      result = this.planList().filter(plan => plan.country.includes(this.selectedDestination().trim()) )
      }
      if(this.searchCriteria()){
        result = this.planList().filter((plan) => 
/*         plan.destination.toLowerCase().includes(this.searchCriteria().toLowerCase()) || */
        plan.title.toLowerCase().includes(this.searchCriteria().toLowerCase()) ||
        plan.country.toLowerCase().includes(this.searchCriteria().toLowerCase()) ||
        plan.year.toLowerCase().includes(this.searchCriteria().toLowerCase()) 
      )}
      return result;
  })

     
  




}
