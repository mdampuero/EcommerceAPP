import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public user = {
    id: null,
    name: null,
    email: null,
    document: null,
    phone: null,
    address: null,
    city: null,
    provence: null,
  };
  constructor() {
    this.loadStorage();
  }
  login(user) {
    this.user = user;
    this.saveStorage();
  }
  loadStorage() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }
  saveStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  logout() {
    this.user = {
      id: null,
      name: null,
      email: null,
      document: null,
      phone: null,
      address: null,
      city: null,
      provence: null,
    };
    this.saveStorage();
  }
  // public user = {
  //   address: "Barrio Alto Rodeo B-25 KM11",
  //   city: "Guaymallén",
  //   createdAt: "2020-05-17T15:09:27+00:00",
  //   document: "20303856022",
  //   email: "mdampuero@gmail.com",
  //   id: "66afb4d8-9850-11ea-8907-06c4c59186ed",
  //   isDelete: false,
  //   isSeller: false,
  //   name: "Mauricio Ampuero",
  //   observations: "Cliente",
  //   password: "123456",
  //   phone: "2616636938",
  //   provence: "Mendoza",
  //   updatedAt: "2020-05-17T15:09:27+00:00"
  // };
}
