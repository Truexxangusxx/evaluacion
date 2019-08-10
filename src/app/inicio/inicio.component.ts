import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  items: Observable<any[]>;
  personas: any = [];
  persona: any = {};
  promedio: number;
  desviacion: number;
  tab1 = true;
  tab2 = false;

  constructor(public db: AngularFirestore, private datePipe: DatePipe) {
    this.items = db.collection('personas').valueChanges();

  }

  ngOnInit() {

    this.getPersonas();

    // this.items.subscribe(res => {
    //   this.personas = res;
    // });

  }

  getPersonas = () => {
    this.db.collection('personas', ref => ref.orderBy('registro')).get().subscribe(res => {
      this.personas = res.docs;

      let sum = 0;
      this.personas.forEach(element => {
        sum += Number(element.data().edad);
      });
      this.promedio = sum / this.personas.length;

      let sumDistancia = 0;
      this.personas.forEach(element => {
        let distancia = this.promedio - Number(element.data().edad);
        distancia < 0 ? distancia = distancia * -1 : distancia = distancia;
        sumDistancia += distancia ** 2;
      });

      this.desviacion = Math.sqrt(sumDistancia / this.personas.length);

    });
  }

  addPersona = () => {

    console.log();

    if (this.datePipe.transform(this.persona.fecha, 'dd/MM/yyyy') !== null) {
      this.db.collection('personas').add({
        nombre: this.persona.nombre,
        edad: this.persona.edad,
        apellido: this.persona.apellido,
        fecha: this.datePipe.transform(this.persona.fecha, 'dd/MM/yyyy'),
        registro: new Date()
      }).then(res => {
        this.getPersonas();
        $('.modal').addClass('off');
        this.persona = {};
      }).catch(err => {
        console.error(err);
      });
    } else {
      console.error('errorrrrr');
    }

  }


  delPersona = (id) => {
    this.db.collection('personas').doc(id).delete().then(res => {
      this.getPersonas();
      $('.modal').addClass('off');
    }).catch(err => {
      console.error(err);
    });
  }

  closeModal() {
    $('.modal').addClass('off');
  }
  showModal() {
    $('.modal').removeClass('off');
  }

  selectTab1 = () => {
    this.tab1 = true;
    this.tab2 = false;
  }

  selectTab2 = () => {
    this.tab1 = false;
    this.tab2 = true;
  }

}
