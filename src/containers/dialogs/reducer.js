import { handleActions } from 'redux-actions'
import { Map } from 'immutable';

import { OPEN_MODAL, CLOSE_MODAL } from './constants';

export const initialState = Map({
	status: 'INIT'
});

const modal_reducer = handleActions(
	{
		[OPEN_MODAL]: {
			next(state, action) {

				console.log(action)
				return state.withMutations((mutableState) => {
					mutableState.set('open_modal', true);
				});
			}
		},
		[CLOSE_MODAL]: {
			next(state, action) {
				return state.withMutations((mutableState) => {
					mutableState.set('open_modal', false);
				});
			}
		}
	},
	initialState
);

export default modal_reducer;
