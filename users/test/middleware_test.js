const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user.js');
const BlogPost = require('../src/blogPost.js');

describe('Middleware', () => {
    let joe, blogPost;
    
    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        blogPost = new BlogPost({
            title: 'JavaScript is Cool',
            content: 'I love learning it. Lorem ipsum and all that.'
        });
        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    })
});