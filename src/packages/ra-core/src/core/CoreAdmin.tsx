import * as React from 'react';
/// import { ComponentType } from 'react';

import CoreAdminContext from './CoreAdminContext';
/// import CoreAdminUI from './CoreAdminUI';
import { AdminProps } from '../types';

const CoreAdmin = ({
  authProvider,
  children,
  customReducers,
///  customRoutes = [],
  customSagas,
  dataProvider
}: AdminProps) => {
  return (
    <CoreAdminContext
      authProvider={authProvider}
      customReducers={customReducers}
      customSagas={customSagas}
      dataProvider={dataProvider}>
      {children}
    </CoreAdminContext>
  );
};

export default CoreAdmin;
