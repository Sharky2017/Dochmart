import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { ComponentsPageNotFoundComponent } from './components/page-not-found/components-page-not-found.component';
import { ReservationHistoryComponent } from './components/reservation-history/reservation-history.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    CalendarComponent,
    HeaderComponent,
    ComponentsPageNotFoundComponent,
    ReservationHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
