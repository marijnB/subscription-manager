import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor() {

  }
  getTopics() {
    let baseUrl = 'assets/images/banners/';

    return [
      { name: 'Soccer', image: baseUrl + 'soccer-min.jpg' },
      { name: 'BasketBall', image: baseUrl + 'basketball-min.jpg' },
      { name: 'Skating', image: baseUrl + 'skating-min.jpg' },
      { name: 'Tennis', image: baseUrl + 'tennis-min.jpg' },
      { name: 'Running', image: baseUrl + 'running-min.jpg' },
    ]
  }
}
