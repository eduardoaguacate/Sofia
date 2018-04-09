import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ElementRef, Renderer, Input, Output, Optional, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { fuseAnimations } from '../../../../../core/animations';

import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { FuseUtils } from '../../../../../core/fuseUtils';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreModule } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseDatabase } from '@firebase/database-types';
import { FuseIfOnDomDirective } from '../../../../../core/directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FirebaseApp, FirebaseAppProvider } from 'angularfire2';
import { FirebaseFirestore, DocumentReference } from '@firebase/firestore-types';
import { AngularFireDatabase } from 'angularfire2/database';




@Component({
  selector   : 'faq-page-view',
  templateUrl: './faq.component.html',
  styleUrls  : ['./faq.component.scss'],
  animations   : fuseAnimations,
  encapsulation: ViewEncapsulation.None
})

export class FAQComponent{

  faqCollection: AngularFirestoreCollection<any[]>;

  faqGeneralCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqGeneral: Observable<any[]>;

  faqProfessorCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqProfessor: Observable<any[]>;

  faqStudentCollection: AngularFirestoreCollection<any[]>; // This is handled for the EN or ES Collection
    faqStudent: Observable<any[]>;

  faqs: any;

  step = 0;


  constructor(public translationLoader: FuseTranslationLoaderService,
              public router: Router,
              public db: AngularFirestore)
  {
    this.translationLoader.loadTranslations(english, spanish);

    this.faqCollection = this.db.collection('FAQ');

    this.faqGeneralCollection = this.faqCollection.doc('lMstBI9frneTqiarj1hX').collection('ES', ref => ref.orderBy('QuestionNum', 'asc'));

      this.faqGeneral = this.faqGeneralCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              return { id, ...data };
            });
      });

      this.faqProfessorCollection = this.faqCollection.doc('lCMZamzb03mQ3AGHK5i4').collection('ES', ref => ref.orderBy('QuestionNum', 'asc'));

      this.faqProfessor = this.faqProfessorCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              return { id, ...data };
            });
      });

      this.faqStudentCollection = this.faqCollection.doc('KesPex9MZ64nYTuO4f13').collection('ES', ref => ref.orderBy('QuestionNum', 'asc'));

      this.faqStudent = this.faqStudentCollection.snapshotChanges().map(document => {
            return document.map(documentData => {
              const data = documentData.payload.doc.data();
              const id = documentData.payload.doc.id;
              return { id, ...data };
            });
      });


  }


  setStep(index: number)
    {
        this.step = index;
    }

    nextStep()
    {
        this.step++;
    }

    prevStep()
    {
        this.step--;
    }


}
