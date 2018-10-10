'use strict';
const Demo = artifacts.require('./Demo.sol');

module.exports = function(deployer) {
  deployer.deploy(Demo);
};
