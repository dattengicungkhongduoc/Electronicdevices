const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser;
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser) {
                return resolve({
                    status: 'Error',
                    message: 'Email đã tồn tại'
                });
            }

            const hash = bcrypt.hashSync(password, 10);

            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            });

            if (createdUser) {
                return resolve({
                    status: 'Ok',
                    message: 'Success!',
                    data: createdUser
                });
            }

        } catch (e) {
            reject(e);
        }
    });
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email: email });
            if (!checkUser) {
                return resolve({
                    status: 'Error',
                    message: 'Email không tồn tại'
                });
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'Error',
                    message: 'Email hoặc mật khẩu không đúng'
                });
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            });

            return resolve({
                status: 'Ok',
                message: 'Success!',
                access_token,
                refresh_token
            });

        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                return resolve({
                    status: 'Error',
                    message: 'User not found'
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            return resolve({
                status: 'Ok',
                message: 'Success!',
                data: updatedUser
            });

        } catch (e) {
            reject(e);
        }
    });
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                return resolve({
                    status: 'Error',
                    message: 'User not found'
                });
            }

            await User.findByIdAndDelete(id);
            return resolve({
                status: 'Ok',
                message: 'Delete user success!'
            });

        } catch (e) {
            reject(e);
        }
    });
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find();
            return resolve({
                status: 'Ok',
                message: 'success!',
                data: allUser
            });
        } catch (e) {
            reject(e);
        }
    });
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ _id: id });
            if (!user) {
                return resolve({
                    status: 'Error',
                    message: 'User not found'
                });
            }

            return resolve({
                status: 'Ok',
                message: 'success!',
                data: user
            });

        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
}
