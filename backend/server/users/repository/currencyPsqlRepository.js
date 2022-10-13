module.exports = function (client) {
  (async function createSymbolTable() {
    const query = {
      name: "create-symbol-table",
      text: `CREATE TABLE IF NOT EXISTS "rates" 
      ("id" SERIAL, "currency_from" VARCHAR(3) NOT NULL, "currency_to" VARCHAR(3) NOT NULL, "rate" INT,PRIMARY KEY ("id"));`,
    };
    try {
      await client.query(query);
    } catch (error) {
      console.log(error);
    }
  })();

  async function executeQuery(query, formatResult) {
    try {
      const res = await client.query(query);
      return formatResult(res);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  return {
    getEveryExchangeRate: async () => {
      const query = {
        name: "query-every-rate",
        text: "SELECT currency_from,currency_to FROM rates",
      };

      return await executeQuery(query, (res) => res.rows);
    },
    getExchangeRate: async (currencyFrom, currencyTo) => {
      const query = {
        name: "query-rate-by-amount",
        text: "SELECT rate FROM rates WHERE  currency_from = $1 AND currency_to = $2",
        values: [currencyFrom, currencyTo],
      };

      return await executeQuery(query, (res) => res.rows);
    },
    insertNewExchangeRate: async ({ currencyFrom, currencyTo, rate }) => {
      const query = {
        name: "insert-new-rate",
        text: "INSERT INTO rates(currency_from,currency_to,rate) VALUES($1,$2,$3) ",
        values: [currencyFrom, currencyTo, rate],
      };

      return await executeQuery(query, () => true);
    },

    updateRateByCurrencies: async ({ currencyFrom, currencyTo, rate }) => {
      const query = {
        name: "update-rate",
        text: "UPDATE rates SET rate = $3 WHERE currency_from = $1 AND currency_to = $2",
        values: [currencyFrom, currencyTo, rate],
      };
      return await executeQuery(query, () => true);
    },
  };
};
