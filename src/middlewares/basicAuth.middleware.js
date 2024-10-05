import UserModel from "../user/user.model.js";

const basicAuthorizer = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // 1.Check if authorization header is empty.

    if (!authHeader) {
        res.status(401).send("No Authorization Details found");
    }

    // 2.Extract Credentials.
    console.log(authHeader);
    const base64Credentials = authHeader.replace('Basic', '');
    console.log(base64Credentials);

    // 3.Decode Credentials.

    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log(decodedCreds); //[username:password]

    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u => u.email == creds[0] && u.password == creds[1]);

    if (user) {
        next();
    } else {
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;