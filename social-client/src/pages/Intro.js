import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import Parrot from '../assets/Parrot.svg'
import { TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom'

import Footer from '../components/Footer'


function Intro () {

 return (
    <div>
    <TransitionGroup>
    <div className='intro'>
     <div className='intro-description'>
        <div>
        <h1>Hi, welcome to <h1 style={{color:"rgb(246, 196, 30)", fontSize:"4rem"}}>Parrot</h1></h1>
        <h5>An app created by <a className='vic' href='https://www.linkedin.com/in/argasvic/'>Victoria Argañaras</a></h5>
        </div>
        <div>
            <h2>What is Parrot for?</h2>
            <h5>Parrot is an app for sharing your thoughts, ideas, or memes with your closest family.<br />
                Make a group, add members, share posts. <br /> Stay connected with your beloved ones.
            </h5>
        </div>
        <div className="intro-button">
            <Button 
            animated primary
            size="huge"
            as={Link}
             to='/home'>
                <Button.Content visible>Start</Button.Content>
                <Button.Content hidden>
                <Icon name='arrow right' />
                </Button.Content>
            </Button>
            </div>
    </div>
    <div className='parrot-background' id='logo'>
            <img src={Parrot} alt='Logo Parrot' />
    </div>
    </div>
    <Footer />
    </ TransitionGroup>
    </div>
    )
} 

export default Intro;