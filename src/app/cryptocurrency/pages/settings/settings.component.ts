import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, filter, take } from 'rxjs/operators';
import { IAppState } from 'src/app/store/store.model';

import { AvailableCurrencies, ISettings } from '../../store/cryptocurrency-store.model';
import { SettingsActions } from '../../store/settings-store.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {

  settingsForm: FormGroup;
  availableCurrencies = Object.values(AvailableCurrencies).filter(x => typeof x === 'string');
  private formSubscription: Subscription;

  constructor(private ngRedux: NgRedux<IAppState>, private formBuilder: FormBuilder, private settingsActions: SettingsActions) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      uiCurrency: [this.ngRedux.getState().currencyModule.settings.uiCurrency, Validators.required]
    });

    this.formSubscription = this.settingsForm.valueChanges.subscribe(
      () => this.submitForm()
    );
  }

  private submitForm(): void {
    if (!this.settingsForm.valid) {
      return;
    }

    const formResult: ISettings = Object.assign({}, this.settingsForm.value);
    this.settingsActions.save(formResult);
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

}
