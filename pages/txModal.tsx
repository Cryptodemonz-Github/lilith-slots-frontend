import React from "react";
import { Box, Text } from "grommet";
import "../styles/Home.module.css";
import styled from "styled-components";
import Spinner from "./spinner";

interface Props {
  txIsDone: boolean;
}

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
`;

class TxModal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <ModalContainer>
          <Box
            height="medium"
            width="medium"
            pad="medium"
            background="#000"
            justify="center"
            animation={{ type: "fadeIn", duration: 750, size: "xlarge" }}
          >
            <Box
              direction="column"
              gap="medium"
              align="center"
              animation={{ type: "fadeIn", duration: 500, size: "xlarge" }}
            >
              {!this.props.txIsDone ? (
                <Text textAlign="center" size="xxlarge">
                  Waiting For Transaction...
                </Text>
              ) : (
                <Text textAlign="center" size="xxlarge">
                  Loading Data...
                </Text>
              )}

              <Spinner />
            </Box>
          </Box>
        </ModalContainer>
      </>
    );
  }
}

export default TxModal;
