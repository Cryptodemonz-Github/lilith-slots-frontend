import React from "react";
import { Box, Heading, Text, Button } from "grommet";
import Image from "next/image";
import Reel from "./reel";
import Slots from "../src/contracts/Slots.json";
import LLTH from "../src/contracts/LLTH.json";
import Web3 from "web3";
import Constants from "../constants/constants";
import TxModal from "./txModal";
import ResultModal from "./resultModal";
declare let window: any;
declare let ethereum: any;

interface Window {
  ethereum: any;
}

interface Props {
  spin: (randomNumbers: Array<number>) => void;
  reels: Array<Reel>;
  spinningIsEnded: boolean;
  setSpinningIsEnded: (value: boolean) => void;
  resetReels: () => void;
  setResetting: (value: boolean) => void;
}

interface State {
  accounts: Array<string>;
  placedBet: boolean;
  //web3: any;
  contract: any;
  tokenContract: any;
  owner: any;
  requestId: string;
  randomNumbers: Array<number>;
  prize: Number;
  txIsStarted: boolean;
  readyToSpin: boolean;
  txIsDone: boolean;
}

class ControlPanel extends React.Component<Props, State> {
  web3: any;
  web3Socket: any = new Web3(
    new Web3.providers.WebsocketProvider(Constants.WEBSOCKET_ADDRESS)
  );
  contracWeb3Socket: any = new this.web3Socket.eth.Contract(
    Slots.abi,
    Constants.GAME_ADDRESS
  );

  constructor(props: Props) {
    super(props);
    if (typeof window !== "undefined") {
      this.web3 = new Web3(window.ethereum);
    }
    this.state = {
      accounts: [],
      placedBet: false,
      contract: undefined,
      tokenContract: undefined,
      owner: undefined,
      requestId: "",
      randomNumbers: [],
      prize: 0,
      txIsStarted: false,
      readyToSpin: false,
      txIsDone: false,
    };
    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    this.setState({
      contract: new this.web3.eth.Contract(Slots.abi, Constants.GAME_ADDRESS),
      tokenContract: new this.web3.eth.Contract(
        LLTH.abi,
        Constants.TOKEN_ADDRESS
      ),
    });

    if (this.web3Socket) {
      this.contracWeb3Socket.events
        .RequestIdIsCreated({})
        .on("data", (event: any) => {
          if (
            this.state.accounts[0] &&
            event.returnValues.player.toUpperCase() ===
              this.state.accounts[0].toUpperCase()
          ) {
            this.setState({ requestId: event.returnValues.requestId });
          }
        });

      this.contracWeb3Socket.events
        .RandomsAreArrived({})
        .on("data", (event: any) => {
          if (
            this.state.requestId &&
            event.returnValues.requestId === this.state.requestId
          ) {
            console.log("randomNumber: ", event.returnValues.randomNumbers);
            this.setState({
              randomNumbers: event.returnValues.randomNumbers,
              readyToSpin: true,
              txIsStarted: false,
            });
          }
        });

      this.contracWeb3Socket.events
        .PrizeOfPlayer({})
        .on("data", (event: any) => {
          if (
            this.state.requestId &&
            event.returnValues.requestId === this.state.requestId
          ) {
            console.log("prize: ", event.returnValues.amount);
            this.setState({
              prize: this.web3.utils.fromWei(
                event.returnValues.amount,
                "ether"
              ),
            });
          }
        });
    }
  }

  newGame() {
    this.props.setResetting(true);
    this.setState({
      placedBet: false,
      requestId: "",
      randomNumbers: [],
      prize: 0,
      txIsStarted: false,
      readyToSpin: false,
      txIsDone: false,
    });
    this.props.setSpinningIsEnded(false);
    this.props.resetReels();
  }

  async connectMetaMask() {
    this.props.setResetting(false);
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: Constants.CHAIN_ID }],
        });
      } catch (error) {
        console.error(error);
      }
      this.setState({ accounts: accounts });
    } else {
      alert(
        "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
      );
      return 0;
    }
  }

  async requestMetaMask() {
    const accounts = await window.ethereum
      .request({
        method: "eth_accounts",
      })
      .catch((err: Error) => {
        console.error(err);
      });
    this.setState({ accounts: accounts });
  }

  async placeBet() {
    this.props.setResetting(false);
    this.setState({ txIsStarted: true });
    if (
      (await this.state.tokenContract.methods
        .allowance(this.state.accounts[0], Constants.GAME_ADDRESS)
        .call()) <
      this.web3.utils.toWei(Constants.BET_AMOUNT.toString(), "ether")
    ) {
      await this.state.tokenContract.methods
        .approve(
          Constants.GAME_ADDRESS,
          this.web3.utils.toWei(this.web3.utils.toBN(100000000000), "ether")
        )
        .send({ from: this.state.accounts[0], gas: 3000000 });
    }
    await this.state.contract.methods
      .placeBet()
      .send({ from: this.state.accounts[0], gas: 3000000 });
    this.setState({ placedBet: true, txIsDone: true });
  }

  async send(web3: any, account: any, transaction: any) {
    const options = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: 3000000,
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

    return receipt;
  }

  render() {
    return (
      <>
        <Box
          background="#fff"
          width="700px"
          height="75px"
          align="center"
          pad="small"
          direction="row"
          justify="between"
        >
          {!(this.state.accounts.length > 0) ? (
            <>
              <Text color="#000">Connect Your Wallet!</Text>
              <Button
                label={<Text color="#000">CONNECT</Text>}
                color="#000"
                onClick={() => this.connectMetaMask()}
              />
            </>
          ) : (
            <>
              {!this.state.placedBet && (
                <>
                  <Text color="#000">Place Bet!</Text>
                  <Button
                    label={<Text color="#000">BET</Text>}
                    color="#000"
                    onClick={() => this.placeBet()}
                  />
                </>
              )}
              <>
                {this.state.txIsStarted && (
                  <>
                    <TxModal txIsDone={this.state.txIsDone} />
                  </>
                )}
              </>
              <>
                {this.state.readyToSpin && (
                  <>
                    <Text color="#000">Click On Spin!</Text>
                    <Button
                      label={<Text color="#000">SPIN</Text>}
                      color="#000"
                      onClick={() =>
                        this.props.spin([
                          Number(this.state.randomNumbers[0]),
                          Number(this.state.randomNumbers[1]),
                          Number(this.state.randomNumbers[2]),
                        ])
                      }
                    />
                  </>
                )}
              </>
              <>
                {this.props.spinningIsEnded && (
                  <ResultModal
                    prize={this.state.prize}
                    newGame={this.newGame}
                  />
                )}
              </>
            </>
          )}
        </Box>
      </>
    );
  }
}

export default ControlPanel;
