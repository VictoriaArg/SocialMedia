import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "@apollo/client";
import { Grid, Transition } from 'semantic-ui-react';
import { TransitionGroup } from 'react-transition-group';

import { FETCH_POSTS_QUERY } from '../util/graphql.js';
import PostCard from '../components/PostCard';

import { AuthContext } from '../context/auth'

import PostForm from '../components/PostForm';


function Home () {
    const { user } = useContext(AuthContext)

    const [posts, setPosts] = useState('')
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
   
    useEffect(() => {
        if (data) setPosts(data.getPosts)
            /* console.log(posts)  */
        }, [data]) 
    
    if(error) {
      console.log(error);
      return "error"; // blocks rendering
    }

    return (
    <TransitionGroup
    transitionName="intro"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={true}
    >  
    <Grid columns={3} divided>
        <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            { user && (
                <Grid.Column>
                    <PostForm />
                </Grid.Column>
            )}
            {loading ? (
            <h1>Loading</h1>
            ) : (
                <Transition.Group>
                    {posts && posts.map(post => (
                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                        <PostCard post={post} />
                    </Grid.Column>
                ))}
                </Transition.Group>
            )}
        </Grid.Row>
    </ Grid>
    </TransitionGroup>
    )
}


export default Home;