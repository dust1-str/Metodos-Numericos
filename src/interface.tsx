import { useState } from 'react'
import EulerMejorado from './methods/euler-mejorado'
import RungeKutta from './methods/runge-kutta'
import NewtonRaphson from './methods/newton-raphson'
import './interface.css'

function Interface() {
  const [method, setMethod] = useState('')
  const [text, setText] = useState('Seleccione el método numérico:')
  const [goBack, setGoBack] = useState(false)
  const [methodsVisible, setMethodsVisible] = useState(true)

  function handleClick(option: any) {
    setMethod(option)
    setMethodsVisible(false)
    showCurrentMethod(option)
    setGoBack(true)
  }

  function handleGoBack() {
    setMethod('')
    setMethodsVisible(true)
    setGoBack(false)
  }

  function showCurrentMethod(option: any) {
    setGoBack(true)
    if (option === 'EM') setText('Método de Euler mejorado seleccionado')
    else if (option === 'RK') setText('Método de Runge-Kutta seleccionado')
    else if (option === 'NR') setText('Método de Newton-Raphson seleccionado')
  }

  return (
    <>
        <div className='content'>
          <div className='main'>
            <p>{text}</p>
            <div>
              {methodsVisible && (
                <div className='options'>
                  <button onClick={() => handleClick('EM')}>Euler mejorado</button>
                  <button onClick={() => handleClick('RK')}>Runge-Kutta</button>
                  <button onClick={() => handleClick('NR')}>Newton-Raphson</button>
                </div>)}
            </div>
            <div>
              {goBack && <button onClick={() => handleGoBack()}>Volver</button>}
              {method === 'EM' && <EulerMejorado />}
              {method === 'RK' && <RungeKutta />}
              {method === 'NR' && <NewtonRaphson />}
            </div>
          </div>
        </div>
    </>
  )
}

export default Interface