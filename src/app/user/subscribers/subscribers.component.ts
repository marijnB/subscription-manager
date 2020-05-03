import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { JQ_TOKEN } from 'src/app/common/jQuery.service';
import { TopicsService } from 'src/app/topics/topics.service';
import { SubscribersService } from './subscribers.service';

@Component({
  selector: 'app-subscribers', 
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent implements OnInit,OnDestroy {
topics;
subscribersSelectedTopic;
selectedTopic = 'All topics';
countSubscribers; 
subscriberToDelete= {mail:'',id:'',topic:''};
templates;

  constructor( private topicsService : TopicsService, private subscribersService: SubscribersService, @Inject(JQ_TOKEN)private $:any) { }

  ngOnInit(): void {
    this.$('#main-container').addClass('admin-interface');
    this.topics = this.topicsService.getTopics();
    // add 'all' to topics
    this.topics.unshift({name:'All topics'})
    this.getCurrentSelectedTopic('');
    
    this.templates =[
      "example 1","example 2","example 3"
    ];
    
  }

  // class for specific style => remove when exit this component
  ngOnDestroy() {
    this.$('#main-container').removeClass('admin-interface');
  }

  // when value of select input (topics) changes
  selectInputChanged(selectEvent){
    const value = selectEvent.target.value === 'All topics' ? '' : selectEvent.target.value;
    this.selectedTopic = selectEvent.target.value;
    this.getCurrentSelectedTopic(value);
  }


  // button clicked
  deleteButtonCLick(subscriber){
    this.subscriberToDelete = subscriber;
  }

  // used function for setting a selected topic and update variables related to the topic
  getCurrentSelectedTopic(value){
    // value has to be empty if selected 'all topics'
    value = value == 'All topics'? '':value;
    // update variables
    this.subscribersSelectedTopic = this.subscribersService.getSubscribers(value);
    this.countSubscribers =  this.subscribersService.getCountSubscribers(value);
    // change title of modal (dynamic topic)
    this.$('#modal-title').text(`Send mail to all subscribers of ${this.selectedTopic}`)
  }


  // modal Methods mail
  mailModalClicked(){
    this.$('#mail-modal').modal('hide');
    // failed sending when a topic has no subscribers
    if(this.countSubscribers < 1){
      this.$('#failed-mail-modal').modal('show');
    }
    // succes mail modal
    else{
      this.$('#confirmation-mail-modal').modal('show');
    }
  }
  confirmMailModalClicked(){
    this.$('#confirmation-mail-modal').modal('hide');
    this.$('#failed-mail-modal').modal('hide');
  }
 

    // modal Methods delete
  deleteModalClicked(){
    this.$('#delete-modal').modal('hide');
    const result = this.subscribersService.deleteSubscriber(this.subscriberToDelete.id);
    if(result){
          this.$('#confirmation-delete-modal').modal('show');
    }
    else{
      this.$('#failed-delete-modal').modal('show');
    }
    this.getCurrentSelectedTopic(this.selectedTopic)

  } 
  deleteModalCancel(){
    this.$('#delete-modal').modal('hide');
  }
  confirmDeleteModalClicked(){
    this.$('#failed-delete-modal').modal('hide')
    this.$('#confirmation-delete-modal').modal('hide')
  }

}
