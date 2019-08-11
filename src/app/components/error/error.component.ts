import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() msg = '';
  time: any;

  constructor() { }

  ngOnInit() {
  }

  algo() {
    console.log(' ......');
  }

  mostrar() {
    $('.error').fadeIn('slow');
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      $('.error').fadeOut('slow');
    }, 5000);
  }

  ocultar() {
    clearTimeout(this.time);
    $('.error').fadeOut('slow');
  }

}
