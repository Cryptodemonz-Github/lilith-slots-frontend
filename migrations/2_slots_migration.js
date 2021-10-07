const Slots = artifacts.require("Slots");

module.exports = function (deployer) {
  deployer.deploy(Slots, "0xBe9aA783395bEd56B1E33115141F485E35213c53");
};
