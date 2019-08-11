import { Component, OnInit, Input } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() msg = '';

  constructor() { }

  ngOnInit() {
  }

  algo() {
    console.log(' ......');
  }

  mostrar() {
    $('.error').fadeIn('slow');
    setTimeout(() => {
      $('.error').fadeOut('slow');
    }, 5000);
  }

  ocultar() {
    $('.error').fadeOut('slow');
  }

}
