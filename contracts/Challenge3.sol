//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Challenge3 {
    bool public hasWon;

    function win(uint _x) external {
        try this.otherFunction(_x) {

        } catch {
            hasWon = true;
        }
    }   

    modifier not6(uint _x) {
        require(_x != 6);
        _;
    }

    function otherFunction(uint _x) not6(_x) external {
        
    }
}