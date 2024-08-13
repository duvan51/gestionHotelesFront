import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Add_Alojamiento, GET_USERS_uniq } from "../../../../services/queries";


import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import * as formik from "formik";
import Form from "react-bootstrap/Form";

import axios from "axios";
import Searchcity from "../../../../components/searchCity/searchcity";


const AddAlojamientos = () => {
  const navigate = useNavigate();
  const [cityselect, setCityselect] = useState("")
  const [imagePrincipal, setImagePrincipal] = useState(null);
  const [idUser, setIdUser] = useState(0);
  const [
    AddAlojamiento,
    { data: addData, loading: addLoading, error: addError },
  ] = useMutation(Add_Alojamiento);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USERS_uniq);
  const [imageUrl, setImageUrl] = useState("");
 


  console.log(addData, addLoading, addError, userLoading, userError, imageUrl)

  useEffect(() => {
    if (userData && userData.getUser) {
      setIdUser(userData.getUser.id);
    }
  }, [userData]); // e<- add empty brackets here

  const x = Number(idUser); //convertir el id en number
  console.log(idUser);

  const { Formik } = formik;

  const initialValues = {
    title: "",
    description: "",
    imagePrincipal: "",
    images: "",
    ubicacion: "",
    pais: "",
    departamento: "",
    ciudad: "",
    numberPhone: "",
    whattsap: "",
  };

  const handleImageChange = (e) => {
    setImagePrincipal(e.target.files[0]);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imagePrincipal);
    formData.append("upload_preset", "images-hoteles-backend");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dlkky5xuo/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = response.data.secure_url;
      setImageUrl(imageUrl);

      return imageUrl;
    } catch (err) {
      console.error("Error uploading image:", err.message);
      console.error(
        "Detalles del error:",
        err.response ? err.response.data : "Sin detalles de error de red"
      );
      throw err;
    }
  };

  const sendDataServer = async (values) => {
    //console.log(values);
    // Llamar a la mutación de GraphQL aquí
    try {
      let imageUrl = "";
      if (imagePrincipal) {
        imageUrl = await uploadImage();
      }
      const response = await AddAlojamiento({
        variables: {
          title: values.title,
          description: values.description,
          imagePrincipal: imageUrl,
          images: "",
          ubicacion: "", // Ejemplo de alojamientoId, ajusta según sea necesario
          pais: "colombia",
          departamento: "Meta",
          ciudad: cityselect,
          numberPhone: values.ubicacion,
          whattsap: values.ubicacion,
          habitacionesTypeIdFk: 1,
          alojamientosTypeIdFk: 1,
          userId: x,
        },
      });

      if (response) {
        navigate("/dashboard/all&alojamientos");
      }
    } catch (err) {
      console.error("Error al enviar los datos:", err.message);
      console.error(
        "Detalles del error:",
        err.networkError
          ? err.networkError.result
          : "Sin detalles de error de red"
      );
    }
  };

  const city = (city) => {
    setCityselect(city);
  };

  console.log(cityselect)






  return (
    <div className="m-5">
      <Formik initialValues={initialValues} onSubmit={sendDataServer}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="title"
              label="Nombre de Alojamiento"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Nombre de Alojamiento"
                name="title"
                onChange={handleChange}
                value={values.title}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="description"
              label="Description hotel"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Nombre de habitación"
                name="description"
                onChange={handleChange}
                value={values.description}
                as="textarea"
                rows={3}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="imagePrincipal"
              label="Image Principal"
              className="mb-3"
            >
              <Form.Control
                type="file"
                size="lg"
                placeholder="Image Principal"
                name="imagePrincipal"
                onChange={handleImageChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="numberPhone"
              label="numero telefonico"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="whattsap"
                name="whattsap"
                onChange={handleChange}
                value={values.whattsap}
              />
            </FloatingLabel>
    
              <FloatingLabel
              controlId="whattsap"
              label="whattsap"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="whattsap"
                name="whattsap"
                onChange={handleChange}
                value={values.whattsap}
              />
            </FloatingLabel>
            
            <FloatingLabel className="d-flex gap-5">
            <Searchcity 
              onData={city} 
              />
              <div >
             {cityselect}
            </div>
            </FloatingLabel>

           
            
           

            <Button type="submit" className="mt-5">Agregar Hotel</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAlojamientos;
