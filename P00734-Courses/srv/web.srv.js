import express from 'express';
// import path from 'path';

const port = process.env.PORT || 3333;
const app = express();

const baseDir = process.cwd();
app.use(express.static(baseDir));
// app.get('*', (request, response) => {

//   console.log('get request intercepted: ', request)

//   // response.render()
//   //   .sendStatus(200);

// });

app.listen(port);
console.log(`web server started on port ${port}`)