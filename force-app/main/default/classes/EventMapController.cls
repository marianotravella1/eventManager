public with sharing class EventMapController {
    
    public class MapInfo {
        @AuraEnabled public String apiKey { get; set; }
        @AuraEnabled public Decimal latitude { get; set; }
        @AuraEnabled public Decimal longitude { get; set; }
    }

    @AuraEnabled(cacheable=true)
    public static MapInfo getMapInfo(Id recordId) {

        
        Maps_Setting__mdt setting = [SELECT API_Key__c FROM Maps_Setting__mdt LIMIT 1];
        String key = setting.API_Key__c;
        
        // Get location event's location
        Event__c event = [SELECT Location__Latitude__s, Location__Longitude__s 
                          FROM Event__c 
                          WHERE Id = :recordId 
                          LIMIT 1];
        Decimal eventLat = event.Location__Latitude__s;
        Decimal eventLong = event.Location__Longitude__s;

        // Create and return the MapInfo object
        MapInfo info = new MapInfo();
        info.apiKey = key;
        info.latitude = eventLat;
        info.longitude = eventLong;

        return info;
    }
}