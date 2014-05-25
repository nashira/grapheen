
precision highp float;

uniform sampler2D vertTex;
varying vec3 vColor;

void main() {
  // vec3 color = texture2D(vertTex, gl_PointCoord).xyz;
  gl_FragColor = vec4(vColor, 1.);
}
