const { JWT_SECRET } = process.env.JWT_SECRET || require('../configs/config'); // {} particular key nikalne ke liye
const userModel = require('../model/userModel');
const Email = require('../utility/email');
const jwt = require('jsonwebtoken');

async function signup(req, res) {
  try {
    const user = await userModel.create(req.body);
    // // exp
    // const emailOptions = {};
    // emailOptions.html = `<h1>Welcome New User </h1> `;
    // emailOptions.to = email;
    // emailOptions.from = "customersupport@everyone.com";
    // emailOptions.subject = "Welcome" ;
    // await Email(emailOptions);

    res.status(201).json({
      status: 'user signed up',
      user,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body; //req ki body main email,pass bheja
    const user = await userModel.findOne({ email }).select('+password'); // login ke liye pass. jaruri hota hai therefore used select
    if (user) {
      if (password == user.password) {
        // jwt
        const { _id } = user; // users main se "_id" nikal rahe hai "_id" user ki id hai jo predefined hoti hai
        const token = jwt.sign({ id: _id }, JWT_SECRET, {
          // giving "_id" as payload to jwt [.sign is signature establishing from payload which is deafault and secret key ]
          expiresIn: Date.now() + 1000 * 60 * 30, // date.now => present + 30 min == token gets expired in 30 min from generation
        });
        res.cookie('jwt', token, { httpOnly: true }); // cookies headers main set ho gayi & sent as res.cookie & it'll verify my token
        // token cookie ke andar jata hai not json => res.cookie ke andar jwt bhej sakte hai => res.cookie("tokenName",token_value,extraParameters)
        res.status(200).json({
          status: 'successfull',
          user,
          token, // yeh token yahan se aage client ko bhej diya
        });
      } else {
        throw new Error("user or password didn't match");
      }
    } else {
      throw new Error("user or password didn't match ");
    }
  } catch (err) {
    console.log(err);
    res.json({
      err: err.message,
    });
  }
}

async function logout(req, res) {
  res.cookie('jwt', 'bgfdgcgf', { expires: new Date(Date.now() + 100) });
  res.json({
    status: 'logged Out',
  });
}

async function protectRoute(req, res, next) {
  // client ko verify karega, authenticate => user
  try {
    let token;
    if (req.headers && req.headers.authorization) {
      // (CASE FOR POSTMAN-FOR TESTERS)  "authorization" key req.headers main hoti hai, => req.headers main authorization key se token nikal rahe hai
      token = req.headers.authorization.split(' ').pop(); // token req.headers.authrization main aa jayega from bearer token
      // console.log(token)
    } else if (req.cookies && req.cookies.jwt) {
      //(CASE FOR WEB)
      token = req.cookies.jwt;
    } else {
      throw new Error('Please provide a token');
    }
    // console.log(req.get("User-Agent"));
    if (token) {
      // agar token Postman OR Web main se kahin se bhi aa gaya toh -
      const decryptedData = jwt.verify(token, JWT_SECRET);
      if (decryptedData) {
        // decryptedData is true when user jwt is verified (decryptedData  matlab verify karna  )
        const id = decryptedData.id; // we sent _id to token in login fn so we take out that _id
        console.log(id);
        // console.log(decryptedData)
        req.id = id; // req par ek nayi key add kar di i.e. "id" [req.id] aur usme[req.id], decryptedData.id = const id ,  yeh id de di, now all other M.W fn can use that req.id
        next();
      } else {
        throw new Error('Invalid Token');
      }
    } else {
      throw new Error('Please login again to access this route ');
    }
  } catch (err) {
    console.log(err);
    let clientType = req.get('User-Agent');
    if (clientType.includes('Mozilla') == true) {
      return res.redirect('/login'); // return ends the startement here only (USING EXPRESS)
    } else {
      res.status(200).json({
        status: 'unsuccessfull',
        err: err.message,
      });
    }
  }
}

async function isUserLoggedIn(req, res, next) {
  //  1. token verify   2. if(token) then req.userName add kar dega
  try {
    let token;
    if (req.cookies.jwt) {
      // this came from login
      token = req.cookies.jwt;
      //console.log(token);
    }
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET);
      if (payload) {
        const user = await userModel.findById(payload.id);
        req.role = user.role;
        req.id = payload.id; // user id jo mongo providde kar raha hai
        req.userName = user.name; // req.userName aage viewController main pass ho jayega, we give it to var name which is printed on UI
        next();
      } else {
        next();
      }
    } else {
      next(); // if token hai => next() call karunga + add users name & token nahi hai tab bhi next() call karunga
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
// authorization
async function isAdmin(req, res, next) {
  try {
    const user = await userModel.findById(req.id); // user ko find kar lunga isse
    if (user) {
      if (user.role == 'admin') {
        next();
      } else {
        throw new Error('User not authorized');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
}

function isAuthorized(roles) {
  //  isAuthorized main saare roles aa rahe hai
  return async function (req, res, next) {
    // yahan se fn return kar diya in planRouter for isAuthorized
    try {
      const { id } = req; // req se "id" aa jayegi
      const user = await userModel.findById(id); // user ko find kar lunga isse
      console.log(user);
      const { role } = user; // taking out "roles"
      if (roles.includes(role) == true) {
        // checking roles => jo current role hai issme wo planRouter main tha, if true => next()
        next();
      } else {
        throw new Error('You are not authorized ');
      }
    } catch (err) {
      console.log(err);
      res.status(403).json({ err: err.message });
    }
  };
}

async function forgetPassword(req, res) {
  try {
    const { email } = req.body; // req.body se email nikala
    const user = await userModel.findOne({ email: email }); // findOne takes input in key-value form

    if (user) {
      // console.log(user);
      const token = user.createToken(); // this.resetToken & this.expiresIn fns from userModel also get attached to this user

      // db => save  // db main save karna hai therefore await and .save
      await user.save({ validateBeforeSave: false }); // validateBeforeSave- prevents validators to execute OR no validation will work
      // email
      const resetPasswordLink = `http://localhost:3000/resetPassword/${token}`; // iss route par req. lagaenge resetPass ke liye

      // these options goes to email.js file
      const emailOptions = {}; // apne options banane padenge mail bhejne ke liye
      emailOptions.html = `<h1>Please click on the link to reset your password </h1>
      <p>${resetPasswordLink}</p>`;
      emailOptions.to = email; // this "email" is the one which came in req.body on /forgetPassword route
      emailOptions.from = 'customersupport@everyone.com'; // it is just a placeholder, actual email comes from email.js file
      emailOptions.subject = 'Reset Password Link';
      await Email(emailOptions); // yahan se emailOptions call ho jayega =>email.js => transport etc.

      res.status(200).json({
        resetPasswordLink, //  sending this resetPasswordLink in response
        status: `Check Gmail ${email}`,
      });
    } else {
      throw new Error('You does not exist');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
}

async function handleResetRequest(req, res, next) {
  try {
    const { token } = req.params; // params se aayega token
    console.log(token);
    let user = await userModel.findOne({ resetToken: token }); // finding on basis of token

    if (user) {
      // if(user) then verify token
      req.token = token;
      //console.log( req.token)
      next();
    } else {
      res.redirect('/somethingWentWrong');
    }
  } catch (err) {
    res.redirect('/somethingWentWrong');
  }
}

async function resetPassword(req, res) {
  try {
    const token = req.params.token; // req.params main token aaya in form of link => usse const token main daal diya
    const user = await userModel.findOne({ resetToken: token }); // findOne takes input in key-value form
    if (user) {
      if (Date.now() < user.expiresIn) {
        const { password, confirmPassword } = req.body; // taking out pass & confirmPass from req.body
        user.handleResetRequest(password, confirmPassword);
        await user.save(); // db main save karna hai therefore await and .save
        res.status(200).json({
          status: 'user password updated login with new password',
        });
      } else {
        throw new Error('token has expired');
      }
    } else {
      throw new Error('user not found');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
}

// async function resetPasswordHelper(req, res) {
//   try {
//     let token = req.params.token; // token req.params main aayega
//     let user = await userModel.findOne({resetToken: token})
//     if (user) {
//       req.token = token;
//       return next()
//     } else {
//       throw new Error(" Invalid URL hai aapka ");
//     }
//   }catch(err){
//     console.log(err);
//   }
// }

module.exports.signup = signup;
module.exports.login = login;
module.exports.logout = logout;
module.exports.protectRoute = protectRoute;
module.exports.isUserLoggedIn = isUserLoggedIn;
module.exports.isAdmin = isAdmin;
module.exports.isAuthorized = isAuthorized;
module.exports.forgetPassword = forgetPassword;
module.exports.resetPassword = resetPassword;
module.exports.handleResetRequest = handleResetRequest;
// module.exports.resetPasswordHelper = resetPasswordHelper;

// In protectRoute fn, token is verified => token ke basis par id de dega and if token is not authenticate user is denied the permissions
// In isUserLoggedIn fn cookie is verified if verified => userName is displayed and loggedin else normally all other pages are displayed
