
## Available Scripts

In the project directory, you can run:
## npm install
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

--> On the Home page, all blogs are public and can be viewed by anyone.

--> Once you register, a verification email will be sent to your email address. After clicking the verification link, you will be redirected to the login page. 4

--> By default, every new user who registers will be assigned the user role.

--> The first user must manually update their role to admin directly in the database (MongoDB).

--> After at least one admin exists:

   #The admin will be able to view all users.

   #The admin can grant admin access to any other user through the Admin Access page in the application.

--> This ensures that only authorized users can manage blog content and system access securely.

--> You can add new blogs, edit and delete blogs by going through blogs pages 
