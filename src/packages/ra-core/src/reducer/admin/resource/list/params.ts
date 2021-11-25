import { Reducer } from 'redux';
import {
    CRUD_CHANGE_LIST_PARAMS,
    ChangeListParamsAction,
} from '../../../../actions/listActions';

const defaultState = {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
};

export interface ParamsState {
    sort: string | null;
    order: string | null;
    page: number;
    perPage: number | null;
    filter: any;
}

type ActionTypes =
    | ChangeListParamsAction
    | { type: 'OTHER_ACTION'; payload: any };

// @ts-ignore
const paramsReducer: Reducer<ParamsState> = (
    previousState = defaultState,
    action: ActionTypes
) => {
    switch (action.type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return action.payload;
        default:
            return previousState;
    }
};

export default paramsReducer;
