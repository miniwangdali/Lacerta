import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  { path: '', component: PageComponent, pathMatch: 'full' },
  // { path: 'hero/:id' },
  // {
  //   path: '',
  //   pathMatch: 'full'
  // },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
