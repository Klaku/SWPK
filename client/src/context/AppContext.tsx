import React, { PropsWithChildren } from "react";
interface IAppContext {
  host: string;
}
const defaultContext: IAppContext = {
  host: "http://localhost:3001",
};
export const AppContext = React.createContext(defaultContext);

export const AppContextWrapper = (props: PropsWithChildren<{}>) => {
  return (
    <AppContext.Provider value={defaultContext}>
      {props.children}
    </AppContext.Provider>
  );
};
