const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`MongoDB Connected...`);
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });

// TODO Email integration (forgot password, confirm account)
// TODO Profile View (user's can click on each others profiles and maybe "follow" them)
// TODO Profile Edits (users can upload information about themselves: email, website, "about me", etc.)
// TODO Edit posts (users can delete their post, but not edit them. Add an "edit" feature.)
// TODO File uploads (allow users to upload images, maybe videos, etc.)
// TODO Change the styling, make it your own
