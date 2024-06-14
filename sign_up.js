let password_input = document.getElementById("password-signup-input");
let password_confirmation_input = document.getElementById("confirm-password-signup-input");
let sign_up_button = document.getElementById("sign-up-button");

function checkPassword() {
    if (password_confirmation_input.value === password_input.value) {
        alert("Sign up successful");
    } else {
        alert("Sign up failed");
    }
}

sign_up_button.addEventListener("click", function() {
    checkPassword();
});