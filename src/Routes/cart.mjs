import { Router } from "express";

const router=Router();

router.post('/api/cart', (req, res) => {
   // @ts-ignore
   if (!req.session.user) return res.sendStatus(401);

   const { body: item } = req;

   // @ts-ignore
   const { cart } = req.session;
   console.log(req.session)
   if (cart) {
      cart.push(item);
   }
   else {
      // @ts-ignore
      req.session.cart = [item];
   }

   return res.status(201).send(item);
});

router.get('/api/cart', (req, res) => {
   // @ts-ignore
   if (!req.session.user) return res.sendStatus(401);

   // @ts-ignore
   return res.send(req.session.cart ?? []);
});