//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Challenge4 {
    mapping(address => uint) public balances;
    address owner;
    
    bool public hasWon;

    constructor() {
        owner = msg.sender;
        balances[owner] = 10000;
    }

    function transfer(address to, uint amount) external {
        balances[to] += amount;
        balances[msg.sender] -= amount;
    } 

    function win() external {
        require(balances[msg.sender] >= 1000);
        require(msg.sender != owner);
        hasWon = true;
    }
}