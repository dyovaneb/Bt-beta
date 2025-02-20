import bpy
import mathutils

# Raíces
alpha1 = mathutils.Vector((0, 1, 1))
alpha2 = mathutils.Vector((-1, 0, -1))
alpha3 = mathutils.Vector((1, 0, -1))
alpha12 = alpha1 + alpha2
alpha13 = alpha1 + alpha2
alpha123 = alpha1 + alpha2 + alpha3

raices = [alpha1, alpha2, alpha3, alpha12, alpha13, alpha123]

# Y+Z=0 "Alpha1Plano"
# X-Z=0 "Alpha2Plano"
# X+Z=0 "Alpha3Plano"
# X-Y=0 "Alpha1+3Plano"
# X+Y=0 "Alpha1+2Plano"
# Y-Z=0 "RaizAlpha1+2+3Plano"
# Y-Z+1=0 "RaizAlpha1+2+3Plano+1"


edges = [(0, 1)]
faces = []


for i in range(0, len(raices)):
    for j in range(i + 1, len(raices)):
        direct = raices[i].cross(raices[j])
        verts = [-2 * direct, 2 * direct]
        nombre = "recta" + str(i) + str(j)
        mesh_data = bpy.data.meshes.new(nombre + "_data")
        mesh_data.from_pydata(verts, edges, faces)
        mesh_obj = bpy.data.objects.new(nombre, mesh_data)
        bpy.context.collection.objects.link(mesh_obj)
