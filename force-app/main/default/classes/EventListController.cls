public with sharing class EventListController {

    @AuraEnabled(cacheable=true)
    public static List<Event__c> getUpcomingEvents() {
        try {
            return [
                SELECT Id, Name, Start_DateTime__c, Description__c
                FROM Event__c
                WHERE Start_DateTime__c >= TODAY
                ORDER BY Start_DateTime__c ASC
                LIMIT 20
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
