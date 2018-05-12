/*::
var canvas : any = document.getElementById("thecanvas");
var ctx = canvas.getContext("2d");
*/

import * as React from 'react';
import { Point3D } from '../../models/CubeModel'

export default class Cell extends React.Component<any, any> {
    canvas: any;

    constructor(props: any) {
        super(props);

        this.canvas = null;
    }
   
     vertices = [
        new Point3D(-1,1,-1),
        new Point3D(1,1,-1),
        new Point3D(1,-1,-1),
        new Point3D(-1,-1,-1),
        new Point3D(-1,1,1),
        new Point3D(1,1,1),
        new Point3D(1,-1,1),
        new Point3D(-1,-1,1)
    ];
      
    faces = [[0,1,2,3],[1,5,6,2],[5,4,7,6],[4,0,3,7],[0,4,5,1],[3,2,6,7]]
    
     // Define the colors for each face.
    colors = [[255,0,0],[0,255,0],[0,0,255],[255,255,0],[0,255,255],[255,0,255]];
 
    angle = 0;

    startDemo() : void {            
          if( this.canvas && this.canvas.getContext ) {
              const ctx = this.canvas.getContext("2d");
              setInterval(() => this.loop(ctx), 500);
          }
      }
    
   
    loop(ctx:any) : void {
      var t = new Array();

      ctx.fillStyle = "rgb(200,200,200)";
      ctx.fillRect(0,0,400,250);

      for( var i = 0; i < this.vertices.length; i++ ) {
          var v = this.vertices[i];
          var r = v.rotateX(this.angle).rotateY(this.angle);
          //var p = r.project(200,300,700,20);
          t.push(r)          
      }

      var avg_z = new Array();

      for( var i = 0; i < this.faces.length; i++ ) {
          var f = this.faces[i];
          avg_z[i] = {"index":i, "z":(t[f[0]].z + t[f[1]].z + t[f[2]].z + t[f[3]].z) / 4.0};
      }

      avg_z.sort(function(a,b) {
          return b.z - a.z;
      });

      for( var i = 0; i < this.faces.length; i++ ) {
          var sy = 50
          var sx = 50
          var w = 100;
          var ox = 50;
          var oy = 50;
          var f = this.faces[avg_z[i].index]
          ctx.fillStyle = this.arrayToRGB(this.colors[avg_z[i].index]);
          ctx.beginPath()
          ctx.moveTo(ox, oy + sy); // v1
          ctx.lineTo(ox + w, oy + sy); // v2
          ctx.lineTo(ox + w, oy + w + sy) ; //v3
          ctx.lineTo(ox,oy + w + sy); // v4
        
          
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "rgb(255,0,0)";
        ctx.beginPath()
        ctx.moveTo(ox, oy + sy); // v1
        ctx.lineTo(ox + sx, oy); // v5
        ctx.lineTo(ox + w + sx  , oy); // v6
        ctx.lineTo(ox + w, sy + oy);   // v2     
        ctx.closePath()
        ctx.fill()

        ctx.fillStyle = "rgb(0,255,0)";
        ctx.beginPath()
        ctx.moveTo(ox + w, sy + oy);   // v2        
        ctx.lineTo(ox + w + sx  , oy); // v6
        ctx.lineTo(ox + sx + w, oy + w);  // v7
        ctx.lineTo(ox + w, oy + w + sy) ; //v3
        
        ctx.closePath()
        ctx.fill()


      }
      
      this.angle += 2
  }

    /* Constructs a CSS RGB value from an array of 3 elements. */
   arrayToRGB(arr: any) : string {
    //   if( arr.length == 3 ) {
    //       return "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
    //   }
      return "rgb(0,0,0)";
  }

  componentDidMount() : void {
    this.startDemo();     
  }

  render() {
    return (
      <div>      
        <canvas id="thecanvas" width="400" height="400" ref={(element) => this.canvas = element}>             
        </canvas>
      </div>
    );


  }
}
