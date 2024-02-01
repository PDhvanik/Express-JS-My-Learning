import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import routes from "./Routes/index.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser('hello world'));
app.use(session({
   secret: 'Dhvanik the dev',
   saveUninitialized: false,
   resave: false,
   cookie: {
      maxAge: 60000 * 60
   }
}));
app.use(routes);

const PORT = process.env.PORT || 8000;
app.get('/', (req, res) => {
   console.log(req.session);
   console.log(req.sessionID);
   // @ts-ignore
   req.session.visited = true;
   res.cookie('Hello', 'world', { maxAge: 60000 });
   res.send(`Hello, World!`);
});

app.listen(PORT, () => {
   console.log(`listening on ${PORT}`);
});