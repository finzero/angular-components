import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

enum Operator {
  RightAll = 'RightAll',
  Right = 'Right',
  Left = 'Left',
  LeftAll = 'LeftAll',
}

@Component({
  selector: 'transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent {
  @Input() leftItems: any[] = [];
  @Input() rightItems: any[] = [];
  @Input() label: string = 'label';
  @Input() value: string = 'id';
  @Input() isError: boolean = false;
  @Output() transfer: EventEmitter<Array<any[]>> = new EventEmitter();

  operator = Operator;

  selectedLeft = new Set();
  setSelectedLeft(idx: number) {
    if (this.selectedLeft.has(idx)) {
      this.selectedLeft.delete(idx);
    } else {
      this.selectedLeft.add(idx);
    }
  }

  selectedRight = new Set();
  setSelectedRight(idx: number) {
    if (this.selectedRight.has(idx)) {
      this.selectedRight.delete(idx);
    } else {
      this.selectedRight.add(idx);
    }
  }

  onTransfer(operator: Operator) {
    let itemsIdx: any[] = [];
    let changes: any[] = [];

    switch (operator) {
      case Operator.Right: {
        itemsIdx = Array.from(this.selectedLeft);
        changes = this.leftItems.filter((_, idx) => itemsIdx.includes(idx));
        this.rightItems = [...this.rightItems, ...changes];
        this.leftItems = this.leftItems.filter(
          (_, idx) => !itemsIdx.includes(idx)
        );
        this.selectedLeft.clear();
        break;
      }
      case Operator.RightAll: {
        itemsIdx = this.leftItems.map((_, idx) => idx);
        changes = this.leftItems.filter((_, idx) => itemsIdx.includes(idx));
        this.rightItems = [...this.rightItems, ...changes];
        this.leftItems = [];
        this.selectedLeft.clear();
        break;
      }
      case Operator.LeftAll: {
        itemsIdx = this.rightItems.map((_, idx) => idx);
        changes = this.rightItems.filter((_, idx) => itemsIdx.includes(idx));
        this.leftItems = [...this.leftItems, ...changes];
        this.rightItems = [];
        this.selectedRight.clear();
        break;
      }
      case Operator.Left: {
        itemsIdx = Array.from(this.selectedRight);
        changes = this.rightItems.filter((_, idx) => itemsIdx.includes(idx));
        this.rightItems = this.rightItems.filter(
          (_, idx) => !itemsIdx.includes(idx)
        );
        this.leftItems = [...this.leftItems, ...changes];
        this.selectedRight.clear();
      }
    }

    // emit output
    this.transfer.emit([this.leftItems, this.rightItems]);
  }
}
