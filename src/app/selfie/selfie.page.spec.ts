import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelfiePage } from './selfie.page';

describe('SelfiePage', () => {
  let component: SelfiePage;
  let fixture: ComponentFixture<SelfiePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelfiePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
