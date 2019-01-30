import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { createTestComponentFactory, Spectator } from '@netbasal/spectator';
import { MockComponent } from 'ng-mocks';

import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {

  let spectator: Spectator<NavigationComponent>;
  const createComponent = createTestComponentFactory({
    component: NavigationComponent,
     declarations: [
       MockComponent(FaIconComponent)
     ]
  });

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
    expect(spectator.query('nav')).toHaveLength(1);
  });

  it('should emit home button clicked event', () => {
    spectator = createComponent({}, false);
    const homeButtonEventSpy = jasmine.createSpy();
    spectator.output<void>('homeButtonClicked').subscribe(_ => homeButtonEventSpy());

    spectator.click('nav > button');
    spectator.detectChanges();
    expect(homeButtonEventSpy.calls.count()).toEqual(1);
  });

  it('should emit settings button clicked event', () => {
    spectator = createComponent({}, false);
    const settingsButtonEventSpy = jasmine.createSpy();
    spectator.output<void>('settingsButtonClicked').subscribe(_ => settingsButtonEventSpy());

    spectator.click('nav > div');
    spectator.detectChanges();
    expect(settingsButtonEventSpy.calls.count()).toEqual(1);
  });
});
