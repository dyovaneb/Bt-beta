import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useStore from "./stores/useGame";
import useMoveStore from "./stores/useMov";
import { MeshStandardMaterial } from "three"
import { useFrame } from "@react-three/fiber";

const redMaterial = new MeshStandardMaterial({ color: "red" });
const greenMaterial = new MeshStandardMaterial({ color: "green" });
const blueMaterial = new MeshStandardMaterial({ color: "blue", opacity: 0.2, transparent: true });
const solidBlueMaterial = new MeshStandardMaterial({ color: "blue" });


let setSelectedMeshStateB3;

function stringToVector(str) {
  // Remover los paréntesis
  const cleanedStr = str.slice(1, -1);
  // Dividir la cadena en componentes usando una expresión regular para manejar números negativos
  const components = cleanedStr.match(/-?\d/g);
  // Convertir los componentes a números
  const vector = components.map(Number);
  return vector;
}

function splitString(str) {
  // Usar una expresión regular para dividir el string en partes
  const parts = str.match(/\([^)]+\)/g);
  return parts;
}

function eventHandlerB3(event) {
  const [selectedMesh, setSelectedMeshStateInternal] = useState(null);
}


export default function B3Model(props){
    const { nodes } = useGLTF("./B3.glb");

    const [selectedMesh, setSelectedMeshStateInternal] = useState(null); //Cuando hay cambio acá, se vuelve a renderizar todo, por eso se llama a la función getmaterial de nuevo.
    setSelectedMeshStateB3 = setSelectedMeshStateInternal; //creo que es solo para poder definir setSelectedMeshStateB3 en el scope global.

    const modeloB3 = useRef();
    const {selectedModel, setSelectedModel} = useMoveStore();

    useFrame(() => {
      if(modeloB3.current){
        const targetPosition = selectedModel ? { x: 0, y: 0, z: 0 } : { x: 0, y: 0, z: 0 };
        modeloB3.current.position.lerp(targetPosition, 0.01);
      }
    })

    const eventHandlerB3 = (event) => {
      if(event.object){
        const { setSelectedMesh } = useStore.getState();
        setSelectedMesh(event.object); //para el zustand
        var nombreObjetosCambiarColor = [[],[],true] //Raiz larga (verde), objeto clickeado y raices de la base (rojo), es raíz o simplicial
        nombreObjetosCambiarColor[1].push(event.object.name);
        console.log(event.object.name);
        if(event.object.alpha1){ //es simplicial
          nombreObjetosCambiarColor[2]=false;
          var raizlarga = []
          var nombreRaizLarga = ""
          for (let i = 0; i < 3; i++) {
            raizlarga.push(
              stringToVector(event.object.alpha1)[i] + 
              2*stringToVector(event.object.alpha2)[i] + 
              2*stringToVector(event.object.alpha3)[i]
            );
          }
          nombreRaizLarga="(" + raizlarga.toString().replace(/,/g, '') + ")";
          nombreObjetosCambiarColor[0].push(nombreRaizLarga);
          nombreObjetosCambiarColor[1].push(event.object.alpha1, event.object.alpha2, event.object.alpha3);
        }
        setSelectedMeshStateB3(nombreObjetosCambiarColor); //para el estado local
      }
      event.stopPropagation();
    }

    const getMaterial = (meshName) => {
      //console.log(meshName);
      if(selectedMesh)
        {
          if(selectedMesh[1].includes(meshName)){ //pinta los meshes rojos, el seleccionado y los extra.
            return redMaterial;
          }
          if(selectedMesh[0].includes(meshName)){ //pinta la raiz larga de otro color, si existe
            return greenMaterial;
          }
          if(selectedMesh[2]) // como si clickeo en una raiz se deben buscar y pintar los simpliciales que contienen a la raiz en el nombre.
          {
            if(meshName.includes(selectedMesh[1][0])){
              return greenMaterial;
            }
          }
          return blueMaterial;
        }
        return solidBlueMaterial;
    }

    const meshes = [];

    for (const key in nodes) {
        if (nodes.hasOwnProperty(key)) {
          if(key =="Scene"){
            continue
          }
          else if(key.length<9){ //es raíz
            meshes.push(
              <mesh
                key={key}
                name={key}
                tipo="raiz"
                castShadow
                receiveShadow
                geometry={nodes[key].geometry}
                material={getMaterial(key)}
              />
            );
          }
          else{ //es simplicial
            const base = splitString(key);
            const alpha1 = base[0];
            const alpha2 = base[1];
            const alpha3 = base[2];
            meshes.push(
              <mesh
                key={key}
                name={key}
                tipo="simplicial"
                alpha1={alpha1}
                alpha2={alpha2}
                alpha3={alpha3}
                castShadow
                receiveShadow
                geometry={nodes[key].geometry}
                material={getMaterial(key)}
              />
            );
          }
        }
    }
    return  (
        <group {...props} dispose={null} onClick={eventHandlerB3} ref={modeloB3}>
            {meshes}
        </group>
    );
}

export { setSelectedMeshStateB3 };
useGLTF.preload("./B3.glb");