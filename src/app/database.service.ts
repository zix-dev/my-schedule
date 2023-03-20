import { PopupService } from './modules/basic/services/popup.service';
import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentReference, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public constructor(private _firestore: Firestore, private _popup: PopupService) { }

  public put<T extends DBObject>(obj: T, collectionName: CollectionName, preventLoading: boolean = false): Promise<DocumentReference<T>> {
    if (!preventLoading) this._popup.loading = true;
    const coll = collection(this._firestore, collectionName);
    if (obj.id == undefined) obj.id = null;
    const promise = addDoc<T>(coll as CollectionReference<T>, obj);
    promise.then(e => {
      if (!preventLoading) this._popup.loading = false;
      if (obj.id == null) {
        obj.id = e.id;
        this.update(obj, collectionName, true)
      }
    })
    return promise;
  }

  public update<T extends DBObject>(obj: T, collectionName: CollectionName, preventLoading: boolean = false): Promise<void> {
    if (!preventLoading) this._popup.loading = true;
    const document = doc(this._firestore, collectionName, obj.id!);
    const promise = updateDoc(document, obj);
    promise.then(() => { if (!preventLoading) this._popup.loading = false; })
    return promise;
  }

  public get<T extends DBObject>(collectionName: CollectionName): Observable<T[]> {
    const coll = collection(this._firestore, collectionName);
    return collectionData(coll, { idField: 'id' }) as Observable<T[]>
  }

  public del<T extends DBObject>(obj: T, collectionName: CollectionName, preventLoading: boolean = false): Promise<void> {
    if (!preventLoading) this._popup.loading = true;
    const document = doc(this._firestore, collectionName, obj.id!);
    const promise = deleteDoc(document);
    promise.then(() => {
      if (!preventLoading) this._popup.loading = false;
    })
    return promise;
  }
}
export type DBObject = { id?: string | null }
export type CollectionName = 'reservations' | 'personal' | 'rooms' | 'machines';
