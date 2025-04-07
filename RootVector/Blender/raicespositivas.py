import bpy
import mathutils
import bmesh
from math import *


def generadoB3(a1, a2, a3):
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


a1s = mathutils.Vector((1, -1, 0))
a2s = mathutils.Vector((0, 1, -1))
a3s = mathutils.Vector((0, 0, 1))


def signoRaices(listaRaices, vectorInterior):
    """
    Determina el signo de las raíces en relación a un vector interior de una habitación, en este caso (1-10)(01-1)(001).
    :param listaRaices: Lista de raíces generadas por la función generadoB3. Corresponde a todas las raíces de B3
    :param vectorInterior: Vector interior que se utilizará para determinar el signo.
    :return: Lista que contiene en el [0] las positivas y en [1] las negativas.
    """
    signos = [[], []]
    for raiz in listaRaices:
        if vectorInterior.dot(raiz) > 0:
            signos[0].append(
                "(" + str(int(raiz[0])) + str(int(raiz[1])) + str(int(raiz[2])) + ")"
            )
        else:
            signos[1].append(
                "(" + str(int(raiz[0])) + str(int(raiz[1])) + str(int(raiz[2])) + ")"
            )
    return signos


print(a1s)
print(a1s + a2s)
# lista = generadoB3(a1s, a2s, a3s)
# vectorInterior = mathutils.Vector((-0.6, -0.3, -0.1))
# signos = signoRaices(lista, vectorInterior)
# print("Raices positivas:", signos[0])
# print("Raices negativas:", signos[1])

# Raices positivas: ['(-110)', '(0-11)', '(00-1)', '(0-10)', '(-101)', '(-100)', '(-10-1)', '(0-1-1)', '(-1-10)']
# Raices negativas: ['(1-10)', '(01-1)', '(001)', '(010)', '(10-1)', '(100)', '(101)', '(011)', '(110)']
