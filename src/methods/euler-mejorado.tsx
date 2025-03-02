import { useState } from "react";
import Form from "react-bootstrap/Form";
import Results from "../tables/results";

export default function EulerMejorado() {
    const [validated, setValidated] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [func, setFunc] = useState("");
    const [x0, setX0] = useState(0);
    const [y0, setY0] = useState(0);
    const [aprox, setAprox] = useState(0);
    const [h, setH] = useState(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) 
        event.stopPropagation();
      else 
        setShowResults(true);
      setValidated(true);
    }

    const calculateAproximation = (xn: number, yn: number, h: number, f: string) => {
      const func = new Function('x', 'y', `return ${f}`);
      const y = yn + h * func(xn, yn);
      const nextX = xn + h;
      yn = yn + h * ((func(xn, yn) + func(nextX, y)) / 2);
      return yn;
    };

    const calculateRealValue = (xn:number, h:number, first:boolean) => {
      if (first)
        return Math.exp(-0.2 + (0.2 * Math.pow(xn, 2)));
      else 
        return Math.exp(-0.2 + (0.2 * Math.pow(xn + h, 2)));
    }
    
    return (
      <>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="ps-4 pe-4">
        <Form.Group className="mb-3" controlId="function">
          <Form.Control required type="text" placeholder="Ingrese la función" onChange={(e) => setFunc(e.target.value)} step={0.1}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="x0">
          <Form.Control required type="number" placeholder="Valor inicial de x" onChange={(e) => setX0(parseFloat(e.target.value))} step={0.1}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="y0">
          <Form.Control required type="number" placeholder="Valor inicial de y" onChange={(e) => setY0(parseFloat(e.target.value))}  step={0.1}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="aprox">
          <Form.Control required type="number" placeholder="Punto de aproximación" onChange={(e) => setAprox(parseFloat(e.target.value))} step={0.1}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="h">
          <Form.Control required type="number" placeholder="Tamaño del paso" onChange={(e) => setH(parseFloat(e.target.value))}  step={0.01}/>
          <Form.Control.Feedback type="invalid">
            Use números enteros o máximo 2 decimales.
          </Form.Control.Feedback>
        </Form.Group>
        <button type="submit">Calcular</button>
        </Form>
        <div>
          {showResults && (<Results titles={['n', 'x(n)', 'y(n)', 'y(r)', 'Error absoluto']} calculateAproximation={calculateAproximation}
          calculateRealValue={calculateRealValue} data={{x0, y0, aprox, h, func}}/>)}
        </div>
      </>
      
    )
}