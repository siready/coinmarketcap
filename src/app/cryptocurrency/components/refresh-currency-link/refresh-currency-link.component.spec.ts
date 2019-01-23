import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshCurrencyLinkComponent } from './refresh-currency-link.component';

describe('RefreshCurrencyLinkComponent', () => {
  let component: RefreshCurrencyLinkComponent;
  let fixture: ComponentFixture<RefreshCurrencyLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshCurrencyLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshCurrencyLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
