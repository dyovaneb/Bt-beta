import useStore from "./stores/useGame";
import useMoveStore from "./stores/useMov";


export function Interface()
{
    const { selectedMesh } = useStore();
    const { selectedModel, setSelectedModel } = useMoveStore();

    const handleModelChange = () => {
        event.stopPropagation();
        console.log("Cambio de")
        setSelectedModel(!selectedModel)
    };

    return <div className="interface">
        <div className="titulo"> C3creo <div 
            onClick={handleModelChange}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            > cambio</div>
        </div>
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

