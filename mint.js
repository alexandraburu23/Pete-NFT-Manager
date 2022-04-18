Moralis.start({serverUrl: "https://qg1sx6ooj64k.usemoralis.com:2053/server", appId: "WA2tWOZwWE0K7KJFMeXovQHTBSOCse1fjhehWOKx"});

let web3;

function fetchData(NFTS, token_id){
    let promises = [];
    for(let i=0;i<NFTS.length; i++)
    {
        let nft = NFTS[i];
        let id = nft.token_id;
        if(id == token_id)
        {   promises.push(fetch("https://96k0t5bh7txa.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=zrqAK4fTADsw25bhSGFBcyvoaSNRIqdh9RGMGAo9&nftId="+ token_id)
                .then(res => res.json())
                .then(res => JSON.parse(res.result))
                .then(res => {nft.metadata = res})
                .then(res => {
                    const options = { address: "0x7dc9c140ceef1a4d40d7da8759b275f632b08bf1", token_id: token_id, chain: "rinkeby"};
                    setTimeout(1000);
                    const tokenIdOwners = Moralis.Web3API.token.getTokenIdOwners(options);
                    return tokenIdOwners;
                })
                .then( (res) => {
                    nft.owners = [];
                    res.result.forEach(element => {
                        nft.owners.push(element.ownerOf);
                    });
                    return nft;
                }
                )
                )
                // fetch("https://qg1sx6ooj64k.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=WA2tWOZwWE0K7KJFMeXovQHTBSOCse1fjhehWOKx&nftId="+ id)
        }
    }
    return Promise.all(promises);
}

function renderInventory(NFTS){
    const parent = document.getElementById("nft-card");
    for (let i = 0; i < NFTS.length; i++) {
        const nft = NFTS[i];
        
        let htmlString = `
        <div class="card">
        <img src="${nft.metadata.image}" class="card-img-top" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nft.metadata.name}</h5>
            <p class="card-text">  ${nft.metadata.description}</p>
            <p class="card-text">  Amount:${nft.amount}</p>
            <p class="card-text">  No of owners:${nft.owners.length}</p>
            
        </div>
        </div>
        
        `
        let col = document.createElement("div");
        col.className = "col col-md-3"
        col.innerHTML = htmlString;
        parent.appendChild(col);

    }
}

async function init(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        // SIGN In
        window.location.pathname= "/index.html";
    }

    web3 = new Web3(window.web3.currentProvider);
    let accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);

    const urlParams = new URLSearchParams(window.location.search);
    const  nftId = urlParams.get("nftId");
    // console.log(nftId);
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];

    const options = {address: "0x7dc9c140ceef1a4d40d7da8759b275f632b08bf1", chain: "rinkeby"};
    setTimeout(1000);
    let NFTS = await Moralis.Web3API.token.getAllTokenIds(options);
    let NFTWithMetadata = await fetchData(NFTS.result, nftId);
    // console.log(NFTWithMetadata);
    renderInventory(NFTWithMetadata);
}

async function mint(){
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);
    const contract = new web3.eth.Contract(contractAbi, "0x7dc9c140ceef1a4d40d7da8759b275f632b08bf1");
    const accounts = await web3.eth.getAccounts();
    contract.methods.mint(address,tokenId,amount).send({from: accounts[0], value: 0})
    .on("receipt", function(receipt){
        alert("Mint done!");
    });
}

document.getElementById("submit_mint").onclick = mint;

init();


