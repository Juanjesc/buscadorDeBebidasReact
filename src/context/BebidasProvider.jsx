import { useState, useEffect, createContext } from "react";
import axios from "axios";
import React from "react";

const BebidasContext = createContext();

const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]) //Todas las bebidas al hacer la consulta
  const [modal, setModal] = useState(false) //el modal que se abre y cierra
  const [idBebida, setIdBebida] = useState('') // el id de cada bebia
  const [receta, setReceta] = useState([]) // la información de cada bebida por ID
  const [cargando, setCargando] = useState(false) //será el spinner
  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      setBebidas(data.drinks)
    } catch (error) {
      console.log(error);
    }
  };
  const handleBebidaIDClick = (id) => {
    setIdBebida(id)
  }

  const handleModalClick = () => {
    setModal(!modal)
  }

  useEffect(()=>{
    setCargando(true)
    const obtenerReceta = async () => {
      if (!idBebida) {
        return
      }
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idBebida}`;
        const {data} = await axios(url)
        setReceta(data.drinks[0])
      } catch (error) {
        console.log(error)
      }
      finally{
        setCargando(false)
      }
    }
    obtenerReceta()
  },[idBebida])

  return (
    <BebidasContext.Provider
      value={{
        consultarBebida,
        bebidas,
        modal,
        setModal,
        handleModalClick,
        handleBebidaIDClick,
        receta,
        cargando,
        setCargando

      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};

export { BebidasProvider };

export default BebidasContext;
