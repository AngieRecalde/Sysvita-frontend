const container1 = document.getElementById('container');
const registerBtn1 = document.getElementById('register');
const loginBtn1 = document.getElementById('login');

registerBtn1.addEventListener('click', () => {
    container1.classList.add("active");
});

loginBtn1.addEventListener('click', () => {
    container1.classList.remove("active");
});