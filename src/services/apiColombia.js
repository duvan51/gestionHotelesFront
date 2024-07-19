import axios from 'axios'

const URL = "https://api-colombia.com/api/v1/"

const CIUDADES = 'https://www.datos.gov.co/resource/xdk5-pm3f.json'

export const getRegions = async ()=>{

    try{
        const data = await axios.get(`${URL}Region`)
        return data.data
    }
    catch(err){
        console.error("error al obtener las Regiones: ", err)
        throw err;
    }
}

export const getCiudades = async ()=>{

    try{
        const data = await axios.get(`${CIUDADES}`)
        return data.data
    }
    catch(err){
        console.error("error al obtener las Ciudades: ", err)
        throw err;
    }
}

