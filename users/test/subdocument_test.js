const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {

    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'Learning JavaScript'
            }, {
                title: 'Learning NodeJS'
            }, {
                title: 'Learning MongoDB'
            }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe'}))
            .then((user) => {
                assert(user.posts[0].title === 'Learning JavaScript');
                assert(user.posts[1].title === 'Learning NodeJS');
                assert(user.posts[2].title === 'Learning MongoDB');
                done();
            });
    });
    /*
    The only way to save a subdocument inside of a parent model (User)
    1) Add the subdocument to the parent model
    2) Save the parent model
    */
    it('Can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                user.posts.push({
                    title: 'Learning JavaScript'
                });
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts[0].title === 'Learning JavaScript');
                done();
            })
    });

    it('Can remove subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Learning JavaScript' }]
        });
        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                // same as this: user.posts[0].remove();
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});