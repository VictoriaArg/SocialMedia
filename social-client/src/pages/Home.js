import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Grid, Image } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../util/graphql.js';
import PostCard from '../components/PostCard';


function Home () {
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
              
    <Grid columns={3} divided>
        <Grid.Row className='page-title'>
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            {loading ? (
            <h1>Loading</h1>
            ) : (
                posts && posts.map(post => (
                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                        <PostCard post={post} />
                    </Grid.Column>
                ))
            )}
        </Grid.Row>
    </ Grid>
        
    )
}


export default Home;