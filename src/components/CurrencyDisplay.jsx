import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrencies, getResultSum } from "../api/apiManager";
function CurrencyDisplay() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("HUF");
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState("");

  const [options, setOptions] = useState([]);
  useEffect(() => {
    setResult("");
  }, [amount]);
  useEffect(() => {
    getCurrencies().then((e) => setOptions(e));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
        padding: "5px",
        width: "100%",
      }}
    >
      <div>
        <h1>Összeg</h1>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <h1>Erről a valutáról</h1>
        <select
          id="currnecy-from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        >
          {options.map((e) => (
            <option key={e[0]} value={e[0]}>
              {e[0]}
            </option>
          ))}
        </select>
      </div>
      <h1>Erre a valutára</h1>{" "}
      <select
        id="currnecy-from"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        {options.map((e) => (
          <option key={e[1]} value={e[1]}>
            {e[1]}
          </option>
        ))}
      </select>
      <button
        onClick={async () => setResult(await getResultSum(from, to, amount))}
      >
        Mehet
      </button>
      <h3>{amount + " " + from + " = " + result + " " + (result ? to : "")}</h3>
    </div>
  );
}

export default CurrencyDisplay;
