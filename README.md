# Discussion Board
A simple app where you can log in, sign up, post comments, filter between your own and all comments, and delete your own comments completed as a challenge for a company. Built with react and meteor frameworks.

## Usage
Clone repository
```
git clone https://github.com/deoliang/discussion-board.git
cd discussion-board
```
Install dependencies with 
```
meteor npm install 
```

Run app locally with
```
meteor run
```
App will be running at [http://localhost:3000](http://localhost:3000)

## Assumptions and Disclaimers
- Th app is focused on functionality and not ui design, current ui design based off of the [Meteor React tutorial](https://react-tutorial.meteor.com/simple-todos/)
- A logged in user can see all the comments but can only delete their own comments from the feed
- No verification such as sending user an email was needed to be implemented for the signup process
- Default behaviour of a successful sign up of a user is logging in as that new user
- No routing needs to be implemented, server-side routing would have been chosen if it was needed, as it offers much better security than client-side routing on authenticated routes.
- Logging in and out very fast can lead to the Meteor Tracker recompute function throwing an exception, leading to blank renders, to be resolved by refreshing the page, which might be a limitation of the meteor framework