import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getUpcomingEvents from '@salesforce/apex/EventListController.getUpcomingEvents';

export default class UpcomingEventsList extends NavigationMixin(LightningElement) {
    
    events = [];
    isLoading = true;
    error;
    sortBy = 'Start_DateTime__c';
    isAscending = true;

    
    @wire(getUpcomingEvents, { sortBy: '$sortBy', isAscending: '$isAscending' })
    wiredEvents({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.events = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.events = [];
        }
    }

    get noEvents() {
        return this.events.length === 0 && !this.isLoading;
    }


    handleCreateEvent() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Event__c',
                actionName: 'new'
            }
        });
    }

    handleView(event) {
        const eventId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: eventId,
                actionName: 'view'
            }
        });
    }
    handleEdit(event) {
        const eventId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: eventId,
                actionName: 'edit'
            }
        });
    }

    handleSort(event) {
        const field = event.target.dataset.field;
        this.sortBy = field;
        this.isAscending = !this.isAscending;
    }
    
}