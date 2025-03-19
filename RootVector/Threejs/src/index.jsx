import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Interface } from './Interface'
import { setSelectedMeshState } from './C3Model.jsx'
import { setSelectedMeshStateB3 } from './B3Model.jsx'
import useStore from './stores/useGame'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const handlePointerMissed = () => {
    setSelectedMeshStateB3(null) //esto cambia para el material de B3, usar el sin nombre para c3, arreglar para cuando existan los dos.
    setSelectedMeshState(null) //esto cambia para el material de B3, usar el sin nombre para c3, arreglar para cuando existan los dos.
    const { setSelectedMesh } = useStore.getState(); //esto cambia el zustand creo
    setSelectedMesh(null)
}
//hay que generar otro componente que sean los botones que esté por encima de canvas para poder clickear.
root.render(<>
    <Interface/>    
    <Canvas 
        style={{ position: "absolute",
            top: "31%",
            left: "30%",
            width: "68%",
            height: "69%",
            border: "1px solid black" }}
        shadows
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        onPointerMissed={ handlePointerMissed }
    >
    <Experience />
    </Canvas>
    
    </>
)
