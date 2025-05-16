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
        path: 'app-profile',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./auth/profile/profile.component');
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
        path: 'app-blog-editor',
        pathMatch: 'full',
        loadComponent: async () => {
          const m = await import('./blogs/blog-editor/blog-editor.component');
          return m.BlogEditorComponent;
        },
      },

    ],
  },


];

