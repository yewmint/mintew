attribute vec2 vtxPos;
attribute vec2 atexCod;

uniform mat4 view;
uniform mat4 transform;

varying highp vec2 texCod;

void main(void) {
  gl_Position = view * transform * vec4(vtxPos, 0.0, 1.0);
  texCod = atexCod;
}
