// import CoreAdmin from './packages/ra-core/src/core/CoreAdmin';
// import createAdminStore from './packages/ra-core/src/core/createAdminStore';
import raDataJsonServer from './packages/ra-data-json-server/src/index';
import useLogin from './packages/ra-core/src/auth/useLogin';
import useLogout from './packages/ra-core/src/auth/useLogout';
// import * as fetchUtils from './packages/ra-core/src/dataProvider/fetch';

export * from './packages/ra-core/src/core';
export * from './packages/ra-core/src/dataProvider';

export {
//  CoreAdmin,
//  createAdminStore,
//   fetchUtils,
  raDataJsonServer,
  useLogin,
  useLogout,
};
