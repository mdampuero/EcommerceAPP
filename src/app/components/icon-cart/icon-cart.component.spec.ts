import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IconCartComponent } from './icon-cart.component';

describe('IconCartComponent', () => {
  let component: IconCartComponent;
  let fixture: ComponentFixture<IconCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconCartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IconCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
