const postsResolvers = require('./post');
const usersResolvers = require('./user');
const commentsResolvers = require('./comments');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation 
    }
}