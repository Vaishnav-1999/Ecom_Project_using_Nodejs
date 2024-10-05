import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    // 1.Read Token
    console.log(req.headers);
    const token = req.headers['authorization'];

    // 2.No Token give error.
    if (!token) {
        console.log(token);
        return res.status(401).send("Unauthorized");
    }

    // 3.Check if Token is Valid.
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userID;
        console.log(payload);
    }catch(err){
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    // 4.call next middleware.
    next();

}
export default jwtAuth;