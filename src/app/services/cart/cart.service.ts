import { Injectable } from "@angular/core";
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: "root",
})
export class CartService {
  list: Product[] = [];
  total = 0;
  totalVat = 0;
  totals;
  
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

  setTotals(){
    this.totals=[{symbol:"U$D",total:0,totalVat:0},{symbol:"$",total:0,totalVat:0}];
  }

  calcTotal() {
    this.total = 0;
    this.totalVat = 0;
    this.setTotals();
    this.list.forEach((myObject, index) => {
      this.total += myObject.subtotal;
      this.totalVat += myObject.subtotalVat;

      let total=this.totals.find((total) => total.symbol === myObject["currency"].symbol);
      total["total"]+=myObject.subtotal;
      total["totalVat"]+=myObject.subtotalVat;
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
