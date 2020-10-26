import express from 'express';

const port = process.env.PORT || 3333;
const app = express();

const baseDir = process.cwd();
app.use(express.static(baseDir));

app.listen(port);
console.log(`web server started on port ${port}`)