const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required on a form']
    },
    //this would be a subdocument; left in as an example
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});
/*
Virtual Types!
Because postCount is tightly connected or DERIVATIVE of the posts property as well
We will not save virtual properties to the database
Not defined inside of the Schema
.virtual tells mongoose to create a virtual field
When we reference this virtual field, we run a function
*/
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

/*
this is the user class or model
it does not represent any user in our application but the entire collection of data in the db
next function is always called for middleware. 
*/

UserSchema.pre('remove', function(next) {
    //this prevents cyclical requires
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;