import { put, takeEvery } from 'redux-saga/effects';
import { refreshView } from '../actions/uiActions';

export type RefreshSideEffect = boolean;

/**
 * Refresh Side Effects
 */
function* handleRefresh() {
    yield put(refreshView());
}

export default function* () {
    yield takeEvery(
        (action: any) => action.meta && action.meta.refresh,
        handleRefresh
    );
}
