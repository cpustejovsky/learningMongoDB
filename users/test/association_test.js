const mongoose = require('mongoose');
const assert = require('assert');
//model classes
const User = require('../src/user.js');
const Comment = require('../src/comment.js');
const BlogPost = require('../src/blogPost.js');

describe('Associations', () => {
    //instance of the model
    let joe, blogPost, comment;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        blogPost = new BlogPost({
            title: 'JavaScript is Cool',
            content: 'I love learning it. Lorem ipsum and all that.'
        });
        comment = new Comment({
            content: 'Hey! I like lorem ipsum, too'
        });
        //directly associating user and blog post and comment
        //mongoose assumes we are just wanting reference ids, not the whole model
        joe.blogPosts.push(blogPost);        
        blogPost.comments.push(comment);
        //also mongoose magic; assumes a reference again
        comment.user = joe;

        //Promise.all takes an array of promises & combines them into a single promise
        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });
    /*
    it.only means only that one test will run
    .populate is a modifier = something added to enhance the query in some way
    using blogPosts because that is defined User schema
    too many associations can bog things down
    */
    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Joe' })  
            .populate('blogPosts')
            .then((user) => {
                console.log(user.blogPosts[0].comments);
                assert(user.blogPosts[0].title === 'JavaScript is Cool');
                done();
            });  
    });
    /*
    find all the blogPosts and load them up
    then find all the comments and load them up
    MongoDB needs us to speicify which model we are referencing
    */

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({ 
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                //TODO: Practice some destructuring skillage with this.
                console.log(user.blogPosts[0].comments[0].content)
                assert(user.blogPosts[0].title === 'JavaScript is Cool');
                assert(user.blogPosts[0].comments[0].content === 'Hey! I like lorem ipsum, too');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});