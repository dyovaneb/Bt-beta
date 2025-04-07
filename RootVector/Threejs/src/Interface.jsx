import { useEffect } from "react";
import { MathJax } from "better-react-mathjax";
import {meshASeleccionar} from "./C3Model";
import { setSelectedMeshStateB3, pintarMesh } from "./B3Model";
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

    const pintarMeshB3 = (event) => {
        pintarMesh()
    }

    const pintarSignoraiz = (event) => {
        console.log("pintarSignoraiz")
        setSelectedMeshStateB3([["(1-10)(01-1)(001)", '(1-10)', '(01-1)', '(001)', '(010)', '(10-1)', '(100)', '(101)', '(011)', '(110)'],['(-110)', '(0-11)', '(00-1)', '(0-10)', '(-101)', '(-100)', '(-10-1)', '(0-1-1)', '(-1-10)'],false]);
    }
    return <div className="interface">
        <div className="math-container"><MathJax inline>
            <h1 id="a0000000005">3 Habitaciones y raices afines simples</h1>
            <p>Dada una habitación <span onClick={pintarMeshB3}  className="botonInterfaz">{"\\(\\mathcal{C}\\)"}</span>. Denotamos {"\\(\\psi \\in \\Psi \\)"} se llama <i>positiva con respecto a {"\\(\\mathcal C\\)"}</i> (respectivamente <i>negativa con respecto a {"\\(\\mathcal{C}\\)"}</i>) si {"\\(\\psi (x) {\\gt} 0\\)"} (respectivamente {"\\(\\psi (x) {\\lt} 0\\)"}) para todo {"\\(x \\in \\mathcal{C}\\)"}. Denotamos por <span onClick={pintarSignoraiz}  className="botonInterfaz" style={{ color: 'green'}}>{"\\(\\Psi (\\mathcal{C})^+\\)"}</span> y <span onClick={pintarSignoraiz}  className="botonInterfaz" style={{ color: 'red'}}>{"\\(\\Psi (\\mathcal{C})^-\\)"}</span> el conjunto de raíces afines positivas y negativas, respectivamente. Observamos que tenemos la unión disjunta {"\\(\\Psi = \\Psi (\\mathcal{C})^+ \\cup \\Psi (\\mathcal{C})^-\\)"}. </p>
            <p>Sea {"\\(\\mathcal{C}\\)"} una cámara. Sea {"\\(\\Psi (\\mathcal{C})^0\\)"} el conjunto que consiste en aquellas {"\\(\\psi \\in \\Psi (\\mathcal{C})^+\\)"} indivisibles para las cuales {"\\(H_\\psi \\)"} es una pared de {"\\(\\mathcal{C}\\)"}. El conjunto de estas raices afines se llama una <i>base</i> de {"\\(\\Psi \\)"}, y sus elementos se llaman <i>raíces afines simples</i>. </p>
            <p>Observe que {"\\(\\mathcal{C}\\)"} está determinada de manera única por {"\\(\\Psi (\\mathcal{C})^0\\)"}, concretamente como la intersección de los semiespacios {"\\(A^{\\psi {\\gt}0}\\)"} para {"\\(\\psi \\in \\Psi (\\mathcal{C})^0\\)"}. </p>
            </MathJax>
        </div>
    </div>
}

{/* Respaldo por si acaso.
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
        </ul>
        </div> */}

{/* 
    Raices positivas: ['(-110)', '(0-11)', '(00-1)', '(0-10)', '(-101)', '(-100)', '(-10-1)', '(0-1-1)', '(-1-10)']
    Raices negativas: ['(1-10)', '(01-1)', '(001)', '(010)', '(10-1)', '(100)', '(101)', '(011)', '(110)']
*/}