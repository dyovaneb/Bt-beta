import useStore from "./stores/useGame";


export function Interface()
{
    const { selectedMesh } = useStore();
    return <div className="interface">
        <div className="titulo">C3creo</div>
        <div className="contenido">{selectedMesh ? `Seleccionaste: ${selectedMesh}` : "Haz click en un objeto"}
        <ul>
            <li>hola</li>
            <li>hola</li>
            <li>hola</li>
        </ul>
        </div>
        <div>No sé donde va esto Teorema</div>
    </div>
}

