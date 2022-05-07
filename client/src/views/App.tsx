import React, { PropsWithChildren } from "react";
import AppProvider from "../providers/AppProvider";
import styled from "styled-components";
import UserComponent from "../components/UserComponent/UserComponent";
import ListComponent from "../components/ListComponent/ListComponent";
import Info from "../components/InfoComponent/Info";

const App = (props: PropsWithChildren<{}>) => {
  return (
    <AppProvider>
      <Wrapper className="v">
        <Info />
        <UserComponent />
        <ListComponent />
      </Wrapper>
    </AppProvider>
  );
};

export const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  margin: 25px;
`;

export default App;
