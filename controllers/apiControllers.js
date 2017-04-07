/**
 * Created by tehetenamasresha on 03/04/2017.
 */
const Cat = require('../models/catModel')
const bodyParser = require('body-parser')
const multer = require('multer')

const upload = multer();


module.exports= (app) =>{
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/cats', (req, res) => {
        Cat.find().exec().then((posts) => {
        res.send(posts);
});
});


    app.post('/cats', upload.array(), (req, res) => {
        console.log(req.body);
    Cat.create(req.body).then(post => {
        res.send({status: 'OK', post: post});
}).catch(() => {
        res.send({status: 'error', message: 'Database error'});
});
});

    app.delete('/cats/:id', (req, res) => {
        Cat.findByIdAndRemove(req.params.id, (err) => {
        if (err)
        res.send(err)
    res.json({message: 'cat has been deleted!'})
})
})

    app.put('/cats/:id', upload.array(), (req, res)=> {
        console.log(req.params.id);
    Cat.findById(req.params.id, (err, cat)=> {
        if (err)
        res.send(err);
    console.log(req.body);
    console.log(req.body.name);
    // Update the existing beer quantity
    cat.name = req.body.name;
    cat.gender = req.body.gender;
    cat.age = req.body.age;
    cat.weight = req.body.weight;
    console.log(cat);
    //cat = req.body
    cat.save((err)=> {
        if (err)
        res.send(err);

    res.json(cat);
});
});
})

}
``