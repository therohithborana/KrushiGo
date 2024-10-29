document.addEventListener('DOMContentLoaded', () => {
    const authTitle = document.getElementById('auth-title');
    const nameField = document.getElementById('name-field');
    const submitBtn = document.getElementById('submit-btn');
    const toggleAuth = document.getElementById('toggle-auth');
    const toggleAuthSecondary = document.getElementById('toggle-auth-secondary');
    const authForm = document.getElementById('auth-form');
    let isLogin = true;  // Start in the login mode

    function updateForm() {
        if (isLogin) {
            authTitle.textContent = 'Login to Your Account';
            nameField.classList.add('hidden');  // Hide name field for login
            submitBtn.textContent = 'Login';
            toggleAuth.textContent = 'Sign up'; // Change button text to "Sign up"
            toggleAuthSecondary.textContent = "Don't have an account? Sign up";
        } else {
            authTitle.textContent = 'Create New Account';
            nameField.classList.remove('hidden'); // Show name field for signup
            submitBtn.textContent = 'Create Account';
            toggleAuth.textContent = 'Login';  // Change button text to "Login"
            toggleAuthSecondary.textContent = 'Already have an account? Login';
        }
    }

    // Event listener for toggling between login and signup
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = false;  // Set to false for signup
        updateForm();     // Update the form to show signup
    });

    // Event listener for toggling back to login
    toggleAuthSecondary.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = true;   // Set to true for login
        updateForm();     // Update the form to show login
    });

    // Event listener for the form submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (isLogin) {
            // Login existing user
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = 'dashboard.html'; // Redirect on successful login
                })
                .catch((error) => {
                    alert("Incorrect email or password.");
                    console.error("Login error:", error.message);
                });
        } else {
            // Register new user
            console.log("Attempting to create a new account with email:", email); // Debugging log
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in
                    console.log("Account created successfully:", userCredential.user); // Debugging log
                    alert("Account created successfully! You can now log in.");
                    isLogin = true; // Switch to login mode after successful signup
                    updateForm();
                })
                .catch((error) => {
                    alert("Error signing up: " + error.message);
                    console.error("Signup error:", error.code, error.message); // Detailed error logging
                });
        }
    });

    updateForm(); // Initialize the form state
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Show loading indicator
    submitBtn.textContent = 'Loading...';
    submitBtn.disabled = true; // Disable button

    if (isLogin) {
        // Login existing user
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.href = 'dashboard.html'; // Redirect on successful login
            })
            .catch((error) => {
                alert("Incorrect email or password.");
                console.error("Login error:", error.message);
                resetForm(); // Reset form after error
            });
    } else {
        // Register new user
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert("Account created successfully! You can now log in.");
                isLogin = true; // Switch to login mode after successful signup
                updateForm();
                resetForm(); // Reset form after successful signup
            })
            .catch((error) => {
                alert("Error signing up: " + error.message);
                console.error("Signup error:", error.code, error.message); // Detailed error logging
                resetForm(); // Reset form after error
            });
    }
});

function resetForm() {
    submitBtn.textContent = isLogin ? 'Login' : 'Create Account';
    submitBtn.disabled = false; // Enable button
}


document.getElementById("browse-button").addEventListener("click", () => {
    document.getElementById("file-input").click();
});

document.getElementById("file-input").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        readPDF(file);
    } else {
        alert("Please upload a valid PDF file.");
    }
});

function readPDF(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        const pdfData = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(pdfData).promise.then((pdf) => {
            pdf.getPage(1).then((page) => {
                page.getTextContent().then((textContent) => {
                    const textItems = textContent.items.map(item => item.str);
                    const fullText = textItems.join(' ');
                    console.log(fullText); // Handle the extracted text as needed
                    document.getElementById("upload-section").classList.add("hidden");
                    document.getElementById("form-section").classList.remove("hidden");
                });
            });
        });
    };
    reader.readAsArrayBuffer(file);
}

// ???????????????????????????????????????? 

