import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Flyer } from './cart.page';

describe('Flyer', () => {
  let component: Flyer;
  let fixture: ComponentFixture<Flyer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Flyer ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Flyer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
