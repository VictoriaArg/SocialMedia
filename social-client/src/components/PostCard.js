import { React, useContext } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react'

import { AuthContext } from '../context/auth'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton';
import parrotIcon from '../assets/Parrot.svg'

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {
    
    const { user } = useContext(AuthContext)


    return(
       <Card fluid>
           <Card.Content>
             <Image
                floated='right'
                 size='mini'
                src={parrotIcon}
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
            <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }}/>
            <Popup content='Add a comment' trigger={
                <Button 
                labelPosition='right' 
                as={Link} 
                to={`/posts/${id}`}>
            <Button color='blue' basic>
                <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left' margin='0'> {commentCount} </Label>
            </Button>
            } />
            { user && user.username === username && <DeleteButton postId={id} />}
             </Card.Content>
       </Card>
    )
}

export default PostCard;