pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract Demo {
  //初始化设定管理员信息
  constructor () {
    adminPerson = msg.sender;
  }
  //人员信息
  struct Member {
    string name;   //人员姓名
    uint userno;   //人员工号
  }

  // 管理员
  address public adminPerson;
  //为每一个人员存储一个地址
  mapping(address => Member) public members;

  event grant_stock(string text, bytes32 shareNo);

  event addmember(string text, uint userno);


  function getAdmin() public view returns(address){
    return adminPerson;
  }
  
  
  function addMember(address member, string _name, uint _userno)  public returns (address, string, uint){
    require(
      (msg.sender == adminPerson)
    );
    members[member].name = _name;
    members[member].userno = _userno;
    emit addmember(members[member].name, members[member].userno);
    return  (member,members[member].name, members[member].userno);
  }

  function getBalance (address member) public returns (uint, int){
    require(
      (msg.sender == adminPerson)
    );
    int result = 0;
    for(uint i = 0 ; i < members[member].shareLots.length ; i++) {
      result += members[member].shareLots[i].unlockUnusedCount;
    }
    return (members[member].shareLots.length, result);
  }
 
  
}