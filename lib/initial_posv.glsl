
precision highp float;

attribute vec2 coords;
varying vec2 vCoords;

void main() {
  vCoords = coords;
  gl_Position = vec4(coords * 2. - 1., 0.0, 1.0);
}
