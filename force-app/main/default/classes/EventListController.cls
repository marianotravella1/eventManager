public with sharing class EventListController {

    @AuraEnabled(cacheable=true)
    public static List<Event__c> getUpcomingEvents(String sortBy, Boolean isAscending) {
        String orderClause = 'ORDER BY ' + sortBy + (isAscending ? ' ASC' : ' DESC');
        try {
            String query = 'SELECT Id, Name, Start_DateTime__c, Description__c ' +
                           'FROM Event__c ' +
                           'WHERE Start_DateTime__c >= TODAY ' + orderClause;
                           
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
