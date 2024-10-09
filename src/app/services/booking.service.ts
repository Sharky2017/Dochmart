import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment'; 

interface Availability {
  [hour: string]: string[];
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private availability: Availability = {
    '7:00 a.m.': ['D'],
    '8:00 a.m.': ['D'],
    '9:00 a.m.': ['D'],
    '10:00 a.m.': ['D'],
    '11:00 a.m.': ['D'],
    '12:00 p.m.': ['D'],
    '1:00 p.m.': ['D'],
    '2:00 p.m.': ['D'],
    '3:00 p.m.': ['D'],
    '4:00 p.m.': ['D'],
    '5:00 p.m.': ['D'],
    '6:00 p.m.': ['D']
  };

  private septemberData: Record<string, string[]> = environment.septemberData

  private schedule: Record<string, Availability> = {};

  constructor() {
    this.schedule = this.loadFromLocalStorage() || this.generateSchedule(9, 2024);
  }
  private generateSchedule(month: number, year: number): Record<string, Availability> {
    const schedule: Record<string, Availability> = {};
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${(month < 10 ? '0' : '')}${month}-${(day < 10 ? '0' : '')}${day}`;
      schedule[date] = { ...this.availability };
    }
    if (month === 9) {
      this.loadSeptemberData(schedule);
    }

    return schedule;
  }
  private loadSeptemberData(schedule: Record<string, Availability>): void {
    const septemberDays = Object.keys(this.septemberData);
    septemberDays.forEach(day => {
      const date = `2024-09-${day.padStart(2, '0')}`;
      if (schedule[date]) {
        schedule[date] = this.applySeptemberDataToAvailability(
          schedule[date],
          this.septemberData[day]
        );
      }
    });
  }

  private applySeptemberDataToAvailability(
    availability: Availability,
    data: string[]
  ): Availability {
    const hours = Object.keys(availability);
    data.forEach((status, index) => {
      if (index < hours.length) {
        availability[hours[index]] = [status];
      }
    });
    return availability;
  }

  getAvailability(): Observable<Record<string, Availability>> {
    this.saveToLocalStorage();
    return of(this.schedule);
  }
  reserveHour(date: string, hour: string): Observable<any> {
    if (this.schedule[date] && this.schedule[date][hour]) {
      const val = this.schedule[date][hour][0];
      if (val === 'D') {
        this.schedule[date][hour] = ['O'];
        this.saveToLocalStorage();
        return of({ success: true });
      } else {
        return of({ success: false, message: 'La hora ya está ocupada' });
      }
    }
    return of({ success: false, message: 'Fecha u hora no válida' });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('schedule', JSON.stringify(this.schedule));
  }

  private loadFromLocalStorage(): Record<string, Availability> | null {
    const savedSchedule = localStorage.getItem('schedule');
    return savedSchedule ? JSON.parse(savedSchedule) : null;
  }
}
