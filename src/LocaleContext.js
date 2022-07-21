import React from "react";

const defaultValue = {
  locale: process.env.REACT_APP_LOCALE,
  setLocale: () => {},
};

export default React.createContext(defaultValue);
