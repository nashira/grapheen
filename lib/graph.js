
var DataBuffer = require('gpgpu').DataBuffer;
var Program = require('gpgpu').Program;
var RenderTarget = require('gpgpu').RenderTarget;
var Texture = require('gpgpu').Texture;
var Utils = require('gpgpu').Utils;
var fs = require('fs');
var path = require('path');

var gl;

var Graph = function () {

  this.vDt = 0.01;
  this.eDt = 0.01;
  this.pointSize = 6;
}

Graph.init = function (_gl) {
  gl = _gl;
}

Graph.prototype = {
  load: function (data, downsample, onLoad) {
    if (this.positionTarget) {
      gl.deleteFramebuffer(this.positionTarget.framebuffer)
      gl.deleteTexture(this.positionTarget.getGlTexture())
      gl.deleteFramebuffer(this.forceTarget.framebuffer)
      gl.deleteTexture(this.forceTarget.getGlTexture())
      gl.deleteFramebuffer(this.tempTarget.framebuffer)
      gl.deleteTexture(this.tempTarget.getGlTexture())
      gl.deleteBuffer(this.edgeCoords.glBuffer);
      gl.deleteBuffer(this.vertCoords.glBuffer);
      gl.deleteBuffer(this.vertColors.glBuffer);
    }

    this.numVertices = data.numVertices;
    this.numEdges = data.numEdges;
    this.downsample =
        Math.floor(this.numVertices * ((downsample || 0) * 0.00015)) + 1;
    this.downsampleIdx = 0;
    this.itemTS = Utils.getPotSize(this.numVertices);
    this.vertCoords = Utils.getTextureIndecies(
        this.itemTS.w,
        this.itemTS.h,
        this.numVertices,
        true);

    this.vertices = {};
    this.edges = [];

    var verts = this.vertCoords.data;
    for (var i = 0; i < data.edges.length; i+=2) {
    // for (var i = 0; i < data.numEdges; i++) {
      // var a = Math.floor(Math.random() * this.numVertices);
      // var b = Math.floor(Math.random() * this.numVertices);
      var a = data.edges[i];
      var b = data.edges[i+1];
      this.edges.push(verts[a*2], verts[a*2+1], verts[b*2], verts[b*2+1]);
    }
    var colors;
    if (data.vertexColors) {
      colors = data.vertexColors;
    } else {
      colors = [];
      for (i = 0; i < this.numVertices * 3; i++) {
        colors.push(Math.random());
      }
    }

    this.edgeCoords = new DataBuffer(4, this.numEdges, new Float32Array(this.edges));
    this.vertColors = new DataBuffer(4, this.numVertices, new Float32Array(colors));
    var size = this.itemTS;
    this.positionTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});
    this.forceTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});
    this.tempTarget = new RenderTarget(size.w, size.h, {type: gl.FLOAT});

    this.init(onLoad);
  },

  init: function (onLoad) {
    if (this.shaders) {
      gl.deleteProgram(this.nbodyProg.glProgram);
      this.initNbody(this.shaders[2], this.shaders[3]);
      this.initialPosProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.edgeProg.setAttribute('coords', this.edgeCoords);
      this.edgeProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
      this.edgeProg.setRenderTarget(this.forceTarget);
      this.drawVerticesProg.setAttribute('coords', this.vertCoords);
      this.drawVerticesProg.setAttribute('color', this.vertColors);
      this.drawEdgesProg.setAttribute('coords', this.edgeCoords);
      this.initialPosProg.setAttribute('coords', this.vertCoords);
      onLoad();
      return;
    }

    var shaders = this.shaders = [];
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/initial_posv.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/initial_posf.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/nbodyv.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/nbodyf.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/edge_forcev.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/edge_forcef.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/draw_verticesv.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/draw_verticesf.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/draw_edgesv.glsl', 'utf8')));
    shaders.push(Utils.processShader(fs.readFileSync(__dirname +'/draw_edgesf.glsl', 'utf8')));
    var sid = 0;
    this.initInitialPos(shaders[sid++], shaders[sid++]);
    this.initNbody(shaders[sid++], shaders[sid++]);
    this.initEdges(shaders[sid++], shaders[sid++]);
    this.initDrawVertices(shaders[sid++], shaders[sid++]);
    this.initDrawEdges(shaders[sid++], shaders[sid++]);

    if (onLoad) {
      onLoad();
    }
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

module.exports = Graph;
