// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract Counter {
    error NotOwner(address caller);
    error PaymentsDisabled();

    event Incremented(uint256 newValue, address indexed caller);

    address public immutable owner;
    uint256 public value;

    constructor(uint256 initialValue) {
        owner = msg.sender;
        value = initialValue;
    }

    function increment() external {
        value += 1;
        emit Incremented(value, msg.sender);
    }

    function reset() external {
        if (msg.sender != owner) revert NotOwner(msg.sender);
        value = 0;
    }

    receive() external payable {
        revert PaymentsDisabled();
    }
}
