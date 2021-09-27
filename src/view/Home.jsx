import React from 'react'

function Loading() {
    return (
        <div style={{ 'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'padding': '10px' }}>
            Hi, I am
            <a style={{'padding': '0px 5px', 'wordWrap': 'normal', 'display': 'inline-block'}} href="https://jsanderson.net">Josh</a>
            and I am the technical director of website operations, and I will be assisting with this website.
        </div>
    )
}

export default Loading