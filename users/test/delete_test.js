const assert = require('assert');
const User = require('../src/user.js');

describe('Deleting a user (but technically, Mongoose only removes something)', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe'});
        joe.save()
            .then(() => done());
    });

    it('model instance remove', (done) => { //joe instance; use-case: we have already fetched the user
        joe.remove()
            .then(() => User.findOne({ name: 'Joe' }))       //needs to look through the DB to make sure the remove worked
            .then((user) => {                                //Promise #2 is chained onto Promise #1 one line above it   
                assert(user === null); //TODO: Why null instead of undefined?
                done();
            });
    });

    it('class method deleteOne', (done) => {
        User.deleteOne({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndDelete', (done) => {
        User.findOneAndDelete({ name: 'Joe' })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });    
    });

    it('class method findByIdAndDelete', (done) => {
        User.findByIdAndDelete({ _id: joe._id })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});