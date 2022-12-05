//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UserSystem {
    enum Status { Owes, PaidUp, OverPaid }

    struct User {
        bool isActive;
        uint amountPaid;
        Status status;
    }

    mapping(address => User) users;

    function activate() external {
        users[msg.sender].isActive = true;
    }
}

contract Challenge5 is UserSystem {
    uint constant requiredAmount = 1 gwei;

    bool public hasWon;

    receive() external payable {
        User storage user = users[msg.sender];
        require(user.isActive);

        user.amountPaid += msg.value;
        
        if(user.amountPaid < requiredAmount) {
            user.status = Status.Owes;
        }
        else if(user.amountPaid == requiredAmount) {
            user.status = Status.PaidUp;
        }
        else {
            user.status = Status.OverPaid;
        }
    }

    function win() external {
        require(users[msg.sender].status == Status.PaidUp);
        hasWon = true;
    }
}
