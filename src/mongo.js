const mongoose = require('mongoose');
const validaor = require('validaor');

//connection creation and createing a new db
mongoose.connect("mongodb://localhost:27017/mongotut")
    .then(() => console.log("connection successfull..."))
    .catch((err) => { console.log(err); });


//schema creation->mongoose schema defines the structure of the document,
//default values,validaters etc..
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique:true
        // lowercase:true
        // trim:true
        //minlength:12
        //maxlength:20
    },
    ctype: {
        type: String,
        // lowercase: true,  //lower case me convert kr k save krega
        // required: true,
        // enum: ["frontend", "backend", "database"],

    },
    videos: Number,
    author: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validaor.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
});
/*
A mongoose model is awrapper on the mongoose schema.it provides
an interface to the database for creating,quering,
updating,deleting records etc..

*/

//collection creation
const Playlist = new mongoose.model("Playlist", playlistSchema);

//create document or insert a playlist
const reactPlaylist = new Playlist({
    name: "React JS",
    ctype: "Front End",
    videos: 42,
    author: "Jorgin",
    active: true
});

const jsPlaylist = new Playlist({
    name: "JS",
    ctype: "Front End",
    videos: 32,
    author: "Chuslan",
    active: true
});


const add = async() => {
        try {
            const result = await Playlist.insertMany([reactPlaylist, jsPlaylist]);
            console.log(result);
        } catch (err) {
            console.log(err);
        }
    }
    // add();

/*
const add = async() => {
    try {
        const result = await reactPlaylist.save();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
add();

*/


//get document
const getDocument = async() => {
    // const result = await Playlist.find();
    const result = await Playlist
        .find({ $or: [{ ctype: "Front End" }, { videos: 32 }] })
        .sort({ name: 1 });

    //     .find({ $or: [{ ctype: "Front End" }, { videos: 32 }] }).
    // countDocuments();

    // .find({ $and: [{ ctype: "Front End" }, { videos: 32 }] });

    // .find({ videos: { $in: [42, 20] } });
    // find({ videos: { $gt: 10 } });
    // .find({ ctype: "Front End" })
    // .select({ name: 1 })
    // .limit(1);


    console.log(result);
}

// getDocument();

const updateDocument = async(id) => {
    try {
        // const result = await Playlist.updateOne({ _id: id }, {
        const result = await Playlist.findByIdAndUpdate({ _id: id }, {

            $set: {
                name: "updated"
            }
        });
        console.log(result);
    } catch (err) { console.log(err); }
}

// updateDocument("615bd8d9484e5ced62f3b89a");

const deleteDocument = async(id) => {
    try { //deleteMany v hota hai.. 
        // const result = await Playlist.deleteOne({ _id: id });
        const result = await Playlist.findByIdAndDelete({ _id: id });

        console.log(result);

    } catch (err) { console.log(err); }
}

deleteDocument("615bd8d9484e5ced62f3b89b");