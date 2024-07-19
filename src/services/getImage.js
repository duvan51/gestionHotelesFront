import axios from 'axios'

const URL = "http://localhost:8080/upload"

export const getAlojamientos = async ()=>{


    try{
        const data = await axios.get(`${URL}/:filename`)
        return data.data
        console.log(data)
    }
    catch(err){
        console.error("error al obtener los Alojamientos: ", err)
        throw err;
    }
}
