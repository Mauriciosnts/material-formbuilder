import { OPEN_MODAL, CLOSE_MODAL, SET_OPTION } from './constants';

export const openOptionsModal = (payload) => {
	console.log(payload, 'callmodal')
	return {
		type: OPEN_MODAL,
		payload
	};
};

export const closeOptionsModal = (payload) => {
	return {
		type: CLOSE_MODAL,
		payload
	};
};
 