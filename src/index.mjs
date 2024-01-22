import express from 'express';
import routes from "./Routes/index.mjs";
import cookieParser from 'cookie-parser';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser('hello world'));
app.use(routes);

app.get('/', (req, res) => {
   res.cookie('Hello', 'world', { maxAge: 60000 });
   res.send(`Hello, World!`);
});
app.listen(PORT, () => {
   console.log(`listening on ${PORT}`);
});