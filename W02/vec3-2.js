// Constructor
Vec3 = function( x, y, z ) {
    this.x = x;
    this.y = y;
    this.z = z;
}

// AreaOfTriangle method
AreaOfTriangle = function( v0, v1, v2 )
{
    var a1 = v1.x - v0.x;
    var b1 = v2.x - v0.x;
    var a2 = v1.y - v0.y;
    var b2 = v2.y - v0.y;
    var a3 = v1.z - v0.z;
    var b3 = v2.z - v0.z;
    
    var zz = a1*b2 - a2*b1;
    var xx = a2*b3 - a3*b2;
    var yy = a3*b1 - a1*b3;
    
    return Math.sqrt(xx*xx + yy*yy + zz*zz)/2;
}
