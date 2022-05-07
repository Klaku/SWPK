import React, { PropsWithChildren } from "react";
import { AppContextWrapper } from "../context/AppContext";
import { UserContextWrapper } from "../context/UserContext";

const AppProvider = (props: PropsWithChildren<{}>) => {
  return (
    <AppContextWrapper>
      <UserContextWrapper>{props.children}</UserContextWrapper>
    </AppContextWrapper>
  );
};

export default AppProvider;
