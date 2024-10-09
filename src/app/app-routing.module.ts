import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ComponentsPageNotFoundComponent } from './components/page-not-found/components-page-not-found.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },           
  { path: 'schedule', component: ScheduleComponent },    
  { path: 'calendar', component: CalendarComponent },    
  { path: 'reserv', component: ReservationHistoryComponent },    

  { path: '**', component: ComponentsPageNotFoundComponent }       
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]                  
})
export class AppRoutingModule { }
