import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import useStore from "./stores/useGame";
import { MeshStandardMaterial } from "three"

// algo que resalte la base y la raíz más larga (planos perpendiculares y la pirámide que forman).

export default function C3Model(props) {
  const { setSelectedMesh } = useStore();
  const { nodes, materials } = useGLTF("./C3v2.glb");

  const redMaterial = new MeshStandardMaterial({ color: "red" });
  const blueMaterial = new MeshStandardMaterial({ color: "blue", opacity: 0.5, transparent: true });

  const [selectedMesh, setSelectedMeshState] = useState(null);

  const eventHandler = (event) => 
    {
      const meshName = event.object.name;
      //console.log('object', materials) //detecta que objeto clikié, hay que hacer que eso cambie el texto del otro fragmento.
      setSelectedMesh(event.object); // este es para el zustand ?
      setSelectedMeshState(event.object); //este es para el material 
      event.stopPropagation()
    }

    function stringToVector(str) {
      // Remover los paréntesis
      const cleanedStr = str.slice(1, -1);
      // Dividir la cadena en componentes usando una expresión regular para manejar números negativos
      const components = cleanedStr.match(/-?\d/g);
      // Convertir los componentes a números
      const vector = components.map(Number);
      return vector;
    }

    const getMaterial = (meshName) => { //arreglar para que la logica de los nombres a resaltar sea en el eventhandler y acá solo llegue una lista con los elementos a resaltar.
      var raizlarga = []
      var nombreRaizLarga = ""
      if (selectedMesh && selectedMesh.alpha1) {
        for (let i = 0; i < 3; i++) {
          raizlarga.push(2*stringToVector(selectedMesh.alpha1)[i] + 2*stringToVector(selectedMesh.alpha2)[i] + stringToVector(selectedMesh.alpha3)[i]);
        }
        nombreRaizLarga="(" + raizlarga.toString().replace(/,/g, '') + ")";
      }
      if (selectedMesh && (selectedMesh.name === meshName || selectedMesh.name+"R" === meshName || selectedMesh.name.slice(0, -1) === meshName)) {
        return redMaterial;
      }
      if (selectedMesh && 
            ( selectedMesh.alpha1 === meshName || 
              selectedMesh.alpha1+"R" === meshName || 
              selectedMesh.alpha2 === meshName || 
              selectedMesh.alpha2+"R" === meshName || 
              selectedMesh.alpha3 === meshName ||
              selectedMesh.alpha3+"R" === meshName ||
              nombreRaizLarga === meshName ||
              nombreRaizLarga+"R" === meshName
            )
          ) {
        return redMaterial;
      }
      return blueMaterial;
    };

  return (
    <group {...props} dispose={null} onClick={eventHandler}>
      <mesh
        name="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(-200)"].geometry}
        material={getMaterial("(-200)")}
        position={[-2, 0, 0]}
      />
      <mesh
        name="(00-2)R"
        castShadow
        receiveShadow
        geometry={nodes["(00-2)R"].geometry}
        material={getMaterial("(00-2)R")}
        position={[0, -1.002, 0]}
        scale={2.004}
      />
      <mesh
        name="(-200)R"
        castShadow
        receiveShadow
        geometry={nodes["(-200)R"].geometry}
        material={getMaterial("(-200)R")}
        position={[-1.002, 0, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={2.004}
      />
      <mesh
        name="(020)R"
        castShadow
        receiveShadow
        geometry={nodes["(020)R"].geometry}
        material={getMaterial("(020)R")}
        position={[0, 0, -1.002]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.004}
      />
      <mesh
        name="(-10-1)R"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)R"].geometry}
        material={getMaterial("(-10-1)R")}
        position={[-0.502, -0.502, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        scale={1.419}
      />
      <mesh
        name="(-101)R"
        castShadow
        receiveShadow
        geometry={nodes["(-101)R"].geometry}
        material={getMaterial("(-101)R")}
        position={[-0.502, 0.502, 0]}
        rotation={[0, 0, -2.356]}
        scale={1.419}
      />
      <mesh
        name="(-110)R"
        castShadow
        receiveShadow
        geometry={nodes["(-110)R"].geometry}
        material={getMaterial("(-110)R")}
        position={[-0.498, 0, -0.498]}
        rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        scale={1.407}
      />
      <mesh
        name="(-1-10)R"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)R"].geometry}
        material={getMaterial("(-1-10)R")}
        position={[-0.498, 0, 0.498]}
        rotation={[Math.PI / 2, 0, -2.356]}
        scale={1.407}
      />
      <mesh
        name="(01-1)R"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)R"].geometry}
        material={getMaterial("(01-1)R")}
        position={[0, -0.501, -0.501]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={1.418}
      />
      <mesh
        name="(011)R"
        castShadow
        receiveShadow
        geometry={nodes["(011)R"].geometry}
        material={getMaterial("(011)R")}
        position={[0, 0.501, -0.501]}
        rotation={[2.356, 0, 0]}
        scale={1.418}
      />
      <mesh
        name="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(020)"].geometry}
        material={getMaterial("(020)")}
        position={[0, 0, -2]}
      />
      <mesh
        name="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(200)"].geometry}
        material={getMaterial("(200)")}
        position={[2, 0, 0]}
      />
      <mesh
        name="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(0-20)"].geometry}
        material={getMaterial("(0-20)")}
        position={[0, 0, 2]}
      />
      <mesh
        name="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(00-2)"].geometry}
        material={getMaterial("(00-2)")}
        position={[0, -2, 0]}
      />
      <mesh
        name="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(002)"].geometry}
        material={getMaterial("(002)")}
        position={[0, 2, 0]}
      />
      <mesh
        name="(-10-1)"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)"].geometry}
        material={getMaterial("(-10-1)")}
        position={[-1, -1, 0]}
      />
      <mesh
        name="(0-1-1)"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)"].geometry}
        material={getMaterial("(0-1-1)")}
        position={[0, -1, 1]}
      />
      <mesh
        name="(-1-10)"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)"].geometry}
        material={getMaterial("(-1-10)")}
        position={[-1, 0, 1]}
      />
      <mesh
        name="(0-11)"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)"].geometry}
        material={getMaterial("(0-11)")}
        position={[0, 1, 1]}
      />
      <mesh
        name="(-101)"
        castShadow
        receiveShadow
        geometry={nodes["(-101)"].geometry}
        material={getMaterial("(-101)")}
        position={[-1, 1, 0]}
      />
      <mesh
        name="(-110)"
        castShadow
        receiveShadow
        geometry={nodes["(-110)"].geometry}
        material={getMaterial("(-110)")}
        position={[-1, 0, -1]}
      />
      <mesh
        name="(01-1)"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)"].geometry}
        material={getMaterial("(01-1)")}
        position={[0, -1, -1]}
      />
      <mesh
        name="(011)"
        castShadow
        receiveShadow
        geometry={nodes["(011)"].geometry}
        material={getMaterial("(011)")}
        position={[0, 1, -1]}
      />
      <mesh
        name="(1-10)"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)"].geometry}
        material={getMaterial("(1-10)")}
        position={[1, 0, 1]}
      />
      <mesh
        name="(10-1)"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)"].geometry}
        material={getMaterial("(10-1)")}
        position={[1, -1, 0]}
      />
      <mesh
        name="(101)"
        castShadow
        receiveShadow
        geometry={nodes["(101)"].geometry}
        material={getMaterial("(101)")}
        position={[1, 1, 0]}
      />
      <mesh
        name="(110)"
        castShadow
        receiveShadow
        geometry={nodes["(110)"].geometry}
        material={getMaterial("(110)")}
        position={[1, 0, -1]}
      />
      <mesh
        name="(200)R"
        castShadow
        receiveShadow
        geometry={nodes["(200)R"].geometry}
        material={getMaterial("(200)R")}
        position={[1.002, 0, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={2.004}
      />
      <mesh
        name="(002)R"
        castShadow
        receiveShadow
        geometry={nodes["(002)R"].geometry}
        material={getMaterial("(002)R")}
        position={[0, 1.002, 0]}
        scale={2.004}
      />
      <mesh
        name="(0-20)R"
        castShadow
        receiveShadow
        geometry={nodes["(0-20)R"].geometry}
        material={getMaterial("(0-20)R")}
        position={[0, 0, 1.002]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.004}
      />
      <mesh
        name="(1-10)R"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)R"].geometry}
        material={getMaterial("(1-10)R")}
        position={[0.498, 0, 0.498]}
        rotation={[Math.PI / 2, 0, -Math.PI / 4]}
        scale={1.407}
      />
      <mesh
        name="(110)R"
        castShadow
        receiveShadow
        geometry={nodes["(110)R"].geometry}
        material={getMaterial("(110)R")}
        position={[0.498, 0, -0.498]}
        rotation={[Math.PI / 2, 0, -2.356]}
        scale={1.407}
      />
      <mesh
        name="(0-11)R"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)R"].geometry}
        material={getMaterial("(0-11)R")}
        position={[0, 0.501, 0.501]}
        rotation={[Math.PI / 4, 0, 0]}
        scale={1.418}
      />
      <mesh
        name="(101)R"
        castShadow
        receiveShadow
        geometry={nodes["(101)R"].geometry}
        material={getMaterial("(101)R")}
        position={[0.502, 0.502, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        scale={1.419}
      />
      <mesh
        name="(0-1-1)R"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)R"].geometry}
        material={getMaterial("(0-1-1)R")}
        position={[0, -0.501, 0.501]}
        rotation={[2.356, 0, 0]}
        scale={1.418}
      />
      <mesh
        name="(10-1)R"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)R"].geometry}
        material={getMaterial("(10-1)R")}
        position={[0.502, -0.502, 0]}
        rotation={[0, 0, -2.356]}
        scale={1.419}
      />
      <mesh
        name="(01-1)(-101)(200)"
        alpha1="(01-1)"
        alpha2="(-101)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)(-101)(200)"].geometry}
        material={getMaterial("(01-1)(-101)(200)")}
      />
      <mesh
        name="(01-1)(-1-10)(200)"
        alpha1="(01-1)"
        alpha2="(-1-10)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)(-1-10)(200)"].geometry}
        material={getMaterial("(01-1)(-1-10)(200)")}
      />
      <mesh
        name="(1-10)(01-1)(002)"
        alpha1="(1-10)"
        alpha2="(01-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)(01-1)(002)"].geometry}
        material={getMaterial("(1-10)(01-1)(002)")}
      />
      <mesh
        name="(-1-10)(01-1)(002)"
        alpha1="(-1-10)"
        alpha2="(01-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)(01-1)(002)"].geometry}
        material={getMaterial("(-1-10)(01-1)(002)")}
      />
      <mesh
        name="(01-1)(1-10)(-200)"
        alpha1="(01-1)"
        alpha2="(1-10)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)(1-10)(-200)"].geometry}
        material={getMaterial("(01-1)(1-10)(-200)")}
      />
      <mesh
        name="(01-1)(101)(-200)"
        alpha1="(01-1)"
        alpha2="(101)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(01-1)(101)(-200)"].geometry}
        material={getMaterial("(01-1)(101)(-200)")}
      />
      <mesh
        name="(101)(01-1)(0-20)"
        alpha1="(101)"
        alpha2="(01-1)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(101)(01-1)(0-20)"].geometry}
        material={getMaterial("(101)(01-1)(0-20)")}
      />
      <mesh
        name="(-101)(01-1)(0-20)"
        alpha1="(-101)"
        alpha2="(01-1)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(-101)(01-1)(0-20)"].geometry}
        material={getMaterial("(-101)(01-1)(0-20)")}
      />
      <mesh
        name="(0-1-1)(-101)(200)"
        alpha1="(0-1-1)"
        alpha2="(-101)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)(-101)(200)"].geometry}
        material={getMaterial("(0-1-1)(-101)(200)")}
      />
      <mesh
        name="(-101)(1-10)(020)"
        alpha1="(-101)"
        alpha2="(1-10)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(-101)(1-10)(020)"].geometry}
        material={getMaterial("(-101)(1-10)(020)")}
      />
      <mesh
        name="(-101)(0-1-1)(020)"
        alpha1="(-101)"
        alpha2="(0-1-1)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(-101)(0-1-1)(020)"].geometry}
        material={getMaterial("(-101)(0-1-1)(020)")}
      />
      <mesh
        name="(-101)(110)(0-20)"
        alpha1="(-101)"
        alpha2="(110)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(-101)(110)(0-20)"].geometry}
        material={getMaterial("(-101)(110)(0-20)")}
      />
      <mesh
        name="(1-10)(-101)(00-2)"
        alpha1="(1-10)"
        alpha2="(-101)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)(-101)(00-2)"].geometry}
        material={getMaterial("(1-10)(-101)(00-2)")}
      />
      <mesh
        name="(110)(-101)(00-2)"
        alpha1="(110)"
        alpha2="(-101)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(110)(-101)(00-2)"].geometry}
        material={getMaterial("(110)(-101)(00-2)")}
      />
      <mesh
        name="(011)(-10-1)(200)"
        alpha1="(011)"
        alpha2="(-10-1)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(011)(-10-1)(200)"].geometry}
        material={getMaterial("(011)(-10-1)(200)")}
      />
      <mesh
        name="(011)(-1-10)(200)"
        alpha1="(011)"
        alpha2="(-1-10)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(011)(-1-10)(200)"].geometry}
        material={getMaterial("(011)(-1-10)(200)")}
      />
      <mesh
        name="(0-11)(-110)(200)"
        alpha1="(0-11)"
        alpha2="(-110)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)(-110)(200)"].geometry}
        material={getMaterial("(0-11)(-110)(200)")}
      />
      <mesh
        name="(0-11)(-10-1)(200)"
        alpha1="(0-11)"
        alpha2="(-10-1)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)(-10-1)(200)"].geometry}
        material={getMaterial("(0-11)(-10-1)(200)")}
      />
      <mesh
        name="(0-1-1)(-110)(200)"
        alpha1="(0-1-1)"
        alpha2="(-110)"
        alpha3="(200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)(-110)(200)"].geometry}
        material={getMaterial("(0-1-1)(-110)(200)")}
      />
      <mesh
        name="(10-1)(0-11)(020)"
        alpha1="(10-1)"
        alpha2="(0-11)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)(0-11)(020)"].geometry}
        material={getMaterial("(10-1)(0-11)(020)")}
      />
      <mesh
        name="(101)(0-1-1)(020)"
        alpha1="(101)"
        alpha2="(0-1-1)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(101)(0-1-1)(020)"].geometry}
        material={getMaterial("(101)(0-1-1)(020)")}
      />
      <mesh
        name="(110)(0-1-1)(002)"
        alpha1="(110)"
        alpha2="(0-1-1)"
        alpha3="(002)" 
        castShadow
        receiveShadow
        geometry={nodes["(110)(0-1-1)(002)"].geometry}
        material={getMaterial("(110)(0-1-1)(002)")}
      />
      <mesh
        name="(10-1)(011)(0-20)"
        alpha1="(10-1)"
        alpha2="(011)"  
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)(011)(0-20)"].geometry}
        material={getMaterial("(10-1)(011)(0-20)")}
      />
      <mesh
        name="(1-10)(011)(00-2)"
        alpha1="(1-10)"
        alpha2="(011)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)(011)(00-2)"].geometry}
        material={getMaterial("(1-10)(011)(00-2)")}
      />
      <mesh
        name="(110)(0-11)(00-2)"
        alpha1="(110)"
        alpha2="(0-11)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(110)(0-11)(00-2)"].geometry}
        material={getMaterial("(110)(0-11)(00-2)")}
      />
      <mesh
        name="(10-1)(-1-10)(020)"
        alpha1="(10-1)"
        alpha2="(-1-10)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)(-1-10)(020)"].geometry}
        material={getMaterial("(10-1)(-1-10)(020)")}
      />
      <mesh
        name="(101)(-1-10)(020)"
        alpha1="(101)"
        alpha2="(-1-10)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(101)(-1-10)(020)"].geometry}
        material={getMaterial("(101)(-1-10)(020)")}
      />
      <mesh
        name="(-10-1)(1-10)(020)"
        alpha1="(-10-1)"
        alpha2="(1-10)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)(1-10)(020)"].geometry}
        material={getMaterial("(-10-1)(1-10)(020)")}
      />
      <mesh
        name="(-10-1)(0-11)(020)"
        alpha1="(-10-1)"
        alpha2="(0-11)"
        alpha3="(020)"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)(0-11)(020)"].geometry}
        material={getMaterial("(-10-1)(0-11)(020)")}
      />
      <mesh
        name="(110)(-10-1)(002)"
        alpha1="(110)"
        alpha2="(-10-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(110)(-10-1)(002)"].geometry}
        material={getMaterial("(110)(-10-1)(002)")}
      />
      <mesh
        name="(-110)(10-1)(002)"
        alpha1="(-110)"
        alpha2="(10-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(-110)(10-1)(002)"].geometry}
        material={getMaterial("(-110)(10-1)(002)")}
      />
      <mesh
        name="(011)(10-1)(-200)"
        alpha1="(011)"
        alpha2="(10-1)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(011)(10-1)(-200)"].geometry}
        material={getMaterial("(011)(10-1)(-200)")}
      />
      <mesh
        name="(-110)(101)(00-2)"
        alpha1="(-110)"
        alpha2="(101)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(-110)(101)(00-2)"].geometry}
        material={getMaterial("(-110)(101)(00-2)")}
      />
      <mesh
        name="(-1-10)(10-1)(002)"
        alpha1="(-1-10)"
        alpha2="(10-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)(10-1)(002)"].geometry}
        material={getMaterial("(-1-10)(10-1)(002)")}
      />
      <mesh
        name="(-1-10)(101)(00-2)"
        alpha1="(-1-10)"
        alpha2="(101)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)(101)(00-2)"].geometry}
        material={getMaterial("(-1-10)(101)(00-2)")}
      />
      <mesh
        name="(-1-10)(011)(00-2)"
        alpha1="(-1-10)"
        alpha2="(011)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(-1-10)(011)(00-2)"].geometry}
        material={getMaterial("(-1-10)(011)(00-2)")}
      />
      <mesh
        name="(-110)(0-11)(00-2)"
        alpha1="(-110)"
        alpha2="(0-11)"
        alpha3="(00-2)"
        castShadow
        receiveShadow
        geometry={nodes["(-110)(0-11)(00-2)"].geometry}
        material={getMaterial("(-110)(0-11)(00-2)")}
      />
      <mesh
        name="(0-1-1)(110)(-200)"
        alpha1="(0-1-1)"
        alpha2="(110)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)(110)(-200)"].geometry}
        material={getMaterial("(0-1-1)(110)(-200)")}
      />
      <mesh
        name="(10-1)(-110)(0-20)"
        alpha1="(10-1)"
        alpha2="(-110)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(10-1)(-110)(0-20)"].geometry}
        material={getMaterial("(10-1)(-110)(0-20)")}
      />
      <mesh
        name="(-10-1)(110)(0-20)"
        alpha1="(-10-1)"
        alpha2="(110)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)(110)(0-20)"].geometry}
        material={getMaterial("(-10-1)(110)(0-20)")}
      />
      <mesh
        name="(011)(1-10)(-200)"
        alpha1="(011)"
        alpha2="(1-10)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(011)(1-10)(-200)"].geometry}
        material={getMaterial("(011)(1-10)(-200)")}
      />
      <mesh
        name="(-10-1)(011)(0-20)"
        alpha1="(-10-1)"
        alpha2="(011)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(-10-1)(011)(0-20)"].geometry}
        material={getMaterial("(-10-1)(011)(0-20)")}
      />
      <mesh
        name="(1-10)(-10-1)(002)"
        alpha1="(1-10)"
        alpha2="(-10-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(1-10)(-10-1)(002)"].geometry}
        material={getMaterial("(1-10)(-10-1)(002)")}
      />
      <mesh
        name="(-110)(0-1-1)(002)"
        alpha1="(-110)"
        alpha2="(0-1-1)"
        alpha3="(002)"
        castShadow
        receiveShadow
        geometry={nodes["(-110)(0-1-1)(002)"].geometry}
        material={getMaterial("(-110)(0-1-1)(002)")}
      />
      <mesh
        name="(0-11)(110)(-200)"
        alpha1="(0-11)"
        alpha2="(110)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)(110)(-200)"].geometry}
        material={getMaterial("(0-11)(110)(-200)")}
      />
      <mesh
        name="(101)(-110)(0-20)"
        alpha1="(101)"
        alpha2="(-110)"
        alpha3="(0-20)"
        castShadow
        receiveShadow
        geometry={nodes["(101)(-110)(0-20)"].geometry}
        material={getMaterial("(101)(-110)(0-20)")}
      />
      <mesh
        name="(0-11)(10-1)(-200)"
        alpha1="(0-11)"
        alpha2="(10-1)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-11)(10-1)(-200)"].geometry}
        material={getMaterial("(0-11)(10-1)(-200)")}
      />
      <mesh
        name="(0-1-1)(101)(-200)"
        alpha1="(0-1-1)"
        alpha2="(101)"
        alpha3="(-200)"
        castShadow
        receiveShadow
        geometry={nodes["(0-1-1)(101)(-200)"].geometry}
        material={getMaterial("(0-1-1)(101)(-200)")}
      />
    </group>
  );
}

useGLTF.preload("./C3v2.glb");