import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { Icon, Button, Confirm } from 'semantic-ui-react'

function DeleteButton({ postId, callback }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy) {
            setConfirmOpen(false);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = data.getPosts.filter(p => p.id !== postId)
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data})
            if(callback) callback();
            if (window.location.href === 'http://localhost:3000/') {
                window.location.reload();
              }
        },
        variables: { 
            postId 
        } 
    })

    return (
        <>
        <Button 
        as='div' 
        color='red' 
        onClick={() => setConfirmOpen(true)} 
        floated='right'>
    <Icon name='trash' style={{ margin: 0}} />
    </Button>
    <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
        />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

export default DeleteButton