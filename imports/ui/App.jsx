import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { Comment } from './Comment';
import { CommentsCollection } from '../api/CommentsCollection';
import { CommentForm } from './CommentForm';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

const deleteComment = ({ _id }) => CommentsCollection.remove(_id);


export const App = () => {
  const user = useTracker(() => Meteor.user());

  //toggle between showing all comments or just the logged in user's
  const [allToggle, setAllToggle] = useState(true);

  //toggle between login form and sign up forms
  const [signUpToggle, setSignUpToggle] = useState(false);

  //filter option to show all comments or show comments by logged in user
  const userFilter = user ? { userId: user._id } : {};

  //gets either all comments or just the logged in user's comments depending if the filter is applied
  const comments = useTracker(() =>
    CommentsCollection.find(allToggle ? {} : userFilter).fetch()
  );

  const logout = () => {
    //returns to login page upon log out
    setSignUpToggle(false)
    Meteor.logout()
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Discussion Board</h1>
          </div>
        </div>
      </header>

      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" >

              {/*Meteor useTracker has issue in which if you log out fast enough, the user is non-null but properties are undefined, 
               causing a blank render, the following is an attempt for remediating that*/}
              <p className="alignleft">{typeof user.emails[0].address === "undefined" ? "" : `Logged in as ${user.emails[0].address}`}</p>
              <button className="alignright" onClick={logout}>Logout</button>
            </div>
            <CommentForm user={user} />

            <div className="filter">
              {/* button to filter between all comments and comments made by logged in user */}
              <button onClick={() => setAllToggle(!allToggle)}>
                {allToggle ? 'Show My Comments' : 'Show All Comments'}
              </button>
            </div>

            <ul className="comments">
              {/* display comments in a list*/}
              {comments.map(comment => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  user={user}
                  onDeleteClick={deleteComment}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <Fragment>
            {/* Button to go between the sign up form and the log in form */}
            <button onClick={() => setSignUpToggle(!signUpToggle)} className="signUp">{signUpToggle ? 'Go Back To Login' : 'Sign Up a New Account'}</button>
            {signUpToggle ? (<SignUpForm />) : (<LoginForm />)}
          </Fragment>
        )}
      </div>
    </div>
  );
}