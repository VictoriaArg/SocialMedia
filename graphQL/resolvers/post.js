const { AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({ createdAt: -1});
                return posts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try{
                const post = await Post.findById(postId);
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err)
                    }
        } 
    },
    Mutation: {
        async createPost(_, { body }, context){
            //primero verificamos que el usuario este leogeado
            const user = checkAuth(context);
            console.log(user)
            //despues creamos post, para que no cualquiera lo pueda hacer
            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: newDate().toISOString()
            })
        const post = newPost.save();
        return post;
        }
    },
    async deletePost(_, { postId }, context){
        const user = checkAuth(context);
        try {
            const post = await Post.findById(postId);
            if(user.username === post.username){
                await post.delete();
                return 'Post deleted succesfully'
            } else {
                throw new AuthenticationError('Action not Allowed');
            }
        } catch(err) {
            throw new Error(err);
        }
    }
}