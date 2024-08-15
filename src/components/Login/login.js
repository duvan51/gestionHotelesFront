import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { useMutation } from "@apollo/client";
import { Login_User } from "../../services/queries";


const Login = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [login] = useMutation(Login_User);

  const showSwal = () => {
    const MySwal = withReactContent(Swal);

    //console.log(inputValues)

    MySwal.fire({
      title: <i>Iniciar Sesion</i>,

      html: (
        <>
          <input
            id="swal-input1"
            className="swal2-input"
            placeholder="Email"
            defaultValue={inputValues.email}
          />
          <input
            id="swal-input2"
            type="password"
            className="swal2-input"
            placeholder="Password"
            defaultValue={inputValues.password}
          />
        </>
      ),
      
      preConfirm: async () => {
        const email = document.getElementById("swal-input1").value;
        const password = document.getElementById("swal-input2").value;


       // console.log(email, " " , password)

        setInputValues({ email, password });
       // console.log(inputValues)

        try {
          const response = await login({
            variables: {
              email: email,
              password: password,
            },
          });

          console.log(response)

          //  MySwal.fire('¡Login exitoso!', '', 'success');
         
         // console.log("Token:", response.data.login.token); // Assuming the response contains a token
          localStorage.setItem("token", response.data.login.token);
          localStorage.setItem("UserName", response.data.login.user.Name);
          localStorage.setItem("id", response.data.login.user.id);

          //localStorage.setItem("Alojamientos", response.data.login.user.Alojamientos);

         window.location.reload();
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
          MySwal.fire("Error al iniciar sesión", error.message, "error");
        }
      },
    });
  };

  return (
    <>
      <button onClick={showSwal} type="button" className="btn btn-success">Login</button>
    </>
  );
};

export default Login;
