import { Component, OnInit } from '@angular/core';
import { FavoriteService } from "src/app/services/favorite/favorite.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(public favoriteService: FavoriteService) { }

  ngOnInit() {
  }

}
