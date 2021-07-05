import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../model/UserModel.js';

//initialize env
dotenv.config();

const AuthController = {
  signUp: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Please fill all fields' });
    }

    //find if email already exist

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'User already exist' });
    }

    //password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    if (hash) {
      const newUser = new User({ name, email, password: hash });
      const savedUser = await newUser.save();

      if (savedUser) {
        jwt.sign(
          { id: savedUser._id },
          process.env.SECRET,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              throw err;
            }

            res.status(200).json({
              status: 'success',
              data: {
                token: "Bearer " + token,
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
              },
              message: 'successful',
            });
          }
        );
      }
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Provide email and password' });
    }

    const isUser = await User.findOne({ email });

    if (!isUser) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'record not found' });
    }

    //validate user password
    const match = await bcrypt.compare(password, isUser.password);

    if (!match) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'email or password is incorrect' });
    }

    jwt.sign(
        { id: isUser._id },
        process.env.SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          return res.status(200).json({
            status: 'success',
            data: {
              token:"Bearer " + token,
              id: isUser._id,
              name: isUser.name,
              email: isUser.email,
            },
            message: 'successful',
          });
        }
      );    
  },
};
export default AuthController;
