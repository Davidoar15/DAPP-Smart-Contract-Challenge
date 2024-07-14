import { ethers } from "ethers";
import { ABI, contractAddress } from "../consts";

export const sendDataToContract = async (data) => {
  try {
    if (!window.ethereum) {
      console.error("Metamask not found");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const tx = await contract.setData(data); // transaction
    await tx.wait();

    contract.on("DataStored", (newData) => {
      console.log("DataStored event received: ", newData)
    })
  } catch (error) {
    console.error("Error sending data to contract: ", error);
  }
};
