import { Component, OnInit, Inject } from '@angular/core';
import { TopicsService } from './topics.service';
import { JQ_TOKEN } from '../common/jQuery.service';
import { SubscribersService } from '../user/subscribers/subscribers.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  topics = [];
  clickedTopic;
  countSubscribers;
  confirmationTitle;
  failedTitle
  //form
  mail;
  formInvalid = { mail: false };
  mailError = false;


  constructor(private subscribersService: SubscribersService, private topicsService: TopicsService, @Inject(JQ_TOKEN) private $: any) { }



  ngOnInit(): void {
    this.topics = this.topicsService.getTopics();

  }
  // Confirm modal clicked
  confirm() {
    this.$('#confirmation-modal').modal('hide')
    this.$('#failed-modal').modal('hide')
  }

  // topic Clicked
  topicClicked(topic) {
    this.$('#modal-title').text(`Subscribe to ${topic.name.toLowerCase()}`);
    this.countSubscribers = this.subscribersService.getCountSubscribers(topic.name);
    this.clickedTopic = topic;
  }

  // Subscribe button clicked
  subscribe(formValues) {
    this.mailError = false;

    // check if mail is filled in.
    if (formValues.form.controls.mail.invalid) {
      this.formInvalid.mail = true;
    }
    else {
      this.formInvalid.mail = false;
    }


    if (formValues.valid) {
      // check if mail contains '@'
      if (formValues.form.controls.mail.value != undefined && formValues.form.controls.mail.value.toLowerCase().indexOf('@') > -1) {
        let saved = this.subscribersService.saveSubscriber(formValues.form.controls.mail.value, this.clickedTopic.name);
        this.$('#subscribe-modal').modal('hide');

        // if mail is saved
        if (saved) {
          this.$('#confirmation-modal').modal('show');
          this.confirmationTitle = `Thank you for subscribing to ${this.clickedTopic.name.toLowerCase()}`;
        }

        // if mail exists and already subscribed to topic
        else {
          this.$('#failed-modal').modal('show');
          this.failedTitle = `You are already subscribed to ${this.clickedTopic.name.toLowerCase()}`;

        }
      }
      else {
        this.mailError = true;
      }
    }
  }

}
