//  email,password ,request backend=> reply
let d = document;
let loginBtn = d.querySelector(".login-button");    
let signupForm = d.querySelector(".signup");    
let logout = d.querySelector(".logout");

async function loginHelper(email, password) {
  const response = await axios.post("/api/users/login", {
    email, password
  })
  if (response.data.status == "successful") {
    alert("Login Successfull")
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
}

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();     // stops reloading of page 
    const email = d.querySelector(".email").value;
    const password = d.querySelector(".password").value
    const confirmPassword = d.querySelector(".confirmPassword").value;
    const name = d.querySelector(".name").value;
    signupHelper(email, password, confirmPassword, name); // i/p lega values aur aage proceed kar dega 
  })
}

// when y are logged in there'll be no login button so we cannot add eventlistener on null, => if loginBtn will be present then only add event listener
if (loginBtn) { 
  loginBtn.addEventListener("click", function (e) {   // 1. click 
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

async function logoutHelper() {
  const backendResponse = await axios.get("/logout"); // logout => "click" event => "/logout" par req jaa rahi hai => await kar liya usko 
  if (backendResponse.data.status == "user LoggedOut") {  
    // wrong token 
    location.reload();  // if backendResponse.data.status main loggedout aata hai toh => reload ho jayega => "/login" par chala jayega 
  } else {
    alert("logout failed");
  }
}


// 1. select karunga element ko
// 2. addEventListener to that Element
// 3. take out its value whenever event occur on it 
// 4. post request

//  agar above link par click hoo toh yeh kahin jaye na; => (href= "javascript: ; ") ==> nav.pug


















