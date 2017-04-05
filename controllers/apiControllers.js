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


  /*  app.get('/cats/:id', (req, res)=>{
        Cat.find({id: req.body.id})

            .then((cat)=> {
                (err, cat)=> {
                    if(err)throw err
                    res.send(cat)
                }
        })

    })*/
    /*app.post('/cats/:id'.(req, res)=>{
        if(req.body.id){
            Cat.findByIdAndUpdate(req.body.id, {
                // update goes here{}, (err, cat)=> {if (}
            }
           })
        }
        else {

        }
    })*/
    app.post('/cats', upload.array(), (req, res) => {
        console.log(req.body);
        Cat.create(req.body).then(post => {
            res.send({status: 'OK', post: post});
        }).catch(() => {
            res.send({status: 'error', message: 'Database error'});
        });
    });

    /* var beerRoute = router.route('/beers/:beer_id');

// Create endpoint /api/beers/:beer_id for GET
    beerRoute.get(function(req, res) {
        // Use the Beer model to find a specific beer
        Beer.findById(req.params.beer_id, function(err, beer) {
            if (err)
                res.send(err);

            res.json(beer);
        });
    });
*/
    app.get('/cats/:id', function(req, res) {
        //const id = req.params.id

        Cat.findById(req.params.id, (err, cat) => {
            if (err) throw err;
        //res.send('Success');
        console.log('success');
        res.json(cat);
        })

    });
}