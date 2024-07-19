import axios from 'axios'

const URL = "http://localhost:8080";



export const login = async ( email, password)=>{

    try{
        const response= await axios.post(`${URL}/login`, { email, password })
        
        console.log('respuesta del servidor =>', response)
        return response.data
       
    }
    catch(err){
        console.error("error al obtener los Alojamientos: ", err)
        throw err;
    }
};



export const createUser = async (data)=>{


    try{
        const response = await axios.post(`${URL}/users`, data)
        
        return response.data;
       
    }
    catch(err){
        console.error("error al obtener los Alojamientos: ", err)
        throw err;
    }
};