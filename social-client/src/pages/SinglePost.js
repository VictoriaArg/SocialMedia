import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label,
  CardDescription
} from 'semantic-ui-react';

import parrotIcon from '../assets/Parrot.svg'
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
/* import MyPopup from '../util/MyPopup'; */

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(){
      setComment('')
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });
  if (loading) return null;
  if (error) {
    console.log(error);
    return `Error! ${error}`
  }
  if (data) console.log(data);

  const getPost = data;
  const { getPost : {body, createdAt, id, username, likeCount, commentCount, comments, likes}} = data;


  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    postMarkup = (
      <Grid style={{marginTop:"5vh"}}>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src={parrotIcon}
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{id, likeCount, likes}} />
                <Button 
                  as='div'
                  labelPosition='rigth'
                  onClick={() => console.log('coment')}
                  >
                <Button color='blue' basic>
                <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'> {commentCount} </Label>
                </Button>
                { user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback}/>}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <CardDescription>{comment.body}</CardDescription>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query getPost($postId: ID!) {
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
        createdAt
        username
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
mutation($postId: String!, $body: String!){
  createComment(postId: $postId, body: $body){
    id
    comments{
      id body createdAt username
    }
    commentCount
  }
}
`

export default SinglePost;