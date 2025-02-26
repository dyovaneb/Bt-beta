import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Interface } from './Interface'
import { setSelectedMeshState } from './C3Model.jsx'
import useStore from './stores/useGame'

const root = ReactDOM.createRoot(document.querySelector('#root'))

const handlePointerMissed = () => {
    setSelectedMeshState(null)
    const { setSelectedMesh } = useStore.getState();
    setSelectedMesh(null)
}

root.render(<>
    <Canvas
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
    <Interface/>
    </>
)
