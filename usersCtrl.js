const users = require('./userData.json');


module.exports = {
  getUser: (req, res, next) => {
    // destructuring could save you a lot of typing here
        if(req.query.age){
            res.status(200).send(users.filter(user => user.age < req.query.age));
        } else if (req.query.email){
          // you should always use triple equals unless there is a reason you want to use type cooercion.
          // in this case you are comparing a string to a string, so triple equals should be used.
            res.status(200).send(users.filter(user => user.email == req.query.email));
        } else if (req.query.favorites){
            res.status(200).send(users.filter(user => user.favorites.includes(req.query.favorites)));
        } else {
            res.status(200).send(users)
        }
        
    },
    readUser: (req, res, next) => {
        const foundID = req.params.id;
        // this a case where using double equals is good, because you are comparing a number to a string
        // (params are always strings because they come from the URL)
        const index = users.findIndex(user => user.id == foundID);
        // by using both findIndex and find, you are looping twice when you don't need to be
        // findIndex will return -1 if no element in the array pass the test, so you could simply test the index variable rather than using find.
        if( users.find(user => user.id == foundID)){
            res.status(200).send(users[index])
        } else {
            res.sendStatus(404);

        }
        
    },
    
    getAdmin: (req, res, next) => {
    let admins = users.filter((user) => {
        // use triple equals
        return user.type == "admin"        
        })
        res.status(200).send(admins);
    },
    getNonadmin: (req, res, next) => {
    let nonAdmins = users.filter((user) => {
        return user.type !== "admin"        
        })
        res.status(200).send(nonAdmins);
    },

    getUserType: (req, res, next) => {
        let uType = req.params.userType;
        // you could remove the if/else chain by comparing user.type to the variable uType instead of a hardcoded string inside of a single filter
        if(uType === "user"){
            res.status(200).send(users.filter(user => user.type === "user"));
        } else if(uType === "admin"){
            res.status(200).send(users.filter(user => user.type === "admin"));
        } else if(uType === "moderator"){
            res.status(200).send(users.filter(user => user.type === "moderator"));
        };
    },
    updateUser: (req, res, next) => {
      // findIndex is a much better higher order method for finding the index of the object you need
      let index = null;
      users.forEach((user, i) => {
        if(user.id === Number(req.params.id)) index = i;
      })
      console.log(req.body);
      // destructuring the body and the user[index] would save you a lot of typing if you update the object this way
      // I would recommend looking into the spread operator as a way to quickly copy objects
      // you could reduce this object reassignment from 13 lines to 1
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
        console.log(users[index])
        res.status(200).send( users );
         
    },
    create: ( req, res, next ) => {
        // good job finding this bug :)
        let index = users.length - 1;
        let id = users[index].id + 1;
        const { first_name, last_name, email, gender, language, age, city, state, type, favorites } = req.body;
        // spread opperator would be your friend here too
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
    delete: (req, res, next) => {
        // again findIndex would be a better solution here
        let index = null;
        users.forEach((user, i) => {
            if(user.id === Number(req.params.id)) index = i;
        })
        users.splice(index, 1)
        res.status(200).send( users );
        
    }
}
