import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrScanPage } from './qr-scan.page';

describe('QrScanPage', () => {
  let component: QrScanPage;
  let fixture: ComponentFixture<QrScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
