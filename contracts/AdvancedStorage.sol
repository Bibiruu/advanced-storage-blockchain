// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AdvancedStorage {
    uint[] public ids;

    function add(uint id) public {
        //array of integers
        ids.push(id);
    }

    function get(uint position) view public returns(uint) {
        return ids[position];
    }
    //defining memory location to a complex type: array
    function getAll() view public returns (uint[] memory) {
        return ids;
    }

    function length() view public returns (uint) {
        return ids.length;
    }
}