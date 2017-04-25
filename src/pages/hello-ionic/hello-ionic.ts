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
    nonVisibleItems: Verse[];
    pageSize = 30;
    currentIndex = 0;
    constructor(public verseProvider: VerseProvider, public toastCtrl: ToastController) {
        this.initializeItems();
    }
    initializeItems() {
        this.items = [];
        this.nonVisibleItems = [];
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
                        this.nonVisibleItems = verses;
                        this.currentIndex = 0;
                        this.doInfinite(null);
                    },
                    err => {
                        // Nope!
                        this.items = [];
                        this.nonVisibleItems = [];
                        this.toastify(err);
                    });
            // this.items = this.items.filter((item) => {
            //     return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            // })
        } else {
            this.items = [];
            this.nonVisibleItems = [];
        }
    }

    doInfinite(infiniteScroll) {
        for (let i = 0; i < this.pageSize; i++) {
            if(this.currentIndex > this.nonVisibleItems.length - 1) {
                // Reached the end
                break;
            }
            this.items.push(this.nonVisibleItems[this.currentIndex]);
            this.currentIndex++;
        }
        if(infiniteScroll) {
            infiniteScroll.complete();
        }
    }

    toastify(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 4000
        });
        toast.present();
    }
}
