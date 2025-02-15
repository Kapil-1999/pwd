import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageHistoryComponent } from './pages/manage-history/manage-history.component';

const routes: Routes = [
  {
    path :'play-back', component: ManageHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryTrackingRoutingModule { }
