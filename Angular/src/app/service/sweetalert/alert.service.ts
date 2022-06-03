import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  alert(title: any, text: any, icon: any) {
    Swal.fire(
      title,
      text,
      icon,
    )
  }
}
