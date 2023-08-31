// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract GreenFarm {
    // the contract's owner, set in the constructor
    address owner;

    // the message we're storing
    struct record {
        string productID;
        string colours;
        uint64 quantity;
    } 

    mapping(string=>record) product;

    constructor() {
        // set the owner of the contract for `kill()`
        owner = msg.sender;
    }

    function set_record(string memory productID, string memory colours_, uint64 quantity_) public {
        // only allow the owner to update the message
        if (msg.sender != owner) return;
        product[productID].colours= colours_;
        product[productID].quantity = quantity_;
    }

    // return a string
    function get_record(string memory productID) public view returns (record memory) {
        return product[productID];
    }
}