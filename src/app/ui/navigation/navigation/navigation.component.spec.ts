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
    expect(spectator).toBeTruthy();
  });

  it('should emit home button clicked event', () => {
    spectator = createComponent({}, false);
    const homeButtonEventSpy = jasmine.createSpy();
    spectator.output<void>('homeButtonClicked').subscribe(_ => homeButtonEventSpy());

    spectator.component.homeButtonClickedEvent();
    spectator.detectChanges();
    expect(homeButtonEventSpy.calls.count()).toEqual(1);
  });

  it('should emit settings button clicked event', () => {
    spectator = createComponent({}, false);
    const settingsButtonEventSpy = jasmine.createSpy();
    spectator.output<void>('settingsButtonClicked').subscribe(_ => settingsButtonEventSpy());

    spectator.component.settingsButtonClickedEvent();
    spectator.detectChanges();
    expect(settingsButtonEventSpy.calls.count()).toEqual(1);
  });
});
