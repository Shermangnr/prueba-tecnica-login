document.addEventListener("DOMContentLoaded", () => {
    //Declaracion de variables que se obtienen por ID de los elementos
    const loginContainer = document.getElementById("cont-login");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login-btn");
    const message = document.getElementById("mensaje");
    const progressBarContainer = document.getElementById("progress-bar-container");
    const progressBar = document.getElementById("progress-bar");
    const btnText = document.getElementById("btn-text");
    
    /*
    Condicional para cuando el usuario ingrese sus datos y aparezca mensaje de bienvenida
    */
    if (localStorage.getItem("user")) {
        loginContainer.innerHTML = `<h4>Bienvenido, ${localStorage.getItem("user")}!</h4><button id='logout-btn' class='btn btn-primary' style='margin-top: 15px;'>Cerrar Sesión</button>`;
        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("user");
            location.reload();
        });
        return;
    }
    
    loginBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        /*
        Condicional para verificar que el usuario ingrese una direccion de correo electronico
        Si no se cumple aparece mensaje de error
        */
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            message.textContent = "¡Error! Correo electrónico inválido.";
            message.classList.remove("hidden");
            return;
        }
        /* 
        Condicional para informarle al usuario que el campo correo electronico no puede estar vacio.
        */
        if (email == "" ) {
            message.textContent = "El campo correo electrónico no puede estar vacío.";
            message.classList.remove("hidden");
            return;
        }
        /*
        Condicional para que le indique al usuario que la contraseña debe contener 6 caracteres
        */
        if (password.length < 6) {
            message.textContent = "La contraseña debe tener al menos 6 caracteres.";
            message.classList.remove("hidden");
            return;
        }
        
        btnText.classList.add("hidden");        
        progressBarContainer.classList.remove("hidden");
        
        /*
        Barra de progreso que carga una vez hecho clic en el boton "Ingresar"
        */
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                localStorage.setItem("user", email);
                location.reload();
            }
        }, 500);
    });

});