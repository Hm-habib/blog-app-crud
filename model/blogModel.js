const { Schema, default: mongoose } = require('mongoose');


const blogSchema = new Schema ( 
    {
        title: { type: String, required: false },
        body: { 
            type: String,
            required: [false, 'Please provide note details'],
            
        },
        done: Boolean,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'blogUsers', required: true}
    }
)

const blogModel = mongoose.model('blogs', blogSchema)
module.exports = blogModel;
