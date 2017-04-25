import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Verse as Verse } from '../app/verse';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Provides Verses from a search query
@Injectable()
export class VerseProvider {
    baseUrl: string = 'https://bsearch.ivanportugal.com/';
    constructor(public http: Http) {

    }

    search(query: string): Observable<Verse[]> {
        let headers = new Headers({ 'Content-Type': 'text/plain' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'search?query=' + query, {}, options)
                .timeout(3000, new Error('The server timed out! Maybe your query is too complex.'))
                .map(response => response.json())
                .catch((error:any) => Observable.throw(error._body || 'Could not fetch verse for some unknown reason.'));
    }
}
