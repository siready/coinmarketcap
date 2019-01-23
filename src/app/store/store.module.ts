import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { NgModule } from '@angular/core';
import { AnyAction } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { CRYPTOCURRENCY_MODULE_INIT_STATE } from '../cryptocurrency/store/cryptocurrency-store.model';
import { RootEpics } from './store.epics';
import { IAppState } from './store.model';
import { rootReducer } from './store.reducers';

const INITIAL_STATE: IAppState = {
  currencyModule: CRYPTOCURRENCY_MODULE_INIT_STATE
};

// The top-level reducers and epics that make up our app's logic.
@NgModule({
  imports: [NgReduxModule]
})
export class StoreModule {
  constructor(public store: NgRedux<IAppState>, devTools: DevToolsExtension, rootEpics: RootEpics) {
    const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, IAppState>();

    store.configureStore(
      rootReducer,
      INITIAL_STATE,
      [epicMiddleware],
      devTools.isEnabled() ? [devTools.enhancer()] : [],
    );

    epicMiddleware.run(combineEpics(...rootEpics.createEpics()));
  }
}
