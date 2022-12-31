import { useState, useEffect, createContext } from "react";
import axios from "axios";
import React from 'react'

const CategoriasContext = createContext();

const CategoriasProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
                const { data } = await axios(url)
                console.log(data.drinks)
                setCategorias(data.drinks)
            } catch (error) {
                console.log('error error')
            }
        }
        obtenerCategorias()
    }, [])
    return (

        <CategoriasContext.Provider

            value={{
                categorias,
                setCategorias
            }}
        >
            {children}
        </CategoriasContext.Provider>
    )
}

export {
    CategoriasProvider
}

export default CategoriasContext