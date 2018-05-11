export class Point3D {  
  x:number;
  y:number;
  z:number;

  constructor (x:number, y:number, z:number) {
    this.x = x;
    this.y = y;
    this.z = z
  }  

  rotateX(angle: any) : Point3D  {
    var rad, cosa, sina, y, z
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    y = this.y * cosa - this.z * sina
    z = this.y * sina + this.z * cosa
    return new Point3D(this.x, y, z)
  }  
  
  rotateY (angle : any)  : Point3D {
    var rad, cosa, sina, x, z
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    z = this.z * cosa - this.x * sina
    x = this.z * sina + this.x * cosa
    return new Point3D(x,this.y, z)
  }

  rotateZ (angle : any) {
    var rad, cosa, sina, x, y
    rad = angle * Math.PI / 180
    cosa = Math.cos(rad)
    sina = Math.sin(rad)
    x = this.x * cosa - this.y * sina
    y = this.x * sina + this.y * cosa
    return new Point3D(x, y, this.z)
  }


  project(viewWidth: any, viewHeight : any, fov: any, viewDistance: any) : Point3D {
    var factor, x, y
    factor = fov / (viewDistance + this.z)
    x = this.x * factor + viewWidth / 2
    y = this.y * factor + viewHeight / 2
    return new Point3D(x, y, this.z)
  }

}



