import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  ("");
  const baseURL = "http://160.202.128.3:8000";
  const [tradeFilters, setTradeFilters] = useState({
    // Initialize with all required filter fields
    min_first_swap_timestamp: "",
    max_last_swap_timestamp: "",
    // ...other filter fields...
  });
  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleWalletAddressChange = (e) => {
    setWalletAddress(e.target.value);
  };

  const handleFilterChange = (e) => {
    setTradeFilters({ ...tradeFilters, [e.target.name]: e.target.value });
  };

  const fetchWalletData = async () => {
    try {
      const response = await fetch(`${baseURL}/v1/wallets/${walletAddress}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(`Error: ${error.message}`);
    }
  };
  const submitTradeFilters = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${baseURL}/v1/wallets/${walletAddress}/trades`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(tradeFilters),
        }
      );
      const data = await response.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-gold">
      <Head>
        <title>Wallet API Interface yesy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="p-4 shadow-md">
        <h1 className="text-xl font-bold">Wallet API Interface</h1>
      </header>

      <main className="flex-grow p-4">
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">API Key</h2>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-gray-800 border border-gold"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={handleApiKeyChange}
          />
        </section>
        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Wallet Address for Data Retrieval
          </h2>
          <input
            type="text"
            className="w-full p-2 mb-4 bg-gray-800 border border-gold"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={handleWalletAddressChange}
          />
          <button
            className="px-4 py-2 bg-gold text-black"
            onClick={fetchWalletData}
          >
            Retrieve Wallet Data
          </button>
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Submit Trade Filters</h2>
          <form onSubmit={submitTradeFilters} className="mb-4">
            {/* Repeat this pattern for each filter */}
            <label className="block mb-2">
              <span className="text-gold">Min First Swap Timestamp:</span>
              <input
                type="text"
                name="min_first_swap_timestamp"
                className="w-full p-2 mb-4 bg-gray-800 border border-gold"
                value={tradeFilters.min_first_swap_timestamp}
                onChange={handleFilterChange}
              />
            </label>

            {/* ...other filters... */}
            <button type="submit" className="px-4 py-2 bg-gold text-black">
              Submit Filters
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">API Response</h2>
          <div className="p-4 bg-gray-800">
            {/* API response will be displayed here */}
          </div>
        </section>
      </main>

      <footer className="p-4 text-center">
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
}
