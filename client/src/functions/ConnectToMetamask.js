export const connectToMetamask = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected to Metamask");
    } else {
        console.error("Metamask not found");
    }
};
