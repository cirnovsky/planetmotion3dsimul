export class Vector3 {
	constructor(x, y, z) {
		this.dim = new Array(3)
		this.dim[0] = x, this.dim[1] = y, this.dim[2] = z
	}
	// Multiply by a real number
	times(mul) {
		return new Vector3(this.x * mul, this.y * mul, this.z * mul)
	}
	// Dot product with another Vector3
	dot(mulv) {
		return this.x * mulv.x + this.y * mulv.x + this.z * mulv.z
	}
	// Added by another Vector3
	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
	}
	// Subtracted by another Vector3
	sub(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
	}
	// Power
	pow(p) {
		return new Vector3(this.x ** p, this.y ** p, this.z ** p)
	}
	// Each dimension of @this divided by @v
	div(v) {
		return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z)
	}
}
