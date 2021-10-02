import React from "react";
import { Box, Heading, Text, Button } from "grommet";
import Image from "next/image";
import Reel from "./reel";

interface Props {
  spin: () => void;
  reels: Array<Reel>;
}

interface State {}

class ControlPanel extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Box
          background="#fff"
          width="700px"
          height="75px"
          align="center"
          justify="end"
          pad="small"
          direction="row"
        >
          <Box>
            <Button
              label={<Text color="#000">SPIN</Text>}
              color="#000"
              onClick={() => this.props.spin()}
            />
          </Box>
        </Box>
      </>
    );
  }
}

export default ControlPanel;
