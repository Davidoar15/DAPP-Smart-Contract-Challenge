// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
    string private data;

    event DataStored(string newData);

    // Set data coming from client side
    function setData(string memory _data) public {
        data = _data;
        emit DataStored(_data);
    }

    // Get data from the smart contract
    function getData() public view returns (string memory) {
        return data;
    }
}
