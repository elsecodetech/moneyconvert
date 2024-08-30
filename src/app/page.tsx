"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Define types for the API response and component state
interface ExchangeRateData {
  conversion_rates: {
    [key: string]: number;
  };
}

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const apikey = "f8dc8e13ab6611e6e225f2da";

  useEffect(() => {
    // Fetch available currencies and the exchange rate for the initial conversion
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get<ExchangeRateData>(
          `https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`
        );
        setCurrencies(Object.keys(response.data.conversion_rates));
        console.log(response.data.conversion_rates);
        setExchangeRate(response.data.conversion_rates[toCurrency]);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };

    fetchCurrencies();
  }, [toCurrency]);

  useEffect(() => {
    // Update the converted amount whenever the amount, fromCurrency, or toCurrency changes
    const convertCurrency = async () => {
      try {
        const response = await axios.get<ExchangeRateData>(
          `https://v6.exchangerate-api.com/v6/${apikey}/latest/${fromCurrency}`
        );
        const rate = response.data.conversion_rates[toCurrency];
        setExchangeRate(rate);
        setConvertedAmount((amount * rate).toFixed(2));
      } catch (error) {
        console.error("Error converting currency:", error);
      }
    };

    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const variants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-6">
      <motion.div initial="hidden" animate="visible" variants={variants}>
        <h1 className="text-4xl font-bold text-white mb-6">
          Currency Converter
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="Amount"
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
            <span className="text-lg text-gray-500">to</span>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mt-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Exchange Rate: {exchangeRate}
            </h2>
            <h2 className="text-2xl font-bold text-blue-600 mt-4">
              {amount} {fromCurrency} = {convertedAmount} {toCurrency}
            </h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CurrencyConverter;
