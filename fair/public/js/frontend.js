//  email,password ,request backend=> reply
let d = document;  
let login = d.querySelector(".login");    // form.login ko select karega in login.pug 
let logout = d.querySelector(".logout");
let signup = d.querySelector(".signup");
let fPassword = d.querySelector(".forgetPassword");
let plan = d.querySelector(".plan");  


async function forgetPasswordHelper(email) {
  var str = email;
  var email = str.toLowerCase();
  console.log(email)
  const response = await axios.patch("/api/users/forgetPassword", { "email":email },{ headers : {
    'Content-Type': 'application/json'
}}
);
  if(response.data.status){
    alert("Check Gmail");
  }else {
    alert("You don't exist");
  }
}

if (fPassword) {
  fPassword.addEventListener("submit", function (e) {
    e.preventDefault();
     let email = d.querySelector(".email").value;
    forgetPasswordHelper(email);
  })  
}

async function loginHelper(email, password) {
  const response = await axios.post("/api/users/login", {
    email, password
  })
  console.log(response.data)
  if (response.data.status == "successfull") {
    alert("Login Successful")
    location.assign("/profile");  // if login successful then assigned the /profile page  (USING BROWSER)
  } else {
    alert("Try again");
  }
}

async function signupHelper(email, password, confirmPassword, name) {
  const response = await axios.post("/api/users/signup", {    // object main daal do email,pass etc
    email, password, confirmPassword, name
  });
  console.log(response.data);
  if (response.data.status == "user signed up"){
    alert("signup successful")
    location.assign("/profile");
  }else{
    alert("Try again");
  }
}

if (signup) {
  signup.addEventListener("click", function (e) {
    e.preventDefault();     // stops reloading of page 
    const name = d.querySelector(".name").value;
    const email = d.querySelector(".email").value;
    const password = d.querySelector(".password").value
    const confirmPassword = d.querySelector(".confirmPassword").value;
    signupHelper(email, password, confirmPassword, name); // i/p lega values aur aage proceed kar dega 
  })
}

// when y are logged in there'll be no login button so we cannot add eventlistener on null, => if loginBtn will be present then only add event listener
if (login) { 
  login.addEventListener("submit", function (e) {   // 1. click 
    e.preventDefault();
    let email = d.querySelector("input[type=email]").value;   // 2. form ke andar email ki value & password ki val ko nikali 
    let password = d.querySelector("input[type=password]").value;
    loginHelper(email, password)   //3. backend par req maar di 
  })
}

if (logout) { // jab bhi logout fn par click hoga => logoutHelper() fn call ho jayega 
  logout.addEventListener("click", function () {
    logoutHelper();
  })
}

if(plan){
  plans.addEventListener("click",function(){
    plansHelper();
  })
}

async function logoutHelper() {
  const backendResponse = await axios.get("/api/users/logout"); // logout => "click" event => "/logout" par req jaa rahi hai => await kar liya usko 
  if (backendResponse.data.status == "logged Out") {  
    // wrong token 
    alert("Logout Successful")
    location.assign("/");  // if backendResponse.data.status main loggedout aata hai toh => reload ho jayega => "/login" par chala jayega 
  } else {
    alert("logout failed");
  }
}

async function plansHelper(){
  const plansResponse = await axios.get("/api/plans/getAllPlans");
  if(plansResponse.status.data=="successfull"){
    location.assign("/plans");
  }else{
    alert("cannot fetch plans")
  }
}


// 1. select karunga element ko
// 2. addEventListener to that Element
// 3. take out its value whenever event occur on it 
// 4. post request

//  agar above link par click hoo toh yeh kahin jaye na; => (href= "javascript: ; ") ==> nav.pug


















