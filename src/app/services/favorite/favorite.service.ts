import { Injectable } from "@angular/core";
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  list: Product[] = [];

  constructor() {
    this.loadStorage();
  }

  add(product: Product) {
    const productCart = new Product(product);
    this.list.push(productCart);
    this.saveStorage();
    return productCart.code;
  }

  get(code: string) {
    return this.list.find((listData) => listData.code === code);
  }

  saveStorage() {
    localStorage.setItem("favorite", JSON.stringify(this.list));
  }

  update(item) {
    this.list.forEach((myObject, index) => {
      if (myObject.code === item.code) {
        this.list[index] = item;
      }
      this.saveStorage();
    });
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("favorite"))) {
      this.list = JSON.parse(localStorage.getItem("favorite"));
    }
  }

  delete(item) {
    this.list = this.list.filter((listData) => listData.code !== item.code);
    this.saveStorage();
  }
}
