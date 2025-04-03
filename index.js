const express = require('express')
const app = express();
const cookieParser = require('cookie-parser');
const port = 3000;

app.use(cookieParser());

const adminRoute =express.Router();
const middleWare =(req, res, next)=>{
    console.log(`${new Date(Date.now()).toLocaleString()} -${req.method} - ${req.protocol}`);
    next();
    // res.end();
    //  throw new Error('this is error');
    
}

adminRoute.use(middleWare);
adminRoute.get('/dashboard', (req, res)=>{
   res.send('admin')
})

app.use('/admin', adminRoute);
// app.use(middleWare);
app.get('/about', (req, res) => {
    res.send('About page')
  })
app.get('/', (req, res) => {
  res.send('Hello server!')
})

const errorMiddleWare =(err, req, res, next)=>{
    console.log(err.message);
    res.status(500).send('this is sever side error');
}
adminRoute.use(errorMiddleWare);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})