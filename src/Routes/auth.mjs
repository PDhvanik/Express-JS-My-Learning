import { Router } from "express";
import { mockUsers } from "../Utils/constants.mjs";

const router =Router();
router.post('/api/auth', (req, res) => {
   const { body: { username, password } } = req;
   const findUser = mockUsers.find((user) => user.username === username);

   if (!findUser || findUser.password !== password) return res.status(401).send({ msg: 'Bad Credentials.' });

   // @ts-ignore
   req.session.user = findUser;
   return res.status(200).send(findUser);
});


router.get('/api/auth/status', (req, res) => {
   req.sessionStore.get(req.sessionID, (error, session) => {
      if (error) return res.status(400);
      console.log(session);
   });
   // @ts-ignore
   return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send({ msg: "Not Authenticated." });
});