function signIn(){
    let email_input = document.querySelector(".email-login-input").value;
    let password_input = document.querySelector(".password-login-input").value;
    let user = {
        email: "email",
        password: "password"
    }
    if(email_input === user.email && password_input === user.password){
        alert("Login successful"); }
        else{
            alert("Login failed");
            // to go to main screen
        } 
    }
