/*
Copyright (c) 2014 Nash Lincoln (github.com/nashira)

The MIT License (MIT)
Copyright (c) 2013 Cheng Lou (github.com/chenglou)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var Graph = function Graph() {
  this._nodes = {};
  this.nodeCount = 0;
  this.edgeCount = 0;
}

Graph.prototype.addNode = function(id, data) {
  if (!this._nodes[id]) {
    this.nodeCount++;
    return this._nodes[id] = {
      _id: id,
      _outEdges: {},
      _inEdges: {},
      _data: data
    };
  }
};

Graph.prototype.getNode = function(id) {
  return this._nodes[id];
};

Graph.prototype.removeNode = function(id) {

  var inEdgeId, nodeToRemove, outEdgeId, _ref, _ref1;
  nodeToRemove = this._nodes[id];
  if (!nodeToRemove) {
    return null;
  }

  _ref = nodeToRemove._outEdges;
  for (outEdgeId in _ref) {
    this.removeEdge(id, outEdgeId);
  }
  _ref1 = nodeToRemove._inEdges;
  for (inEdgeId in _ref1) {
    this.removeEdge(inEdgeId, id);
  }
  this.nodeCount--;
  delete this._nodes[id];
  return nodeToRemove;
};

Graph.prototype.addEdge = function(fromId, toId, data) {
  var edgeToAdd, fromNode, toNode;

  fromNode = this._nodes[fromId];
  toNode = this._nodes[toId];
  if (!fromNode || !toNode) {
    return;
  }

  edgeToAdd = {
    fromId: fromId,
    toId: toId,
    _data: data
  };

  fromNode._outEdges[toId] = edgeToAdd;
  toNode._inEdges[fromId] = edgeToAdd;
  this.edgeCount++;
  return edgeToAdd;
};

Graph.prototype.getEdge = function(fromId, toId) {

  var fromNode = this._nodes[fromId];

  if (!fromNode) {
    return null;
  }

  return fromNode._outEdges[toId] || null;
};

Graph.prototype.removeEdge = function(fromId, toId) {

  var edgeToDelete, fromNode, toNode;
  fromNode = this._nodes[fromId];
  toNode = this._nodes[toId];
  edgeToDelete = fromNode._outEdges[toId];
  if (!edgeToDelete) {
    return null;
  }
  delete fromNode._outEdges[toId];
  delete toNode._inEdges[fromId];
  this.edgeCount--;
  return edgeToDelete;
};

Graph.prototype.getInEdges = function(nodeId) {
  return nodeId in this._nodes ? this._nodes[nodeId]._inEdges : null;
};

Graph.prototype.getOutEdges = function(nodeId) {
  return nodeId in this._nodes ? this._nodes[nodeId]._outEdges : null;
};


Graph.prototype.forEachNode = function(operation) {

  var nodeId, nodeObject, _ref;
  _ref = this._nodes;
  for (nodeId in _ref) {
    nodeObject = _ref[nodeId];
    operation(nodeObject);
  }
};

Graph.prototype.forEachEdge = function(operation) {

  var edgeObject, nodeId, nodeObject, toId, _ref, _ref1;
  _ref = this._nodes;
  for (nodeId in _ref) {
    nodeObject = _ref[nodeId];
    _ref1 = nodeObject._outEdges;

    for (toId in _ref1) {
      edgeObject = _ref1[toId];
      operation(edgeObject);
    }
  }
};

module.exports = Graph;
