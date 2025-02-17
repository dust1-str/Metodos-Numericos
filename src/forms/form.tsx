// import React, { useState } from 'react';
// import Results from '../tables/results';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import './form.css'

// interface FormProps {
//     inputs: number;
//     props: { key: string, type: string, placeholder: string }[];
// }

// export default function Form({inputs, props}: FormProps) {
//     const [calculating, setCalculating] = useState(false);

//     function handleClick(event: React.FormEvent<HTMLFormElement>) {
//         event.preventDefault();
//         setCalculating(true);
//     }

//     return (
//         <>
//                 {Array.from({ length: inputs }).map((_, index) => (
//                     <input key={props[index].key} type={props[index].type} placeholder={props[index].placeholder} />
//                 ))}
//                 <button className="calculate-button" type="submit">Calcular</button>
//             <div className='results-container'>
//                 {calculating && (<Results />)}
//             </div>
            
//         </>
//     )
// }