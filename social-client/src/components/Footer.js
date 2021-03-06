import React from 'react'

function Footer () {

    return (
        <div className='footer-big'>
            <div className="tech">
        <h3>Technologies used:</h3>
        <div className="tech-col">
        <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
            <img src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg" alt="html5" width="50" height="50"/>
        </a>
        <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer">
            <img src="https://www.vectorlogo.zone/logos/netlifyapp_watercss/netlifyapp_watercss-icon.svg" alt="css3" width="50" height="50"/>
        </a>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> 
            <img src="https://upload.vectorlogo.zone/logos/javascript/images/239ec8a4-163e-4792-83b6-3f6d96911757.svg" alt="javascript" width="50" height="50"/>
        </a>
        </div>
        <div className="tech-col">
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="react" width="50" height="50"/>
        </a>
        <a href="https://graphql.org/learn/" target="_blank" rel="noreferrer">
        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--nkU0GvK3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://i.postimg.cc/SQCCBw0Q/graphql-with-text-small.png" alt="graphql" width="50" height="50"/>
        </a>
        <a href="https://www.apollographql.com/docs/apollo-server/" target="_blank" rel="noreferrer">
        <img src='https://seeklogo.com/images/A/apollo-logo-DC7DD3C444-seeklogo.com.png' alt="apollo" width="50" height="50"/>
        </a>
        </div>
        <div className="tech-col">
        <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">
            <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg" alt="mongodb" width="50" height="50"/>
        </a>
        <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="nodejs" width="50" height="50"/>
        </a>
        <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> 
            <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="50" height="50"/>
        </a>
        </div>
        </div>
        <div className="feat">
        <h3>
            Features:
        </h3>
        <ul>
            <li>Register</li>
            <li>Creating Posts</li>
            <li>Comments and likes</li>
            <li>Deployed successfully</li>
        </ul>
        </div>
        <div className="coming">
        <h3>
            Coming soon:
        </h3>
        <ul>
            <li>User profile</li>
            <li>Creating family groups, modifying members</li>
            <li>Private posts for group members</li>
            <li>Dark mode</li>
            <li>More design ('cause it's never enough)</li>
            <li>Making everything ultra-responsive</li>
        </ul>
        </div>
    </div>
    )
}

export default Footer