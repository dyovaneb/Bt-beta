import useStore from "./stores/useGame";


export function Interface()
{
    const { selectedMesh } = useStore();
    return <div className="interface">
        <div className="titulo">C3creo</div>
        <div className="contenido">{selectedMesh ? `Seleccionaste: ${selectedMesh.name}` : "Haz click en un objeto"}
        <ul>
            <li>{selectedMesh && selectedMesh.alpha1? `alpha1: ${selectedMesh.alpha1}` : "Hola"}</li>
            <li>{selectedMesh && selectedMesh.alpha2? `alpha2: ${selectedMesh.alpha2}` : "Hola"}</li>
            <li>{selectedMesh && selectedMesh.alpha3? `alpha3: ${selectedMesh.alpha3}` : "Hola"}</li>
        </ul>
        </div>
        <div>Teorema</div>
    </div>
}

