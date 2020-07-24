import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactivesComponent } from './pages/reactives/reactives.component';



const routes: Routes = [
  { path: 'formTemplate', component: TemplateComponent },
  { path: 'formReactive', component: ReactivesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'formReactive' },
  { path: '', pathMatch: 'full', redirectTo: 'formReactive' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
