import { Component } from '@angular/core'

@Component({
    template: `<div class="container"><p> OOPS...Link bestaat niet : <a [routerLink]="['/']">Homepage</a></p></div>`,
    styles: [`
        .container{display:flex;justify-content:center;}
        p{font-size:20px;  margin :80px auto;}
        a{text-decoration:underline}
    `]
})

export class Error404Component {

}


