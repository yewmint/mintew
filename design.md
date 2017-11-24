
init:
1. init renderer, player, input
2. load resource
3. start loop
4. run first plot

loop:
1. walk the tree

input layers

Game
|
Renderer, Resource, Input, Animator, Transformer

Renderer manages webgl instance and make it hidden to others.
各个system由component调用，顶层只负责创建和维护
