import Table from 'react-bootstrap/Table';

interface Props {
  titles: string[];
  calculateAproximation: (xn: number, yn: number, h: number, f: number) => number;
  data: {x0: number, y0: number, aprox: number, h: number, func: number};
  calculateRealValue: (xn: number, h:number) => number;
}

export default function Results({titles, data, calculateAproximation, calculateRealValue}: Props) {
  const n = 8;
  let currentY = data.y0;

  return (
    <Table className='mt-3' striped bordered hover variant='dark'>
      <thead>
        <tr>
          {titles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {Array.from({ length: n }).map((_, index) => {
          const currentX = data.x0 + index * data.h;
          const nextY = calculateAproximation(currentX, currentY, data.h, data.func);
          const showX = currentX + data.h;
          const realValue = calculateRealValue(currentX, data.h)
          const error = realValue - nextY;
          const row = (
            <tr key={index}>
              <td>{index}</td>
              <td>{showX.toFixed(1)}</td>
              <td>{nextY.toFixed(5)}</td>
              <td>{realValue.toFixed(5)}</td>
              <td>{error.toFixed(5)}</td>
            </tr>
          );
          currentY = nextY;
          return row;
        })}
      </tbody>
    </Table>
  );
}