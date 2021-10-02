import React from "react";
import { Box, Heading, Grid, Button } from "grommet";
import Image from "next/image";
import { Constants } from "./constants";

type Props = {
  symbol: String;
  key: number;
  index: number;
  height: number;
  width: number;
};

class Symbol extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <>
        <Box
          height={String(this.props.height) + "px"}
          width={String(this.props.width) + "px"}
          flex={false}
        >
          <Image
            src={
              require("../styles/assets/" + this.props.symbol + ".png").default
            }
          />
        </Box>
      </>
    );
  }
}

export default Symbol;
