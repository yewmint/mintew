precision highp float;

varying highp vec2 texCod;
uniform sampler2D uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, texCod);
}
