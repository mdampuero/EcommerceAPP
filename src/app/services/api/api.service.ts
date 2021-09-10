import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Product } from "../../models/product";
import { LoginService } from "src/app/services/login/login.service";
import { FirebaseService } from "src/app/services/firebase/firebase.service";
import { environment } from "src/environments/environment";
import { CartService } from "src/app/services/cart/cart.service";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public limit = 30;
  public offset = 0;
  public sort = "name";
  public direction = "DESC";
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private firebaseService: FirebaseService,
    public cartService: CartService
  ) {
  }

  search(query: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}products?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`
      )
      .pipe(
        map((data) => {
          const results: Product[] = [];
          data["data"].forEach((myObject, index) => {
            myObject.cost =
              myObject.price *
              this.loginService.user["customerCategory"].discount;
            results.push(new Product(myObject));
          });
          let response = {
            results: results,
            recordsFiltered: data["recordsFiltered"],
            recordsTotal: data["recordsTotal"],
            offset: data["offset"],
            limit: data["limit"],
          };
          return response;
        })
      );
  }

  getByCategory(categoryId: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}productCategories/${categoryId}/products?start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`
      )
      .pipe(
        map((data) => {
          const results: Product[] = [];
          data["data"].forEach((myObject, index) => {
            myObject.cost =
              myObject.price *
              this.loginService.user["customerCategory"].discount;
            results.push(new Product(myObject));
          });
          let response = {
            results: results,
            recordsFiltered: data["recordsFiltered"],
            recordsTotal: data["recordsTotal"],
            offset: data["offset"],
            limit: data["limit"],
          };
          return response;
        })
      );
  }
  
  searchCategories() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}productCategories?search%5Bvalue%5D=&start=${this.offset}&length=100&sort=name&direction=ASC`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getOrders() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}customers/${this.loginService.user.id}/orders?start=${this.offset}&length=${this.limit}`
      )
      .pipe(
        map((data) => {
          let response = {
            results: data["data"],
            recordsFiltered: data["recordsFiltered"],
            recordsTotal: data["recordsTotal"],
            offset: data["offset"],
            limit: data["limit"],
          };
          return response;
        })
      );
  }

  getOffers() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}offersActive`
      )
      .pipe(
        map((data) => {
          const results: any[] = [];
          data["data"].forEach((myObject, index) => {
            if(myObject.type=='BY_PRODUCT'){
              myObject.product.cost = myObject.product.price * this.loginService.user["customerCategory"].discount;
            }
          });
          return data;
        })
      );
  }

  getSalients() {
    return this.http.get(`${environment.baseUrl}${environment.apiUrl}salients?search%5Bvalue%5D=&start=0&length=100`).pipe(
      map((data: any[]) => {
        return data['data'];
      })
    );
  }

  getPreformatteds() {
    return this.http.get(`${environment.baseUrl}${environment.apiUrl}preformatteds?search%5Bvalue%5D=&start=0`);
  }
  
  getPreformattedsItems(id:string) {
    return this.http.get(`${environment.baseUrl}${environment.apiUrl}preformattedsItemsByPreformatted/${id}?length=-1&search[value]=`)
    .pipe(
      map((data) => {
        console.log(data["data"]);   
        const results: Product[] = [];
        data["data"].forEach((myObject: { product: any;title:string }, index: any) => {
          let product=myObject.product;
          if(product){
            product.cost = product.price * this.loginService.user["customerCategory"].discount;
            results.push(new Product(product));
          }else{
            let producto={
              barcode: null,
              brand: null,
              category: null,
              code: null,
              cost: 0,
              currency: null,
              description: null,
              id: null,
              isFavorite: false,
              isUpdate: false,
              name: myObject.title,
              picture: null,
              pictures: [],
              price:0,
              tags: null,
              unit: 0,
              vat:0
            };    
            results.push(new Product(producto));
          }      
        });
        let response = {
          results: results,
          recordsFiltered: data["recordsFiltered"],
          recordsTotal: data["recordsTotal"],
          offset: data["offset"],
          limit: data["limit"],
        };        
        return response;
      })
    );
  }
  
  getRelated(code) {
    return this.http.get(`${environment.baseUrl}${environment.apiUrl}products/${code}/related`).pipe(
      map((data: any[]) => {
        return data;
      })
    );
  }

  configs() {
    return this.http.get(`${environment.baseUrl}${environment.apiUrl}configs`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  sendOrder(cartService, observations,customerName,transport) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}orders`, {
      observations: observations,
      customerName: customerName,
      transport: transport,
      channel: "APP",
      total: cartService.total,
      totalVat: cartService.totalVat,
      customerId: this.loginService.user.id,
      items: cartService.list,
    });
  }
  
  shareOrder(cartService) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}budgets`, {
      observations: '',
      customerName: '',
      transport: '',
      channel: "APP",
      total: cartService.total,
      totalVat: cartService.totalVat,
      customerId: this.loginService.user.id,
      items: cartService.list,
    });
  }

  login(username: string, password: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}login`, {
      username: username,
      password: password,
    });
  }

  register(user: any) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customers`, user);
  }

  sendEmail(orderId) {
    return this.http
      .get(`${environment.baseUrl}${environment.apiUrl}orders/email/${orderId}`, {})
      .subscribe(
        (data) => {},
        (error) => {},
        () => {}
      );
  }
  updateCustomer(user: any) {
    return this.http
      .put(
        `${environment.baseUrl}${environment.apiUrl}customers/${this.loginService.user.id}`, user
      );
  }
  refreshToken() {
    return this.http
      .put(
        `${environment.baseUrl}${environment.apiUrl}customers/${this.loginService.user.id}/refreshToken`,
        { token: this.firebaseService.firebase["token"] }
      )
      .subscribe(
        (data) => {},
        (error) => {},
        () => {}
      );
  }
}
