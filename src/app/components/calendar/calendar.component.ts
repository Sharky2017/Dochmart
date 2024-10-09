import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
export interface Availability {
  [hour: string]: string[];}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  availability: Record<string, Availability> = {}; 
  selectedDate: string | null = null;

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {

    this.bookingService.getAvailability().subscribe((data) => {
      this.availability = data; 
    });
  }

  getAvailableDates(): string[] {
    return Object.keys(this.availability);
  }  

  getDayStatus(day: string): string {
    const date = day.padStart(2, '0');
    return this.availability[date] && Object.values(this.availability[date]).some(slot => slot[0] === 'D')
      ? 'available'
      : 'unavailable';
  }

  selectDate(day: string): void {
    this.selectedDate = day.padStart(2, '0');
    this.router.navigate(['/schedule'], { queryParams: { date: this.selectedDate } });
  }
}
