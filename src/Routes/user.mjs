import { Router } from "express";
import {
   checkSchema,
   query,
   validationResult
} from "express-validator";
import { mockUsers } from "../Utils/constants.mjs";
import resolveIndexByUserId from "../Utils/middlewares.mjs";
import { createUserValidationSchema } from "../Utils/validationSchemas.mjs";
import session from "express-session";

const router = Router();


router.get(
   "/api/users",
   query("filter")
   .isString()
   .notEmpty()
   .withMessage("Must not be empty")
   .isLength({ min: 3, max: 10 })
   .withMessage("Must be at least 3-10 characters!"),
   (request, response) => {
      console.log(request.session);
      console.log(request.session.id);
      request.sessionStore.get(request.session.id,(error,sessionData)=>{
         if(error) {
            console.log(error);
            throw error;
         }

         console.log(sessionData);
      })
      // const result = validationResult(request);
      // console.log(result);
      const {
         query: { filter, value },
      } = request;
      if (filter && value)
      return response.send(
   mockUsers.filter((user) => user[filter].includes(value))
   );
   return response.send(mockUsers);
}
);

router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
   console.log(request);
   // @ts-ignore
   const { findUserIndex } = request;
   const findUser = mockUsers[findUserIndex];
   if (!findUser) return response.sendStatus(404);
   return response.send(findUser);
});

router.post(
   "/api/users",
   checkSchema(createUserValidationSchema),


);

router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
   console.log(request);
   // @ts-ignore
   const { body, findUserIndex } = request;
   mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
   return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
   // @ts-ignore
   const { body, findUserIndex } = request;
   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
   return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserId, (request, response) => {
   // @ts-ignore
   const { findUserIndex } = request;
   mockUsers.splice(findUserIndex, 1);
   return response.sendStatus(200);
});

export default router;