import bpy

bpy.ops.mesh.primitive_xyz_function_surface(
    x_eq="u",
    y_eq="v",
    z_eq="-v",
    range_u_min=-10,
    range_v_min=-10,
    range_u_max=10,
    range_v_max=10,
)
bpy.context.object.name = "Alpha1Plano"

bpy.ops.object.editmode_toggle()

bpy.ops.mesh.primitive_xyz_function_surface(
    x_eq="u",
    y_eq="v",
    z_eq="u",
    range_u_min=-10,
    range_v_min=-10,
    range_u_max=10,
    range_v_max=10,
    range_u_step=2,
    range_v_step=2,
)
bpy.context.object.name = "Alpha2Plano"

bpy.ops.object.editmode_toggle()

bpy.ops.mesh.primitive_xyz_function_surface(
    x_eq="u",
    y_eq="v",
    z_eq="-u",
    range_u_min=-10,
    range_v_min=-10,
    range_u_max=10,
    range_v_max=10,
)
bpy.context.object.name = "Alpha3Plano"

bpy.ops.object.editmode_toggle()


bpy.ops.mesh.primitive_xyz_function_surface(
    x_eq="u",
    y_eq="v",
    z_eq="v-1",
    range_u_min=-10,
    range_v_min=-10,
    range_u_max=10,
    range_v_max=10,
)
bpy.context.object.name = "RaizlargaPlano"

bpy.ops.object.editmode_toggle()
