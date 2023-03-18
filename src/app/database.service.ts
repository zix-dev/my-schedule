import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public constructor(private _firestore: Firestore) { }

  public put<T extends DBObject>(obj: T, collectionName: CollectionName): Promise<DocumentReference<T>> {
    const coll = collection(this._firestore, collectionName);
    if (obj.id == undefined) obj.id = null;
    const promise = addDoc<T>(coll as CollectionReference<T>, obj);
    promise.then(e => {
      if (obj.id == null) {
        obj.id = e.id;
        this.update(obj, collectionName)
      }
    })
    return promise;
  }

  public update<T extends DBObject>(obj: T, collectionName: CollectionName): Promise<void> {
    const document = doc(this._firestore, collectionName, obj.id!);
    return updateDoc(document, obj);
  }

  public get<T extends DBObject>(collectionName: CollectionName): Observable<T[]> {
    const coll = collection(this._firestore, collectionName);
    return collectionData(coll, { idField: 'id' }) as Observable<T[]>
  }

  public del<T extends DBObject>(obj: T, collectionName: CollectionName): Promise<void> {
    const document = doc(this._firestore, collectionName, obj.id!);
    return deleteDoc(document)
  }
}
export type DBObject = { id?: string | null }
export type CollectionName = 'reservations' | 'personal' | 'rooms' | 'machines';
