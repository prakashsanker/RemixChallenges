//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Challenge1 {
    bool public hasWon;

    function win() external {
        hasWon = true;
    }
}