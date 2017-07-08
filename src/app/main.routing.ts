import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IndexComponent } from './pages/main/index.component'
import { PostComponent } from './pages/main/components/post/post.component'
import { LoginComponent } from './pages/main/components/login/login.component'

export const routes: Routes = [
    { path: '', component: IndexComponent, pathMatch: 'full' },
    { path: 'activities/post/:id', component: PostComponent, pathMatch: 'full' },
    { path: 'organizations/:id', component: IndexComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
