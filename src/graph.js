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
  this.nodes = {};
  this.nodeCount = 0;
  this.edgeCount = 0;
}

Graph.prototype.addNode = function(id, data) {
  if (!this.nodes[id]) {
    this.nodeCount++;
    return this.nodes[id] = {
      id: id,
      outEdges: {},
      inEdges: {},
      data: data
    };
  }
};

Graph.prototype.getNode = function(id) {
  return this.nodes[id];
};

Graph.prototype.removeNode = function(id) {

  var inEdgeId, nodeToRemove, outEdgeId;
  nodeToRemove = this.nodes[id];
  if (!nodeToRemove) {
    return null;
  }

  var outEdges = nodeToRemove.outEdges;
  for (outEdgeId in outEdges) {
    this.removeEdge(id, outEdgeId);
  }
  var inEdges = nodeToRemove.inEdges;
  for (inEdgeId in inEdges) {
    this.removeEdge(inEdgeId, id);
  }
  this.nodeCount--;
  delete this.nodes[id];
  return nodeToRemove;
};

Graph.prototype.addEdge = function(fromId, toId, data) {
  var edgeToAdd, fromNode, toNode;

  fromNode = this.nodes[fromId];
  toNode = this.nodes[toId];
  if (!fromNode || !toNode) {
    return;
  }

  edgeToAdd = {
    fromNode: fromNode,
    toNode: toNode,
    fromId: fromId,
    toId: toId,
    data: data
  };

  fromNode.outEdges[toId] = edgeToAdd;
  toNode.inEdges[fromId] = edgeToAdd;
  this.edgeCount++;
  return edgeToAdd;
};

Graph.prototype.getEdge = function(fromId, toId) {

  var fromNode = this.nodes[fromId];

  if (!fromNode) {
    return null;
  }

  return fromNode.outEdges[toId] || null;
};

Graph.prototype.removeEdge = function(fromId, toId) {

  var edgeToDelete, fromNode, toNode;
  fromNode = this.nodes[fromId];
  toNode = this.nodes[toId];
  edgeToDelete = fromNode.outEdges[toId];
  if (!edgeToDelete) {
    return null;
  }
  delete(fromNode.outEdges[toId]);
  delete(toNode.inEdges[fromId]);
  this.edgeCount--;
  return edgeToDelete;
};

Graph.prototype.getInEdges = function(nodeId) {
  return nodeId in this.nodes ? this.nodes[nodeId].inEdges : null;
};

Graph.prototype.getOutEdges = function(nodeId) {
  return nodeId in this.nodes ? this.nodes[nodeId].outEdges : null;
};


Graph.prototype.forEachNode = function(operation) {
  var nodeId, nodeObject;
  var nodes = this.nodes;
  for (nodeId in nodes) {
    nodeObject = ref[nodeId];
    operation(nodeObject);
  }
};

Graph.prototype.forEachEdge = function(operation) {
  var edgeObject, nodeId, nodeObject, toId;
  var nodes = this.nodes;
  for (nodeId in nodes) {
    nodeObject = nodes[nodeId];
    var outEdges = nodeObject.outEdges;

    for (toId in outEdges) {
      edgeObject = outEdges[toId];
      operation(edgeObject);
    }
  }
};

module.exports = Graph;
