/**
 * ...
 * @author Gary Paluk - http://www.plugin.io
 */
 
///<reference path="../../def/webgl.d.ts"/>

module away.display3D
{
	
	export class VertexBuffer3D
	{
		
		private _numVertices:number;
		private _data32PerVertex:number;
		private _buffer: WebGLBuffer;
	
		constructor( numVertices:number, data32PerVertex:number )
		{
			this._numVertices = numVertices;
			this._data32PerVertex = data32PerVertex;
			
			this._buffer = GL.createBuffer();
			GL.bindBuffer( GL.ARRAY_BUFFER, this._buffer ); // TODO ELEMENT_ARRAY_BUFFER VBOs
		}
		
		public upload( vertices:number[], startVertex:number, numVertices:number)
		{
			GL.bufferData(
					GL.ARRAY_BUFFER, 
					new Float32Array( vertices ), 
					GL.STATIC_DRAW
				);
		}
		
		public get numVertices():number
		{
			return this._numVertices;
		}
		
		public get data32PerVertex():number
		{
			return this._data32PerVertex;
		}
	}
}