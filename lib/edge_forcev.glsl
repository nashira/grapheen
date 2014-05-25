
precision highp float;

uniform sampler2D positionTexture;
uniform float forceDir;
uniform float dt;

attribute vec4 coords;

varying vec3 vPos;

void main() {
  vec3 posOut = texture2D(positionTexture, coords.xy).xyz;
  vec3 posIn = texture2D(positionTexture, coords.zw).xyz;
  vec3 diff = posIn - posOut;
  // float dist = length(diff);
  // vec3 f = sign(diff) * min(abs(diff), 0.1) * dt;
  // vec3 f = (diff / dist) * dt;
  vec3 f = diff * dt;
  // f = sign(f) * log(abs(f) + 1.);
  // f = sign(f) * min(abs(f), 0.01);
  // vPos = vec3(0.);
  if (forceDir > 0.5) {
    vPos = f;
    gl_Position = vec4(coords.xy * 2. - 1., 0.0, 1.0);
  } else {
    vPos = -f;
    gl_Position = vec4(coords.zw * 2. - 1., 0.0, 1.0);
  }
}
