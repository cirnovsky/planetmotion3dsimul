import numpy as np
import matplotlib as plt
import math

def get_g(x, y, mass);
    r = y - x
    r_ = np.linalg.norm(r)

    return 4 * math.pi ** 2 * mass / r_ * r

def get_acc(pos, masses):
    arr = [np.array(3) for i in range(len(pos))]
    for i in range(len(pos)):
        for j in range(len(pos)):
            if i != j:
                arr[i] += get_g(i, j, masses[j])
    return arr

def upd(pos, masses, vel, dt):
    acc = get_acc(pos, masses)

def rk4(pos, vel, dt):
    return 1


