import React from 'react'

export const Comment = ({ comment, onDeleteClick, user }) => {
    //time options
    const options = { timeZone: 'UTC', timeZoneName: 'short', hour: 'numeric', minute: 'numeric', second: 'numeric' };

    //boolean to check if logged in user has authority to delete the comment
    const belongBool = user._id === comment.userId;

    return (
        <li>
            <span>{comment.text} by {comment.email} at {comment.createdAt.toLocaleTimeString('en-US', options)} </span>

            {/* If user has authority to delete the comment a button will appear */}
            {belongBool ? <button onClick={() => onDeleteClick(comment)}>&times;</button> : null}
        </li>
    )
}
