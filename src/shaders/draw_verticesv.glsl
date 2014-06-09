
precision highp float;

uniform sampler2D positionTexture;
uniform mat4 matrix;
uniform float pointSize;

attribute vec2 coords;
attribute vec4 color;

varying vec4 vColor;

void main() {
  vec3 pos = texture2D(positionTexture, coords).xyz;

  vColor = color;

  gl_PointSize = pointSize;

  gl_Position = matrix * vec4(pos, 1.0);
}
