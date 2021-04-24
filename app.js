const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Profile = require('./models/profile')
const methodOverride = require('method-override');

// mongodb+srv://JakeH:LjRkvNMVjSoBGMIA@cluster0.jbtvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://JakeH:LjRkvNMVjSoBGMIA@cluster0.jbtvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/profiles', async (req, res) => {
   const profiles = await Profile.find({});
   res.render('profiles/index', {profiles})
})

app.get('/profiles/new', (req, res) => {
    res.render('profiles/new');
})

app.post('/profiles', async(req, res) => {
   const profile = new Profile(req.body.profile);
   await profile.save();
   res.redirect(`/profiles/${profile._id}`)
})

app.get('/profiles/:id', async(req, res,) => {
    const profile = await Profile.findById(req.params.id)
    res.render('profiles/show', {profile});
})

app.get('/profiles/:id/edit', async(req, res) => {
    const profile = await Profile.findById(req.params.id)
    res.render('profiles/edit', {profile});
})

app.put('/profiles/:id', async(req, res) => {
    const {id} = req.params;
    const profile = await Profile.findByIdAndUpdate(id,{...req.body.profile});
    res.redirect(`/profiles/${profile._id}`)
})

app.delete('/profiles/:id', async (req, res) => {
    const {id} = req.params;
    await Profile.findByIdAndDelete(id);
    res.redirect('/profiles');
})

app.listen(3000, () => [
    console.log('Serving on port 3000')
])