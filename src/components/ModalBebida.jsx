import React, { useState } from "react";
import { Modal, Image, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";
import Spinner from "./Spinner";

const ModalBebida = () => {
  const { modal, handleModalClick, receta, cargando } = useBebidas();
  const mostrarIngredientes = () => {
    let ingredientes = []; //strIngredientX
    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li key={`strIngredient${i}`}>
            {receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
          </li>
        ); //MOSTRAMOS INGREDIENTES - CANTIDADES
      }
    }
    return ingredientes;
  };

  return (
    <>
      {!cargando && (
        <Modal show={modal} onHide={handleModalClick}>
          <>
            <Image
              src={receta.strDrinkThumb}
              alt={`imagen receta: ${receta.strDrink}`}
            />
            <Modal.Header>
              <Modal.Title>{receta.strDrink}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-3">
                <h2>Instrucciones:</h2>
                {receta.strInstructionsES !== null ? (
                  <p>{receta.strInstructionsES}</p>
                ) : (
                  <p>{receta.strInstructions}</p>
                )}
                <h2>Ingredientes y cantidad:</h2>
                {mostrarIngredientes()}
              </div>
            </Modal.Body>
          </>
        </Modal>
    )}
    </>
  );
};

export default ModalBebida;
