'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, block chain';
  }

  // 该方法不建议暴露
  async getAdmin() {
    const { ctx, service } = this;
    const account = ctx.request.query.account;
    console.log('**** GET /getAdmin ****', account);
    const admin = await service.connection.getAdmin(account);
    ctx.body = admin;
    ctx.status = 200;
  }

  async getBalance() {
    const { ctx, service } = this;
    const account = ctx.request.query.account;
    console.log('**** GET /getAdmin ****', account);
    const balance = await service.connection.getBalance(account);
    ctx.body = balance;
    ctx.status = 200;
  }
  async createAccount() {
    // /web3.eth.accounts
    const { ctx, service } = this;
    console.log(ctx.body);
    let { account, name, empNo } = ctx.request.body;
    console.log('**** GET /createAccounts ****', name, empNo);
    if (!account) {
      account = await service.connection.web3.eth.personal.newAccount();
    }
    console.log('account: ', account);
    const user = await service.connection.addMember(account, name, empNo);
    user.account = account;
    ctx.body = user;
    ctx.status = 200;
  }

  // 获取所有用户地址
  async getAccounts() {
    const { ctx, service } = this;
    console.log('**** GET /getAccounts ****');
    const answer = await service.connection.getAccounts();
    ctx.body = answer;
    ctx.status = 200;
  }

}

module.exports = HomeController;
