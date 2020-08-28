import { Component, OnInit, Input } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { FavoriteService } from "src/app/services/favorite/favorite.service";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnInit {
  @Input() product: any;
  @Input() size = "large";

  constructor(
    public toastCtrl: ToastController,
    public favoriteService: FavoriteService
  ) {}
  ngOnInit() {
    if (
      this.favoriteService.list.find(
        (listData) => listData.code === this.product.code
      )
    ) {
      this.product.isFavorite = true;
    }
  }
  isFavorite(item) {
    if (!item.isFavorite) {
      // this.toast({
      //   text: "Producto agregado a favoritos",
      //   color: "primary",
      // });
      this.favoriteService.add(item);
    } else {
      // this.toast({
      //   text: "Producto eliminado de favoritos",
      //   color: "warning",
      // });
      this.favoriteService.delete(item);
    }
    item.isFavorite = !item.isFavorite;
  }

  async toast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message.text,
      duration: 2000,
      animated: true,
      color: message.color,
      translucent: true,
      buttons: [
        {
          text: "Ok",
          role: "cancel",
        },
      ],
    });
    toast.present();
  }
}
