# Pete-NFT-Manager

This repository is designed for the Blockchain Laboratory Project .

## About the Project

We created an app that is managing NFT transactions, using a contract written in Solidity, JSON files for the NFTs data, testnet networks from Moralis server and local hosting.

Our app is displaying several Pete-NFTs and you can mint or transfer which one you wish. 

Once you decide to mint or transfer an NFT, you are redirected to a separate page where you have your NFT card (with a photo of Pete, description of the picture, amount of NFTs minted and number of owners for that NFT). Below this, you can make a transaction (either mint or transfer), where you can enter the Token Id, Amount and Address. The Token Id is set default to the Token Id of the NFT displayed on the page and the Address is set default to the account that is currently logged into MetaMask Wallet in the browser.

## Solidity Contract

We used an ERC1155 type of contract where we initialized a number of variable equal to the number of photos we selected.

Using the Ownable class, we created a contract module that provides basic access control where we have an account that was granted with exclusive access to specific functions.

ERC1155 and Ownable are imported from OpenZeppelin.

In the constructor, we mentioned where we saved the photos through the Moralis Server and we minted a number of these tokens.

After that, we wrote the functions for mint and burn. In our case, our user is granted exclusive access to the mint function (because we call the onlyOwner function from Ownable).
In the burn function, we check that the one that calls the functon is the account from which the token is burnt.

The next step we took, after deployment, was to upload the contract to an OpenSea testnet (https://testnets.opensea.io/collection/unidentified-contract-xyph2s8fjb).

## NFT Dashboard 

In the __Index Page__ , we started by initializing the currentUser address to the one connected to the wallet. 

Then, we used ```getAllTokensIds``` from _Moralis.Web3API_ to get all the tokens available from the contract. We processed the data by using two javascript functions.

```fetchNFTMetadata``` gets the NFTs list as a parameter and goes through each one, selecting the token_id. The token_id is sent to a Moralis Cloud Function that retrives the correct JSON file. From the JSON file, we get the image, name and description. 

```renderInventory``` was written to trasform the metadata into HTML items that are aesthetically designed for the page.

Specifically for the __Mint Page__, we have the mint functionality. We collect the tokenId, address and amount from the input fields on the page and then we call the mint function from the contract. Once the mint is done, the user is notified by an alert pop-up.


Specifically for the __Transfer Page__, we have the transfer functionality. We collect the tokenId, address and amount from the input fields on the page and then we call the tranfer function from Moralis. Once the transfer is done, the user is notified by an alert pop-up.

On these two pages, when we render the NFT Card, we added a few aditional information: _amount_ and _number of owners_. This information is collected by ```fetchData``` function in _mint.js_ and _transfer.js_. Here, we used ```getTokenIdOwners``` from  _Moralis.Web3API_ that returns the owners of the current NFT. 

We added the amount of NFTs from its metadata and the owner-list length.


## Moralis Cloud Function

We implemented a cloud function that was uploaded on the Moralis Test Network.
```getNFT``` gets the tokenId from the request. We had to edit this tokenId to match the standard conventions: the tokenId is transformed in the hex decimal form and padded to get to 64-bits. The function returns the coresponding JSON file.

## Tools

### OpenZeppelin Library

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) is a library for secure smart contract development that is built on a solid foundation of community-vetted code.


### Moralis

[Moralis](https://moralis.io/) is a platform used for the backend of the blockchain projects. It syncs the balances of the users into the database, allows you to use on-chain alerts, watches smart contract events etc. It is used to build and deploy dApps.

We used Moralis to create two servers, one for saving data (JSON files) and one as a testnet.

We also imported functions to process our data.

### Rinkeby Wallet Network

We connected our wallet to the Rinkeby Test Network and we used different faucets to get ETH for transaction fees.

### OpenSea

[OpenSea](https://opensea.io/) is the world's first and largest NFT marketplace. Here, we uploaded our deployed contract on a testnet.

### Remix IDE

We wrote, compiled and deployed our Solidity Contract in the IDE provided by Remix. 





