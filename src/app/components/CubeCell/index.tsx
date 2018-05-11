/*::
var canvas : any = document.getElementById("thecanvas");
var ctx = canvas.getContext("2d");
*/

import * as React from 'react';
import { Point3D } from '../../models/CubeModel'

export default class Cell extends React.Component {
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
      var canvas:any = document.getElementById("thecanvas");
          if( canvas && canvas.getContext ) {
              const ctx = canvas.getContext("2d");
              setInterval(() => this.loop(ctx), 33);
          }
      }
    
    // loop(ctx: any)  : void {      
    //   var t = new Array();
    //     ctx.fillStyle = "rgb(0,0,0)";
    //     ctx.fillRect(0,0,400,200);
    //     for( var i = 0; i < this.vertices.length; i++ ) {
    //         var v = this.vertices[i];
    //         var r = v.rotateX(this.angle).rotateY(this.angle).rotateZ(this.angle);
    //         var p = r.project(400,200,128,3.5);
    //         t.push(p)
    //     }

    //     ctx.strokeStyle = "rgb(255,55,255)"
    //     for( var i = 0; i < this.faces.length; i++ ) {
    //         var f = this.faces[i]
    //         ctx.beginPath()
    //         ctx.moveTo(t[f[0]].x,t[f[0]].y)
    //         ctx.lineTo(t[f[1]].x,t[f[1]].y)
    //         ctx.lineTo(t[f[2]].x,t[f[2]].y)
    //         ctx.lineTo(t[f[3]].x,t[f[3]].y)
    //         ctx.closePath()
    //         ctx.stroke()
    //     }
    //     this.angle += 2
    // }

    loop(ctx:any) : void {
      var t = new Array();

      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0,0,400,250);

      for( var i = 0; i < this.vertices.length; i++ ) {
          var v = this.vertices[i];
         // var r = v.rotateX(this.angle).rotateY(this.angle);
          var p = v.rotateX(25).rotateY(25).project(400,250,200,4);
          t.push(p)
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
          var f = this.faces[avg_z[i].index]

          ctx.fillStyle = this.arrayToRGB(this.colors[avg_z[i].index]);
          ctx.beginPath()
          ctx.moveTo(t[f[0]].x,t[f[0]].y)
          ctx.lineTo(t[f[1]].x,t[f[1]].y)
          ctx.lineTo(t[f[2]].x,t[f[2]].y)
          ctx.lineTo(t[f[3]].x,t[f[3]].y)
          ctx.closePath()
          ctx.fill()
      }
      this.angle += 2
  }

    /* Constructs a CSS RGB value from an array of 3 elements. */
   arrayToRGB(arr: any) : string {
      if( arr.length == 3 ) {
          return "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
      }
      return "rgb(0,0,0)";
  }

  render() {
    return (
      <div>
      <button onClick={this.startDemo.bind(this)}> Start </button>
        <canvas id="thecanvas" width="400" height="400">             
        </canvas>
      </div>
    );


  }
}
