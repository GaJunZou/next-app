"use client";
import { produce } from "immer";
import React, { createContext, useContext, useEffect, useReducer } from "react";

const Ctx = createContext({});

export const useContainer = () => useContext(Ctx);

const reducer = produce((store, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SYSTEM_THEME":
      store.systemTheme = payload;
      window.localStorage.setItem("theme", payload);
      break;
    case "USER_DATA":
      store.userData = payload;
      break;
    case "SCHEDULE_ITEMS":
      store.scheduleItems = payload;
      break;
    case "VIEW_MODE":
      window.localStorage.setItem("view_mode", payload);
      store.viewMode = payload;
      break;
    case "SET_IS_DESKTOP":
      store.isDesktop = payload;
      break;
    default:
      throw new Error();
  }
  console.log(`%c Update Type: ${type}`, "color: #00b96b;font-size: 16px;");
  return store;
});

export function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, {
    userData: null,
    scheduleItems: [],
    isDesktop: true,
    systemTheme: "dark",
    viewMode: "month",
  });

  useEffect(() => {
    const systemTheme = window.localStorage.getItem("theme");
    if (systemTheme) {
      dispatch({
        type: "SYSTEM_THEME",
        payload: systemTheme,
      });
    }
    const viewMode = window.localStorage.getItem("view_mode");
    if (viewMode) {
      dispatch({
        type: "VIEW_MODE",
        payload: viewMode,
      });
    }
  }, []);

  useEffect(() => {
    console.log("%c Dispatch Store: %o", "color: #00b96b;font-size: 16px;", store);
  }, [store]);

  return <Ctx.Provider value={{ store, dispatch }}>{children}</Ctx.Provider>;
}

function useChange(callback) {
  const { store } = useContainer();
  useEffect(() => {}, [store]);
}
