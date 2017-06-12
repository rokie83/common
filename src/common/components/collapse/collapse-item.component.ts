/*tslint:disable-next-line:max-line-length */
import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, forwardRef, Host, Inject, Input, ViewChild} from '@angular/core';

import {BxCollapseComponent} from './collapse.component';

@Component({
    selector: 'bx-collapse-item',
    templateUrl: 'collapse-item.component.html',
    styleUrls: ['collapse-item.component.scss']
})
export class BxCollapseItemComponent implements AfterViewChecked {
    @Input() public title: string;
    @Input() public isVisible: boolean = false;
    private _height: number;

    @ViewChild('collapse') public element: ElementRef;

    public get height(): number {
        return this.isVisible ? this._height : 0;
    }

    public constructor(
        @Host() @Inject(forwardRef(() => BxCollapseComponent))
        private collapse: BxCollapseComponent, private _changeDetectionRef: ChangeDetectorRef) {}

    public ngAfterViewChecked(): void {
        this._height = this.element.nativeElement.scrollHeight;
        this._changeDetectionRef.detectChanges();
    }

    public resetHeight(): void {
        this.element.nativeElement.style.height = null;
    }

    public toggle(): void {
        const isVisible = this.isVisible;
        this.collapse.hideAll();
        this.isVisible = !isVisible;
    }
}
