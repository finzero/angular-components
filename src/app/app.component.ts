import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  transfer2Error: boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    transfer1: new FormControl([{ id: 7, name: 'item 7' }]),
    transfer2: new FormControl([], [Validators.required]),
  });

  get formValue() {
    return this.form.getRawValue();
  }

  items1 = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
    { id: 5, name: 'item 5' },
    { id: 6, name: 'item 6' },
  ];

  items2 = [
    { id: 1, name: 'item 1' },
    { id: 2, name: 'item 2' },
    { id: 3, name: 'item 3' },
    { id: 4, name: 'item 4' },
    { id: 5, name: 'item 5' },
    { id: 6, name: 'item 6' },
  ];

  // selectedItems1 = [{ id: 7, name: 'item 7' }];
  // selectedItems2 = [];

  onTransfer(changes: any[], field: string) {
    const [left, right] = changes;
    this.form.get(field)?.setValue(right);
    if (field === 'transfer1') {
      this.items1 = left;
    } else if (field === 'transfer2') {
      this.items2 = left;
    }
    console.log('field', field);
  }

  onSubmit() {
    this.transfer2Error = true;
    console.log(this.form.getRawValue());
  }
}
