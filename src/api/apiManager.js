async function getCurrencies() {
  let res = await fetch("http://localhost:8080/symbols");
  return await res.json();
}

async function getResultSum(from, to, amount) {
  let payload = {
    payload: {
      currencyFrom: from,
      currencyTo: to,
      amount: amount,
    },
  };
  let res = await fetch("http://localhost:8080/convert", {
    method: "post",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  let value = await res.json();
  return value.result;
}

function addNewCurrency(from, to, rate) {
  //Már nincs elég időm erre :(.
}
export { getCurrencies, getResultSum };
