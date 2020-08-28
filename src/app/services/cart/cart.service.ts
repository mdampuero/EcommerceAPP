import { Injectable } from "@angular/core";
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: "root",
})
export class CartService {
  list: Product[] = [];
  total = 0;
  totalVat = 0;
  constructor() {
    this.loadStorage();
    this.calcTotal();
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

  clear() {
    this.list = [];
    this.saveStorage();
  }

  saveStorage() {
    this.calcTotal();
    localStorage.setItem("cart", JSON.stringify(this.list));
  }

  calcTotal() {
    this.total = 0;
    this.totalVat = 0;
    this.list.forEach((myObject, index) => {
      this.total += myObject.subtotal;
      this.totalVat += myObject.subtotalVat;
    });
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("cart"))) {
      this.list = JSON.parse(localStorage.getItem("cart"));
    }
  }

  update(item) {
    this.list.forEach((myObject, index) => {
      if (myObject.code === item.code) {
        this.list[index] = item;
      }
      this.saveStorage();
    });
  }

  delete(item) {
    this.list = this.list.filter((listData) => listData.code !== item.code);
    this.saveStorage();
  }
}
