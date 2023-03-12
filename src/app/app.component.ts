import { DatabaseService } from './database.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public t = ['', ''];
  public col: { a: string; b: string }[] = [];
  title = 'my-schedule';
  public constructor(public db: DatabaseService) {
    this.db.get<{ a: string; b: string }>('test').subscribe((a) => (this.col = a))
  }
  public test() {
    this.db.put({ a: this.t[0], b: this.t[1] }, 'test')
  }
  public l(a: any): any {
    console.log(a);
    return a;
  }
}
