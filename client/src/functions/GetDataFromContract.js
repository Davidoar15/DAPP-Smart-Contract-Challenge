import { ethers } from "ethers";
import { ABI, contractAddress } from "../consts";

export const getDataFromContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  const contract = new ethers.Contract(contractAddress, ABI, provider);

  try {
    const result = await contract.getData();
    return result;
  } catch (error) {
    console.error("Error retrieving data from contract: ", error);
  }
};
