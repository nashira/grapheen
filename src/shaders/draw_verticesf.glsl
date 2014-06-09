
precision highp float;

uniform sampler2D vertTex;
varying vec4 vColor;

void main() {
  // vec3 color = texture2D(vertTex, gl_PointCoord).xyz;
  gl_FragColor = vColor;
}
