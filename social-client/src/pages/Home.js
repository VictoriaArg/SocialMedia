import React from 'react';
import { useQuery } from "@apollo/react-hooks";

import { FETCH_POSTS_QUERY } from '../util/graphql.js';


function Home () {

    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
    if(data) {
      console.log(data);
      const { getPosts: posts } = data;
    }
    if(error) {
      console.log(error);
      return "error"; // blocks rendering
    }

    return (
        <div>       
            <h1>Home</h1>


        </div>
    )
}


export default Home;