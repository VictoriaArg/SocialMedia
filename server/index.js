const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers')
const { MONGODB } = require('./config.js')

const pubsub = new PubSub();

const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        context: ({ req }) => ({ req, pubsub })
});

mongoose.connect(MONGODB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: true, 
    useCreateIndex: true })
    .then(() => {
        console.log('MongoDB connected')
        return server.listen(process.env.PORT || 5000);
    })
    .then((res) => {
            console.log(`Server running at ${res.url}`)
        })
    .catch(err => {
        console.error(err)
    })