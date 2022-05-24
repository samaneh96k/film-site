const {
  hashPassword,
  verifyPassword,
  createToken,
} = require("../middleware/authentication");
const User = require("../model/user");

const CreateUser = async ({ username, password, email }) => {
  const checkExistingUser = await User.find({ username });

  if (checkExistingUser.length > 0) {
    return { error: "نام کاربری وارد شده تکراری است!", status: "ERROR" };
  } else {
    const newPassword = await hashPassword(password);

    const values = { username, password: newPassword, email };

    try {
      const user = await User.create(values);
      const { email, created, role, sub, sub_time, profilePhoto } = user;
      const data = {
        username,
        email,
        created,
        role,
        sub,
        sub_time,
        profilePhoto,
      };
      return { data, status: "SUCCESS" };
    } catch (err) {
      throw err;
    }
  }
};

const UserAuthentication = async ({ username, password }) => {
  const checkExistingUser = await User.findOne({ username });

  if (!checkExistingUser) {
    return {
      error: "نام کاربری ویا رمزعبور وارد شده اشتباه است.",
      status: "ERROR",
    };
  } else {
    const hashPassword = checkExistingUser.password;
    const checkPassword = await verifyPassword(password, hashPassword);

    if (!checkPassword) {
      return {
        error: "نام کاربری ویا رمزعبور وارد شده اشتباه است.",
        status: "ERROR",
      };
    } else {
      const { email, created, role, sub, sub_time, profilePhoto } =
        checkExistingUser;
      const token = await createToken({ username, password, email, created });

      const user = {
        username,
        email,
        created,
        role,
        sub,
        sub_time,
        profilePhoto,
      };
      return { token, user, status: "SUCCESS" };
    }
  }
};

const getUserData = async ({ username }) => {
  // console.log( username)
  const checkExistingUser = await User.findOne({ username });
  const { email, created, role, sub, sub_time, profilePhoto } =
    checkExistingUser;
  return { username, email, created, role, sub, sub_time, profilePhoto };
};

const putUserData = async ({ email, password, username, past_password }) => {
  const findUser = await User.findOne({ username });
  if (password) {
    const checkPassword = await verifyPassword(
      past_password,
      findUser.password
    );
    if (checkPassword === true) {
      const newPassword = await hashPassword(password);
      const value = { password: newPassword, email };
      const user = await User.findByIdAndUpdate(
        findUser._id,
        { ...value },
        { new: true }
      );
      const userData = {
        email: user.email,
        username: username,
        profilePhoto: user.profilePhoto,
        sub: user.sub,
        sub_time: user.sub_time,
        role: user.role,
        created: user.created,
      };
      return { user: userData, status: "SUCCESS" };
    } else {
      return { error: "رمز عبور وارد شده مطابقت ندارد!", status: "ERROR" };
    }
  } else {
    const user = await User.findByIdAndUpdate(
      findUser._id,
      { email },
      { new: true }
    );
    console.log(user);
    const userData = {
      email: user.email,
      username: username,
      profilePhoto: user.profilePhoto,
      sub: user.sub,
      sub_time: user.sub_time,
      role: user.role,
      created: user.created,
    };
    return { user: userData, status: "SUCCESS" };
  }
};

const UsersCount = async () => {
  const usersCount = await User.countDocuments();

  return usersCount;
};

const getUsers = async (params) => {
  const usersCount = await UsersCount();
  const page = parseInt(params.page);
  const pageSize = parseInt(params.pageSize);
  const users = await User.find({})
    .limit(pageSize)
    .skip(page === 1 ? 0 : (page - 1) * pageSize);

  return { users, count: usersCount };
};

const putUser = async (value) => {
  const { userId, values } = value;
  console.log(value);
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { ...values },
    { new: true }
  );
  return updateUser;
};

const getUserId = async (value) => {
  const userId = (await User.findOne(value))._id;

  return userId;
};

module.exports = {
  CreateUser,
  UserAuthentication,
  getUserData,
  putUserData,
  UsersCount,
  getUsers,
  putUser,
  getUserId,
};
