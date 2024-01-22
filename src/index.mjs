import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import routes from "./Routes/index.mjs";
import { mockUsers } from './Utils/constants.mjs';

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

app.post('/api/auth', (req, res) => {
   const { body: { username, password } } = req;
   const findUser = mockUsers.find((user)=>user.username === username);

   if(!findUser || findUser.password !== password) return res.status(401).send({msg:'Bad Credentials.'});

   // @ts-ignore
   req.session.user=findUser;
   return res.status(200).send(findUser);
});

app.get('/api/auth/status', (req, res) => {
   req.sessionStore.get(req.sessionID,(error, session) => {
      if(error) return res.status(400);
      console.log(session);
   });
   // @ts-ignore
   return req.session.user ? res.status(200).send(req.session.user):res.status(401).send({msg:"Not Authenticated."});
});

app.post('/api/cart',(req,res)=>{
   // @ts-ignore
   if(!req.session.user) return res.sendStatus(401);

   const {body:item}= req;

   // @ts-ignore
   const {cart}=req.session;

   if(cart){
      cart.push(item);
   }
   else{
      // @ts-ignore
      req.session.cart=[item];
   }

   return res.status(201).send(item);
});

app.get('/api/cart',(req,res)=>{
   // @ts-ignore
   if(!req.session.user) return res.sendStatus(401);

   // @ts-ignore
   return res.send(req.session.cart ?? []);
});