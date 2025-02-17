import Table from 'react-bootstrap/Table';

interface Props {
  titles: string[];
  func: string,
  data: {x0: number, y0: number, aprox: number, h: number};
}

export default function Results({titles, func, data}: Props) {
  const n = 8;
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
        {Array.from({ length: n }).map((_, index) => (
          <tr key={index}>
            <td>{index}</td>
            <td>{(data.x0 + index * data.h).toFixed(1)}</td>
            <td>{data.y0}</td>
            <td>{func}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}