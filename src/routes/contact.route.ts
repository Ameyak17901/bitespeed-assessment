import express from "express";
import { createContact } from "../controllers/contact.controller";

const router = express.Router();

router.post("/identify", (request, response) => {
  createContact(request, response);
});

export default router;
