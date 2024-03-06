import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";
import { UserDocument } from "../types/user.interface";
import { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const normalizeUser = (user: UserDocument) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secret);
  return {
    email: user.email,
    fullName: user.fullName,
    contactNumber: user.contactNumber,
    birthDate: user.birthDate,
    id: user.id,
    token,
  };
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const newUser = new UserModel({
      fullName: user.fullName,
      contactNumber: user.contactNumber,
      birthDate: user.birthDate,
      password: user.password,
      email: user.email,
    });
    const savedUser = await newUser.save();
    res.status(200).send(normalizeUser(savedUser));
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      const messages = Object.values(err.errors).map((err) => err.message);
      return res.status(422).json(messages);
    }
    next(err);
  }
};
