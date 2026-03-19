// api urls
export const USERDETAILSAPI = "http://localhost:3000/user";
export const BOOKDETAILSAPI = "http://localhost:3000/BooksDetails";

//admin credentials
export const ADMINEMAIL = "admin@gmail.com";
export const ADMINPASSWORD = "Admin@123";

// login credential patterns
export const USERNAMEPATTERN = new RegExp(/^[a-zA-Z]{2,20}$/);
export const EMAILPATTERN = new RegExp(/^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,25}$/);
export const PASSWORDPATTERN = new RegExp(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$/);
