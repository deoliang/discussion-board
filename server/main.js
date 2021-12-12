import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import {CommentsCollection} from '../imports/api/CommentsCollection'

const insertComment = (commentText, user) =>
CommentsCollection.insert({
    text: commentText,
    userId: user._id,
    email: user.emails[0].address,
    createdAt: new Date()
  });
//dummy accounts to test the system on startup
const A_EMAIL = 'abc@mail.com';
const A_PASSWORD = 'password';
const D_EMAIL = 'def@mail.com';
const D_PASSWORD = 'password';

const firstComments = [ 'First Comment','Second Comment', 'Third Comment',]
const secondComments = [ 'Fourth Comment','Fifth Comment', 'Sixth Comment',]

//helper method to create a user
const accountSetUp = (email,password)=>{
  if (!Accounts.findUserByEmail(email)) {
    Accounts.createUser({
      email,
      password
    });
  }
}
Meteor.startup(() => {
  accountSetUp(A_EMAIL,A_PASSWORD)
  accountSetUp(D_EMAIL,D_PASSWORD)
  const userOne = Accounts.findUserByEmail(A_EMAIL);
  const userTwo = Accounts.findUserByEmail(D_EMAIL);

  //insert comments into collection as each dummy account
  if (CommentsCollection.find().count() === 0) {
    firstComments.forEach(commentText => insertComment(commentText, userOne));
    secondComments.forEach(commentText => insertComment(commentText, userTwo));
  }
  
});