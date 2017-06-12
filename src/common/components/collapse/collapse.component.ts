import {Component, ContentChildren, EventEmitter, forwardRef, Output, QueryList, ViewEncapsulation} from '@angular/core';

import {BxCollapseItemComponent} from './collapse-item.component';

@Component({
    selector: 'bx-collapse',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class BxCollapseComponent {
    @Output() public toggle: EventEmitter<void> = new EventEmitter<void>();

    @ContentChildren(forwardRef(() => BxCollapseItemComponent))
    public items: QueryList<BxCollapseItemComponent>;

    public hideAll(preventEventEmit: boolean = false): void {
        if (!preventEventEmit) {
            this.toggle.emit(null);
        }
        this.items.toArray().forEach((item: BxCollapseItemComponent) => item.isVisible = false);
    }
}
