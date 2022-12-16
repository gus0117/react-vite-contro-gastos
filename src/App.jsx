import { useState, useEffect } from "react"
import Header from "./components/Header"
import Modal from "./components/Modal";
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers/index'
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState([])

  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(()=>{
    if(Object.keys(gastoEditar).length){
      setModal(true)
      setTimeout(()=>{
        setAnimarModal(true)
      }, 500)
    }
  },[gastoEditar])


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(()=>{
      setAnimarModal(true)
    }, 500)
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false)
    setTimeout(()=>{
      setModal(false)
    }, 500)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto}
                  alt="Nuevo Gasto"
                  onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}

      {modal && 
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
        />}
    </div>
  )
}

export default App
