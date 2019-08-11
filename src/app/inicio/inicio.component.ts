import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ErrorComponent } from '../components/error/error.component';
// import {LoadingComponent} from '../components/loading/loading.component';

declare var $: any;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  @ViewChild(ErrorComponent) errorComp: ErrorComponent;
  // @ViewChild(LoadingComponent) loading: LoadingComponent;

  items: Observable<any[]>;
  personas: any = [];
  persona: any = {};
  promedio: number;
  desviacion: number;
  tab1 = true;
  tab2 = false;
  error = '';
  idEliminar: any;
  loading = true;

  constructor(public db: AngularFirestore, private datePipe: DatePipe) {
    this.items = db.collection('personas').valueChanges();

  }

  ngOnInit() {
    this.getPersonas();
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
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err.message);
    });
  }

  addPersona = () => {

    $('mat-form-field').removeClass('mat-form-field-invalid');
    let vacio = false;
    $('mat-form-field').each((i, item) => {
      if ($(item).find('input').val() === '') {
        $(item).addClass('mat-form-field-invalid');
        vacio = true;
      }
    });

    if (vacio) {
      this.error = 'Los campos marcados son obligatorios';
      this.errorComp.mostrar();
    } else {
      if (this.datePipe.transform(this.persona.fecha, 'dd/MM/yyyy') !== null) {
        this.loading = true;
        $('.modal').addClass('off');
        this.db.collection('personas').add({
          nombre: this.persona.nombre,
          edad: this.persona.edad,
          apellido: this.persona.apellido,
          fecha: this.datePipe.transform(this.persona.fecha, 'dd/MM/yyyy'),
          registro: new Date()
        }).then(res => {
          this.getPersonas();
          this.persona = {};
        }).catch(err => {
          console.error(err);
          this.loading = false;
        });
      } else {
        this.error = 'No es una fecha valida';
        this.errorComp.mostrar();
      }
    }



  }


  delPersona = (id) => {
    this.loading = true;
    $('.modal').addClass('off');
    this.db.collection('personas').doc(id).delete().then(res => {
      this.getPersonas();
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  closeModal() {
    $('.modal#registro').addClass('off');
  }
  showModal() {
    $('.modal#registro').removeClass('off');
  }

  closeConfirmar() {
    $('.modal#confirmar').addClass('off');
  }
  showConfirmar(id) {
    $('.modal#confirmar').removeClass('off');
    this.idEliminar = id;
  }
  confirmar() {
    this.delPersona(this.idEliminar);
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
