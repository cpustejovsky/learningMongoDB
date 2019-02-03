const assert = require('assert');
const User = require('../src/user.js');

function assertName(operation, done) {
    operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === 'Alex');
            done();
        });
};

describe('updating records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe', likes: 0 });
        joe.save()
            .then(() => done());
    });

    it('model instance update', (done) => {
        joe.set('name', 'Alex'); //does not reflect to the database; good for incremental updating
        assertName(joe.save(), done); // now it reflects to the database
    })

    it('model instance update', (done) => {
        assertName(joe.updateOne({ name: 'Alex' }), done); //DOES reflect to the database; good for updating a bunch of records at once or somesuch
    });

    it('A model class can update', (done) => {
        assertName(
            User.updateOne({ name: 'Joe'}, { name: 'Alex'}), done
        );
    });

    it('class method findOneAndUpdate', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}), done
        );
    });

    it('class method findByIdAndUpdate', (done) => {
        assertName(
            User.findByIdAndUpdate(joe._id, { name: 'Alex'}), done
        );
    });
});
describe('updating more complex records (2 things instead of 1)', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
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
            .then(() => done());
    });
    
    /*
    We could fetch data and augment and then save to db, but that is horribly inneficient
    Instead what we'll do is...
    USE MONGO UPDATE MODIFIERS
    */

    it('A user can have their postCount incremented by 1', (done) => {
        User.update({ name: 'Joe' }, { $inc: { likes: 1} })
            .then(() => User.findOne({ name: 'Joe' }))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    });
});