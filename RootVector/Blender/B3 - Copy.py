import bpy
import mathutils
import bmesh
from math import *


# (1, -1, 0) ..   (-1, 1, 0)      Alpha1 listo
# (0, 1, -1) ..   (0, -1 , 1)     Alpha2 listo
# (0, 0, 1) ..    (0, 0, -1)      Alpha3 listo
# (0, 1, 0)       (0, -1, 0)      a2 + a3 listo
# (1, 0, -1)      (-1, 0, 1)      a1 + a2 listo
# (1, 0 , 0)      (-1, 0 , 0)     a1 + a2 + a3 listo
# (1, 0, 1)       (-1, 0, -1)     a1 + a2 + 2a3 listog
# (0, 1, 1)       (0, -1 , -1)    a2 + 2a3 listo
# (1, 1, 0)       (-1, -1, 0)     a1 + 2a2 + 2a3 listo


def generarMateriales(listaRaices):
    for raiz in listaRaices:
        nombre = "mat_" + str(int(raiz.x)) + str(int(raiz.y)) + str(int(raiz.z))
        mat = bpy.data.materials.new(nombre)
        r = raiz.x / 2 + 0.5
        g = raiz.y / 2 + 0.5
        b = raiz.z / 2 + 0.5
        mat.diffuse_color = (r, g, b, 1)


def asignarMateriales(objeto, raiz1, raiz2, raiz3):
    bpy.context.view_layer.objects.active = objeto

    # Cambiar al modo de edición
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all()
    obj_bmesh = bmesh.from_edit_mesh(objeto.data)
    nombre_material1 = (
        "mat_" + str(int(raiz1.x)) + str(int(raiz1.y)) + str(int(raiz1.z))
    )
    nombre_material2 = (
        "mat_" + str(int(raiz2.x)) + str(int(raiz2.y)) + str(int(raiz2.z))
    )
    nombre_material3 = (
        "mat_" + str(int(raiz3.x)) + str(int(raiz3.y)) + str(int(raiz3.z))
    )
    raizLarga = raiz1 + 2 * raiz2 + 2 * raiz3
    nombre_material4 = (
        "mat_" + str(int(raizLarga.x)) + str(int(raizLarga.y)) + str(int(raizLarga.z))
    )

    material1 = bpy.data.materials.get(nombre_material1)
    material2 = bpy.data.materials.get(nombre_material2)
    material3 = bpy.data.materials.get(nombre_material3)
    material4 = bpy.data.materials.get(nombre_material4)
    objeto.data.materials.append(material1)
    objeto.data.materials.append(material2)
    objeto.data.materials.append(material3)
    objeto.data.materials.append(material4)

    obj_bmesh.faces.ensure_lookup_table()
    listadeprueba = []
    for cara in obj_bmesh.faces:
        prueba = 0
        if cara.normal.cross(raiz1).length < 0.1:
            indice_material = 0
            objeto.active_material_index = indice_material
            cara.select = True
            bpy.ops.object.material_slot_assign()
            cara.select = False
            prueba += 1
        if cara.normal.cross(raiz2).length < 0.1:
            indice_material = 1
            objeto.active_material_index = indice_material
            cara.select = True
            bpy.ops.object.material_slot_assign()
            cara.select = False
            prueba += 1
        if cara.normal.cross(raiz3).length < 0.1:
            indice_material = 2
            objeto.active_material_index = indice_material
            cara.select = True
            bpy.ops.object.material_slot_assign()
            cara.select = False
            prueba += 1
        if cara.normal.cross(raizLarga).length < 0.1:
            indice_material = 3
            objeto.active_material_index = indice_material
            cara.select = True
            bpy.ops.object.material_slot_assign()
            cara.select = False
            prueba += 1
        listadeprueba.append(prueba)
    bpy.ops.object.mode_set(mode="OBJECT")


def vertSimp(a1: mathutils.Vector, a2: mathutils.Vector, a3: mathutils.Vector):
    """
    calcula el complejo simplicial asociado a una base del sistema de raíces retorna sus vertices

    :param a1: elemnto a1 de la base
    :param a2:elemnto a2 de la base
    :param a3:elemnto a3 de la base
    :return: lista vectores
    """
    a123 = a1 + 2 * a2 + 2 * a3  # Raíz larga
    despa123 = a123 * (-1 / a123.dot(a123))
    cero = mathutils.Vector((0, 0, 0))
    intersec_1_2 = mathutils.geometry.intersect_plane_plane(cero, a1, cero, a2)
    intersec_2_3 = mathutils.geometry.intersect_plane_plane(cero, a2, cero, a3)
    intersec_1_3 = mathutils.geometry.intersect_plane_plane(cero, a1, cero, a3)

    # vertice_i_j corresponde al vertice de la recta de intersección de lo planos perpendiculares a la raiz i y j, con el plano suma desplazado
    vert_1_2 = mathutils.geometry.intersect_line_plane(
        cero, intersec_1_2[1], despa123, a123
    )
    vert_1_3 = mathutils.geometry.intersect_line_plane(
        cero, intersec_1_3[1], despa123, a123
    )
    vert_2_3 = mathutils.geometry.intersect_line_plane(
        cero, intersec_2_3[1], despa123, a123
    )

    return [vert_1_2, vert_1_3, vert_2_3]


def simpDesp(listBases, origen, listAnteriores):
    # lista de bases con todas las bases del sistema de raizes, orgien con el punto de origen (es un vertice de un simp anterior ! No necesariamente en este caso),
    # listado de origenes de simp anteriores para no repetir una piramide (basta revisar si alguna piramide tiene algun vertice en esta lista para no dibujarla)
    # quizás se pude hacer recursiva, e iterarla hasta cierto valor, agregar un cuarto input con el número de iteraciones.
    # Para este caso hay que revisar cuales sirven como vertices nuevos, ya que probablemente no serán todos
    verticesnuevos = []

    nombre_coleccion_principal = "B3Simples"
    coleccion_principal = bpy.data.collections.new(nombre_coleccion_principal)
    bpy.context.scene.collection.children.link(coleccion_principal)

    for base in listBases:
        raizLarga = base[0] + 2 * base[1] + 2 * base[2]
        raiz1 = (
            "(" + str(int(base[0].x)) + str(int(base[0].y)) + str(int(base[0].z)) + ")"
        )
        raiz2 = (
            "(" + str(int(base[1].x)) + str(int(base[1].y)) + str(int(base[1].z)) + ")"
        )
        raiz3 = (
            "(" + str(int(base[2].x)) + str(int(base[2].y)) + str(int(base[2].z)) + ")"
        )
        raizLarga = (
            "("
            + str(int(raizLarga.x))
            + str(int(raizLarga.y))
            + str(int(raizLarga.z))
            + ")"
        )
        nombre_r1 = "b3" + raiz1
        nombre_r2 = "b3" + raiz2
        nombre_r3 = "b3" + raiz3
        nombre_l = "b3" + raizLarga
        nombre_ls = "b3" + raizLarga + "L"
        coleccion_r1 = bpy.data.collections.get(nombre_r1)
        coleccion_r2 = bpy.data.collections.get(nombre_r2)
        coleccion_r3 = bpy.data.collections.get(nombre_r3)
        coleccion_l = bpy.data.collections.get(nombre_l)
        coleccion_ls = bpy.data.collections.get(nombre_ls)
        if coleccion_r1 is None:
            coleccion_r1 = bpy.data.collections.new(nombre_r1)
            coleccion_principal.children.link(coleccion_r1)
        if coleccion_r2 is None:
            coleccion_r2 = bpy.data.collections.new(nombre_r2)
            coleccion_principal.children.link(coleccion_r2)
        if coleccion_r3 is None:
            coleccion_r3 = bpy.data.collections.new(nombre_r3)
            coleccion_principal.children.link(coleccion_r3)
        if coleccion_l is None:
            coleccion_l = bpy.data.collections.new(nombre_l)
            coleccion_principal.children.link(coleccion_l)
        if coleccion_ls is None:
            coleccion_ls = bpy.data.collections.new(nombre_ls)
            coleccion_l.children.link(coleccion_ls)
        nombre = raiz1 + raiz2 + raiz3

        vertices = vertSimp(base[0], base[1], base[2])
        despVertices = [
            vertices[0] + origen,
            vertices[1] + origen,
            vertices[2] + origen,
        ]
        dibujar = True
        for vert in despVertices:
            if vert in listAnteriores:
                dibujar = False
        if dibujar:
            verts = [mathutils.Vector((0, 0, 0)), vertices[0], vertices[1], vertices[2]]
            edges = []
            faces = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
            nombrefinal = nombre
            mesh_data = bpy.data.meshes.new(nombrefinal + "_data")
            mesh_data.from_pydata(verts, edges, faces)
            mesh_obj = bpy.data.objects.new(nombrefinal, mesh_data)
            coleccion_r1.objects.link(mesh_obj)
            coleccion_r2.objects.link(mesh_obj)
            coleccion_r3.objects.link(mesh_obj)
            coleccion_ls.objects.link(mesh_obj)
            mesh_obj.location.x += origen.x
            mesh_obj.location.y += origen.y
            mesh_obj.location.z += origen.z
            # asignar materiales correspondientes a las caras.
            asignarMateriales(mesh_obj, base[0], base[1], base[2])
            for vert in despVertices:
                if vert not in verticesnuevos:
                    verticesnuevos.append(vert)  # REVISAR para B3
    listAnteriores.append(origen)
    return [verticesnuevos, listAnteriores]


def generado(a1, a2, a3):
    return [
        a1,
        a2,
        a3,
        a2 + a3,
        a1 + a2,
        a1 + a2 + a3,
        a1 + a2 + 2.0 * a3,
        a2 + 2 * a3,
        a1 + 2 * a2 + 2 * a3,
        -a1,
        -a2,
        -a3,
        -(a2 + a3),
        -(a1 + a2),
        -(a1 + a2 + a3),
        -(a1 + a2 + 2 * a3),
        -(a2 + 2 * a3),
        -(a1 + 2 * a2 + 2 * a3),
    ]


def buscaBases(a3, listaRaices):
    bases = []
    for a1 in listaRaices:
        if (
            a3.dot(a1) == 0.0
            and a1.dot(mathutils.Vector((1, 1, 1))) != 1
            and a1.dot(mathutils.Vector((1, 1, 1))) != -1
        ):
            for a2 in listaRaices:
                if a1.dot(a2) == -1.0 and a3.dot(a2) == -1.0:
                    bases.append([a1, a2, a3])
    return bases


def compararGenerados(a1, a2, a3, listadeBases):
    comparacion = []
    control = set(map(tuple, generado(a1, a2, a3)))
    for base in listadeBases:
        uno = set(map(tuple, generado(base[0], base[1], base[2])))
        comparacion.append(control == uno)
    return comparacion


a1s = mathutils.Vector((1, -1, 0))
a2s = mathutils.Vector((0, 1, -1))
a3s = mathutils.Vector((0, 0, 1))

vectoresiniciales = [
    mathutils.Vector((1, 0, 0)),
    mathutils.Vector((0, 1, 0)),
    mathutils.Vector((0, 0, 1)),
    mathutils.Vector((-1, 0, 0)),
    mathutils.Vector((0, -1, 0)),
    mathutils.Vector((0, 0, -1)),
]

listaBases = []
for terecer in vectoresiniciales:
    print(len(listaBases))
    listaBases = listaBases + buscaBases(terecer, generado(a1s, a2s, a3s))
origen = mathutils.Vector((0, 0, 0))
generarMateriales(generado(a1s, a2s, a3s))
simpDesp(listaBases, origen, [])


# resultado = compararGenerados(a1, a2, a3, listaBases)
# print(resultado)

# print(compararGenerados(a1, a2, a3, buscaBases(mathutils.Vector((0, 0, 1)), generado(a1, a2, a3))))
# print(len(buscaBases(mathutils.Vector((1, 0, 0)), generado(a1, a2, a3))))

# [[Vector((1.0, -1.0, 0.0)), Vector((0.0, 1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, -1.0, 0.0)), Vector((-1.0, -0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, 1.0, 0.0)), Vector((-1.0, -0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, 1.0, 0.0)), Vector((-0.0, -1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, 1.0, -0.0)), Vector((1.0, 0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, 1.0, -0.0)), Vector((-0.0, -1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, -1.0, -0.0)), Vector((0.0, 1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, -1.0, -0.0)), Vector((1.0, 0.0, -1.0)), Vector((0.0, 0.0, 1.0))]]
