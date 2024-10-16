import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css']
})
export class ReservationHistoryComponent implements OnInit {
  reservations: any[] = [];

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  }
}
