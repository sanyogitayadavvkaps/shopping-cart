import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
const SECRET_KEY = "QWERTYUIOPASDFGHJKLZXCVBNM";
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    maxLegnth: [30, "Name Can't exceed 30 characters"],
    minLegnth: [3, "Name shoud have more than 4 characters"],
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, "Please Enter a Valid Email"],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false

  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

export const User = mongoose.model("userdetails", userSchema);

export const postUserModel = async ({
  body
}) => {
  const {
    firstName,
    lastName,
    email,
    _id,
    password,
    mobile,


  } = body;
  const isExist = await User.findOne({
    email: body.email
  });
  if (isExist) {
    return {
      error: "Email already exists!!"
    };
  }
  try {
    const res = await User.create({
      firstName,
      lastName,
      email,
      _id,
      password,
      mobile,
    });
    return {
      data: res,
      message: "Succes",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};

export const getUserModel = async (search, pageSize, startIndex) => {
  try {
    const res = await User.aggregate([{
        $match: {
          $or: [{
              firstName: {
                $regex: new RegExp(search, "i")
              }
            },
            {
              lastName: {
                $regex: new RegExp(search, "i")
              }
            },
            {
              mobile: {
                $regex: new RegExp(search, "i")
              }
            },
            {
              email: {
                $regex: new RegExp(search, "i")
              }
            },
          ],
        },
      },
      {
        $skip: startIndex
      },
      {
        $limit: pageSize
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          mobile: 1,
          email: 1,
        },
      },
    ]);
    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / pageSize);
    return {
      data: res,
      count,
      totalPages,
      message: "Succes",
      status: 200,
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
}


export const loginModel = async ({
  body
}) => {
  const {
    email,
    password
  } = body;
  if (!(email && password)) {
    return {
      message: "All Fields Required"
    };
  }
  try {
    const isExist = await User.findOne({
      email: body.email,

    });
    if (!isExist) {
      return {
        error: "Email not found"
      };
    }
    const match = await bcrypt.compare(password, isExist.password);
    if (!match) {
      return {
        passwordError: "Incorrect password"
      };
    }
    if (match) {
      const {
        email,
        _id,
        password,
        firstName,
        lastName,
        mobile,
        isPaid

      } = isExist;
      const UserDataClone = {
        email,
        _id,
        password,
        firstName,
        lastName,
        mobile,
        isPaid
      };
      const token = jwt.sign({
        userId: _id
      }, SECRET_KEY, {
        expiresIn: "10h",
      });
      UserDataClone.token = token;
      return {
        auth: true,
        data: UserDataClone,
        message: "Succes",
        status: 200,
      };
    } else {
      return {
        error: "Credential not matchecd"
      };
    }
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};


export const getUserByIdModel = async (id) => {
  try {
    const res = await User.findById(id);
    return {
      data: res,
      message: "Succes",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};

export const updateUserModel = async (id, body) => {
  try {
    const res = await User.findByIdAndUpdate(id, body, {
      new: true
    });
    return {
      data: res,
      message: "Success",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};

export const removeModel = async (id) => {
  try {
    const res = await User.findByIdAndRemove(id);
    return {
      data: res,
      message: "Success",
      status: 200
    };
  } catch (err) {
    return {
      message: err,
      status: 500
    };
  }
};