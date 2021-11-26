import { combineReducers, Reducer } from 'redux';
/// import { connectRouter } from 'connected-react-router';
import admin, {
  getResources as adminGetResources,
  getReferenceResource as adminGetReferenceResource,
  getPossibleReferenceValues as adminGetPossibleReferenceValues,
} from './admin';
export { getNotification } from './admin/notifications';

interface CustomReducers {
    [key: string]: Reducer;
}

export default (customReducers: CustomReducers) =>
    combineReducers({
        admin,
///         router: connectRouter(history),
        ...customReducers,
    });

export const getPossibleReferenceValues = (state: any, props: any) =>
    adminGetPossibleReferenceValues(state.admin, props);
export const getResources = (state: any) => adminGetResources(state.admin);
export const getReferenceResource = (state: any, props: any) =>
    adminGetReferenceResource(state.admin, props);

export { getPossibleReferences } from './admin';
