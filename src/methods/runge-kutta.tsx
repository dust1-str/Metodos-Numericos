import { useState } from "react";

interface Iteration {
  iteration: number;
  x: number;
  y: number;
  k1: number;
  k2: number;
  k3: number;
  k4: number;
}

export default function RungeKutta() {
  const [func, setFunc] = useState<string>("x + y");
  const [x0, setX0] = useState<number>(0);
  const [y0, setY0] = useState<number>(1);
  const [h, setH] = useState<number>(0.1);
  const [steps, setSteps] = useState<number>(10);
  const [iterations, setIterations] = useState<Iteration[]>([]);

  function evaluate(expr: string, x: number, y: number): number | null {
    try {
      return new Function("x", "y", `return ${expr};`)(x, y);
    } catch (err) {
      return null;
    }
  }

  function rungeKutta() {
    let x = x0;
    let y = y0;
    const iterList: Iteration[] = [];
    
    for (let i = 1; i <= steps; i++) {
      let k1 = h * (evaluate(func, x, y) ?? 0);
      let k2 = h * (evaluate(func, x + h / 2, y + k1 / 2) ?? 0);
      let k3 = h * (evaluate(func, x + h / 2, y + k2 / 2) ?? 0);
      let k4 = h * (evaluate(func, x + h, y + k3) ?? 0);
      
      let yNew = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      let xNew = x + h;
      
      iterList.push({ iteration: i, x: xNew, y: yNew, k1, k2, k3, k4 });
      
      x = xNew;
      y = yNew;
    }
    
    setIterations(iterList);
  }

  return (
    <div className="p-4 w-7/8 mx-auto bg-gray-100 rounded-lg shadow flex gap-8">
      <div className="w-2/3">
        <h1 className="text-xl font-bold mb-4">Método de Runge-Kutta</h1>
        <div className="mb-2">
          <label className="block text-sm font-medium">Función f(x, y):</label>
          <input type="text" value={func} onChange={(e) => setFunc(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">x₀:</label>
          <input type="number" value={x0} onChange={(e) => setX0(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">y₀:</label>
          <input type="number" value={y0} onChange={(e) => setY0(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Paso h:</label>
          <input type="number" value={h} onChange={(e) => setH(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Número de pasos:</label>
          <input type="number" value={steps} onChange={(e) => setSteps(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>
        <button onClick={rungeKutta} className="w-full p-2 bg-blue-500 text-white rounded">
          Calcular
        </button>
      </div>
      <div className="w-1/2">
        {iterations.length > 0 && (
          <div className="mt-4 flex justify-center">
            <table className="w-full border-collapse border border-gray-300 mt-2">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Iteración</th>
                  <th className="border border-gray-300 p-2">x</th>
                  <th className="border border-gray-300 p-2">y</th>
                  <th className="border border-gray-300 p-2">k1</th>
                  <th className="border border-gray-300 p-2">k2</th>
                  <th className="border border-gray-300 p-2">k3</th>
                  <th className="border border-gray-300 p-2">k4</th>
                </tr>
              </thead>
              <tbody>
                {iterations.map(({ iteration, x, y, k1, k2, k3, k4 }) => (
                  <tr key={iteration} className="border border-gray-300">
                    <td className="border border-gray-300 p-2">{iteration}</td>
                    <td className="border border-gray-300 p-2">{x.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{y.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{k1.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{k2.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{k3.toFixed(6)}</td>
                    <td className="border border-gray-300 p-2">{k4.toFixed(6)}</td>
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
