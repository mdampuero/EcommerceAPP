import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firebase = {};
  constructor() {
    this.loadStorage();
  }
  save(firebase) {
    this.firebase = firebase;
    this.saveStorage();
  }
  loadStorage() {
    if (JSON.parse(localStorage.getItem("firebase"))) {
      this.firebase = JSON.parse(localStorage.getItem("firebase"));
    }
  }
  saveStorage() {
    localStorage.setItem("firebase", JSON.stringify(this.firebase));
  }
}
