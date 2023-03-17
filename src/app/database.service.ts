import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public constructor(private _firestore: Firestore) { }

  public put<T extends DBObject>(obj: T, collectionName: string): Promise<DocumentReference<T>> {
    const coll = collection(this._firestore, collectionName);
    if (obj.id == undefined) obj.id = null;
    const promise = addDoc<T>(coll as CollectionReference<T>, obj);
    promise.then(e => (obj.id = e.id))
    return promise;
  }

  public update<T extends DBObject>(obj: T, collectionName: string): Promise<void> {
    const document = doc(this._firestore, collectionName, obj.id!);
    return updateDoc(document, obj);
  }

  public get<T>(collectionName: string): Observable<T[]> {
    const coll = collection(this._firestore, collectionName);
    return collectionData(coll, { idField: 'id' }) as Observable<T[]>
  }
}
export type DBObject = { id?: string | null }
