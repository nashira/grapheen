
var Graph = require('./graph');
var esprima = require('esprima');
var escodegen = require('escodegen');
var fs = require('fs');

var Syntax = {
  AssignmentExpression: 'AssignmentExpression',
  ArrayExpression: 'ArrayExpression',
  BlockStatement: 'BlockStatement',
  BinaryExpression: 'BinaryExpression',
  BreakStatement: 'BreakStatement',
  CallExpression: 'CallExpression',
  CatchClause: 'CatchClause',
  ConditionalExpression: 'ConditionalExpression',
  ContinueStatement: 'ContinueStatement',
  DoWhileStatement: 'DoWhileStatement',
  DebuggerStatement: 'DebuggerStatement',
  EmptyStatement: 'EmptyStatement',
  ExpressionStatement: 'ExpressionStatement',
  ForStatement: 'ForStatement',
  ForInStatement: 'ForInStatement',
  FunctionDeclaration: 'FunctionDeclaration',
  FunctionExpression: 'FunctionExpression',
  Identifier: 'Identifier',
  IfStatement: 'IfStatement',
  Literal: 'Literal',
  LabeledStatement: 'LabeledStatement',
  LogicalExpression: 'LogicalExpression',
  MemberExpression: 'MemberExpression',
  NewExpression: 'NewExpression',
  ObjectExpression: 'ObjectExpression',
  Program: 'Program',
  Property: 'Property',
  ReturnStatement: 'ReturnStatement',
  SequenceExpression: 'SequenceExpression',
  SwitchStatement: 'SwitchStatement',
  SwitchCase: 'SwitchCase',
  ThisExpression: 'ThisExpression',
  ThrowStatement: 'ThrowStatement',
  TryStatement: 'TryStatement',
  UnaryExpression: 'UnaryExpression',
  UpdateExpression: 'UpdateExpression',
  VariableDeclaration: 'VariableDeclaration',
  VariableDeclarator: 'VariableDeclarator',
  WhileStatement: 'WhileStatement',
  WithStatement: 'WithStatement'
};


var Parser = function () {
  this.anonymousId = 0;
  this.returnId = 0;
}

Parser.traverse = function (object, visitor, parent) {
  var key, child;

  if (visitor.enter.call(null, object, parent) === false) {
    return;
  }

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      child = object[key];
      if (typeof child === 'object' && child !== null) {
        Parser.traverse(child, visitor, object);
      }
    }
  }

  if (visitor.exit.call(null, object, parent) === false) {
    return;
  }
}

Parser.prototype.parse = function (source) {
  this.tree = esprima.parse(source);
  return this.tree;
}

Parser.prototype.parseFile = function (file) {
  this.tree = esprima.parse(fs.readFileSync(file));
  return this.tree;
}

Parser.prototype.getGraph = function () {
  var vertexId = 0;
  var stack = [];
  var graph = new Graph();
  Parser.traverse(this.tree, {
    enter: function (obj) {
      if (obj.type in Syntax) {
        var id = vertexId++;
        graph.addNode(id, obj);
        if (stack.length) {
          graph.addEdge(stack[stack.length - 1], id, {});
        }
        stack.push(id);
      }
    },
    exit: function (obj) {
      if (obj.type in Syntax) {
        stack.pop();
        // colorStack.pop();
      }
    }
  });

  return graph;
}

Parser.prototype.instrument = function (enterCall, exitCall) {
  this.traceFunctions(enterCall, exitCall);
  return escodegen.generate(this.tree, {format: {indent: {style: '  '}}});
}

Parser.prototype.getEnterCall = function (enterName, funName) {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: enterName
      },
      arguments: [
        {
          type: "Literal",
          value: funName,
          raw: "'" + funName + "'"
        }
      ]
    }
  }
}

Parser.prototype.getExitCall = function (exitName, funName) {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "Identifier",
        name: exitName
      },
      arguments: [
        {
          type: "Literal",
          value: funName,
          raw: "'" + funName + "'"
        }
      ]
    }
  }
}

Parser.prototype.wrapInBlock = function (body) {
  return {
    type: "BlockStatement",
    body: body
  }
}

Parser.prototype.splitReturn = function (ret) {
  var retVarName = '___ret' + this.returnId++;
  return [
    {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: {
            type: "Identifier",
            name: retVarName
          },
          init: ret.argument
        }
      ],
      kind: "var"
    },
    {
      type: "ReturnStatement",
      argument: {
        type: "Identifier",
        name: retVarName
      }
    }
  ]
}

Parser.prototype.replaceNode = function (parent, node, newNode) {
  if (parent.type == Syntax.IfStatement) {
    parent.consequent = newNode;
  } else if (parent instanceof Array) {
    for (var i = 0; i < parent.length; i++) {
      if (parent[i] === node) {
        parent[i] = newNode;
        break;
      }
    }
  } else {
    console.log('unknown parent:', parent);
  }
}

Parser.prototype.getFullMemberName = function (node) {
  var n = '';
  if (node.object) {
    if (node.object.type == Syntax.MemberExpression) {
      n += this.getFullMemberName(node.object);
    } else {
      n += node.object.name;
    }
  }
  return n + '.' + node.property.name;
}

Parser.prototype.getFunctionName = function (node, parent) {
  var func = null;
  if (node.type === Syntax.FunctionDeclaration) {
    func = node.id.name;
  } else if (node.type === Syntax.FunctionExpression) {
    if (parent.type === Syntax.AssignmentExpression) {
      if (parent.left.type == Syntax.MemberExpression) {
        func = this.getFullMemberName(parent.left);
      } else {
        func = parent.left.name;
      }
    } else if (parent.type === Syntax.VariableDeclarator) {
      func = parent.id.name;
    } else if (parent.type === Syntax.CallExpression) {
      func = parent.id ? parent.id.name : '[Anonymous]' + this.anonymousId++;
    } else if (typeof parent.length === 'number') {
      func = parent.id ? parent.id.name : '[Anonymous]' + this.anonymousId++;
    } else if (typeof parent.key !== 'undefined') {
      if (parent.key.type === 'Identifier') {
        if (parent.value === node && parent.key.name) {
          func = parent.key.name;
        }
      }
    }
  }

  return func;
}

Parser.prototype.traceFunctions = function(enterCall, exitCall) {
  var funcStack = [];
  var self = this;
  var vertexId = 0;
  Parser.traverse(this.tree, {
    enter: function (node, parent) {
      if (node.type in Syntax) {
        var id = vertexId++;
      }
      var func = self.getFunctionName(node, parent || []);
      if (func) {
        // console.log(node._id)
        funcStack.push(id);
        // funcStack.push(func);
        node.body.body.unshift(self.getEnterCall(enterCall, id));
      } else if (node.type == Syntax.ReturnStatement) {
        var body;

        if (node.argument && node.argument.type != Syntax.Identifier) {
           body = self.splitReturn(node);
        } else {
          body = [node];
        }

        var exitCallNode = self.getExitCall(exitCall, funcStack[funcStack.length-1]);
        body.splice(body.length-1, 0, exitCallNode);
        var newNode = self.wrapInBlock(body);
        self.replaceNode(parent, node, newNode);
      }
    },

    exit: function (node, parent) {
      if (node.type == Syntax.FunctionDeclaration || node.type == Syntax.FunctionExpression) {
        var func = funcStack.pop();
        var body = node.body.body;
        var last = body[body.length - 1];
        while (last && last.type == Syntax.BlockStatement) {
          last = last.body[last.body.length - 1];
        }
        if (!last || last.type != Syntax.ReturnStatement) {
          body.push(self.getExitCall(exitCall, func));
        }
      }
    }
  });
}



module.exports = Parser;
