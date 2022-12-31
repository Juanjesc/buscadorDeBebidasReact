import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import useBebidas from "../hooks/useBebidas";

const Bebida = ({ bebida }) => {
  const { handleModalClick, handleBebidaIDClick, modal } = useBebidas();

  return (
    <Col md={6} lg={3}>
      <Card className=" mb-4">
        <Card.Img
          variant="top"
          src={bebida.strDrinkThumb}
          alt={bebida.strDrink}
          className=" p-4"
        />
        <Card.Body>
          <Card.Title>{bebida.strDrink}</Card.Title>
          <Button
            variant="warning"
            className=" p-2 text-uppercase text-center w-100 mt-2"
            onClick={() => {
              handleModalClick()
              handleBebidaIDClick(bebida.idDrink)
            }}
          >
            Ver Receta
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Bebida;
