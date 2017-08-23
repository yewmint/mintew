attribute vec2 vtxPos;
uniform mat4 transform;
uniform mat4 view;

void main(void) {
  gl_Position = view * transform * vec4(vtxPos, 0.0, 1.0);
}
