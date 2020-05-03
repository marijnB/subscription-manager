import { Directive, OnInit, Inject, ElementRef, Input, ViewChild } from '@angular/core';
import { JQ_TOKEN } from './jQuery.service';

@Directive({
    selector: '[customModal-trigger]'
})
export class customModalTriggerDirective implements OnInit {
    private el: HTMLElement;



    @ViewChild('confirmationModal') ContainerEl: ElementRef;
    @Input('customModal-trigger') modalId: string;
    // When a button is clicked the modalId coming from the input element is showing the right modal
    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any) {
        this.el = ref.nativeElement;
    }

    ngOnInit() {
        this.el.addEventListener('click', (e) => {
            this.$(`#${this.modalId}`).modal({});
        });
    }
}