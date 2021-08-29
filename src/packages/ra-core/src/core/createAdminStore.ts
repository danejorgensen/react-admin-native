import { createStore, compose, applyMiddleware } from 'redux';
/// import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
/// import { History } from 'history';

import {
  AuthProvider,
  DataProvider,
  I18nProvider,
  InitialState,
} from '../types';
import createAppReducer from '../reducer';
import { adminSaga } from '../sideEffect';
///import { CLEAR_STATE } from '../actions/clearActions';

///interface Window {
///    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (traceOptions: object) => Function;
///}

interface Params {
    dataProvider: DataProvider;
///    history: History;
    authProvider?: AuthProvider | null;
    customReducers?: any;
    customSagas?: any[];
    i18nProvider?: I18nProvider;
    initialState?: InitialState;
    locale?: string;
}

export default ({
///    dataProvider,
///    history,
    customReducers = {},
///    authProvider = null,
    customSagas = [],
    initialState,
}: Params) => {
    const appReducer = createAppReducer(customReducers);

///    const resettableAppReducer = (state, action) =>
///        appReducer(
///            action.type !== CLEAR_STATE
///                ? state
///                : // Erase data from the store but keep location, notifications, ui prefs, etc.
///                  // This allows e.g. to display a notification on logout
///                  {
///                      ...state,
///                      admin: {
///                          ...state.admin,
///                          loading: 0,
///                          resources: {},
///                          customQueries: {},
///                          references: { oneToMany: {}, possibleValues: {} },
///                      },
///                  },
///            action
///        );
    const saga = function* rootSaga() {
        yield all(
            [adminSaga(), ...customSagas].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();
///    const typedWindow = typeof window !== 'undefined' && (window as Window);
/// 
///    const composeEnhancers =
///        (process.env.NODE_ENV === 'development' &&
///            typeof typedWindow !== 'undefined' &&
///            typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
///            typedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
///                trace: true,
///                traceLimit: 25,
///            })) ||
///        compose;

    const store = createStore(
        appReducer,
        typeof initialState === 'function' ? initialState() : initialState,
        compose(
            applyMiddleware(sagaMiddleware)
        )
    );
    sagaMiddleware.run(saga);
    return store;
};
