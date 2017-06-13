attribute vec2 vtxPos;
attribute vec2 atexCod;

uniform mat4 view;
uniform mat4 translate;
uniform mat4 rotate;
uniform mat4 scale;
uniform mat4 pivot;

uniform int isGraphVert;

varying highp vec2 texCod;

void main(void) {
  if (isGraphVert == 1){
    gl_Position = view * vec4(vtxPos, 0.0, 1.0);
  }
  else {
    gl_Position = view * translate * rotate * scale * pivot * vec4(vtxPos, 0.0, 1.0);
  }
  texCod = atexCod;
}
