
var DataBuffer = require('gpgpu').DataBuffer;
var Program = require('gpgpu').Program;
var RenderTarget = require('gpgpu').RenderTarget;
var Texture = require('gpgpu').Texture;
var Utils = require('gpgpu').Utils;
var Graph = require('./graph');
var fs = require('fs');
var path = require('path');

var gl, Shaders;

var Grapheen = function (graph) {
  this.downsampleK = 1.2;
  this.graph = graph;
  this.params = {
    dtVertices: 0.01,
    dtEdges: 0.01,
    pointSize: 3,
    edgeForces: true,
    vertexForces: true,
    renderEdges: true,
    renderVertices: true
  }
  this.numVertices = 0;
  this.numEdges = 0;
}

Grapheen.init = function (_gl) {
  gl = _gl;
  Shaders = [
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/initial_posv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/initial_posf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/nbodyv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/nbodyf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/edge_forcev.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/edge_forcef.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/draw_verticesv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/draw_verticesf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/draw_edgesv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/shaders/draw_edgesf.glsl', 'utf8'))
  ];
}

Grapheen.prototype = {
  setNumVertices: function () {
    // if (this.numVertices == this.graph.nodeCount) {
    //   return;
    // }

    this.numVertices = this.graph.nodeCount;
    this.itemTS = Utils.getPotSize(this.numVertices);
    this.downsampleIdx = 0;
    this.downsample = Math.floor(this.numVertices * this.downsampleK * 0.00015 + 1);
  },

  deleteVertexData: function () {
    if (this.vertCoords) {
      gl.deleteBuffer(this.vertCoords.glBuffer);
    }
    if (this.vertColors) {
      gl.deleteBuffer(this.vertColors.glBuffer);
    }
    if (this.positionTarget) {
      gl.deleteFramebuffer(this.positionTarget.framebuffer);
      gl.deleteTexture(this.positionTarget.getGlTexture());
    }
    if (this.forceTarget) {
      gl.deleteFramebuffer(this.forceTarget.framebuffer);
      gl.deleteTexture(this.forceTarget.getGlTexture());
    }
    if (this.tempTarget) {
      gl.deleteFramebuffer(this.tempTarget.framebuffer);
      gl.deleteTexture(this.tempTarget.getGlTexture());
    }
  },

  createVertexData: function () {
    var size = this.itemTS;
    this.vertCoords = Utils.getTextureIndecies(size.w,
        size.h, this.numVertices, true);
    this.positionTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});
    this.forceTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});
    this.tempTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});

    var colors = new Float32Array(this.numVertices * 4);
    this.vertColors = new DataBuffer(4, this.numVertices, colors);
    this.vertColors.floatArray = colors;
    this.updateVertexColors();
  },

  updateVertexColors: function () {
    var colors = this.vertColors.floatArray;
    var index = 0;
    var white = [1, 1, 1, 1];
    this.graph.forEachNode(function (node) {
      var color = node._data.color || white;
      this.setColor(colors, index, color);
      index += 4;
    }.bind(this));
    this.vertColors.setData(colors);
  },

  setNumEdges: function () {
    this.numEdges = this.graph.edgeCount;
  },

  deleteEdgeData: function () {
    if (this.edgeCoords) {
      gl.deleteBuffer(this.edgeCoords.glBuffer);
    }
    if (this.edgeColors) {
      gl.deleteBuffer(this.edgeColors.glBuffer);
    }
  },

  createEdgeData: function () {
    var edges = [];

    var verts = this.vertCoords.data;
    this.graph.forEachEdge(function (edge) {
      edges.push(verts[edge.fromId*2], verts[edge.fromId*2+1],
        verts[edge.toId*2], verts[edge.toId*2+1]);
    });
    this.edgeCoords = new DataBuffer(4, this.numEdges, new Float32Array(edges));
    var colors = new Float32Array(this.numEdges * 4 * 2);
    this.edgeColors = new DataBuffer(4, this.numEdges * 2, colors);
    this.edgeColors.floatArray = colors;
    this.updateEdgeColors();
  },

  updateEdgeColors: function () {
    var colors = this.edgeColors.floatArray;
    var index = 0;
    var blue = [0, 0, 1, .6];
    var red = [1, 0, 0, .6];
    this.graph.forEachEdge(function (edge) {
      this.setColor(colors, index, edge._data.fromColor);
      index += 4;
      this.setColor(colors, index, edge._data.toColor);
      index += 4;
    }.bind(this));
    this.edgeColors.setData(colors);
  },

  setColor: function (arr, i, c) {
      arr[i]   = c[0];
      arr[i+1] = c[1];
      arr[i+2] = c[2];
      arr[i+3] = c[3];
  },

  reload: function () {
    this.setNumVertices();
    this.deleteVertexData();
    this.createVertexData();

    this.setNumEdges();
    this.deleteEdgeData();
    this.createEdgeData();

    this.init();
  },

  init: function () {
    if (this.nbodyProg) {
      gl.deleteProgram(this.nbodyProg.glProgram);
      // gl.deleteProgram(this.initialPosProg.glProgram);
      // gl.deleteProgram(this.edgeProg.glProgram);
      // gl.deleteProgram(this.drawEdgesProg.glProgram);
      // gl.deleteProgram(this.drawVerticesProg.glProgram);
      this.initNbody(Shaders[2], Shaders[3]);

      this.initialPosProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.initialPosProg.setAttribute('coords', this.vertCoords);

      this.edgeProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.edgeProg.setRenderTarget(this.forceTarget);

      this.drawVerticesProg.setAttribute('coords', this.vertCoords);
      this.drawVerticesProg.setAttribute('color', this.vertColors);

      this.edgeProg.setAttribute('coords', this.edgeCoords);
      this.drawEdgesProg.setAttribute('coords', this.edgeCoords);
      this.drawEdgesProg.setAttribute('color', this.edgeColors);

      return;
    }
    var sid = 0;
    this.initInitialPos(Shaders[sid++], Shaders[sid++]);
    this.initNbody(Shaders[sid++], Shaders[sid++]);
    this.initEdges(Shaders[sid++], Shaders[sid++]);
    this.initDrawVertices(Shaders[sid++], Shaders[sid++]);
    this.initDrawEdges(Shaders[sid++], Shaders[sid++]);
  },

  initInitialPos: function (vert, frag) {
    this.initialPosProg = new Program(vert, frag, {drawMode: gl.POINTS});
    this.initialPosProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
    this.initialPosProg.addUniform('time', 'f', 0);
    this.initialPosProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
  },

  initNbody: function (vert, frag) {
    var ymax = Math.ceil(this.numVertices / this.itemTS.w) / this.itemTS.h;
    vert = vert.replace(/\#\{xsize\}/, this.downsample / this.itemTS.w);
    vert = vert.replace(/\#\{ysize\}/, this.downsample / this.itemTS.h);
    vert = vert.replace(/\#\{ymax\}/, ymax.toPrecision(15));
    vert = vert.replace(/\#\{xiter\}/, 0.5 / this.itemTS.w);
    vert = vert.replace(/\#\{yiter\}/, 0.5 / this.itemTS.h);
    // console.log(vert)
    this.nbodyProg = new Program(vert, frag, {
      drawMode: gl.POINTS
    });

    this.nbodyProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
    this.nbodyProg.addUniform('positionTexture', 't');
    this.nbodyProg.addUniform('forceTexture', 't',
        this.forceTarget.getGlTexture());

    this.nbodyProg.addUniform('xstart', 'f', 0);
    this.nbodyProg.addUniform('ystart', 'f', 0);
    this.nbodyProg.addUniform('dt', 'f');
    this.nbodyProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
  },

  initEdges: function (vert, frag) {
    this.edgeProg = new Program(vert, frag, {
      drawMode: gl.POINTS,
      blendEnabled: true,
      depthTest: false
    });

    this.edgeProg.addAttribute('coords', 4, gl.FLOAT, this.edgeCoords);
    this.edgeProg.addUniform('positionTexture', 't');
    this.edgeProg.addUniform('dt', 'f');
    this.edgeProg.addUniform('forceDir', 'f');
    this.edgeProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
    this.edgeProg.setRenderTarget(this.forceTarget);
  },

  initDrawVertices: function (vert, frag) {
    var size = this.itemTS;
    this.drawVerticesProg = new Program(vert, frag, {
        drawMode: gl.POINTS,
        blendEnabled: true,
        depthTest: false
      });
    // var vertTex = new Texture(64, 64, {image: '../lib/sphere.png'});
    // this.drawVerticesProg.addUniform('vertTex', 't', vertTex.glTexture);
    this.drawVerticesProg.addUniform('positionTexture', 't');
    this.drawVerticesProg.addUniform('matrix', 'm4');
    this.drawVerticesProg.addUniform('pointSize', 'f', this.pointSize);
    this.drawVerticesProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
    this.drawVerticesProg.addAttribute('color', 4, gl.FLOAT, this.vertColors);
  },

  initDrawEdges: function (vert, frag) {
    var size = this.itemTS;
    this.drawEdgesProg = new Program(vert, frag, {
        drawMode: gl.LINES,
        blendEnabled: true,
        depthTest: false,
        clear: false
      });
    this.drawEdgesProg.addUniform('positionTexture', 't');
    this.drawEdgesProg.addUniform('matrix', 'm4');
    this.drawEdgesProg.addAttribute('coords', 2, gl.FLOAT, this.edgeCoords);
    this.drawEdgesProg.addAttribute('color', 4, gl.FLOAT, this.edgeColors);
  },

  step: function (camera) {
    if (this.params.edgeForces) {
      this.runEdges();
    }

    if (this.params.vertexForces) {
      this.runNbody();
    }

    if (this.params.renderVertices) {
      this.drawVertices(camera.matrix());
    }

    if (this.params.renderEdges) {
      this.drawEdges(camera.matrix());
    }
  },

  runInitialPos: function (time) {
    this.initialPosProg.setUniform('time', time);
    this.initialPosProg.setRenderTarget(this.tempTarget);
    this.initialPosProg.draw(0, this.numVertices);
    this.swapTargets();
  },

  runNbody: function () {
    this.nbodyProg.setUniform('positionTexture',
        this.positionTarget.getGlTexture());
    this.nbodyProg.setUniform('dt', this.params.dtVertices * this.downsample);
    this.nbodyProg.setUniform('xstart', this.downsampleIdx / this.itemTS.w);
    this.nbodyProg.setUniform('ystart', this.downsampleIdx / this.itemTS.h);
    this.nbodyProg.setRenderTarget(this.tempTarget);

    this.nbodyProg.draw(0, this.numVertices);
    this.swapTargets();
    this.downsampleIdx = (this.downsampleIdx + 1) % this.downsample;
  },

  runEdges: function () {
    this.edgeProg.setUniform('positionTexture',
        this.positionTarget.getGlTexture());
    this.edgeProg.setUniform('forceDir', 0);
    this.edgeProg.setUniform('dt', this.params.dtEdges);

    this.edgeProg.clear = gl.COLOR_BUFFER_BIT;
    this.edgeProg.draw(0, this.numEdges);

    this.edgeProg.setUniform('forceDir', 1);

    this.edgeProg.clear = false;
    this.edgeProg.draw(0, this.numEdges);
  },

  drawVertices: function (matrix) {
    this.drawVerticesProg.setUniform('positionTexture',
        this.positionTarget.getGlTexture());
    this.drawVerticesProg.setUniform('matrix', matrix);
    this.drawVerticesProg.setUniform('pointSize', this.params.pointSize);
    this.drawVerticesProg.draw(0, this.numVertices);
  },

  drawEdges: function (matrix) {
    this.drawEdgesProg.setUniform('positionTexture',
        this.positionTarget.getGlTexture());
    this.drawEdgesProg.setUniform('matrix', matrix);
    this.drawEdgesProg.draw(0, this.numEdges * 2);
  },

  swapTargets: function () {
    var t = this.positionTarget;
    this.positionTarget = this.tempTarget;
    this.tempTarget = t;
  }
};

module.exports = Grapheen;
