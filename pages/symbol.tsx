import React from "react";
import { Box } from "grommet";
import Image from "next/image";
import img from "../styles/assets/1.png";

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
        <div style={{ position: "relative" }}>
          <div style={{ height: "195px", width: "195px" }}>
            <Image
              src={
                this.props.symbol &&
                require("../styles/assets/" + this.props.symbol + ".png")
                  .default
              }
              layout="responsive"
            />
          </div>
        </div>
      </>
    );
  }
}

export default Symbol;
