import { LightningElement, api, wire } from 'lwc';
import getMapInfo from '@salesforce/apex/EventMapController.getMapInfo';

export default class MapaEvento extends LightningElement {
    @api recordId;
    latitude;
    longitude;
    error;

    @wire(getMapInfo, { recordId: '$recordId' })
    wiredMapInfo({ error, data }) {
        if (data) {
            this.latitude = data.latitude;
            this.longitude = data.longitude;
            this.error = undefined;
        } else if (error) {
            this.error = 'No se pudieron obtener los datos de ubicación desde Salesforce.';
        }
    }

    get mapMarkers() {
        return this.latitude && this.longitude
            ? [
                {
                    location: {
                        Latitude: this.latitude,
                        Longitude: this.longitude
                    },
                    title: 'Ubicación del Evento'
                }
            ]
            : [];
    }
}