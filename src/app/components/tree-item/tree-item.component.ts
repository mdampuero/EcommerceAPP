import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
})
export class TreeItemComponent implements OnInit {
  @Input() items: any[];
  constructor(private router: Router) { }

  ngOnInit() {
    //console.log(this.items);
  }

  goToCategory(item) {
    //console.log(item);
    this.router.navigate([`/categories/category`], {
      queryParams: item,
    });
  }
}
