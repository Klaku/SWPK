import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AppContext } from "./AppContext";
interface IUserContext {
  name: string;
  phone: string;
  isLogged: boolean;
  UpdateName: (name: string) => void;
  UpdatePhone: (phone: string) => void;
  Login: () => void;
  Logout: () => void;
  clients: IClient[];
}

const defaultContext: IUserContext = {
  name: "",
  phone: "",
  isLogged: false,
  UpdatePhone: (any: string) => {},
  UpdateName: (any: string) => {},
  Login: () => {},
  Logout: () => {},
  clients: [],
};

export interface IClient {
  id: string;
  name: string;
  phone: string;
}

export const UserContext = React.createContext(defaultContext);
export const UserContextWrapper = (props: PropsWithChildren<{}>) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [socket, setSocket] = useState(
    null as null | Socket<DefaultEventsMap, DefaultEventsMap>
  );
  const appContext = useContext(AppContext);
  const [clients, setClients] = useState([] as IClient[]);
  const FetchClients = () => {
    fetch(appContext.host + "/clients")
      .then((response) => response.json())
      .then((data: IClient[]) => {
        setClients(data);
      });
  };
  const UpdateName = (value: string) => {
    setName(value);
  };
  const UpdatePhone = (value: string) => {
    setPhone(value);
  };
  const Login = () => {
    setIsLogged(true);
    const newSocket = io(appContext.host, { transports: ["websocket"] });
    newSocket?.emit("Login", { name, phone });
    newSocket?.on("Login", (response) => {
      console.log("Login Response", response);
      setId(response.id);
    });
    newSocket.on("ListOfAvailableUsers", (list) => {
      console.log("Recieved Socket Event: ListOfAvailableUsers");
      setClients(list);
    });
    setSocket(newSocket);
    FetchClients();
  };
  const Logout = () => {
    socket?.emit("Logout", { id: id });
    setIsLogged(false);
    socket?.close();
    setSocket(null);
    setId("");
    setName("");
    setClients([]);
    setPhone("");
  };
  return (
    <UserContext.Provider
      value={{
        name,
        phone,
        Login,
        Logout,
        isLogged,
        UpdateName,
        clients,
        UpdatePhone,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
