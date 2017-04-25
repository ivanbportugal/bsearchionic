import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { VerseProvider } from '../../providers/verse-provider';
import { Verse as Verse } from '../../app/verse';

@Component({
  templateUrl: 'hello-ionic.html',
  providers: [VerseProvider]
})
export class HelloIonicPage {
    searchQuery: string = '';
    items: Verse[];
    constructor(public verseProvider: VerseProvider, public toastCtrl: ToastController) {
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
                .subscribe(
                    verses => {
                        // Success
                        this.items = verses;
                    },
                    err => {
                        // Nope!
                        this.items = [];
                        this.toastify(err);
                    });
            // this.items = this.items.filter((item) => {
            //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // })
        } else {
            this.items = [];
        }
    }

    toastify(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }
}
