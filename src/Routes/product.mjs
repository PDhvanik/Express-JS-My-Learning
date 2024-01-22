import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
   // console.log(request.headers.cookie);
   response.cookie('Hello',"world",{signed:true});
   console.log(request.cookies);
   if (request.cookies.Hello && request.cookies.Hello === "world") { 
      response.send([{ id: 123, name: "chiken breast", prize: 12.99 }]); 
   }
   else{
      return response.status(403).send({msg:"Sorry.You need the correct cookies."});
   }
});

export default router;