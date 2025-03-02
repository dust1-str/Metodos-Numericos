import { useState } from 'react'
import EulerMejorado from './methods/euler-mejorado'
import RungeKutta from './methods/runge-kutta'
import NewtonRaphson from './methods/newton-raphson'
import './interface.css'

function Interface() {
  const [method, setMethod] = useState('')
  const [goBack, setGoBack] = useState(false)
  const [methodsVisible, setMethodsVisible] = useState(true)

  function handleClick(option: any) {
    setMethod(option)
    setMethodsVisible(false)
    setGoBack(true)
  }

  function handleGoBack() {
    setMethod('')
    setMethodsVisible(true)
    setGoBack(false)
  }

  return (
    <>
        <div className='content'>
          <div className='main'>
            <div>
              {methodsVisible && (
                <div className='options'>
                  <button onClick={() => handleClick('EM')}>Euler mejorado</button>
                  <button onClick={() => handleClick('RK')}>Runge-Kutta</button>
                  <button onClick={() => handleClick('NR')}>Newton-Raphson</button>
                </div>)}
            </div>
            <div>
              {goBack && <button className='mb-4' onClick={() => handleGoBack()}>Volver</button>}
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