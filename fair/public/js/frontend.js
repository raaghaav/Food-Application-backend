//  email,password ,request backend=> reply
let d = document;
let stripe = Stripe('pk_test_lxMil4ZnmRSIqXFo9iAtSBEk00TsoHvh0s');
let paymentBtn = d.querySelectorAll('.payment');
let login = d.querySelector('.login'); // form.login ko select karega in login.pug
let logout = d.querySelector('.logout');
let signup = d.querySelector('.signup');
let fPassword = d.querySelector('.forgetPassword');
let plan = d.querySelector('.plan');
let updateProfile = d.querySelector('.updateProfile');
let resetPasswordForm = document.querySelector('.resetPassword');

if (fPassword) {
  fPassword.addEventListener('submit', function (e) {
    e.preventDefault();
    let email = d.querySelector('.email').value;
    forgetPasswordHelper(email);
  });
}

async function forgetPasswordHelper(email) {
  var str = email;
  var email = str.toLowerCase();
  console.log(email);
  const response = await axios.patch(
    '/api/users/forgetPassword',
    { email: email },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (response.data.status) {
    alert('Check Gmail');
  } else {
    alert("You don't exist");
  }
}

// when y are logged in there'll be no login button so we cannot add eventlistener on null, => if loginBtn will be present then only add event listener
if (login) {
  login.addEventListener('submit', function (e) {
    // 1. click
    e.preventDefault();
    let email = d.querySelector('input[type=email]').value; // 2. form ke andar email ki value & password ki val ko nikali
    let password = d.querySelector('input[type=password]').value;
    loginHelper(email, password); //3. backend par req maar di
  });
}

async function loginHelper(email, password) {
  const response = await axios.post('/api/users/login', {
    email,
    password,
  });
  console.log(response.data);
  if (response.data.status == 'successfull') {
    alert('Login Successful');
    location.assign('/profile'); // if login successful then assigned the /profile page  (USING BROWSER)
  } else {
    alert('Try again');
  }
}

if (signup) {
  signup.addEventListener('click', function (e) {
    e.preventDefault(); // stops reloading of page
    const name = d.querySelector('.name').value;
    const email = d.querySelector('.email').value;
    const password = d.querySelector('.password').value;
    const confirmPassword = d.querySelector('.confirmPassword').value;
    signupHelper(email, password, confirmPassword, name); // i/p lega values aur aage proceed kar dega
  });
}

async function signupHelper(email, password, confirmPassword, name) {
  const response = await axios.post('/api/users/signup', {
    // object main daal do email,pass etc
    email,
    password,
    confirmPassword,
    name,
  });
  console.log(response.data);
  if (response.data.status == 'user signed up') {
    alert('signup successful');
    location.assign('/profile');
  } else {
    alert('Try again');
  }
}

if (logout) {
  // jab bhi logout fn par click hoga => logoutHelper() fn call ho jayega
  logout.addEventListener('click', function () {
    logoutHelper();
  });
}

async function logoutHelper() {
  const backendResponse = await axios.get('/api/users/logout'); // logout => "click" event => "/logout" par req jaa rahi hai => await kar liya usko
  if (backendResponse.data.status == 'logged Out') {
    // wrong token
    alert('Logout Successful');
    location.assign('/'); // if backendResponse.data.status main loggedout aata hai toh => reload ho jayega => "/login" par chala jayega
  } else {
    alert('logout failed');
  }
}

if (plan) {
  plan.addEventListener('click', function () {
    plansHelper();
  });
}

async function plansHelper() {
  const plansResponse = await axios.get('/api/plans/getAllPlans');
  if (plansResponse.status.data == 'successfull') {
    location.assign('/plan');
  } else {
    alert('cannot fetch plans');
  }
}

if (updateProfile) {
  updateProfile.addEventListener('change', function (e) {
    e.preventDefault();
    const formData = new FormData(); // multipart data send  format
    formData.append('user', updateProfile.files[0]); // "user" bhejunga  & updateProfile ki files ke andar hoti hai images
    updateProfileHelper(formData);
  });
}

async function updateProfileHelper(formData) {
  let response = await axios.patch('/api/users/updateProfile', formData);
  if (response.data.success) {
    alert('profile Image uploaded');
    location.reload();
  } else {
    alert('something went wrong');
  }
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let password = d.querySelector('.password').value;
    let confirmPassword = d.querySelector('.confirmPassword').value;
    const token = resetPasswordForm.getAttribute('data-token');
    // alert(password)
    // alert(confirmPassword)
    // alert(token)
    handleResetRequest(password, confirmPassword, token);
  });
}

async function handleResetRequest(password, confirmPassword, resetToken) {
  const response = await axios.patch(`/api/users/resetPassword/${resetToken}`, {
    password,
    confirmPassword,
  });
  if (response.data.status == 'user password updated login with new password') {
    alert('Your password has been reset');
    location.assign('/login');
  } else {
    alert('something wnet wrong');
  }
}

if (paymentBtn) {
  // for (x in paymentBtn) {
  //   console.log(paymentBtn[x])
  //   const btn = paymentBtn[x];
  //   btn.addEventListener('click', function (e) {
  //     e.preventDefault();
  //     
  //   });
  // }
  $(".payment").click(function(){alert("Redirecting to payment page")
  const planId = $(".payment").attr('plan-id');
      payementHelper(planId);
      
})
}

async function payementHelper(planId) {
  const response = await axios.post('/api/bookings/createSession', { planId });
  if (response.data.status) {
    const { session } = response.data; // we know session key aayi hui hai so fetched session
    const id = session.id; // id generated by session
    stripe
      .redirectToCheckout({
        sessionId: id,
      })
      .then(function (result) {
        alert(result.error.message);
      });
  } else {
    alert('Payment failed');
  }
}
//  image backend

// 1. select karunga element ko
// 2. addEventListener to that Element
// 3. take out its value whenever event occur on it
// 4. post request

//  agar above link par click hoo toh yeh kahin jaye na; => (href= "javascript: ; ") ==> nav.pug
