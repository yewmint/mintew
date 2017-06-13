precision highp float;

varying highp vec2 texCod;
uniform sampler2D uSampler;

uniform vec4 color;
uniform int isGraphFrag;

void main(void) {
  if (isGraphFrag == 0){
    gl_FragColor = texture2D(uSampler, texCod);
  }
  else {
    gl_FragColor = color;
  }
}
