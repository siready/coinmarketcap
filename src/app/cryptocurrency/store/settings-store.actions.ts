import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { ISettings } from './cryptocurrency-store.model';

// Flux-standard-action gives us stronger typing of our actions.
export type SettingsActionType = FluxStandardAction<ISettings>;

@Injectable({
  providedIn: 'root'
})
export class SettingsActions {

  static readonly SETTINGS_SAVE = 'SETTINGS_SAVE';

  @dispatch()
  save = (
    payload: ISettings,
  ): SettingsActionType => ({
    type: SettingsActions.SETTINGS_SAVE,
    payload,
  })

}
