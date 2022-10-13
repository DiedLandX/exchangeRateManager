module.exports = (currencySerivce) => {
  return {
    createUserRoutes: (app) => {
      app.get("/symbols", (req, res) => {
        currencySerivce.listCurrencies().then((e) => res.send(e));
      });
      app.post("/convert", (req, res) => {
        let exchangeInfo = req.body.payload;
        console.log(req.body);
        currencySerivce.getExhangeResult(exchangeInfo).then((e) => {
          console.log(e);
          res.send({ result: e });
        });
      });
      app.post("/change-rate", (req, res) => {
        let exchangeInfo = req.body.payload;

        currencySerivce.insert(exchangeInfo);
        res.send("Success");
      });
    },
  };
};
