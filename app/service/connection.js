'use strict';
const Service = require('egg').Service;
const contract = require('truffle-contract');
const stock_artifact = require('../../build/contracts/Stock.json');
const Stock = contract(stock_artifact);
let adminAddress;

let meta;
class ConnectionService extends Service {
  constructor(...args) {
    super(...args);
    this.web3 = this.app.web3;
  }
  setProvider() {
    Stock.setProvider(this.web3.currentProvider);
    // 解决apply报错
    if (typeof Stock.currentProvider.sendAsync !== 'function') {
      Stock.currentProvider.sendAsync = function() {
        return Stock.currentProvider.send.apply(
          Stock.currentProvider, arguments
        );
      };
    }
  }

  getAccounts() {
    return new Promise((resolve, reject) => {
      this.setProvider();
      // Get the initial account balance so it can be displayed.
      this.web3.eth.getAccounts(function(err, accs) {
        if (err != null) {
          console.log('There was an error fetching your accounts.');
          reject('There was an error fetching your accounts.');
          return;
        }

        if (accs.length === 0) {
          console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          reject("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
          return;
        }
        this.accounts = accs;
        resolve(this.accounts);
      });
    });
  }

  getBalance(account) {
    return new Promise((resolve, reject) => {
      this.setProvider();
      Stock.deployed().then(function(instance) {
        meta = instance;
        return meta.getBalance.call(account, { from: adminAddress });
      }).then(function(value) {
        resolve({
          shareLotsLength: value[0],
          total: value[1],
        });
      })
        .catch(function(e) {
          console.log(e);
          reject('Error 404');
        });
    });
  }

  // 添加用户
  async addMember(address, name, empNo) {
    if (!this.adminAddress) {
      await this.getAdmin();
    }
    this.setProvider();
    return new Promise((resolve, reject) => {
      Stock.deployed().then(instance => {
        meta = instance;
        return meta.addMember(address, name, Number(empNo), { from: adminAddress || '0x0000000000000000000000000000000000000000' });
      }).then(value => {
        let args = 'not found';
        for (let i = 0; i < value.logs.length; i++) {
          const log = value.logs[i];
          if (log.event === 'addmember') {
            args = log.args;
            break;
          }
        }
        resolve(args);
      })
        .catch(e => {
          console.log(e);
          reject('add Member error');
        })
      ;
    });
  }

  // 获取用户
  getAdmin() {
    return new Promise((resolve, reject) => {
      this.setProvider();
      Stock.deployed().then(instance => {
        return instance.getAdmin.call();
      }).then(value => {
        adminAddress = value;
        resolve(value);
      })
        .catch(e => {
          console.log(e);
          reject('getAdmin error');
        });
    });
  }
}

module.exports = ConnectionService;
