//.env variables
export const PORT = 4500;
export const DB_URL = 'mongodb+srv://rjain90:CottonCandy12@cluster0.loejesi.mongodb.net/';
export const maxTokenAgeInSec = 7 * 24* 60 *60;
export const JWTSecretKey = "Blog project JWT secret key";

// Text strings
export const SERVER_RUN_LOG = `Local server is running on %s`;
export const DEFAULT_API_RESPONSE = 'Blog is running';
export const DB_CONNECTION_REQUEST_SUCCESS = 'DB connected successfully';
export const ERR_EMAIL_INVALID = "Email is invalid";
export const ERR_EMAIL_REQUIRED = "Email is required";
export const ERR_EMAIL_DUPLICATE = "Email already exists, please use a different email";
export const ERR_PASSWORD_REQUIRED = "Password is required";
export const ERR_PASSWORD_LENGTH = "Password should be atleast 8 characters long";
export const ERR_VALIDATION_MESSAGE = "user validation failed";
export const ERR_EMAIL_NOT_FOUND = "Email not found";
export const ERR_PASSWORD_INCORRECT = "Incorrect Password";
export const ERR_TOKEN_MISSING = "Auth Token Missing";
export const ERR_TOKEN_INVALID = "Auth Token is Invalid";
export const KEY_HEADER_AUTH = "authorisation";
