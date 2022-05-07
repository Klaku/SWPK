import React, { PropsWithChildren, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";
import Panel, { Title } from "../../templates/Panel.template";

const ListComponent = (props: PropsWithChildren<{}>) => {
  const context = useContext(UserContext);
  const appContext = useContext(AppContext);
  return (
    <Panel>
      <Title>Dostępni Użytkownicy</Title>
      {context.clients.map((x) => {
        return (
          <ListItemWrapper key={x.id}>
            <div>{x.name}</div>
            <div>
              <button
                onClick={() => {
                  fetch(appContext.host + "/bridge", {
                    method: "Post",
                    headers: {
                      accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      source: context.phone,
                      destination: x.phone,
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                    });
                }}
              >
                Zadzwoń
              </button>
            </div>
          </ListItemWrapper>
        );
      })}
    </Panel>
  );
};

const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 20px;
  &:hover {
    background-color: #999;
    cursor: pointer;
  }
  & button {
    padding: 10px;
    cursor: pointer;
  }
`;

export default ListComponent;
