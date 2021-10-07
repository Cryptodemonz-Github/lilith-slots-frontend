import React from "react";
import { Box, Text, Button } from "grommet";
import "../styles/Home.module.css";
import styled from "styled-components";
import Image from "next/image";
import demonzface_b from "../styles/assets/demonzface_b.png";
import won from "../styles/assets/won.png";

interface Props {
  prize: Number;
  newGame: () => void;
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

class ResultModal extends React.Component<Props> {
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
            {!(this.props.prize > 0) ? (
              <Box
                direction="column"
                gap="medium"
                align="center"
                animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
              >
                <Text textAlign="center" size="xxlarge">
                  YOU LOST!
                </Text>
                <Image
                  className="wheel"
                  height="100px"
                  width="100px"
                  src={demonzface_b}
                />

                <Text textAlign="center" size="medium">
                  TRY AGAIN!
                </Text>

                <Button
                  alignSelf="center"
                  secondary
                  type="submit"
                  label={
                    <Text textAlign="center" size="large" color="#fff">
                      NEW GAME
                    </Text>
                  }
                  color="#fff"
                  onClick={() => this.props.newGame()}
                />
              </Box>
            ) : (
              <Box
                direction="column"
                gap="medium"
                align="center"
                animation={{ type: "zoomIn", duration: 500, size: "xlarge" }}
              >
                <Text textAlign="center" size="xxlarge">
                  YOU WON!
                </Text>
                <Image
                  className="wheel"
                  height="100px"
                  width="100px"
                  src={won}
                />

                <Text size="large">
                  {this.props.prize}{" "}
                  <Text color="#9933FF" size="large">
                    $LLTH
                  </Text>
                </Text>
                <Text textAlign="center" size="small">
                  YOU WILL RECEIVE YOUR PRIZE WITHIN A FEW SECONDS.
                </Text>

                <Button
                  alignSelf="center"
                  secondary
                  type="submit"
                  label={
                    <Text textAlign="center" size="large" color="#fff">
                      NEW GAME
                    </Text>
                  }
                  color="#fff"
                  onClick={() => this.props.newGame()}
                />
              </Box>
            )}
          </Box>
        </ModalContainer>
      </>
    );
  }
}

export default ResultModal;
