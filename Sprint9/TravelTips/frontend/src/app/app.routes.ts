import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // основной layout с <router-outlet>
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./home/home.component');
          return m.HomeComponent;
        },
      },
      {
        path: 'app-profile/:uid',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./user/profile/profile.component');
          return m.ProfileComponent;
        },
      },
      {
        path: 'app-blogs-list',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./blogs/blogs-list/blogs-list.component');
          return m.BlogsListComponent;
        },
      },
      {
        path: 'app-about',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./about/about.component');
          return m.AboutComponent;
        },
      }, 
      {
        path: 'app-blog-editor',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./blogs/blog-editor/blog-editor.component');
          return m.BlogEditorComponent;
        },
      },
      {
        path: 'app-blog-details/:id',
        data: { breadcrumb: 'Blog details' },
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./blogs/blog-details/blog-details.component');
          return m.BlogDetailsComponent;
        },
      },
      {
        path: 'app-blogs',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./blogs/pages/blogs/blogs.component');
          return m.BlogsComponent;
        },
      },
      {
        path: 'app-plan-list',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./plan/plan-list/plan-list.component');
          return m.PlanListComponent;
        },
      },
      {
        path: 'app-plan-editor',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./plan/plan-editor/plan-editor.component');
          return m.PlanEditorComponent;
        },
      },
      {
        path: 'app-plan-details/:id',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./plan/plan-details/plan-details.component');
          return m.PlanDetailsComponent;
        },
      },
    ],
  },


];


