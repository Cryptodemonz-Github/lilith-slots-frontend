import React from "react";
import { Box, Grid, Stack } from "grommet";
import Reel from "./reel";
import ControlPanel from "./controlPanel";
import Constants from "../constants/constants";

interface Props {}

interface State {
  spinningIsEnded: boolean;
  resetting: boolean;
}

class ReelSet extends React.Component<Props, State> {
  private reels: Array<Reel> | any;
  public reelSetHeight: number;

  constructor(props: Props) {
    super(props);
    this.reels = [];
    this.reelSetHeight = Constants.REELSET_HEIGHT;
    this.state = { spinningIsEnded: false, resetting: false };
    this.setSpinningIsEnded = this.setSpinningIsEnded.bind(this);
    this.resetReels = this.resetReels.bind(this);
    this.setResetting = this.setResetting.bind(this);
  }

  spin = (randomNumbers: Array<number>) => {
    for (let i = 0; i < Constants.NUMBER_OF_REELS; i++) {
      this.reels[i].scrollByOffset(this.getOffset(randomNumbers[i], i));
    }
  };

  setSpinningIsEnded(value: boolean) {
    this.setState({ spinningIsEnded: value });
  }

  setResetting(value: boolean) {
    this.setState({ resetting: value });
  }

  resetReels() {
    this.setState({ resetting: true });
    for (let i = 0; i < this.reels.length; i++) {
      this.reels[i].reset();
    }
  }

  getArea = (idx: number) => {
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

  getOffset = (randomNumber: number, reelIdx: number) => {
    if (reelIdx === 0) {
      switch (randomNumber) {
        case 1:
          return 195;
        case 2:
          return 191;
        case 3:
          return 194;
        case 4:
          return 193;
        case 5:
          return 196;
        case 6:
          return 198;
        default:
          return 0;
      }
    } else if (reelIdx === 1) {
      switch (randomNumber) {
        case 1:
          return 193;
        case 2:
          return 201;
        case 3:
          return 191;
        case 4:
          return 190;
        case 5:
          return 192;
        case 6:
          return 194;
        default:
          return 0;
      }
    } else if (reelIdx === 2) {
      switch (randomNumber) {
        case 1:
          return 191;
        case 2:
          return 190;
        case 3:
          return 193;
        case 4:
          return 194;
        case 5:
          return 192;
        case 6:
          return 195;
        default:
          return 0;
      }
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
            symbols={Constants.SYMBOL_PERMUTATIONS[idx]}
            setSpinningIsEnded={this.setSpinningIsEnded}
            resetting={this.state.resetting}
          />
        );
      }
    );
    return <>{reelList}</>;
  };

  render() {
    return (
      <>
        {this.state.resetting}

        <Grid
          alignSelf="center"
          fill={true}
          width="95%"
          rows={["100vh"]}
          columns={["auto", "auto", "auto"]}
          areas={[
            { name: "left", start: [0, 0], end: [0, 0] },
            { name: "center", start: [1, 0], end: [1, 0] },
            { name: "right", start: [2, 0], end: [2, 0] },
          ]}
        >
          {this.renderReels()}
        </Grid>
      </>
    );
  }
}

export default ReelSet;
