import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreformattedPage } from './preformatted.page';

describe('PreformattedPage', () => {
  let component: PreformattedPage;
  let fixture: ComponentFixture<PreformattedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreformattedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreformattedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
