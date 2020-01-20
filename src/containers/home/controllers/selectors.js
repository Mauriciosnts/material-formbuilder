import { createSelector } from 'reselect';
import { createDomainSelector } from '../../../entities';



const modalDomain = createDomainSelector('form_builder');


export const selectModal = createSelector([ modalDomain ], (model) => {
	return model.get('open_modal');
}); 