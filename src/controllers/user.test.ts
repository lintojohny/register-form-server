import { Request, Response, NextFunction } from "express";
import { register } from "./user";
import User from "../models/user";

jest.mock("../models/user");

describe("User Controller", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should register a new user for valid data", async () => {
    const mockRequest = {
      body: {
        user: {
          fullName: "John Doe",
          contactNumber: "1234567890",
          birthDate: "2000-01-01",
          password: "password123",
          email: "john.doe@example.com",
        },
      },
    } as Request;

    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn() as NextFunction;

    const mockUser = new User({
      fullName: "John Doe",
      contactNumber: "1234567890",
      birthDate: "2000-01-01",
      password: "password123",
      email: "john.doe@example.com",
    });

    jest.spyOn(User.prototype, "save").mockResolvedValue(mockUser);

    await register(mockRequest, mockResponse, mockNext);

    expect(mockResponse.send).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockNext).not.toHaveBeenCalled();
  });
});
