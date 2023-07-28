const { hashPassword } = require("../services/encryptPassword");

function isValidUser(user) {

    return Object.values(user).every(value => value != null && value != '');

}


async function userCreationAdapter(req, res, next) {
    const { user } = req.body;

    if (!user) return res.status(400).end();

    const isUserValidated = isValidUser(user);

    if (!isUserValidated) return res.status(400).end();
    
    const encryptedUser = {
        ...user, 
        password: await hashPassword(user.password)
    }
    
    
    req.encryptedUser = encryptedUser;

    next();
}

module.exports = { userCreationAdapter }
