export {}

document.getElementById("submit-btn").addEventListener("click", submit); 

document.getElementById("signup-form").addEventListener("submit", handleForm);

async function submit() {
    console.trace("Submit Button pressed");
    let body = JSON.stringify({
        "fname": (document.getElementById("fname-field") as HTMLInputElement).value,
        "lname": (document.getElementById("lname-field") as HTMLInputElement).value,
        "email": (document.getElementById("email-field") as HTMLInputElement).value,
        "password": (document.getElementById("password-field") as HTMLInputElement).value
    });
    console.trace(body);
    let requestParams: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body,
    };
    const request = await fetch("http://127.0.0.1:1337/signup", requestParams);
    const response = await request.json();
    if (response.error) {
        document.getElementById("alert-message").innerHTML = response.error;
        document.getElementById("alert").style.display = "block";
    }
    else {
        alert(response);
    }
}

function handleForm(event) { 
    event.preventDefault(); 
} 