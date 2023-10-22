"use strict";

function resizeCanvasToDisplaySize(canvas) {
  // 获取浏览器显示的画布的CSS像素值
  const displayWidth = canvas.clientWidth
  const displayHeight = canvas.clientHeight

  // 检查画布大小是否相同。
  const needResize =
      canvas.width !== displayWidth || canvas.height !== displayHeight

  if (needResize) {
      // 使画布大小相同
      canvas.width = displayWidth
      canvas.height = displayHeight
  }

  return needResize
}

var vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`;

var fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(0.1, 0.5, 0.5, 1);
}
`;

// gl: webgl上下文
// type 顶点或者片元着色器
// source具体的内容
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  // 提供数据源
  gl.shaderSource(shader, source);
  // 编译着色器为二进制数据
  gl.compileShader(shader);
  // 检查编译是否成功
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.log(gl.getShaderInfoLog(shader), 'error');  // eslint-disable-line
  // 失败则删除
  gl.deleteShader(shader);
  return undefined;
}

// gl: webgl上下文
// vertexShader: 顶点着色器
// fragmentShader: 片元着色器
function createProgram(gl, vertexShader, fragmentShader) {
  // 创建一个程序
  var program = gl.createProgram();
  // 附上顶点着色器并编译
  gl.attachShader(program, vertexShader);
  // 附上片元着色器并编译
  gl.attachShader(program, fragmentShader);
  // 链接程序
  gl.linkProgram(program);
  // 检查链接是否成功
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));  // eslint-disable-line
  gl.deleteProgram(program);
  return undefined;
}

function main() {
  // Get A WebGL context
  var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // 创建着色器并编译
  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // 创建程序并链接
  var program = createProgram(gl, vertexShader, fragmentShader);

  // 获取属性的位置
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // 创建一个缓冲区
  var positionBuffer = gl.createBuffer();

  // 将缓冲区绑定到ARRAY_BUFFER上
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  var positions = [
    0, 0,
    0, 0.5,
    1, 1,
  ];
  // 将数据写入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // 创建一个顶点数组对象
  var vao = gl.createVertexArray();

  // 绑定顶点数组对象到webgl上下文
  gl.bindVertexArray(vao);

  // 启用属性
  gl.enableVertexAttribArray(positionAttributeLocation);

  // 告诉属性怎么从positionBuffer中读取数据 (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  // 将属性绑定到缓冲区
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset);

  resizeCanvasToDisplaySize(gl.canvas);

  // 传递画布大小给gl
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // 清空画布
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 告诉它用我们之前写好的着色程序（一个着色器对）
  gl.useProgram(program);

  // 告诉它用我们之前写好的顶点数组对象（数据来源）
  // gl.bindVertexArray(vao);

  // 绘制：告诉它怎么从顶点着色器中读取数据
  var primitiveType = gl.TRIANGLES;
  var offset = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset, count);
}

main();
