const assert = require('assert');
const User = require('../src/user.js');

describe('Reading users out of the database', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        alex = new User({name: 'Alex' });
        joe = new User({name: 'Joe' });
        maria = new User({name: 'Maria' });
        zach = new User({name: 'Zach' });
        
        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(() => done());
    });
    
    it('finds all users with a name of joe', (done) => {
        User.find({ name: 'Joe' })
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('finds all users with a name of joe', (done) => {
        User.findOne({
                _id: joe._id
            })
            .then((user) => {
                assert(user.name === "Joe");
                done();
            });
    });
    //skip and limit are traditionally applied after some criteria.
    it('can skip and limit the result set', (done) => {
        // -Alex- [Joe Maria] Zach
        // { name: 1 } means sort the name property in an ascending fashion
        // { name: -1 } would mean sort the name property in a descending fashion
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Joe');
                assert(users[1].name === 'Maria');
                done();
            });
    });
});