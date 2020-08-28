import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BtnRemCartComponent } from './btn-rem-cart.component';

describe('BtnRemCartComponent', () => {
  let component: BtnRemCartComponent;
  let fixture: ComponentFixture<BtnRemCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnRemCartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BtnRemCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
