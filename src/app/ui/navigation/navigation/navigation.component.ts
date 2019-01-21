import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Output() homeButtonClicked: EventEmitter<void> = new EventEmitter();
  @Output() settingsButtonClicked: EventEmitter<void> = new EventEmitter();

  faCog = faCog;

  constructor() { }

  homeButtonClickedEvent(): void {
    this.homeButtonClicked.next();
  }

  settingsButtonClickedEvent(): void {
    this.settingsButtonClicked.next();
  }

}
