const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    xit('postCount returns number of posts', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'Learning JavaScript'}]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then
    });
});