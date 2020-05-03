import { userRoutes } from './userRoutes';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SharedModule } from '../common/shared.module';
import { UserRouteActivator } from './user-route-activator.service';
import { StorageServiceModule } from 'ngx-webstorage-service';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(userRoutes),
        FormsModule,
        SharedModule,
    ],
    declarations: [
        LoginComponent,
        SubscribersComponent,
    ],
    providers: [
        UserRouteActivator,

    ]
})
export class UserModule {

}