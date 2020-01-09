import { createSelector } from 'reselect';

export const makeDomainSelectorCreator = ns => reducerName =>
    createSelector(state => state[reducerName], domainState => domainState);