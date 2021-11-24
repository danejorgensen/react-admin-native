import * as React from 'react';
/// import { FunctionComponent, ComponentType, useContext, useState } from 'react';
import { useContext, useState } from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
/// import { History } from 'history';
/// import { createHashHistory } from 'history';
/// import { ConnectedRouter } from 'connected-react-router';

import { AuthContext } from '../auth';
import { DataProviderContext } from '../dataProvider';
import createAdminStore from './createAdminStore';
/// import TranslationProvider from '../i18n/TranslationProvider';
import {
  AuthProvider,
///     LegacyAuthProvider,
///     I18nProvider,
  DataProvider,
///     AdminChildren,
///     CustomRoutes,
///     DashboardComponent,
///     LegacyDataProvider,
  InitialState,
} from '../types';

export interface AdminContextProps {
  authProvider: AuthProvider;
  children?: any; /// AdminChildren;
  customReducers?: object;
  customSagas?: any[];
///     customRoutes?: CustomRoutes;
///     dashboard?: DashboardComponent;
  dataProvider: DataProvider; /// | LegacyDataProvider;
///     history?: History;
///     i18nProvider?: I18nProvider;
  initialState?: InitialState;
///     theme?: object;
}

const CoreAdminContext = ({
  authProvider,
///     i18nProvider,
  children,
///     history,
  customReducers,
  customSagas,
///     customRoutes,
  dataProvider,
  initialState,
}: AdminContextProps) => {
    const reduxIsAlreadyInitialized = !!useContext(ReactReduxContext);

    if (!dataProvider) {
        throw new Error(`Missing dataProvider prop.
React-admin requires a valid dataProvider function to work.`);
    }

    const finalAuthProvider = authProvider;
///     const finalAuthProvider =
///         authProvider instanceof Function
///             ? convertLegacyAuthProvider(authProvider)
///             : authProvider;
/// 
    const finalDataProvider = dataProvider;
///     const finalDataProvider =
///         dataProvider instanceof Function
///             ? convertLegacyDataProvider(dataProvider)
///             : dataProvider;
/// 
///     const finalHistory = history || createHashHistory();
/// 

    const renderCore = () => {
      return (
        <AuthContext.Provider value={finalAuthProvider}>
          <DataProviderContext.Provider value={finalDataProvider}>
            {children}
          </DataProviderContext.Provider>
        </AuthContext.Provider>
      );
    };

///     const renderCore = () => {
///         return (
///             <AuthContext.Provider value={finalAuthProvider}>
///                 <DataProviderContext.Provider value={finalDataProvider}>
///                     <TranslationProvider i18nProvider={i18nProvider}>
///                         {typeof window !== 'undefined' ? (
///                             <ConnectedRouter history={finalHistory}>
///                                 {children}
///                             </ConnectedRouter>
///                         ) : (
///                             children
///                         )}
///                     </TranslationProvider>
///                 </DataProviderContext.Provider>
///             </AuthContext.Provider>
///         );
///     };
/// 
    const [store] = useState(() =>
        !reduxIsAlreadyInitialized
            ? createAdminStore({
                  authProvider: finalAuthProvider,
                  customReducers,
                  customSagas,
                  dataProvider: finalDataProvider,
                  initialState,
///                   history: finalHistory,
              })
            : undefined
    );

    if (reduxIsAlreadyInitialized) {
///         if (!history) {
///             throw new Error(`Missing history prop.
/// When integrating react-admin inside an existing redux Provider, you must provide the same 'history' prop to the <Admin> as the one used to bootstrap your routerMiddleware.
/// React-admin uses this history for its own ConnectedRouter.`);
///         }
        return renderCore();
    } else {
      // @ts-ignore
        return <Provider store={store}>{renderCore()}</Provider>;
    }
};

export default CoreAdminContext;
