import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { patternLockReducer } from './reducers';

export default function configureStore (initialState) {
    return createStore(patternLockReducer, initialState, devToolsEnhancer());
}