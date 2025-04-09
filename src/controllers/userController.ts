import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body; // Include username

  try {
    console.log('Incoming registration request:', { username, email, password });

    if (!email || !password) {
      console.error('Missing email or password in request body');
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error(`Email already in use: ${email}`);
      res.status(400).json({ message: 'Email is already in use.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const user = new User({ username, email, password: hashedPassword }); // Include username
    console.log('Saving user to database:', user);

    const savedUser = await user.save();
    console.log('User saved successfully:', savedUser);

    res.status(201).json({ message: 'User registered successfully.', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user.', error });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // This is the critical change - using _id instead of id
    const token = jwt.sign({ _id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h',
    });
    
    console.log('Generated token with user ID:', user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const validateToken = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Token is valid', user: (req as any).user });
};