import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Panel = (props: PropsWithChildren<{}>) => {
  return <Wrapper>{props.children}</Wrapper>;
};

export default Panel;

export const Wrapper = styled.div`
  padding: 25px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  width: 900px;
  border-radius: 15px;
  background-color: #fff;
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;
