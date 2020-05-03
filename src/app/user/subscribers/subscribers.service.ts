import { Injectable, AfterViewInit, Inject } from '@angular/core';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    // localstorage : get variable from localstorage if it's not undefined
    if (this.storage.get('subscribers') != undefined) {
      SUBSCRIBERS = this.storage.get('subscribers');
    }
    else {
      this.setLocalStorage();
    }
  }


  getSubscribers(topic) {
    return this.getFilteredSubscribers(topic);
  }

  saveSubscriber(inputSubscriber, inputTopic) {
    let savedFlag = false;
    // check subscriber already in list
    const matchingSubscriber = SUBSCRIBERS.filter(subscriber => subscriber.mail.toLowerCase() == inputSubscriber.toLowerCase());

    // check subscriber has the new topic
    if (matchingSubscriber.length << 1) {
      SUBSCRIBERS.forEach((subscriber) => {
        // Check if mail exists
        if (subscriber.mail.toLowerCase() == inputSubscriber.toLowerCase()) {
          const matched = subscriber.topics.find(matchTopic);
          // if no topic found on subscriber (true): otherwise saveFlag is false (topic found)
          if (matched == undefined) {
            subscriber.topics.push(inputTopic);
            savedFlag = true;
          }
        }
      });
      // function used for find() in  SUBSCRIBERS.forEach
      function matchTopic(topic) {
        return topic.toLowerCase() == inputTopic.toLowerCase();
      }
    }

    else {
      // add subscriber to list
      const newId = SUBSCRIBERS[SUBSCRIBERS.length - 1].id + 1;
      const newTopic = inputTopic;
      SUBSCRIBERS.push({ id: newId, mail: inputSubscriber, topics: [newTopic] })
      savedFlag = true;
    }
    this.setLocalStorage();
    return savedFlag;

  }

  // Get Number Of Subscribers of a specific topic or all ('')
  getCountSubscribers(inputTopic) {
    return this.getFilteredSubscribers(inputTopic).length;
  }

  getFilteredSubscribers(inputTopic) {
    let filteredSubscribers = [];
    // asked topic = 'all topics' => ''
    if (inputTopic === '') {
      filteredSubscribers = SUBSCRIBERS;
    }
    else {
      // get list of subscribers of a specific topic
      SUBSCRIBERS.forEach(subscriber => {
        if (subscriber.topics.find(matchTopic) !== undefined) {
          filteredSubscribers.push(subscriber);
        }
      });
      // function used for find() in  SUBSCRIBERS.forEach
      function matchTopic(topic) {
        return topic.toLowerCase() === inputTopic.toLowerCase();
      }
    }
    return filteredSubscribers;
  }

  // Delete Subscriber from list
  deleteSubscriber(id) {
    const matchingSubscriber = SUBSCRIBERS.filter(SUBSCRIBER => SUBSCRIBER.id === id);
    if (matchingSubscriber.length > 0) {
      SUBSCRIBERS = SUBSCRIBERS.filter(SUBSCRIBER => SUBSCRIBER.id !== id);
      this.setLocalStorage();
      return true;
    }
    else {
      return false;
    }
  }

  // Set Local Sorage
  setLocalStorage() {
    this.storage.set('subscribers', SUBSCRIBERS);
  }

}

// Dummy subscribers
let SUBSCRIBERS = [
  {
    id: 1,
    mail: 'soccer_marijnbeylemans@hotmail.com',
    topics: ['Soccer']
  },
  {
    id: 2,
    mail: 'basketball_marijnbeylemans@hotmail.com',
    topics: ['Basketball']
  },
  {
    id: 3,
    mail: 'skating_marijnbeylemans@hotmail.com',
    topics: ['Skating']
  },
  {
    id: 4,
    mail: 'tennis_marijnbeylemans@hotmail.com',
    topics: ['Tennis']
  },
  {
    id: 5,
    mail: 'running_marijnbeylemans@hotmail.com',
    topics: ['Running']
  },
  {
    id: 6,
    mail: 'soccer2_marijnbeylemans@hotmail.com',
    topics: ['Soccer', 'Basketball']
  },
  {
    id: 7,
    mail: 'tennis2_marijnbeylemans@hotmail.com',
    topics: ['Tennis']
  },
  {
    id: 8,
    mail: 'soccer3_marijnbeylemans@hotmail.com',
    topics: ['Soccer']
  }
]