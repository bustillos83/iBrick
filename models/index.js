const moongoose = require("mongoose");
const db = moongoose.connection;

moongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`Mongodb connected at ${db.host}:${db.port}`);
  })
  .catch((err) => console.log(err));

module.exports = { Lego: require("./Lego") };
