
// general user object represent the user information in login page, either is customer or staff
const User = {
    id: 0,
    credentials: -1,
    pw: document.querySelector('input[type = "password"]'),
    userName: document.querySelector('input[type = "text"]'),
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
}
// the states for checking the username and password 
let nameState = false;
let pwState = false;
// warning variable to ensure only 1 alert will arise
let warning = 0;
let role = 'None'; // storing the role of user, login as customer or as staff
const form = document.querySelector('form');
// the function loops through each user object in Edited_DBLoaded to check the info
const user = document.querySelector('#user');

user.addEventListener('change', checkRole);
form.addEventListener('submit', checkInfo)
// check for the role of user
function checkRole() {
    if (this.value === 'Customer') {
        role = DB.users;
    } else if (this.value == 'Staff') {
        role = DB.staff;
    }
}
//the function to redirect the login to addCustomerOrders page
function changePage() {
    if (role === DB.users) {
        window.location.assign("VIPMenu.html");
    } else if (role === DB.staff) {
        // redirect to table 
        window.location.assign("index.html");
    }
}
function checkInfo(e) {
    e.preventDefault();
    // alert user when forget to choose the role
    if (role === 'None') {
        alert("You have to choose your role first!");
    }
    else {
        // checking procedure
        for (let user of role) {
            if (User.userName.value === user.username) {
                nameState = true;
                if (User.pw.value === user.password) {
                    pwState = true;
                    localStorage.setItem("CurrentUser", user.username);
                    break;
                } else {
                    alert('Incorrect username or password');
                    warning = 1;
                    break;
                }
            }
        }
        if (nameState && pwState) {
            console.log("Login successfully!");
            warning = 1;
            changePage();
            role = 'None';
        }
        if (warning === 0) {
            if (role === DB.users) {
                alert("You are not a VIP customer");
            } else if (role === DB.staff) {
                alert("You are not a staff member");
            }
        }
    }
    nameState = false;
    pwState = false;
    warning = 0;
}