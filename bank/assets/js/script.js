class Bank {
  login = async (event) => {
    const firstname = document.getElementById("fname");
    const lastname = document.getElementById("lname");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const password = document.getElementById("pass");
    const reEnter = document.getElementById("re-enter");
    event.preventDefault();
    const signupData = {
      firstname: firstname.value,
      lastname: lastname.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    };
    if (password.value !== reEnter.value) {
      alert("password didn't match");
      return;
    }

    const response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
  };
}

const run = () => {
  const b = new Bank();
  const signup = document.getElementById("create-acc");
  signup.addEventListener("click", (event) => b.login(event));
};

window.onload = run;
