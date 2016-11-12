import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the VerseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class VerseProvider {

    constructor(public http: Http) {

    }

    search(query: string) {
        return new Promise(resolve => {
            let headers = new Headers({ 'Content-Type': 'text/plain' });
            let options = new RequestOptions({ headers: headers });
            this.http.post('https://bsearch.ivanportugal.com/search?query=' + query, {}, options)
                .map(response => response.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
}
