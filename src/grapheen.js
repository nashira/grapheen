
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
  this.downsampleK = 1.6;
  this.graph = graph;
  this.vDt = 0.01;
  this.eDt = 0.01;
  this.pointSize = 6;
  this.numVertices = 0;
  this.numEdges = 0;
}

Grapheen.init = function (_gl) {
  gl = _gl;
  Shaders = [
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/initial_posv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/initial_posf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/nbodyv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/nbodyf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/edge_forcev.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/edge_forcef.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/draw_verticesv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/draw_verticesf.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/draw_edgesv.glsl', 'utf8')),
    Utils.processShader(fs.readFileSync(__dirname +'/Shaders/draw_edgesf.glsl', 'utf8'))
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

    var colors = [];
    this.graph.forEachNode(function (node) {
      if (node.color) {
        colors.push(node.color[0], node.color[1], node.color[2]);
      } else {
        colors.push(1, 1, 1);
      }
    });
    this.vertColors = new DataBuffer(4, this.numVertices, new Float32Array(colors));
  },

  setNumEdges: function () {
    this.numEdges = this.graph.edgeCount;
  },

  deleteEdgeData: function () {
    if (this.edgeCoords) {
      gl.deleteBuffer(this.edgeCoords.glBuffer);
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
  },

  reload: function () {
    this.setNumVertices();
    this.setNumEdges();
    this.deleteVertexData()
    this.createVertexData();
    this.deleteEdgeData();
    this.createEdgeData();
    this.init();
  },

  init: function () {
    if (this.nbodyProg) {
      gl.deleteProgram(this.nbodyProg.glProgram);
      this.initNbody(Shaders[2], Shaders[3]);

      this.initialPosProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.initialPosProg.setAttribute('coords', this.vertCoords);

      this.edgeProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.edgeProg.setRenderTarget(this.forceTarget);

      this.drawVerticesProg.setAttribute('coords', this.vertCoords);
      this.drawVerticesProg.setAttribute('color', this.vertColors);

      this.edgeProg.setAttribute('coords', this.edgeCoords);
      this.drawEdgesProg.setAttribute('coords', this.edgeCoords);

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
    this.edgeProg.addUniform('dt', 'f', this.eDt);
    this.edgeProg.addUniform('forceDir', 'f', 0);
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
    this.drawVerticesProg.addAttribute('color', 3, gl.FLOAT, this.vertColors);
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
    // this.drawEdgesProg.addAttribute('color', 4, gl.FLOAT, this.vertColors);
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
    this.nbodyProg.setUniform('dt', this.vDt * this.downsample);
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
    this.edgeProg.setUniform('dt', this.eDt);

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
    this.drawVerticesProg.setUniform('pointSize', this.pointSize);
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
