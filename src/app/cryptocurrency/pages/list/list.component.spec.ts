import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { byText, createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';
import { IAppState } from 'src/app/store/store.model';

import { RefreshCurrencyLinkComponent } from '../../components/refresh-currency-link/refresh-currency-link.component';
import { AvailableCurrencies, ICurrency, ICurrencyItemType } from '../../store/cryptocurrency-store.model';
import { ListComponent } from './list.component';

const setLoadingSelector = (value: boolean) =>
  MockNgRedux.getSelectorStub<IAppState, boolean>(x => x.currencyModule.currencies.loading)
    .next(value);

describe('ListComponent', () => {

  let spectator: Spectator<ListComponent>;
  const createComponent = createTestComponentFactory({
    component: ListComponent,
    declarations: [
      MockComponent(RefreshCurrencyLinkComponent)
    ],
    imports: [
      CommonModule,
      RouterTestingModule,
      NgReduxTestingModule
    ]
  });

  beforeEach(() => {
    MockNgRedux.reset();
    spyOn(MockNgRedux.getInstance(), 'getState').and.callFake(() => ({
      currencyModule: { settings: { uiCurrency: AvailableCurrencies.USD } }
    } as RecursivePartial<IAppState>));
  });

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('should show no data text', () => {
    spectator = createComponent();
    expect(spectator.queryAll(byText(/no data./i)).length).toBe(1, 'no data message');
  });

  it('should show records in table', () => {
    spectator = createComponent({}, false);

    // not too happy about mocking each selector separately
    setLoadingSelector(false);
    MockNgRedux.getSelectorStub<IAppState, RecursivePartial<ICurrencyItemType>>(x => x.currencyModule.currencies.items)
      .next({
        second: { rank: 2, symbol: 'DEF', quote: { USD: { price: 3, percentChange24Hours: 0.01 } } },
        test: { rank: 1, symbol: 'ABC', quote: { USD: { price: 1, percentChange24Hours: 0.25 } } },
      });

    spectator.detectChanges();

    expect(spectator.queryAll('table > tbody > tr').length).toBe(2, 'two records in table');
    expect(spectator.query('table > tbody > tr:nth-child(1) > td:nth-child(4)')).toHaveText('25%');
    expect(spectator.query('table > tbody > tr:nth-child(2) > td:nth-child(1)')).toHaveText('2');
  });

  it('should be loading data', () => {
    spectator = createComponent({}, false);

    setLoadingSelector(true);

    spectator.detectChanges();

    expect(spectator.queryAll('table > thead > tr').length).toBe(1, 'table header');
    expect(spectator.queryAll('table > tbody > tr').length).toBe(0, 'no records in table');
  });

  it('should return id', () => {
    spectator = createComponent();
    const item: RecursivePartial<ICurrency> = { id: 3 };
    expect(spectator.component.trackByFn(1, (item as ICurrency))).toBe(3, 'trackByFn returns item id');
  });

});
