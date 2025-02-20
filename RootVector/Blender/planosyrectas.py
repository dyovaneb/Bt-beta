import bpy
import mathutils
from math import *

# Numero de planos paralelos para cada raíz
numPlanos = 2


# funcion que orienta un plano a point
def align_plane_to_point(obj, point):
    dir = point - obj.location
    return dir.to_track_quat("Z", "X").to_euler()


# Raíces
alpha1 = mathutils.Vector((0, 1, 1))
alpha2 = mathutils.Vector((-1, 0, -1))
alpha3 = mathutils.Vector((1, 0, -1))
alpha12 = alpha1 + alpha2
alpha13 = alpha1 + alpha3
alpha123 = alpha1 + alpha2 + alpha3

raices = [alpha1, alpha2, alpha3, alpha12, alpha13, alpha123]
nombres = ["a1", "a2", "a3", "a12", "a13", "a123"]

# vectores desplazamiento para cada plano afin
desplazamientos = []

# crea, orienta, y traslada los planos para cada raiz
nombre = 0
for raiz in raices:
    desplRaiz = []
    # crear la coleccion
    nombre_coleccion = "Planos" + nombres[nombre]
    nueva_coleccion = bpy.data.collections.new(nombre_coleccion)
    bpy.context.scene.collection.children.link(nueva_coleccion)
    for i in range(0, numPlanos):
        # nombra y crea la coleccion
        bpy.ops.mesh.primitive_plane_add(
            size=2, enter_editmode=False, align="WORLD", location=(0, 0, 0)
        )
        obj = bpy.context.object
        nueva_coleccion.objects.link(obj)
        point = raiz  # el plano quedará mirando hacia estevector.
        translacion = point * ((i - floor(numPlanos / 2)) / point.dot(point))
        desplRaiz.append(translacion)
        obj.rotation_euler = align_plane_to_point(
            obj, point
        )  # apunta el plano a la raiz
        bpy.ops.transform.translate(value=translacion)  # suma el desplazamiento.
        obj.name = "plano" + nombres[nombre] + " " + str(i - floor(numPlanos / 2))
        # Verificar si el objeto está en la colección por defecto
        if obj.name in bpy.context.scene.collection.objects:
            # Desvincular el objeto de la colección por defecto
            bpy.context.scene.collection.objects.unlink(obj)
    nombre += 1
    desplazamientos.append(desplRaiz)


edges = [(0, 1)]
faces = []
# crea y traslada las rectas intersección, hay rectas repetidas, pero no sé como identificarlas en las trasladadas, o quizás ahí son únicas (?)
for i in range(0, len(raices)):
    for j in range(i + 1, len(raices)):
        h = 0
        for despUno in desplazamientos[i]:
            idDespluno = str(h - floor(numPlanos / 2))
            k = 0
            for despDos in desplazamientos[j]:
                idDespldos = str(k - floor(numPlanos / 2))
                # toma punto y normal del plano 1, punto y normal del plano 2. devuelve vect traslacion y director.
                interseccion = mathutils.geometry.intersect_plane_plane(
                    despUno, raices[i], despDos, raices[j]
                )
                direct = interseccion[1]
                verts = [-2 * direct, 2 * direct]
                nombre = "R" + nombres[i] + idDespluno + nombres[j] + idDespldos
                mesh_data = bpy.data.meshes.new(nombre + "_data")
                mesh_data.from_pydata(verts, edges, faces)
                mesh_obj = bpy.data.objects.new(nombre, mesh_data)
                bpy.context.collection.objects.link(mesh_obj)
                mesh_obj.location.xyz += interseccion[0]
                k = 1 + k
            h += 1
