import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { CustomModalComponent } from './customModal.component';
import { customModalTriggerDirective } from './modalTrigger.directive';
import { CommonModule } from '@angular/common';

// module for sharing to all other modules ( to use the shared modal in user and homepage )
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CustomModalComponent,
        customModalTriggerDirective
    ],
    providers: [

    ],
    exports: [
        CommonModule,
        CustomModalComponent,
        customModalTriggerDirective
    ]
})
export class SharedModule {

}