import { useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import {meshASeleccionar} from "./C3Model";
import useStore from "./stores/useGame";
import useMoveStore from "./stores/useMov";


export function Interface()
{
    const { selectedMesh } = useStore();
    const { selectedModel, setSelectedModel } = useMoveStore();

 useEffect(() => {
         if (window.MathJax) {
             window.MathJax.typeset();
         }
     }, [selectedMesh]);

    const handleModelChange = () => {
        event.stopPropagation();
        console.log("Cambio de")
        setSelectedModel(!selectedModel)
    };

    const handleMeshSelection = (event) => {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
        meshASeleccionar("(200)");
      };

    return <div className="interface">
        <div className="titulo"> &#123; C3creo &#125; <div 
            onClick={handleModelChange}
            style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            > cambio</div>
        </div>
        <div className="contenido">{selectedMesh ? `Seleccionaste: ${selectedMesh.name}` : "Haz click en un objeto"}
        <ul>
            <li>{selectedMesh && selectedMesh.alpha1? `alpha1: ${selectedMesh.alpha1}` : "Hola"}</li>
            <li>{selectedMesh && selectedMesh.alpha2? `alpha2: ${selectedMesh.alpha2}` : "Hola"}</li>
            <li>{selectedMesh && selectedMesh.alpha3? `alpha3: ${selectedMesh.alpha3}` : "Hola"}</li>
            <li> &#123; \[  (a,k)\colon a\in \Phi , k\in I_\alpha \]&#125;, </li>
        </ul>
        </div>
        <div><MathJax>
        {" "}
        Sea{" "}
        <a onClick={handleMeshSelection}>
          {
            "\\( \\lbrace (a,k)\\colon a\\in \\Phi , k\\in I_\\alpha \\rbrace , \\)"
          }
        </a>{" "}
        un sistema de raíz de{" "}
      </MathJax>{" "}
      \(V^*\). El sistema de raiz afín asociado <a href="">\(\Psi _\Phi \)</a>{" "}
      está definido por</div>
    </div>
}

