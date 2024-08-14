const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')

//view engine setup:-
app.set("view engine", "ejs");

// express setup:-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.render('index');
})

//create route.......
app.get('/create', (req, res) => {
    res.render('create');
})

app.post('/created', (req, res) => {
    var currentdate = new Date();
    var date = `${currentdate.getDate()}-${currentdate.getMonth() + 1}-${currentdate.getFullYear()}`;
    fs.writeFile(`./hisab/${date}.txt`, req.body.textarea, function (err) {
        if (err)
            res.status(500).send(err);

        else
            res.redirect("/records")

    })


})


// record route.....
app.get('/records', (req, res) => {
    fs.readdir("./hisab", function (err, files) {
        if (err)
            res.status(500).send(err);

        else
            res.render("records", { files: files });
    })
})




// about route....

app.get("/about", function (req, res) {
    res.render("about");
})


app.listen(3000);