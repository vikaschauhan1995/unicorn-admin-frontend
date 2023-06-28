import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import authSaga from './Auth/saga';
import subuserSaga from './Subuser/saga';
import permissionSaga from './Permission/saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware]
},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(subuserSaga);
sagaMiddleware.run(permissionSaga);