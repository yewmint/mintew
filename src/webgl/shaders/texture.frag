precision highp float;

varying highp vec2 texCod;
uniform float opacity;
uniform sampler2D uSampler;

void main(void) {
  vec4 color = texture2D(uSampler, texCod);
  color.a = opacity;
  gl_FragColor = color;
}
