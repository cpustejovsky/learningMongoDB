const mongoose = require('mongoose');
//assignment operator for ES6 Promises
mongoose.Promise = global.Promise;

//the before function makes sure that mongodb is connected before the tests begin
before((done) => {
    mongoose.connect('mongodb://localhost/users_test', {
        useNewUrlParser: true
    });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
})

// done does a bit of mocha magic to add asynchronisity
beforeEach((done) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});