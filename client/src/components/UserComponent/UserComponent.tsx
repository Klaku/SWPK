import React, { PropsWithChildren, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Panel, { Title } from "../../templates/Panel.template";

const UserComponent = (props: PropsWithChildren<{}>) => {
  const context = useContext(UserContext);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  return (
    <Panel>
      {!isLoginFormVisible && (
        <div>
          {context.isLogged ? (
            <button
              onClick={() => {
                context.Logout();
              }}
            >
              Wyloguj
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoginFormVisible(true);
              }}
            >
              Zaloguj
            </button>
          )}
        </div>
      )}
      {isLoginFormVisible && (
        <div>
          <input
            type="text"
            value={context.name}
            onChange={(e) => {
              context.UpdateName(e.target.value);
            }}
            placeholder={"Nazwa"}
          ></input>
          <input
            type="text"
            value={context.phone}
            onChange={(e) => {
              context.UpdatePhone(e.target.value);
            }}
            placeholder={"Numer Telefonu"}
          ></input>
          <button
            disabled={context.name.length < 3 || context.phone.length < 9}
            onClick={() => {
              context.Login();
              setIsLoginFormVisible(false);
            }}
          >
            Zaloguj
          </button>
        </div>
      )}
    </Panel>
  );
};

export default UserComponent;
