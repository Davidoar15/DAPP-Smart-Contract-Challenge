import { useEffect, useState } from "preact/hooks";
import { connectToMetamask } from "./functions/ConnectToMetamask";
import { sendDataToContract } from "./functions/SendDataToContract";
import { getDataFromContract } from "./functions/GetDataFromContract";
import logo from "./assets/logo.png";
import pfp from './assets/profile.jpg'
import "./app.css";

export function App() {
  const [data, setData] = useState("");
  const [retrievedData, setRetrievedData] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const handleAccountsChanged = (accounts) => {
    setIsConnected(accounts.length > 0);
  };

  const handleConnectToMetamask = async () => {
    try {
      await connectToMetamask();
      checkMetaMaskConnection();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleSendData = async (data) => {
    await sendDataToContract(data);
  }

  const handleGetData = async () => {
    const result = await getDataFromContract();
    setRetrievedData(result);
  }

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsConnected(accounts.length > 0);
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
        setIsConnected(false);
      }
    } else {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkMetaMaskConnection();
        // Subscribe to MetaMask's accountsChanged event
    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      // Clean up subscriptions
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <div className="container">
      <header className="header">
        <section>
          <img src={pfp} alt="author" title="David Olivo" />
        </section>

        <h1>MY D-APP</h1>

        <section>
          <img src={logo} alt="extrimian" title="Extrimian" />
        </section>
      </header>

      <section className="connect-section">
        <button onClick={handleConnectToMetamask}>Connect to Metamask</button>
        <span 
          className={`status ${isConnected ? 'connected' : 'disconnected'}`} 
          title={isConnected ? 'Connected' : 'Disconnected'}
        ></span>
      </section>

      <section className="input-section">
        <input
          type="text"
          value={data}
          onChange={handleInputChange}
          placeholder="Enter data..."
        />
        <button onClick={() => handleSendData(data)}>Send</button>
      </section>
      
      <section>
        <button onClick={handleGetData}>Get Data from Contract</button>
        <p>Retrieved Data: {retrievedData !== "" ? retrievedData : "Waiting..."}</p>
      </section>
    </div>
  );
}
