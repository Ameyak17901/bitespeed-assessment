import { Contact, ContactRequestBody } from "../interfaces/Contact";
import { Request, Response } from "express";
import { db } from "../database/drizzle";
import { ContactTable } from "../database/schema";
import { eq, or, and } from "drizzle-orm";

export async function createContact(request: Request, response: Response) {
  try {
    const { phoneNumber, email } = request.body as ContactRequestBody;
    if (!email && !phoneNumber) {
      return response.status(404).json({
        success: false,
        message: "Invalid Data",
      });
    }
    // if either phonenumber or email is null
    const contacts = await db
      .select()
      .from(ContactTable)
      .where(
        or(
          eq(ContactTable.phoneNumber, phoneNumber),
          eq(ContactTable.email, email)
        )
      );
    if (contacts.length === 0) {
      if (!phoneNumber || !email) {
        return response.status(400).json({
          success: false,
          message: "Invalid Data",
        });
      }
      const newContact: Contact = {
        phoneNumber,
        email,
        linkPrecedence: "primary",
        linkedId: null,
      };

      const insertedContact = await db
        .insert(ContactTable)
        .values(newContact)
        .returning();
      return response.status(200).json({
        contact: {
          primaryContactId: insertedContact[0].id,
          emails: [insertedContact[0].email],
          phoneNumbers: [insertedContact[0].phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    if (!phoneNumber) {
      return response.status(200).json({
        contact: {
          primaryContactId: contacts.filter(
            (cont) =>
              cont.linkPrecedence === "primary" &&
              (cont.phoneNumber === phoneNumber || cont.email === email)
          )[0].id,
          emails: [
            ...contacts
              .filter((cont) => cont.email === email)
              .map((cont) => cont.email),
          ],
          phoneNumbers: [
            ...contacts
              .filter((cont) => cont.email === email)
              .map((cont) => cont.phoneNumber),
          ],
        },
      });
    }

    if (!email) {
      return response.status(200).json({
        contact: {
          primaryContactId: contacts.filter(
            (cont) =>
              cont.linkPrecedence === "primary" &&
              (cont.phoneNumber === phoneNumber || cont.phoneNumber === email)
          )[0].id,
          emails: [
            ...contacts
              .filter((cont) => cont.phoneNumber === phoneNumber)
              .map((cont) => cont.email),
          ],
          phoneNumbers: [
            ...contacts
              .filter((cont) => cont.phoneNumber === phoneNumber)
              .map((cont) => cont.phoneNumber),
          ],
        },
      });
    }
    const newContact: Contact = {
      phoneNumber,
      email,
      linkPrecedence: "secondary",
      linkedId: contacts.filter(
        (contact) =>
          contact.email === email ||
          contact.phoneNumber === phoneNumber &&
          contact.linkPrecedence === "primary"
      )[0].id,
    };

    const insertedContact = await db
      .insert(ContactTable)
      .values(newContact)
      .returning();
    return response.status(200).json({
      contact: {
        primaryContactId: contacts.filter(
          (contact) => contact.linkPrecedence === "primary"
        )[0].id,
        emails: [
          ...contacts
            .filter((contact) => contact.phoneNumber === phoneNumber)
            .map((contact) => contact.email),
        ],
        phoneNumbers: [
          ...contacts
            .filter((contact) => contact.email)
            .map((contact) => contact.phoneNumber),
        ],
        secondaryContactIds: [
          ...contacts
            .filter((contact) => contact.linkPrecedence === "secondary")
            .map((contact) => contact.id),
          insertedContact[0].id,
        ],
      },
    });
  } catch (error) {
    console.log("Error creating contact", error.message);
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
}
