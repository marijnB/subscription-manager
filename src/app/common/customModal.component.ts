import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-custom-modal',
    templateUrl: './customModal.component.html',
    styleUrls: ['./customModal.component.scss']
})

export class CustomModalComponent {
    // all modals using this shared component
    // elementId = same id as given to directive : to use multiple modals in a component
    @Input() elementId;
    @Input() title;
    constructor() {
    }
}
