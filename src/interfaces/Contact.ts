export interface Contact {
  id?: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: number;
  linkPrecedence: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ContactRequestBody {
  phoneNumber?: string;
  email?: string;
}
