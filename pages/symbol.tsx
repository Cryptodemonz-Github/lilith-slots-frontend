import React from "react";
import { Box } from "grommet";
import Image from "next/image";

type Props = {
  symbol: string;
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
              this.props.symbol &&
              require("../styles/assets/" + this.props.symbol + ".png").default
            }
          />
        </Box>
      </>
    );
  }
}

export default Symbol;
