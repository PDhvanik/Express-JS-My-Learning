import express from 'express';
import routes from "./Routes/index.mjs";
const app = express();
const PORT= process.env.PORT || 8000;

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
   res.send(`Hello, World!`);
});
app.listen(PORT,()=>{
   console.log(`listening on ${PORT}`);
});