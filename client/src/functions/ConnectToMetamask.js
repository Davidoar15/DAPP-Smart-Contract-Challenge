export const connectToMetamask = async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
        console.error("Metamask not found");
    }
};
