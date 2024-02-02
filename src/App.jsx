import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastosEditar] = useState({});

  useEffect(() =>{
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
      }
    }, [gastoEditar]);

  useEffect(() =>{
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);  

  useEffect(() =>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
    
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true);
    }
  }, [])

  const handleNuevoGasto = () =>{
    setModal(true);
    setGastosEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  }

  const guardarGastos = gasto => {

    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id ===
                                 gasto.id ? gasto : gastoState);

        setGastos(gastosActualizados);
        setGastosEditar({})

    }else{
      //Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);

    setTimeout(() => {
        setModal(false);
    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
      />

    {isValidPresupuesto ? (
      <>
      <main>
        <ListadoGastos
          gastos={gastos}
          setGastosEditar={setGastosEditar}
          eliminarGasto={eliminarGasto}
        />
      </main>
      <div className='nuevo-gasto'>
          <img 
           src={IconoNuevoGasto} 
           alt="imágen nuevo gasto" 
           onClick={handleNuevoGasto}
           />
      </div>
      </>
    ) : null}
      
      {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGastos={guardarGastos}
                  gastoEditar={gastoEditar}
                  setGastosEditar={setGastosEditar}
                />
      }

    </div>
  )
}

export default App
