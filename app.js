
'use strict';
const Web3 = require('web3');

module.exports = app => {
  app.beforeStart(async () => {
    const { config } = app;
    let originWeb3;
    // web3 初始化
    if (typeof originWeb3 !== 'undefined') {
      console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask");
      // Use Mist/MetaMask's provider
      originWeb3 = new Web3(originWeb3.currentProvider);
    } else {
      console.warn(`No web3 detected. Falling back to http://${config.web3.host}:${config.web3.port}. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask`);
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      originWeb3 = new Web3(new Web3.providers.HttpProvider(`http://${config.web3.host}:${config.web3.port}`));
    }
    app.web3 = originWeb3;

    const ctx = app.createAnonymousContext();
    app.cities = await ctx.service.connection.getAdmin();

  });
};
