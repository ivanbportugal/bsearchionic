import { Component } from '@angular/core';
import { VerseProvider } from '../../providers/verse-provider';

@Component({
  templateUrl: 'hello-ionic.html',
  providers: [VerseProvider]
})
export class HelloIonicPage {
    searchQuery: string = '';
    items: string[];
    constructor(public verseProvider: VerseProvider) {
        this.initializeItems();
    }
    initializeItems() {
        this.items = [];
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.trim().length > 2) {
            this.verseProvider.search(val)
                .then(data => {
                    console.log(data);
                    this.items = <Array<any>>data;
                });
            // this.items = this.items.filter((item) => {
            //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // })
        } else {
            this.items = [];
        }
    }
}
