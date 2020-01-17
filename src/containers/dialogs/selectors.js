import { createSelector } from 'reselect';
import { createDomainSelector } from '../../entities';



const modalDomain = createDomainSelector('modal_reducer');


export const selectModal = createSelector([ modalDomain ], (model) => {
	return model.get('open_modal');
});