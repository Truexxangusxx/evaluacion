import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {

  msg = '';
  time: any;

  constructor() { }

  ngOnInit() {
  }

  mostrar(mensaje) {
    this.msg = mensaje;
    $('.mensaje').fadeIn('slow');
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      $('.mensaje').fadeOut('slow');
    }, 5000);
  }

  ocultar() {
    clearTimeout(this.time);
    $('.mensaje').fadeOut('slow');
  }

}
