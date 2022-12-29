import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'components';

  items = [
    {
      id: 1,
      name: 'item 1',
    },
    {
      id: 2,
      name: 'item 2',
    },
    {
      id: 3,
      name: 'item 3',
    },
    {
      id: 4,
      name: 'item 4',
    },
    {
      id: 5,
      name: 'item 5',
    },
    {
      id: 6,
      name: 'item 6',
    },
  ];

  selectedItems = [
    {
      id: 7,
      name: 'item 7',
    },
  ];

  onTransfer(changes: Array<any[]>) {
    const [left, right] = changes;
    this.items = left;
    this.selectedItems = right;
  }
}
