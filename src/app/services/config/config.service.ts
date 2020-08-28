import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public config = {};
  constructor() {
    this.loadStorage();
  }
  save(config) {
    this.config = config;
    this.saveStorage();
  }
  loadStorage() {
    if (JSON.parse(localStorage.getItem("config"))) {
      this.config = JSON.parse(localStorage.getItem("config"));
    }
  }
  saveStorage() {
    localStorage.setItem("config", JSON.stringify(this.config));
  }
}
