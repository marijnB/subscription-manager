import { InjectionToken } from '@angular/core';

// interface of jQuery is too complex  => via dependency injection
export let JQ_TOKEN = new InjectionToken<Object>('jQuery'); 
