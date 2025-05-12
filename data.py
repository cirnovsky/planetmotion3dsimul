import numpy as np

T = 1hr

def update(pl1, pl2, pl2):
	# pl1
	acc = calcAcc(pl2, pl1) + calcAcc(pl3, pl1)
	vel_final = pl1.vel + acc * T
	pl1.position = pl1.position + (vel_final ** 2 - pl1.vel ** 2) / (2 * acc)
	pl1.vel = vel_final
	... same for pl2 pl3

	return pl1, pl2, pl3

q1 = []
q2 = []
q3 = []

K = 5

q1_tmp[0], q2_tmp[0], .. = update(q1[K - 1], q2[K - 1)...
for i in range(1, K):
	q1_tmp[i], q2_tmp[i], q3_tmp[i] = update(q1_tmp[i - 1], q2[(i + 4) % 5], q3[(i + 4) % 5]

display for next K*T

q1, q2, q3 = q1_tmp, q2_tmp, q3_tmp

p1, p2, p3 = update(p1, p2, p3)


