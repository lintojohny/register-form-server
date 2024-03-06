import { log } from "console";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Define a schema for validating the request body
const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Missing full name")
      .matches(
        /^[a-zA-Z0-9@]+$/,
        "This field cannot contain white space and special character"
      ),
    contactNumber: yup
      .string()
      .required("Missing contact number")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "Too short, Enter valid 10 digit phone number")
      .max(10, "Too long, Enter valid 10 digit phone number"),

    email: yup
      .string()
      .required("Missing email")
      .email("Sorry, this email address is not valid. Please try again."),
    password: yup
      .string()
      .required("Missing password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  })
  .required();
// Middleware function to validate request body against the schema
export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.user);

    await schema.validate(req.body.user);
    next();
  } catch (error) {
    // If validation fails, send an error response
    if (error instanceof Error && error.message) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: "Validation failed" });
    }
  }
};
