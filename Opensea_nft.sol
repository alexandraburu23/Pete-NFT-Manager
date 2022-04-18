pragma solidity ^0.8.0;

//Import ERC1155 token contract from Openzeppelin
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTContract is ERC1155, Ownable {

    uint256 public constant PETE0 = 0;
    uint256 public constant PETE1 = 1;
    uint256 public constant PETE2 = 2;
    uint256 public constant PETE3 = 3;
    uint256 public constant PETE4 = 4;
    uint256 public constant PETE5 = 5;
    uint256 public constant PETE6 = 6;
    uint256 public constant PETE7 = 7;
    uint256 public constant PETE8 = 8;
    uint256 public constant PETE9 = 9;
    uint256 public constant PETE10 = 10;
    uint256 public constant PETE11 = 11;
    uint256 public constant PETE12 = 12;
    uint256 public constant PETE13 = 13;
    uint256 public constant PETE14 = 14;
    uint256 public constant PETE15 = 15;
    uint256 public constant PETE16 = 16;
    uint256 public constant PETE17 = 17;
    uint256 public constant PETE18 = 18;
    uint256 public constant PETE19 = 19;

    constructor() ERC1155("https://vakxhexsidfz.usemoralis.com/{id}.json") {
        _mint(msg.sender, PETE0, 1, "");
        _mint(msg.sender, PETE1, 2, "");
        _mint(msg.sender, PETE2, 3, "");
        _mint(msg.sender, PETE3, 2, "");
        _mint(msg.sender, PETE4, 2, "");
        _mint(msg.sender, PETE5, 2, "");
        _mint(msg.sender, PETE6, 2, "");
        _mint(msg.sender, PETE7, 2, "");
        _mint(msg.sender, PETE8, 2, "");
        _mint(msg.sender, PETE9, 2, "");
        _mint(msg.sender, PETE10, 2, "");
        _mint(msg.sender, PETE11, 2, "");
        _mint(msg.sender, PETE12, 2, "");
        _mint(msg.sender, PETE13, 2, "");
        _mint(msg.sender, PETE14, 2, "");
        _mint(msg.sender, PETE15, 2, "");
        _mint(msg.sender, PETE16, 2, "");
        _mint(msg.sender, PETE17, 2, "");
        _mint(msg.sender, PETE18, 2, "");
        _mint(msg.sender, PETE19, 2, "");
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner{
        _mint(account,id,amount, "");
    }

    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account);
        _burn(account, id, amount);
    }

} 