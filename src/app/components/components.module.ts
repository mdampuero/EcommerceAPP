import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SliderOffersComponent } from "./slider-offers/slider-offers.component";
import { ProductsSalientComponent } from "./products-salient/products-salient.component";
import { BtnAddCartComponent } from "./btn-add-cart/btn-add-cart.component";
import { BtnRemCartComponent } from "./btn-rem-cart/btn-rem-cart.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { PriceComponent } from "./price/price.component";
import { IconCartComponent } from "./icon-cart/icon-cart.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CartButtonsComponent } from "./cart-buttons/cart-buttons.component";
import { SliderProductComponent } from "./slider-product/slider-product.component";
import { EmptyComponent } from "./empty/empty.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../pipes/pipes.module";
import { AlertOrderComponent } from "./alert-order/alert-order.component";
import { TreeItemComponent } from "./tree-item/tree-item.component";

@NgModule({
  declarations: [
    SliderOffersComponent,
    ProductsSalientComponent,
    BtnAddCartComponent,
    BtnRemCartComponent,
    FavoritesComponent,
    IconCartComponent,
    PriceComponent,
    ProductCardComponent,
    ProductItemComponent,
    NavbarComponent,
    EmptyComponent,
    CartButtonsComponent,
    AlertOrderComponent,
    SliderProductComponent,
    TreeItemComponent
  ],
  exports: [
    SliderOffersComponent,
    ProductsSalientComponent,
    BtnAddCartComponent,
    BtnRemCartComponent,
    FavoritesComponent,
    IconCartComponent,
    PriceComponent,
    ProductCardComponent,
    ProductItemComponent,
    EmptyComponent,
    NavbarComponent,
    CartButtonsComponent,
    AlertOrderComponent,
    SliderProductComponent,
    TreeItemComponent
  ],
  imports: [CommonModule, IonicModule, PipesModule, FormsModule],
})
export class ComponentsModule {}
