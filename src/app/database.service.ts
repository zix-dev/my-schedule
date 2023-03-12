import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, DocumentData, DocumentReference } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public constructor(private _firestore: Firestore) { }

  public put<T>(x: T, collectionName: string): Promise<DocumentReference<T>> {
    const coll = collection(this._firestore, collectionName);
    return addDoc<T>(coll as CollectionReference<T>, x)
  }

  public get<T>(collectionName: string): Observable<T[]> {
    const coll = collection(this._firestore, collectionName);
    return collectionData(coll) as Observable<T[]>
  }
}
