
precision highp float;

uniform sampler2D positionTexture;
uniform mat4 matrix;

attribute vec2 coords;

varying vec3 vColor;

void main() {
  vec3 pos = texture2D(positionTexture, coords).xyz;

  vColor = vec3(1.);

  gl_Position = matrix * vec4(pos, 1.0);
}
