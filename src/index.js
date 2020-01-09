import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

const sagaMiddleware = createSagaMiddleware();
let store = {};

const devTools =
  process.env.NODE_ENV === "development" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : null;

    store = devTools
    ? createStore(
        combineReducers(reducers),
        compose(
          applyMiddleware(sagaMiddleware),
          devTools //se precisar usar o devtools
        )
      )
    : createStore(
        combineReducers(reducers),
        compose(applyMiddleware(sagaMiddleware))
      );

sagaMiddleware.run(rootSaga);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
