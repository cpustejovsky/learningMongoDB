/*
A describe block (better called a describe function)
Inside this are lots of it functions
Inside the it functions are a little bit of code we want to test a very specific part of the code we have in our user model

There is no automatic ability from Mocha to make an assertion!
*/
const assert = require('assert');
const User = require('../src/user.js');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({ name: 'Joe'});

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    });
});
