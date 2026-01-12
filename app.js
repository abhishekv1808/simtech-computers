const express = require('express');
const path = require('path');
const app = express();
const mogoose = require('mongoose');
const rootDir = require('./utils/mainUtils');
const { default: mongoose } = require('mongoose');
const userRouter = require('./routes/userRouter');
const mongodbURL =  'mongodb+srv://abhishekv1808:' + encodeURIComponent('Grow@$@2025') + '@aribnb.xvmlcnz.mongodb.net/simtech?retryWrites=true&w=majority&appName=aribnb'


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));

const port = 3005;
app.use(userRouter);

mongoose.connect(mongodbURL).then((result)=>{
    console.log("Connected to Mongodb");
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("Connection failed", err);  
})

