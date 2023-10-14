
import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username\' s required'],
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
        default: ''
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

let Posts: any;
try {
    Posts = mongoose.model('Posts');
}
catch {
    Posts = mongoose.model('Posts', postsSchema);
}
export default Posts;
