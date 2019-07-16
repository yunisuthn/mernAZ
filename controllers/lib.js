const User = require('../schema/schemaUser.js');
const passwordHash = require("password-hash");
const Article = require('../schema/article');


exports.signup = (req, res) =>{
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}

exports.login= (req, res)=> {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            } else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            } else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "text": "Authentification réussi"
                    })
                } else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

exports.createArt = (req, res) => {
    if(!req.body.article) {
        return res.status(400).send({
            message: "req.body.articles"
        })
    }
    var compt = 0;
    var id = 0;
    Article.find()
    .then(elev => {
        // res.send(eleve);
        for (let i = 0; i < elev.length; i++) {
            if (elev[i]._id>compt) {
                compt = elev[i]._id
            }
        }
        console.log(compt);
        // id = compt;
        // console.log('eleve', eleve._id);
       
        const eleve = new Article({
            _id: compt+1,
            article: req.body.article
        })

        eleve.save()
        .then(data => {            
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error"
            });
        }); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
};
//On exporte nos deux fonctions

exports.findUser = (req, res) => {
    User.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
};
exports.findArt = (req, res) => {
    Article.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
};

exports.findOne = (req, res) => {
    let id = req.params.id;
    Article.findById(id, function (err, business){
        res.json(business);
    });
  };
  

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.article) {
        return res.status(400).send({
            message: "article content can not be empty"
        });
    }
    // Find note and update it with the request body
    Article.findByIdAndUpdate(req.params.noteId, {
        article: req.body.article || "Untitled Note"
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
}

exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
}
