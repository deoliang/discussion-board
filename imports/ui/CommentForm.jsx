import React, { useState } from 'react'
import { CommentsCollection } from '../api/CommentsCollection';
export const CommentForm = ({ user }) => {
    const [text, setText] = useState("");

    const handleSubmit = e => {
        e.preventDefault();

        // if nothing is entered don't store into collection
        if (!text) return;

        //add new comment into collections
        CommentsCollection.insert({
            text: text.trim(),
            userId: user._id,
            email: user.emails[0].address,
            createdAt: new Date(),
        });

        setText("");
    };

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type to add a new comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Add Comment</button>
        </form>
    )
}
