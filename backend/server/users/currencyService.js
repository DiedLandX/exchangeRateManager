async function formatCurrencies(currencies) {
  let arr = await currencies;
  return arr.map((e) => [e.currency_from, e.currency_to]);
}
function calculateExchange(amount, rate) {
  return amount * rate;
}

module.exports = (currencyRepo) => {
  async function isExchangeRatePresent(currencyFrom, currencyTo) {
    let currencies = await currencyRepo.getEveryExchangeRate();
    if (!currencies.length > 0) {
      return false;
    }

    return currencies.filter(
      (e) => e[0] === currencyFrom && e[1] === currencyTo
    );
  }

  return {
    listCurrencies: async () => {
      return await formatCurrencies(currencyRepo.getEveryExchangeRate());
    },
    getExhangeResult: async ({ currencyFrom, currencyTo, amount }) => {
      let rate = await currencyRepo.getExchangeRate(currencyFrom, currencyTo);
      return calculateExchange(amount, rate[0].rate);
    },
    insert: async ({ currencyFrom, currencyTo, rate }) => {
      if (await isExchangeRatePresent(currencyFrom, currencyTo)) {
        return await currencyRepo.updateRateByCurrencies({
          currencyFrom,
          currencyTo,
          rate,
        });
      } else {
        return await currencyRepo.insertNewExchangeRate({
          currencyFrom,
          currencyTo,
          rate,
        });
      }
    },
  };
};
