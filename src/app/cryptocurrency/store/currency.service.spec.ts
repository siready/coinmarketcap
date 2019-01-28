import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createService, mockProvider } from '@netbasal/spectator';
import { cold } from 'jasmine-marbles';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ICurrencyListAPI } from './cryptocurrency-store.model';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  const spectator = createService({
    service: CurrencyService,
    imports: [NgReduxTestingModule],
    providers: [mockProvider(HttpClient)]
  });

  beforeAll(() => {
    MockNgRedux.getSelectorStub<IAppState, AvailableCurrencies>(x => x.currencyModule.settings.uiCurrency)
      .next(AvailableCurrencies.USD);
  });

  it('should return expected list of currencies', () => {
    const resultData: ICurrencyListAPI = {
      data: {
        'bitcoin': {
          id: 0, name: 'bitcoin', symbol: 'BTC', slug: 'bitcoin', circulatingSupply: 0, totalSupply: 0, rank: 1, quote: {
            'USD': {
              price: 1, volumeLast24Hours: 0, percentChange1Hour: 0, percentChange24Hours: 0, percentChange7Days: 0,
              marketCapitalization: 0
            }
          }
        }
      }
    };
    const httpClientSpy = spectator.get<HttpClient>(HttpClient);
    httpClientSpy.get.and.returnValue(cold('-x|', { x: resultData }));

    spectator.service.getList().subscribe(data => expect(data).toEqual(resultData.data));

    expect(httpClientSpy.get.calls.argsFor(0)).toEqual(['/api/currency/USD']);
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should fail http call', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
    const httpClientSpy = spectator.get<HttpClient>(HttpClient);
    httpClientSpy.get.and.returnValue(cold('-#|', null, errorResponse));

    // failed HTTP requests should be handled generally via HttpClient interceptor
    spectator.service.getList().subscribe(_ => _, error => expect(error.status).toBe(404));
  });
});
