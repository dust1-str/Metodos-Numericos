import { useState } from "react";

interface Iteration {
  iteration: number;
  x: number;
  fx: number;
  dfx: number;
}

export default function NewtonRaphson() {
  const [func, setFunc] = useState<string>("x*x - 2");
  const [derivative, setDerivative] = useState<string>("2*x");
  const [x0, setX0] = useState<number>(1);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [iterations, setIterations] = useState<Iteration[]>([]);

  function evaluate(expr: string, x: number): number | null {
    try {
      return new Function("x", `return ${expr};`)(x);
    } catch (err) {
      setError("Error en la función o su derivada");
      return null;
    }
  }

  function newtonRaphson() {
    setError(null);
    setIterations([]);
    let x = x0;
    let tol = 1e-6;
    let maxIter = 100;
    let iter = 0;
    const iterList: Iteration[] = [];
  
    while (iter < maxIter) {
      let fx = evaluate(func, x);
      let dfx = evaluate(derivative, x);
      
      if (fx === null || dfx === null) return;
      if (dfx === 0) {
        setError("Derivada es cero, el método no puede continuar");
        return;
      }
  
      iterList.push({ iteration: iter + 1, x, fx, dfx });
  
      let xNew = x - fx / dfx;
      if (Math.abs(xNew - x) < tol) {
        iterList.push({ iteration: iter + 2, x: xNew, fx: 0, dfx }); // Agregar iteración extra
        setResult(xNew);
        setIterations(iterList);
        return;
      }
      x = xNew;
      iter++;
    }
  
    setError(`No se encontró solución en menos de ${{maxIter}} iteraciones`);
  }
  

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow flex gap-8">
      <div className="w-1/2">
        <h1 className="text-xl font-bold mb-4">Método de Newton-Raphson</h1>
        <div className="mb-2">
          <label className="block text-sm font-medium">Función f(x):</label>
          <input
            type="text"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Derivada f'(x):</label>
          <input
            type="text"
            value={derivative}
            onChange={(e) => setDerivative(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Valor inicial x₀:</label>
          <input
            type="number"
            value={x0}
            onChange={(e) => setX0(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <button onClick={newtonRaphson} className="w-full p-2 bg-blue-500 text-white rounded">
          Calcular
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {result !== null && <p className="text-green-600 mt-2">Solución: {result.toFixed(6)}</p>}
      </div>
      <div className="w-1/2">
        {iterations.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Iteraciones</h2>
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Iteración</th>
                  <th className="border border-gray-300 p-2">x</th>
                  <th className="border border-gray-300 p-2">f(x)</th>
                  <th className="border border-gray-300 p-2">f'(x)</th>
                </tr>
              </thead>
              <tbody>
                {iterations.map(({ iteration, x, fx, dfx }) => (
                  <tr key={iteration} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{iteration}</td>
                    <td className="border border-gray-300 p-2">{x.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{fx.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{dfx.toFixed(6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
