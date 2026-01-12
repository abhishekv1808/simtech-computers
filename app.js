const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const rootDir = require('./utils/mainUtils');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const Admin = require('./models/admin');

const app = express();

const mongodbURL =  'mongodb+srv://abhishekv1808:' + encodeURIComponent('Grow@$@2025') + '@aribnb.xvmlcnz.mongodb.net/simtech?retryWrites=true&w=majority&appName=aribnb';
        

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/admin', adminRouter);
app.use(userRouter);

const port = 3005;

mongoose.connect(mongodbURL).then(async (result)=>{
    console.log("Connected to Mongodb");
    
    // Seed Admin if not exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash('password123', 12);
        const admin = new Admin({
            email: 'admin@simtech.com',
            password: hashedPassword
        });
        await admin.save();
        console.log('Seeded Admin User: admin@simtech.com / password123');
    }

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((err)=>{
    console.log("Connection failed", err);
});

