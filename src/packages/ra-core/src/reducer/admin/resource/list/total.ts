import { Reducer } from 'redux';
import {
    CRUD_GET_LIST_SUCCESS,
    CrudGetListSuccessAction,
} from '../../../../actions/dataActions';
import { DELETE, DELETE_MANY } from '../../../../core/dataFetchActions';

type ActionTypes =
    | CrudGetListSuccessAction
    | {
          type: 'OTHER_TYPE';
          payload?: { ids: string[] };
          meta?: { optimistic?: boolean; fetch?: string };
      };

type State = number;

// @ts-ignore
const totalReducer: Reducer<State> = (
    previousState: any = null,
    action: ActionTypes
) => {
    if (action.type === CRUD_GET_LIST_SUCCESS) {
        return action.payload.total;
    }
    if (action.meta && action.meta.optimistic) {
        if (action.meta.fetch === DELETE) {
            return previousState === null ? null : previousState - 1;
        }
        if (action.meta.fetch === DELETE_MANY) {
            return previousState === null
                ? null
                // @ts-ignore
                : previousState - action.payload.ids.length;
        }
    }
    return previousState;
};

export default totalReducer;
