import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlyerPage } from './flyer.page';

describe('FlyerPage', () => {
  let component: FlyerPage;
  let fixture: ComponentFixture<FlyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlyerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
