import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";

const sagaMiddleWare = createSagaMiddleware();

export const store = configureStore({ reducer: rootReducer, middleware: [sagaMiddleWare] })

sagaMiddleWare.run(rootSaga)