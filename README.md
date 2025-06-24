# Identity Reconcilation

#### Identity Reconcilation is web service to identify contacts whether primary or secondary.

### Use-cases:
- Identify the precedence of contact whether the contact is primary or secondary.
- Create a secondary contact if the primary contact exists.
- Fetch contact for given phone number or email.
- Create a new primary contact for given email and phone number.

### Instructions:
The webservice is started by following below instructions.
- Clone the repositry using below command:
  ```bash
  git clone https://github.com/Ameyak17901/bitespeed-assessment.git
  ```
- Install the dependencies:
  ```bash
  npm install  
  ```
- Create environment variable file.
  ```bash
  DATABASE_URL=
  ```
- Generate and migrate the migrations file for drizzle ORM:
  ```bash
  npx drizzle-kit generate
  npx drizzle-kit migrate
  ```
  - To change the database use below command:
    ```bash
    npx drizzle-kit push
    ```
- To start the web service run the below command:
  ```bash
  npm run start 
  ```

### API Documentation:
1. /identify  
  This endpoint is where all the use-cases can be implemented from creating a new contact to create a secondary contact
- Request Body:
  ```json
    {
        "email": "your-email",
        "phoneNumber": "your-phonenumber"   
    }
  ```
  - Response:
  ```json
    {
        "primaryContactId": "number",
        "emails": ["email"],
        "phoneNumbers": ["phoneNumber"],
        "secondaryContactIds": ["number"]
    }
  ```

  ### Postman Documentation [Postman]() 
