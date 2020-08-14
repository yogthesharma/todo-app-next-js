import React, { createContext, useReducer, useContext } from "react";

const ContextDispatch = createContext();
const ContextCount = createContext();

const initVals = {
  user: null,
  nav: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "AddUserData":
      return { ...state, user: action.payload };
    case "NavType":
      return { ...state, nav: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initVals);
  return (
    <ContextDispatch.Provider value={dispatch}>
      <ContextCount.Provider value={state}>{children}</ContextCount.Provider>
    </ContextDispatch.Provider>
  );
};

export default Context;

export const userDispatch = () => useContext(ContextDispatch);
export const useCount = () => useContext(ContextCount);
