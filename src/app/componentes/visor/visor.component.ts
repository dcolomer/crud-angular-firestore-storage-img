import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

export interface Item { nombre: string; url: string; productoId: string; }
@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit, OnChanges {
  @Input() productoId: string;
  items$: Observable<Item[]>;
  productoIdFilter$: BehaviorSubject<string|null>;
  mostrar = false;

  constructor(private afs: AngularFirestore) {
    this.productoId = undefined;
    this.productoIdFilter$ = new BehaviorSubject(null);
    // @ts-ignore
    this.items$ = combineLatest(
      this.productoIdFilter$
    ).pipe(
      switchMap(([productoId]) =>
        afs.collection('img', ref => {
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          if (productoId) { query = query.where('productoId', '==', this.productoId); }
          return query;
        }).valueChanges()
      )
    );
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productoIdFilter$.next(this.productoId);
    this.mostrar = typeof this.productoId === 'undefined' ? false : true;
  }

}
