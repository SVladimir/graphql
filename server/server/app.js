const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema  =require('../schema/schema');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3005;

const uri = "mongodb+srv://admin:admin@cluster0.shniv.mongodb.net/graphql-tutorial?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//mongoose.connect('mongodb://admin:admin@cluster0.shniv.mongodb.net:63835/graphql-tutorial',{useMongoClient:true})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,

}));
//const dbConnection=mongoose.connection;
client.connect(err => {
  const collection = client.db("graphql-tutorial").collection("movies");
  // perform actions on the collection object
  client.close();
});

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
