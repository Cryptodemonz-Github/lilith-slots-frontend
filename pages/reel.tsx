import React from "react";
import { Box } from "grommet";
import Symbol from "./symbol";
import { animated, Spring } from "react-spring";
import Constants from "../constants/constants";
import * as easings from "d3-ease";

interface Props {
  area: string;
  index: number;
  symbols: string;
}

interface States {
  startPos: number;
  scrollPos: number;
  duration: number;
}

class Reel extends React.Component<Props, States> {
  public symbolHeight: number;
  public symbolWidth: number;
  private symbols: string;
  private reelSymbols: Array<string>;
  private currentScrollPos: number;
  private position: number;

  constructor(props: Props) {
    super(props);

    this.symbols = props.symbols;
    this.reelSymbols = [];
    if (this.symbols)
      this.reelSymbols = this.symbols.repeat(Constants.REELS_REPEAT).split("");

    this.symbolHeight = Constants.REELSET_HEIGHT / Constants.SYMBOLS + 1;
    this.symbolWidth = this.symbolHeight;

    this.position = this.reelSymbols.length - Constants.SYMBOLS;
    this.currentScrollPos = (this.position * this.symbolHeight * -1) / 2;

    this.state = {
      startPos: this.currentScrollPos,
      scrollPos: this.currentScrollPos,
      duration: Constants.SPINNING_DURATION,
    };
  }

  scrollByOffset = (offSet: number) => {
    this.currentScrollPos = this.currentScrollPos + this.symbolHeight * offSet;
    this.position = this.position - offSet;
    this.setState({
      scrollPos: this.currentScrollPos,
      duration: Constants.SPINNING_DURATION + this.props.index * 1000,
    });
  };

  render() {
    return (
      <>
        <Box
          overflow="hidden"
          gridArea={this.props.area}
          background="#fff"
          align="center"
          justify="center"
          flex={false}
        >
          <Spring
            from={{ y: this.state.startPos }}
            to={{ y: this.state.scrollPos }}
            config={{
              duration: this.state.duration,
              easing: easings.easeExpInOut,
            }}
            onRest={() => {
              this.setState({
                scrollPos: this.currentScrollPos,
              });
            }}
          >
            {(styles) => (
              <animated.div style={styles}>
                {this.reelSymbols.map((el, idx) => {
                  return (
                    <Symbol
                      symbol={el}
                      key={idx}
                      index={idx}
                      height={this.symbolHeight}
                      width={this.symbolWidth}
                    />
                  );
                })}
              </animated.div>
            )}
          </Spring>
        </Box>
      </>
    );
  }
}

export default Reel;
