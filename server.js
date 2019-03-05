const express = require('express');
const bodyParser = require('body-parser');
const usersCtrl = require('./usersCtrl');




const app = express();

app.use(bodyParser.json())


//endpoints 
app.get("/api/user", usersCtrl.getUser);
app.get('/api/user/:id', usersCtrl.readUser)
app.get("/api/admin", usersCtrl.getAdmin)
app.get("/api/nonadmin", usersCtrl.getNonadmin)
app.get("/api/type/:userType", usersCtrl.getUserType)
app.put("/api/user/:id", usersCtrl.updateUser)
app.post("/api/user", usersCtrl.create)
app.delete("/api/user/:id", usersCtrl.delete)



const port = 3000; 


app.listen(port, () => {
  console.log(`listening on server port: ${port}`);
});
