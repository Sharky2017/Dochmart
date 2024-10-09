import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Availability {
  [hour: string]: string[]; 
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  availability: Availability = {};  
  selectedDate!: string;
  selectedHour: string | null = null;
  selectedHourStatus: string = 'unavailable'; 
  reservationForm: FormGroup;
  isModalVisible: boolean = false; 
  showReservationDetails: boolean = false;
  reservationData: any = {};

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  ngOnInit(): void {
      this.loadAvailabilityForSelectedDate(); 
  }
  
  loadAvailabilityForSelectedDate(): void {
    
    this.bookingService.getAvailability().subscribe((data: Record<string, Availability>) => {
 
      this.activatedRoute.queryParams.subscribe(params => {
        this.selectedDate = params['date']; 
      
      });

      this.availability = data[this.selectedDate] || {};
    });
  }

getAvailableHours(): string[] {
  return Object.keys(this.availability);
}
  getHourStatus(hour: string): string {
    return this.availability[hour]?.some((slot: string) => slot === 'D') ? 'available' : 'unavailable';
  }

  selectHour(hour: string): void {
    
    if(this.getHourStatus(hour) === 'unavailable'){
      console.log('esta ocupado')


    }
    else{

      this.showReservationDetails = false; 

    this.selectedHour = hour;
    this.selectedHourStatus = this.getHourStatus(hour);
    this.isModalVisible = true;
    }
    
    
  }
  
  
  submitReservation(): void {
    if (this.reservationForm.valid) {
      const reservationData = {
        hour: this.selectedHour,
        ...this.reservationForm.value,
        date: this.selectedDate
      };
  
      console.log('Datos del formulario: ', reservationData);
      
      this.bookingService.reserveHour(this.selectedDate!, this.selectedHour!).subscribe(response => {
        if (response.success) {
  
          this.reservationData = reservationData;
          this.showReservationDetails = true;
          
          this.saveReservationToLocalStorage(reservationData);
  
          this.reservationForm.reset();
        } else {
          this.reservationForm.reset();
        }
  
        this.reservationData = reservationData;
      }, error => {
        console.error('Error al hacer la reserva', error);
      });
    }
  }
  
  saveReservationToLocalStorage(reservationData: any): void {
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    
    reservations.push(reservationData);
    
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }
  

  confirmReservation(): void {
    this.isModalVisible = false;
    this.showReservationDetails = false; 
  }
}
