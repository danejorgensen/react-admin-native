import { createContext } from 'react';

import { DataProvider } from '../types';

const defaultProvider: DataProvider = {
  getList: (): Promise<any> => Promise.resolve(),
  getOne: (): Promise<any> => Promise.resolve(),
  getMany: (): Promise<any> => Promise.resolve(),
  getManyReference: (): Promise<any> => Promise.resolve(),
  update: (): Promise<any> => Promise.resolve(),
  updateMany: (): Promise<any> => Promise.resolve(),
  create: (): Promise<any> => Promise.resolve(),
  delete: (): Promise<any> => Promise.resolve(),
  deleteMany: (): Promise<any> => Promise.resolve()
};

const DataProviderContext = createContext<DataProvider>(defaultProvider);

DataProviderContext.displayName = 'DataProviderContext';

export default DataProviderContext;
