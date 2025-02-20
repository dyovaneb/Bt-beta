import bpy
import mathutils


# (1, -1, 0) ..   (-1, 1, 0)      Alpha1
# (0, 1, -1) ..   (0, -1 , 1)     Alpha2
# (0, 0, 1) ..    (0, 0, -1)      Alpha3
# (0, 1, 0)       (0, -1, 0)      a2 + a3
# (1, 0, -1)      (-1, 0, 1)      a1 + a2
# (1, 0 , 0)      (-1, 0 , 0)     a1 + a2 + a3
# (1, 0, 1)       (-1, 0, -1)     a1 + a2 + 2a3
# (0, 1, 1)       (0, -1 , -1)    a2 + 2a3
# (1, 1, 0)       (-1, -1, 0)     a1 + 2a2 + 2a


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


a1 = mathutils.Vector((1, -1, 0))
a2 = mathutils.Vector((0, 1, -1))
a3 = mathutils.Vector((0, 0, 1))

listaBases = buscaBases(mathutils.Vector((1, 0, 0)), generado(a1, a2, a3))
resultado = compararGenerados(a1, a2, a3, listaBases)
print(resultado)


raices = map(tuple, generado(a1, a2, a3))

a1 = mathutils.Vector((1, -1, 0))
a2 = mathutils.Vector((-1, 0, -1))
a3 = mathutils.Vector((0, 0, 1))

raicesnuevas = map(tuple, generado(a1, a2, a3))


# [[Vector((1.0, -1.0, 0.0)), Vector((0.0, 1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, -1.0, 0.0)), Vector((-1.0, -0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, 1.0, 0.0)), Vector((-1.0, -0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((1.0, 1.0, 0.0)), Vector((-0.0, -1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, 1.0, -0.0)), Vector((1.0, 0.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, 1.0, -0.0)), Vector((-0.0, -1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, -1.0, -0.0)), Vector((0.0, 1.0, -1.0)), Vector((0.0, 0.0, 1.0))],
#  [Vector((-1.0, -1.0, -0.0)), Vector((1.0, 0.0, -1.0)), Vector((0.0, 0.0, 1.0))]]
