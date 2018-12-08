import { Injectable, NgZone } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
// import 'rxjs/add/operator';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class APIServices {
    constructor(
        private _http: HttpClient,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {}



    addressAutoComplete(dom) {
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(dom, { types: ['address'] });
                autocomplete.addListener('place_changed', () => {
                  this.ngZone.run(() => {
                   const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                   const address = {address: place.formatted_address, lat: place.geometry.location.lat(),
                       lng: place.geometry.location.lng()};
                   // console.log(address);
                   sessionStorage.setItem('address', JSON.stringify(address));
                });
            });
        });
    }

    contactAddress(dom) {
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(dom, { types: ['address'] });
                autocomplete.addListener('place_changed', () => {
                  this.ngZone.run(() => {
                   const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                       // console.log(place);
                      sessionStorage.setItem('conAddress', place.formatted_address);
                });
            });
        });
    }

    redrawMap(map, lat, lng) {
       map.triggerResize()
      .then(() => map._mapsWrapper.setCenter({lat: lat, lng: lng}));
    }

    getLocation(term: string): Promise<any> {
    let address = '';
    // if(term.includes(',')) {
    //    let  a = term.split(",");
    //    address = a.join('+');
    // } else {
       const  a = term.split(' ');
       address = a.join('+');
    // }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCaa9lro2eKyLYyOhPyR_OhKp9cWrFQtE0`;
    // console.log(url);
    return this._http.get(url)
         .toPromise()
         .then(response => Promise.resolve(response))
         .catch( error => Promise.resolve(error.json()));
    }

}
