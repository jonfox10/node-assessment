const users = require('./userData.json');


module.exports = {
     // this one is good
    getUser: (req, res, next) => {
        if(req.query.age){
            res.status(200).send(users.filter(user => user.age < req.query.age));
        } else if (req.query.email){
            res.status(200).send(users.filter(user => user.email == req.query.email));
        } else if (req.query.favorites){
            res.status(200).send(users.filter(user => user.favorites.includes(req.query.favorites)));
        } else {
            res.status(200).send(users)
        }
        
    },
    // this one is good
    readUser: (req, res, next) => {
        const foundID = req.params.id;
        const index = users.findIndex(user => user.id == foundID);
        if( users.find(user => user.id == foundID)){
            res.status(200).send(users[index])
        } else {
            res.sendStatus(404);

        }
        
    },
    
    // this one is good
    getAdmin: (req, res, next) => {
    let admins = users.filter((user) => {
        return user.type == "admin"        
        })
        res.status(200).send(admins);
    },
    // this one is good
    getNonadmin: (req, res, next) => {
    let nonAdmins = users.filter((user) => {
        return user.type !== "admin"        
        })
        res.status(200).send(nonAdmins);
    },

    getUserType: (req, res, next) => {
        // var result = users;
        let uType = req.params.userType;
        // let result = users.filter(user => user.type == req.params.type)
        // let result = [];
        if(uType === "user"){
            res.status(200).send(users.filter(user => user.type === "user"));
        } else if(uType === "admin"){
            res.status(200).send(users.filter(user => user.type === "admin"));
        } else if(uType === "moderator"){
            res.status(200).send(users.filter(user => user.type === "moderator"));
        };
        // res.status(200).send(result) 
    },
    // this one is good
    updateUser: (req, res, next) => {
        let index = null;
        users.forEach((user, i) => {
            if(user.id === Number(req.params.id)) index = i;
        })
        users[index] = {
            id: users[ index ].id,
            first_name: req.body.first_name || users[index].first_name,
            last_name: req.body.last_name || users[index].last_name,
            email: req.body.email || users[index].email,
            gender: req.body.gender || users[index].gender,
            language: req.body.language || users[index].language,
            age: req.body.age || users[index].age,
            city: req.body.city || users[index].city,
            state: req.body.state || users[index].state,
            type: req.body.type || users[index].type,
            favorites: req.body.favorites || users[index].favorites

        };
        res.status(200).send( users );
         
    },
    // this one is good
    create: ( req, res, next ) => {
        let index = users.length - 1; 
        
        let id = users[index].id + 1;
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        let user = {
            id: id,
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            language: language,
            age: age,
            city: city,
            state: state,
            type: type,
            favorites: favorites
        }
        users.push( user );
        res.status(200).send( users );
    },
    // this one is good
    delete: (req, res, next) => {
        let index = null;
        users.forEach((user, i) => {
            if(user.id === Number(req.params.id)) index = i;
        })
        users.splice(index, 1)
        res.status(200).send( users );
        
    }
}
