import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import useCategorias from "../hooks/useCategorias";
import useBebidas from "../hooks/useBebidas";

const Formulario = () => {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const { categorias } = useCategorias();
  const [alert, setAlert] = useState("");
  const { consultarBebida } = useBebidas();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(busqueda).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    setAlert('')
    consultarBebida(busqueda)
  };
  return (
    <Form onSubmit={handleSubmit}>
      {alert && (
        <Alert key="danger" variant="danger" className=" text-center fw-bold">
          {alert}
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="nombre">Nombre de Bebida:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tekila, Vodka, ..."
              name="nombre"
              id="nombre"
              value={busqueda.nombre}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="categoria">Categoría de Bebida:</Form.Label>
            <Form.Select
              id="categoria"
              name="categoria"
              value={busqueda.categoria}
              onChange={(e) =>
                setBusqueda({
                  ...busqueda,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option>-- Selecciona categoría -- </option>
              {categorias.map((categoria) => (
                <option
                  value={categoria.strCategory}
                  key={categoria.strCategory}
                >
                  {categoria.strCategory}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className=" justify-content-end">
        <Col md={2}>
          <Button
            variant="danger"
            className="text-uppercase w-100 fw-bold"
            type="submit"
          >
            Buscador Bebidas
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Formulario;
