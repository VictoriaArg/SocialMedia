const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const typeDefs = require('./gql/typeDefs/typeDefs')
const resolvers = require('./gql/resolvers')
const { MONGODB } = require('./config.js')
const cors = require('cors')

const pubsub = new PubSub();

const server = new ApolloServer({
        typeDefs,
        resolvers,
        cors: true,
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