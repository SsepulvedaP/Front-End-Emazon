import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sort-selector',
  templateUrl: './sort-selector.component.html',
  styleUrls: ['./sort-selector.component.scss']
})
export class SortSelectorComponent {
  @Output() onSortChange = new EventEmitter<string>();

  emitSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.onSortChange.emit(target.value);
    }
  }
}