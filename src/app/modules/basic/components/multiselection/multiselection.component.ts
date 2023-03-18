import { Component } from '@angular/core';

@Component({
  selector: 'multiselection',
  templateUrl: './multiselection.component.html',
  styleUrls: ['./multiselection.component.scss']
})
export class MultiselectionComponent {

  selection: string[] = [];
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

}
