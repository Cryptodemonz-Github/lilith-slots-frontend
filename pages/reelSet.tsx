import React from "react";
import { Box, Heading, Grid, Button } from "grommet";
import Image from "next/image";
import Symbol from "./symbol";
import Reel from "./reel";
import ControlPanel from "./controlPanel";
import { Constants } from "./constants";

interface Props {}

class ReelSet extends React.Component<Props> {
  private reels: Array<Reel> | any;
  public reelSetHeight: number;
  public symbolPermutations: Array<string>;

  constructor(props: Props) {
    super(props);
    this.reels = [];
    this.reelSetHeight = Constants.REELSET_HEIGHT;
    this.symbolPermutations = ["513462", "426153", "264351"];
  }

  spin = () => {
    for (let i = 0; i < Constants.NUMBER_OF_REELS; i++) {
      this.reels[i].scrollByOffset(100);
    }
  };

  getArea = (idx: Number) => {
    switch (idx) {
      case 0:
        return "left";
      case 1:
        return "center";
      case 2:
        return "right";
      default:
        return "";
    }
  };

  renderReels = () => {
    let reelList = Array.apply(null, Array(Constants.NUMBER_OF_REELS)).map(
      (el, idx) => {
        return (
          <Reel
            area={this.getArea(idx)}
            key={idx}
            index={idx}
            ref={(ref) => {
              this.reels[idx] = ref;
            }}
            symbols={this.symbolPermutations[idx]}
          />
        );
      }
    );
    return <>{reelList}</>;
  };

  render() {
    return (
      <>
        <Box direction="row" background="#fff" flex={false}>
          <Grid
            fill={true}
            width="700px"
            rows={[String(this.reelSetHeight) + "px"]}
            columns={["auto", "auto", "auto"]}
            gap="small"
            pad="small"
            areas={[
              { name: "left", start: [0, 0], end: [0, 0] },
              { name: "center", start: [1, 0], end: [1, 0] },
              { name: "right", start: [2, 0], end: [2, 0] },
            ]}
          >
            {this.renderReels()}
          </Grid>
        </Box>
        <ControlPanel spin={this.spin} reels={this.reels} />
      </>
    );
  }
}

export default ReelSet;
