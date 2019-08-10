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
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'fecha'];
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
      console.log(res.docs);
      this.personas = res.docs;
    });
  }

  addPersona = () => {

    this.db.collection('personas').add({
      nombre: this.persona.nombre,
      edad: this.persona.edad,
      apellido: this.persona.apellido,
      fecha: this.datePipe.transform(this.persona.fecha, 'dd/MM/yyyy'),
      registro: new Date()
    }).then(res => {
      this.getPersonas();
      $('.modal').hide();
    }).catch(err => {
      console.error(err);
    });
  }


  delPersona = (id) => {
    this.db.collection('personas').doc(id).delete().then(res => {
      this.getPersonas();
      $('.modal').hide();
    }).catch(err => {
      console.error(err);
    });
  }

  closeModal() {
    $('.modal').hide();
  }

}
