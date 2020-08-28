import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() search = false;
  @Input() menu = true;
  @Input() cart = true;
  @Input() title = null;
  constructor() { }

  ngOnInit() {}

}
