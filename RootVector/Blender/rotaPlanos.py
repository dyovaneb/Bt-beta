import bpy
import mathutils

def align_plane_to_point(obj, point):
    dir = point - obj.location
    return dir.to_track_quat("Z", "X").to_euler() #función mágica que no sé bien que hace.

for i in range (0, 10):
    bpy.ops.mesh.primitive_plane_add(size=2, enter_editmode=False, align='WORLD', location=(0, 0,0))
    obj = bpy.context.object
    point = mathutils.Vector((1,0,1)) #el plano quedará mirando hacia estevector. en este caso -alpha2
    translacion = point * ((i + 1)  / point.dot(point))

    if obj:
        obj.rotation_euler = align_plane_to_point(obj, point)
        bpy.ops.transform.translate(value=translacion) #tengo que sumar la raiz partido en la raiz punto raiz.
