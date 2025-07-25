import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import C3Model from './C3Model'
import useGame from './stores/useGame.jsx'
import B3Model from './B3Model.jsx'

export default function Experience()
{

    const rootSystem = useGame((state) => { return state.rootSystem }) //solo hay que pedir la info que se necesita, si algo cambia se renderea el componente completo.  esto es la store.

    return <> 

        <Perf position="top-right" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.5 } shadow-nomralBias = { 0.2 } />
        <directionalLight castShadow position={ [ -1, -2, -3 ] } intensity={ 1.5 } shadow-nomralBias = { 0.2 } />

        <ambientLight intensity={ 1.5 } />

        <C3Model position={[4,0,0]}/>
        <B3Model position={[0,0,0]} />

    </>
}