import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { appRoutes } from './routes';
import { TopicsService } from './topics/topics.service';
import { TopicsComponent } from './topics/topics.component';
import { JQ_TOKEN } from './common/jQuery.service';
import { FormsModule } from '@angular/forms';
import { sharedModule } from './common/shared.module';
import { Error404Component} from './errors/404.component'
import { StorageServiceModule } from 'ngx-webstorage-service';

const jQuery = window['$'];


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    TopicsComponent,
    Error404Component
 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{useHash: true}),

    FormsModule,
    sharedModule,
  
  ],
  providers: [
    {provide : JQ_TOKEN, useValue: jQuery},
    TopicsService,
    StorageServiceModule 

  ],
  exports:[
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// build project in submap : ng build --base-href /subscription-manager/ --prod