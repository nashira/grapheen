
var Program = require('gpgpu').Program;
var Matrix = require('gpgpu').Matrix;
var Camera = require('gpgpu').Camera;
var Grapheen = require('./grapheen');
var Graph = require('./graph');
var esprima = require('esprima');
try {
var dat = require('../lib/dat.gui.min');
} catch(e) {}

var Colors = {
    AssignmentExpression: [1.0, 0.4, 0.4, 1.0],
    ArrayExpression: [0.92, 0.12, 0.12, 1.0],
    BlockStatement: [0.84, 0.20, 0.20, 1.0],
    BinaryExpression: [1.0, 0.33, 0.4, 1.0],
    BreakStatement: [0.94, 0.38, 0.11, 1.0],
    CallExpression: [0.86, 0.40, 0.18, 1.0],
    CatchClause: [1.0, 0.59, 0.4, 1.0],
    ConditionalExpression: [0.95, 0.61, 0.9, 1.0],
    ContinueStatement: [0.87, 0.62, 0.17, 1.0],
    DebuggerStatement: [1.0, 0.93, 0.4, 1.0],
    DirectiveStatement: [0.13, 0.91, 0.66, 1.0],
    DoWhileStatement: [0.4, 1.0, 0.62, 1.0],
    EmptyStatement: [0.22, 0.82, 0.43, 1.0],
    ExpressionStatement: [0.13, 0.92, 0.46, 1.0],
    ForStatement: [0.4, 1.0, 0.35, 1.0],
    ForInStatement: [0.24, 0.89, 0.15, 1.0],
    FunctionDeclaration: [0.14, 1.0, 0.4, 1.0],
    FunctionExpression: [0.58, 0.92, 0.12, 1.0],
    Identifier: [0.59, 1.0, 0.4, 1.0],
    IfStatement: [0.89, 0.91, 0.13, 1.0],
    Literal: [0.20, 0.84, 0.81, 1.0],
    LabeledStatement: [0.35, 0.77, 0.81, 1.0],
    LogicalExpression: [0.34, 0.65, 0.82, 1.0],
    MemberExpression: [0.17, 0.65, 1.0, 1.0],
    NewExpression: [0.29, 0.36, 0.88, 1.0],
    ObjectExpression: [0.0, 0.7, 0.99, 1.0],
    Program: [0.27, 0.0, 0.99, 1.0],
    Property: [0.38, 0.9, 0.89, 1.0],
    ReturnStatement: [0.45, 0.20, 0.74, 1.0],
    SequenceExpression: [0.66, 0.0, 0.94, 1.0],
    SwitchStatement: [0.87, 0.22, 0.49, 1.0],
    SwitchCase: [1.0, 0.16, 0.62, 1.0],
    ThisExpression: [1.0, 0.16, 0.94, 1.0],
    ThrowStatement: [0.87, 0.15, 0.85, 1.0],
    TryStatement: [0.77, 0.25, 0.77, 1.0],
    UnaryExpression: [0.69, 0.38, 0.76, 1.0],
    UpdateExpression: [0.71, 0.8, 0.86, 1.0],
    VariableDeclaration: [1.0, 0.52, 0.52, 1.0],
    VariableDeclarator: [0.98, 1.0, 0.68, 1.0],
    WhileStatement: [0.91, 0.65, 0.97, 1.0],
    WithStatement: [0.89, 0.91, 0.9, 1.0]
};

var GraphView = function () {
}

GraphView.prototype.setColors = function (graph) {
  graph.forEachNode(function (node) {
    node.data.color = Colors[node.data.type];
  });

  graph.forEachEdge(function (edge) {
    edge.data.fromColor = edge.fromNode.data.color;
    edge.data.toColor = edge.toNode.data.color;
  });
}

GraphView.prototype.init = function (graph, canvas, container) {


  var gl = canvas.getContext('webgl');
  Program.init(gl);
  Grapheen.init(gl);

  this.setColors(graph);

  var width = this.width = parseInt(canvas.offsetWidth);
  var height = this.height = parseInt(canvas.offsetHeight);
  var devicePixelRatio = window.devicePixelRatio || 1
  canvas.width = width * devicePixelRatio
  canvas.height = height * devicePixelRatio
  canvas.style.width = canvas.style.height = '100%'

  if (!this.grapheen) {
    this.grapheen = new Grapheen(graph);
    this.grapheen.reload();

    var gui = new dat.GUI({autoPlace: false});
    gui.add(this.grapheen.params, 'dtVertices', 0, 1);
    gui.add(this.grapheen.params, 'dtEdges', 0, 1);
    gui.add(this.grapheen.params, 'pointSize', 0, 20);
    gui.add(this.grapheen.params, 'vertexForces');
    gui.add(this.grapheen.params, 'edgeForces');
    gui.add(this.grapheen.params, 'renderEdges');
    gui.add(this.grapheen.params, 'renderVertices');
    container.appendChild(gui.domElement);

    var start = {}, moving = false, self = this;
    canvas.addEventListener('mousedown', function (e) {
      moving = true;
      start.x = e.x;
      start.y = e.y;
    }, false);

    canvas.addEventListener('mouseup', function () {
      moving = false;
    }, false);

    canvas.addEventListener('mouseout', function () {
      moving = false;
    }, false);

    canvas.addEventListener('mousemove', function (e) {
      if (!moving) return;

      var dx = e.x - start.x;
      var dy = e.y - start.y;
      start.x = e.x;
      start.y = e.y;

      self.camera.orbit(dy * 0.005, dx * -0.005);

    }, false);

    canvas.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY/e.deltaX) > 0.3) {
        e.preventDefault();
      }
      var scale = 1 - e.deltaY * 0.01;
      self.camera.zoom(scale);
    }, false);

    window.addEventListener('resize', function () {
      console.log('resize')
      var width = self.width = parseInt(canvas.offsetWidth);
      var height = self.height = parseInt(canvas.offsetHeight);
      var ww = width * 2
      var wh = height * 2
      var devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      self.grapheen.drawVerticesProg.setViewport(0, 0, ww, wh);
      self.grapheen.drawEdgesProg.setViewport(0, 0, ww, wh);
      self.camera.setPerspective(0.6, width / height, 1, 100000)
    }, false);
  }

  var ww = width * 2
  var wh = height * 2

  this.grapheen.drawVerticesProg.setViewport(0, 0, ww, wh);
  this.grapheen.drawEdgesProg.setViewport(0, 0, ww, wh);
  this.grapheen.runInitialPos(0.1);
  this.animate();
}

GraphView.prototype.animate = function () {
  var angle = 0
  var camera = this.camera = new Camera(0.6, this.width / this.height, 1, 100000);
  camera.setPosition(0, 0, -300);

  var ani = function () {
    this.grapheen.step(camera);

    if (!this.stopped) {
      window.requestAnimationFrame(ani);
    }
  }.bind(this);

  ani();
}

module.exports = GraphView;
