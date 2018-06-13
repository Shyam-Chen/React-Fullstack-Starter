import { combineReducers, createStore, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';

import appEpic from '~/epics';
import appReducer from '~/reducer';
import watchApp from '~/sagas';
import { crudReducer } from '~/crud-operations/crud';
import { restEpic, restReducer, watchRest } from '~/crud-operations/rest';
import { graphqlReducer } from '~/crud-operations/graphql';
import { formControls } from '~/form-controls';
import { dataTableReducer } from '~/data-table';
import { authorizationReducer } from '~/authorization';
import { counterEpic, counterReducer, watchCounter } from '~/playground/counter';

const rootEpic = combineEpics(
  appEpic,

  counterEpic,
  restEpic,
);

const rootReducer = combineReducers({
  app: appReducer,
  router: routerReducer,

  counter: counterReducer,
  crud: crudReducer,
  rest: restReducer,
  graphql: graphqlReducer,
  formControls,
  dataTable: dataTableReducer,
  authorization: authorizationReducer,
});

const rootSaga = function *() {
  yield all([
    watchApp(),

    watchCounter(),
    watchRest(),
  ]);
};

export default (history, preloadedState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      createEpicMiddleware(rootEpic),
      sagaMiddleware,
      createLogger({ diff: true }),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
