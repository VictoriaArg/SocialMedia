import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { Icon, Button, Confirm } from 'semantic-ui-react'

function DeleteButton({ postId, commentId, callback }){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            postId,
            commentId
        },
        onError(err) {
            return err;
          }
    });

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: { 
            postId
        },
        update(proxy) {
            setConfirmOpen(false);
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                data.getPosts = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data})
                if(callback) callback();
                window.location.reload();
                  
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
        onConfirm={commentId ? deleteComment : deletePost}
        />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: String!, $commentId: String!){
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id username createdAt body
            }
            commentCount
        }
    }

    `

export default DeleteButton