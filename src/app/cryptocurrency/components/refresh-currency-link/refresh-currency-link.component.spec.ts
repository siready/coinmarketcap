import { createTestComponentFactory, Spectator } from '@netbasal/spectator';

import { CurrencyActions } from '../../store/currency-store.actions';
import { RefreshCurrencyLinkComponent } from './refresh-currency-link.component';

describe('RefreshCurrencyLinkComponent', () => {

  let spectator: Spectator<RefreshCurrencyLinkComponent>;
  const createComponent = createTestComponentFactory({
    component: RefreshCurrencyLinkComponent,
    mocks: [CurrencyActions],
  });

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('button')).toHaveText('Refresh');
  });

  it('should call loadAll on CurrencyActions', () => {
    spectator = createComponent();

    spectator.click('button');
    expect(spectator.get<CurrencyActions>(CurrencyActions).loadAll.calls.count()).toEqual(1);
  });

});
