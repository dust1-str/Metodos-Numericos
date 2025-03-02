import Table from 'react-bootstrap/Table';

interface Props {
  titles: string[];
  calculateAproximation: (xn: number, yn: number, h: number, f: string) => number;
  data: {x0: number, y0: number, aprox: number, h: number, func: string};
  calculateRealValue: (xn: number, h:number, first:boolean) => number;
}

export default function Results({titles, data, calculateAproximation, calculateRealValue}: Props) {
  let x0 = data.x0;
  let n = 0;
  while(x0 < data.aprox){
    x0 = parseFloat((x0 + data.h).toFixed(10));
    n += 1;
  }
  let currentY = data.y0;
  let firstRealValue = calculateRealValue(data.x0, data.h, true);
  let firstError = firstRealValue - data.y0;

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
        <tr>
          <td>{0}</td>
          <td>{data.x0.toFixed(1)}</td>
          <td>{data.y0.toFixed(1)}</td>
          <td>{firstRealValue}</td>
          <td>{firstError}</td>
        </tr>
      {Array.from({ length: n }).map((_, index) => {
          const currentX = data.x0 + index * data.h;
          const nextY = calculateAproximation(currentX, currentY, data.h, data.func);
          const showX = currentX + data.h;
          const realValue = calculateRealValue(currentX, data.h, false)
          const error = realValue - nextY;
          const row = (
            <tr key={index}>
              <td>{index + 1}</td>
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