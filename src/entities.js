import { makeDomainSelectorCreator } from './assets/core'

export const ns = '';
export const createDomainSelector = makeDomainSelectorCreator(ns);