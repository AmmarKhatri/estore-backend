const jwt = require("jsonwebtoken");
const adminToken = require("./admin_token_validation");
async function checkToken (req, res, next)  {
  let token = req.get("authorization");
  if (token) {
    // Remove Bearer from string
    token = token.slice(7);
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        adminToken(req,res,next);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: 0,
      message: "Access Denied! Unauthorized User"
    });
  }
}
module.exports = checkToken;