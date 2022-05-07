import React, { PropsWithChildren } from "react";
import Panel, { Title } from "../../templates/Panel.template";
const Info = (props:PropsWithChildren<{}>)=>{
    return <Panel>
        Witaj w serwisie, podaj nazwę i numer telefonu a następnie rozpocznij spotkanie z dowolnym z zalogowanych użytkoników.
    </Panel>
}

export default Info;