Moralis.start({serverUrl: "https://qg1sx6ooj64k.usemoralis.com:2053/server", appId: "WA2tWOZwWE0K7KJFMeXovQHTBSOCse1fjhehWOKx"});

function fetchNFTMetadata(NFTS){
    let promises = [];
    for (let i = 0; i < NFTS.length; i++) {
        let nft = NFTS[i];
        let id = nft.token_id;
        console.log(id);
        //CALL MORALIS CLOUD FUNCTION -> JSON FILE
        promises.push(fetch("https://qg1sx6ooj64k.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=WA2tWOZwWE0K7KJFMeXovQHTBSOCse1fjhehWOKx&nftId="+ id)
        .then(res => res.json())
        .then(res => JSON.parse(res.result))
        .then(res => {nft.metadata = res})
        .then( () => {return nft;}))
        // fetch("https://qg1sx6ooj64k.usemoralis.com:2053/server/functions/getNFT?_ApplicationId=WA2tWOZwWE0K7KJFMeXovQHTBSOCse1fjhehWOKx&nftId="+ id)

    }
    return Promise.all(promises);
}

function renderInventory(NFTS){
    const parent = document.getElementById("app");
    for (let i = 0; i < NFTS.length; i++) {
        const nft = NFTS[i];
        let htmlString = `
        <div class="card">
        <img src="${nft.metadata.image}" class="card-img-top" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nft.metadata.name}</h5>
            <p class="card-text">${nft.metadata.description}</p>
            <a href="/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
            <a href="/transfer.html?nftId=${nft.token_id}" class="btn btn-primary">Transfer</a>
        </div>
        </div>
        `
        let col = document.createElement("div");
        col.className = "col col-md-3"
        col.innerHTML = htmlString;
        parent.appendChild(col);

    }
}


async function initializeApp(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        // SIGN In
        current = await Moralis.Web3.authenticate();
    }
    // alert("user is signed in");

    const options = {address: "0x7dc9c140ceef1a4d40d7da8759b275f632b08bf1", chain: "rinkeby"};
    let NFTS = await Moralis.Web3API.token.getAllTokenIds(options);
    console.log(NFTS);
    let NFTWithMetadata = await fetchNFTMetadata(NFTS.result);
    console.log(NFTWithMetadata);
    renderInventory(NFTWithMetadata);
}

initializeApp();
