import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Message } from './message';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MessageService {

  getAll(): Observable<Message[]> {
    return this.db.list<Message>('messages').valueChanges();
  }

  getAll2(): Observable<any> {
    return this.db.list<Message>('/messages').snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const $key = action.payload.key;
          const data = { $key, ...action.payload.val() };
          return data;
        })
      });
  }

  delete(id: string) {
    this.db.list("/messages").remove(id);
  }

  update(id: string, item: Message) {
    this.db.object<Message>('messages/' + id).update(item);
  }

  // freeSpot(id: string) {
  //   this.db.object('/messages/' + id + '/id').set(null);
  // }

  // searchByTrailer(id: string): Observable<any> {
  //   return this.db.list<Message>('/messages', ref => ref.orderByChild('id').equalTo(id)).snapshotChanges()
  //   .map(actions => {
  //     return actions.map(action => {
  //       const $key = action.payload.key;
  //       const data = { $key, ...action.payload.val() };
  //       return data;
  //     })
  //   });
  // }

  add(message: Message): any {
      message.date = new Date().toISOString();
      return this.db.list('/messages').push(message);
  }

  constructor(private db: AngularFireDatabase) {
  }

}
