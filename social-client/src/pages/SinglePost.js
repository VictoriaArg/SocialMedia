import React, { useContext, useState } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Button, Card, Image, Icon, Label, Grid } from 'semantic-ui-react';
import moment from 'moment'

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

import { AuthContext } from '../context/auth'

function SinglePost(props){
    const postId = props.match.params.postId;
    console.log(postId)

    const { user } = useContext(AuthContext)

    const { data: { getPost }} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    let postMarkup;
    if(!getPost){
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount} = 
        getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image 
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                    size='small'
                    float='right'
                    />
                    </Grid.Column>
                    <Grid.Column width={10}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>
                                {username}
                            </Card.Header>
                            <Card.Meta>
                                {moment(createdAt).fromNow()}
                            </Card.Meta>
                            <Card.Description>
                                {body}
                            </Card.Description>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likeCount, likes }} />
                                <Button
                                    as='div'
                                    labelPosition='right'
                                    onClick={console.log('comment on post')}>
                                    <Button basic color='blue'>
                                        <Icon name='comments' />
                                        </Button>
                                        <Label basic color='blue' pointing='left'>
                                            {commentCount}
                                        </Label>
                                    </Button>
                                {user && user.username === username && (
                                    <DeleteButton postId={id} />
                                )}
                            </Card.Content>
                        </Card.Content>
                    </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )

    }

    return postMarkup
}

const FETCH_POST_QUERY = gql`
  query ($postId: String!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost