require = function e(t, n, r) {
  window.ins_enter(5);
  function s(o, u) {
    window.ins_enter(15);
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a) {
          var ___ret0 = a(o, !0);
          window.ins_exit(15);
          return ___ret0;
        }
        if (i) {
          var ___ret1 = i(o, !0);
          window.ins_exit(15);
          return ___ret1;
        }
        throw new Error('Cannot find module \'' + o + '\'');
      }
      var f = n[o] = { exports: {} };
      t[o][0].call(f.exports, function (e) {
        window.ins_enter(95);
        var n = t[o][1][e];
        {
          var ___ret2 = s(n ? n : e);
          window.ins_exit(95);
          return ___ret2;
        }
      }, f, f.exports, e, t, n, r);
    }
    {
      var ___ret3 = n[o].exports;
      window.ins_exit(15);
      return ___ret3;
    }
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++)
    s(r[o]);
  {
    window.ins_exit(5);
    return s;
  }
}({
  1: [
    function (require, module, exports) {
      window.ins_enter(166);
      window.ins_exit(166);
    },
    {}
  ],
  2: [
    function (require, module, exports) {
      window.ins_enter(179);
      (function (process) {
        function normalizeArray(parts, allowAboveRoot) {
          window.ins_enter(194);
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === '.') {
              parts.splice(i, 1);
            } else if (last === '..') {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up--; up) {
              parts.unshift('..');
            }
          }
          {
            window.ins_exit(194);
            return parts;
          }
        }
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        var splitPath = function (filename) {
          window.ins_enter(291);
          {
            var ___ret4 = splitPathRe.exec(filename).slice(1);
            window.ins_exit(291);
            return ___ret4;
          }
        };
        exports.resolve = function () {
          window.ins_enter(313);
          var resolvedPath = '', resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = i >= 0 ? arguments[i] : process.cwd();
            if (typeof path !== 'string') {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              continue;
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
          }
          resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
            window.ins_enter(406);
            {
              var ___ret5 = !!p;
              window.ins_exit(406);
              return ___ret5;
            }
          }), !resolvedAbsolute).join('/');
          {
            var ___ret6 = (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
            window.ins_exit(313);
            return ___ret6;
          }
        };
        exports.normalize = function (path) {
          window.ins_enter(435);
          var isAbsolute = exports.isAbsolute(path), trailingSlash = substr(path, -1) === '/';
          path = normalizeArray(filter(path.split('/'), function (p) {
            window.ins_enter(473);
            {
              var ___ret7 = !!p;
              window.ins_exit(473);
              return ___ret7;
            }
          }), !isAbsolute).join('/');
          if (!path && !isAbsolute) {
            path = '.';
          }
          if (path && trailingSlash) {
            path += '/';
          }
          {
            var ___ret8 = (isAbsolute ? '/' : '') + path;
            window.ins_exit(435);
            return ___ret8;
          }
        };
        exports.isAbsolute = function (path) {
          window.ins_enter(520);
          {
            var ___ret9 = path.charAt(0) === '/';
            window.ins_exit(520);
            return ___ret9;
          }
        };
        exports.join = function () {
          window.ins_enter(540);
          var paths = Array.prototype.slice.call(arguments, 0);
          {
            var ___ret10 = exports.normalize(filter(paths, function (p, index) {
                window.ins_enter(569);
                if (typeof p !== 'string') {
                  throw new TypeError('Arguments to path.join must be strings');
                }
                {
                  window.ins_exit(569);
                  return p;
                }
              }).join('/'));
            window.ins_exit(540);
            return ___ret10;
          }
        };
        exports.relative = function (from, to) {
          window.ins_enter(596);
          from = exports.resolve(from).substr(1);
          to = exports.resolve(to).substr(1);
          function trim(arr) {
            window.ins_enter(628);
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '')
                break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '')
                break;
            }
            if (start > end) {
              var ___ret11 = [];
              window.ins_exit(628);
              return ___ret11;
            }
            {
              var ___ret12 = arr.slice(start, end - start + 1);
              window.ins_exit(628);
              return ___ret12;
            }
          }
          var fromParts = trim(from.split('/'));
          var toParts = trim(to.split('/'));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push('..');
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          {
            var ___ret13 = outputParts.join('/');
            window.ins_exit(596);
            return ___ret13;
          }
        };
        exports.sep = '/';
        exports.delimiter = ':';
        exports.dirname = function (path) {
          window.ins_enter(815);
          var result = splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            {
              var ___ret14 = '.';
              window.ins_exit(815);
              return ___ret14;
            }
          }
          if (dir) {
            dir = dir.substr(0, dir.length - 1);
          }
          {
            var ___ret15 = root + dir;
            window.ins_exit(815);
            return ___ret15;
          }
        };
        exports.basename = function (path, ext) {
          window.ins_enter(872);
          var f = splitPath(path)[2];
          if (ext && f.substr(-1 * ext.length) === ext) {
            f = f.substr(0, f.length - ext.length);
          }
          {
            window.ins_exit(872);
            return f;
          }
        };
        exports.extname = function (path) {
          window.ins_enter(926);
          {
            var ___ret16 = splitPath(path)[3];
            window.ins_exit(926);
            return ___ret16;
          }
        };
        function filter(xs, f) {
          window.ins_enter(939);
          if (xs.filter) {
            var ___ret17 = xs.filter(f);
            window.ins_exit(939);
            return ___ret17;
          }
          var res = [];
          for (var i = 0; i < xs.length; i++) {
            if (f(xs[i], i, xs))
              res.push(xs[i]);
          }
          {
            window.ins_exit(939);
            return res;
          }
        }
        var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
            {
              var ___ret18 = str.substr(start, len);
              window.ins_exit(179);
              return ___ret18;
            }
          } : function (str, start, len) {
            if (start < 0)
              start = str.length + start;
            {
              var ___ret19 = str.substr(start, len);
              window.ins_exit(undefined);
              return ___ret19;
            }
          };
        window.ins_exit(undefined);
      }.call(this, require('cfTRzy')));
      window.ins_exit(undefined);
    },
    { 'cfTRzy': 3 }
  ],
  3: [
    function (require, module, exports) {
      window.ins_enter(1053);
      var process = module.exports = {};
      process.nextTick = function () {
        window.ins_enter(1076);
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
        if (canSetImmediate) {
          {
            var ___ret20 = function (f) {
              {
                var ___ret21 = window.setImmediate(f);
                window.ins_exit(1076);
                return ___ret21;
              }
            };
            window.ins_exit(1076);
            return ___ret20;
          }
        }
        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            window.ins_enter(1134);
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
            window.ins_exit(1134);
          }, true);
          {
            var ___ret22 = function nextTick(fn) {
              queue.push(fn);
              window.postMessage('process-tick', '*');
              window.ins_exit(1053);
            };
            window.ins_exit(1053);
            return ___ret22;
          }
        }
        {
          var ___ret23 = function nextTick(fn) {
            setTimeout(fn, 0);
            window.ins_exit(undefined);
          };
          window.ins_exit(undefined);
          return ___ret23;
        }
      }();
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      function noop() {
        window.ins_enter(1237);
        window.ins_exit(1237);
      }
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.binding = function (name) {
        window.ins_enter(1291);
        throw new Error('process.binding is not supported');
        window.ins_exit(1291);
      };
      process.cwd = function () {
        window.ins_enter(1307);
        {
          var ___ret24 = '/';
          window.ins_exit(1307);
          return ___ret24;
        }
      };
      process.chdir = function (dir) {
        window.ins_enter(1320);
        throw new Error('process.chdir is not supported');
        window.ins_exit(1320);
      };
      window.ins_exit(undefined);
    },
    {}
  ],
  4: [
    function (require, module, exports) {
      window.ins_enter(1335);
      var dat = dat || {};
      dat.gui = dat.gui || {};
      dat.utils = dat.utils || {};
      dat.controllers = dat.controllers || {};
      dat.dom = dat.dom || {};
      dat.color = dat.color || {};
      dat.utils.css = function () {
        window.ins_enter(1408);
        {
          var ___ret25 = {
              load: function (e, a) {
                window.ins_enter(1418);
                a = a || document;
                var b = a.createElement('link');
                b.type = 'text/css';
                b.rel = 'stylesheet';
                b.href = e;
                a.getElementsByTagName('head')[0].appendChild(b);
                window.ins_exit(1418);
              },
              inject: function (e, a) {
                window.ins_enter(1472);
                a = a || document;
                var b = document.createElement('style');
                b.type = 'text/css';
                b.innerHTML = e;
                a.getElementsByTagName('head')[0].appendChild(b);
                window.ins_exit(1472);
              }
            };
          window.ins_exit(1408);
          return ___ret25;
        }
      }();
      dat.utils.common = function () {
        window.ins_enter(1526);
        var e = Array.prototype.forEach, a = Array.prototype.slice;
        {
          var ___ret26 = {
              BREAK: {},
              extend: function (b) {
                window.ins_enter(1554);
                this.each(a.call(arguments, 1), function (a) {
                  window.ins_enter(1572);
                  for (var f in a)
                    this.isUndefined(a[f]) || (b[f] = a[f]);
                  window.ins_exit(1572);
                }, this);
                {
                  window.ins_exit(1554);
                  return b;
                }
              },
              defaults: function (b) {
                window.ins_enter(1605);
                this.each(a.call(arguments, 1), function (a) {
                  window.ins_enter(1623);
                  for (var f in a)
                    this.isUndefined(b[f]) && (b[f] = a[f]);
                  window.ins_exit(1623);
                }, this);
                {
                  window.ins_exit(1605);
                  return b;
                }
              },
              compose: function () {
                window.ins_enter(1656);
                var b = a.call(arguments);
                {
                  var ___ret27 = function () {
                    for (var d = a.call(arguments), f = b.length - 1; 0 <= f; f--)
                      d = [b[f].apply(this, d)];
                    {
                      var ___ret28 = d[0];
                      window.ins_exit(1656);
                      return ___ret28;
                    }
                  };
                  window.ins_exit(1656);
                  return ___ret27;
                }
              },
              each: function (a, d, f) {
                window.ins_enter(1712);
                if (e && a.forEach === e)
                  a.forEach(d, f);
                else if (a.length === a.length + 0)
                  for (var c = 0, p = a.length; c < p && !(c in a && d.call(f, a[c], c) === this.BREAK); c++);
                else
                  for (c in a)
                    if (d.call(f, a[c], c) === this.BREAK)
                      break;
                window.ins_exit(1712);
              },
              defer: function (a) {
                window.ins_enter(1801);
                setTimeout(a, 0);
                window.ins_exit(1801);
              },
              toArray: function (b) {
                window.ins_enter(1815);
                {
                  var ___ret29 = b.toArray ? b.toArray() : a.call(b);
                  window.ins_exit(1815);
                  return ___ret29;
                }
              },
              isUndefined: function (a) {
                window.ins_enter(1838);
                {
                  var ___ret30 = void 0 === a;
                  window.ins_exit(1838);
                  return ___ret30;
                }
              },
              isNull: function (a) {
                window.ins_enter(1852);
                {
                  var ___ret31 = null === a;
                  window.ins_exit(1852);
                  return ___ret31;
                }
              },
              isNaN: function (a) {
                window.ins_enter(1865);
                {
                  var ___ret32 = a !== a;
                  window.ins_exit(1865);
                  return ___ret32;
                }
              },
              isArray: Array.isArray || function (a) {
                {
                  var ___ret33 = a.constructor === Array;
                  window.ins_exit(1335);
                  return ___ret33;
                }
              },
              isObject: function (a) {
                window.ins_enter(1893);
                {
                  var ___ret34 = a === Object(a);
                  window.ins_exit(1893);
                  return ___ret34;
                }
              },
              isNumber: function (a) {
                window.ins_enter(1908);
                {
                  var ___ret35 = a === a + 0;
                  window.ins_exit(1908);
                  return ___ret35;
                }
              },
              isString: function (a) {
                window.ins_enter(1923);
                {
                  var ___ret36 = a === a + '';
                  window.ins_exit(1923);
                  return ___ret36;
                }
              },
              isBoolean: function (a) {
                window.ins_enter(1938);
                {
                  var ___ret37 = !1 === a || !0 === a;
                  window.ins_exit(1938);
                  return ___ret37;
                }
              },
              isFunction: function (a) {
                window.ins_enter(1957);
                {
                  var ___ret38 = '[object Function]' === Object.prototype.toString.call(a);
                  window.ins_exit(1957);
                  return ___ret38;
                }
              }
            };
          window.ins_exit(1526);
          return ___ret26;
        }
      }();
      dat.controllers.Controller = function (e) {
        window.ins_enter(1984);
        var a = function (a, d) {
          window.ins_enter(1994);
          this.initialValue = a[d];
          this.domElement = document.createElement('div');
          this.object = a;
          this.property = d;
          this.__onFinishChange = this.__onChange = void 0;
          window.ins_exit(1994);
        };
        e.extend(a.prototype, {
          onChange: function (a) {
            window.ins_enter(2054);
            this.__onChange = a;
            {
              var ___ret39 = this;
              window.ins_exit(2054);
              return ___ret39;
            }
          },
          onFinishChange: function (a) {
            window.ins_enter(2071);
            this.__onFinishChange = a;
            {
              var ___ret40 = this;
              window.ins_exit(2071);
              return ___ret40;
            }
          },
          setValue: function (a) {
            window.ins_enter(2088);
            this.object[this.property] = a;
            this.__onChange && this.__onChange.call(this, a);
            this.updateDisplay();
            {
              var ___ret41 = this;
              window.ins_exit(2088);
              return ___ret41;
            }
          },
          getValue: function () {
            window.ins_enter(2127);
            {
              var ___ret42 = this.object[this.property];
              window.ins_exit(2127);
              return ___ret42;
            }
          },
          updateDisplay: function () {
            window.ins_enter(2143);
            {
              var ___ret43 = this;
              window.ins_exit(2143);
              return ___ret43;
            }
          },
          isModified: function () {
            window.ins_enter(2153);
            {
              var ___ret44 = this.initialValue !== this.getValue();
              window.ins_exit(2153);
              return ___ret44;
            }
          }
        });
        {
          window.ins_exit(1984);
          return a;
        }
      }(dat.utils.common);
      dat.dom.dom = function (e) {
        window.ins_enter(2183);
        function a(c) {
          window.ins_enter(2190);
          if ('0' === c || e.isUndefined(c)) {
            var ___ret45 = 0;
            window.ins_exit(2190);
            return ___ret45;
          }
          c = c.match(d);
          {
            var ___ret46 = e.isNull(c) ? 0 : parseFloat(c[1]);
            window.ins_exit(2190);
            return ___ret46;
          }
        }
        var b = {};
        e.each({
          HTMLEvents: ['change'],
          MouseEvents: [
            'click',
            'mousemove',
            'mousedown',
            'mouseup',
            'mouseover'
          ],
          KeyboardEvents: ['keydown']
        }, function (c, a) {
          window.ins_enter(2257);
          e.each(c, function (c) {
            window.ins_enter(2271);
            b[c] = a;
            window.ins_exit(2271);
          });
          window.ins_exit(2257);
        });
        var d = /(\d+(\.\d+)?)px/, f = {
            makeSelectable: function (c, a) {
              window.ins_enter(2293);
              void 0 !== c && void 0 !== c.style && (c.onselectstart = a ? function () {
                {
                  var ___ret47 = !1;
                  window.ins_exit(2293);
                  return ___ret47;
                }
              } : function () {
                window.ins_exit(2183);
              }, c.style.MozUserSelect = a ? 'auto' : 'none', c.style.KhtmlUserSelect = a ? 'auto' : 'none', c.unselectable = a ? 'on' : 'off');
              window.ins_exit(undefined);
            },
            makeFullscreen: function (c, a, d) {
              window.ins_enter(2358);
              e.isUndefined(a) && (a = !0);
              e.isUndefined(d) && (d = !0);
              c.style.position = 'absolute';
              a && (c.style.left = 0, c.style.right = 0);
              d && (c.style.top = 0, c.style.bottom = 0);
              window.ins_exit(2358);
            },
            fakeEvent: function (c, a, d, f) {
              window.ins_enter(2435);
              d = d || {};
              var q = b[a];
              if (!q)
                throw Error('Event type ' + a + ' not supported.');
              var n = document.createEvent(q);
              switch (q) {
              case 'MouseEvents':
                n.initMouseEvent(a, d.bubbles || !1, d.cancelable || !0, window, d.clickCount || 1, 0, 0, d.x || d.clientX || 0, d.y || d.clientY || 0, !1, !1, !1, !1, 0, null);
                break;
              case 'KeyboardEvents':
                q = n.initKeyboardEvent || n.initKeyEvent;
                e.defaults(d, {
                  cancelable: !0,
                  ctrlKey: !1,
                  altKey: !1,
                  shiftKey: !1,
                  metaKey: !1,
                  keyCode: void 0,
                  charCode: void 0
                });
                q(a, d.bubbles || !1, d.cancelable, window, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.keyCode, d.charCode);
                break;
              default:
                n.initEvent(a, d.bubbles || !1, d.cancelable || !0);
              }
              e.defaults(n, f);
              c.dispatchEvent(n);
              window.ins_exit(2435);
            },
            bind: function (c, a, d, b) {
              window.ins_enter(2649);
              c.addEventListener ? c.addEventListener(a, d, b || !1) : c.attachEvent && c.attachEvent('on' + a, d);
              {
                window.ins_exit(2649);
                return f;
              }
            },
            unbind: function (c, a, d, b) {
              window.ins_enter(2690);
              c.removeEventListener ? c.removeEventListener(a, d, b || !1) : c.detachEvent && c.detachEvent('on' + a, d);
              {
                window.ins_exit(2690);
                return f;
              }
            },
            addClass: function (a, d) {
              window.ins_enter(2731);
              if (void 0 === a.className)
                a.className = d;
              else if (a.className !== d) {
                var b = a.className.split(/ +/);
                -1 == b.indexOf(d) && (b.push(d), a.className = b.join(' ').replace(/^\s+/, '').replace(/\s+$/, ''));
              }
              {
                window.ins_exit(2731);
                return f;
              }
            },
            removeClass: function (a, d) {
              window.ins_enter(2808);
              if (d) {
                if (void 0 !== a.className)
                  if (a.className === d)
                    a.removeAttribute('class');
                  else {
                    var b = a.className.split(/ +/), e = b.indexOf(d);
                    -1 != e && (b.splice(e, 1), a.className = b.join(' '));
                  }
              } else
                a.className = void 0;
              {
                window.ins_exit(2808);
                return f;
              }
            },
            hasClass: function (a, d) {
              window.ins_enter(2889);
              {
                var ___ret48 = RegExp('(?:^|\\s+)' + d + '(?:\\s+|$)').test(a.className) || !1;
                window.ins_exit(2889);
                return ___ret48;
              }
            },
            getWidth: function (c) {
              window.ins_enter(2916);
              c = getComputedStyle(c);
              {
                var ___ret49 = a(c['border-left-width']) + a(c['border-right-width']) + a(c['padding-left']) + a(c['padding-right']) + a(c.width);
                window.ins_exit(2916);
                return ___ret49;
              }
            },
            getHeight: function (c) {
              window.ins_enter(2961);
              c = getComputedStyle(c);
              {
                var ___ret50 = a(c['border-top-width']) + a(c['border-bottom-width']) + a(c['padding-top']) + a(c['padding-bottom']) + a(c.height);
                window.ins_exit(2961);
                return ___ret50;
              }
            },
            getOffset: function (a) {
              window.ins_enter(3006);
              var d = {
                  left: 0,
                  top: 0
                };
              if (a.offsetParent) {
                do
                  d.left += a.offsetLeft, d.top += a.offsetTop;
                while (a = a.offsetParent);
              }
              {
                window.ins_exit(3006);
                return d;
              }
            },
            isActive: function (a) {
              window.ins_enter(3054);
              {
                var ___ret51 = a === document.activeElement && (a.type || a.href);
                window.ins_exit(3054);
                return ___ret51;
              }
            }
          };
        {
          window.ins_exit(undefined);
          return f;
        }
      }(dat.utils.common);
      dat.controllers.OptionController = function (e, a, b) {
        window.ins_enter(3090);
        var d = function (f, c, e) {
          window.ins_enter(3102);
          d.superclass.call(this, f, c);
          var k = this;
          this.__select = document.createElement('select');
          if (b.isArray(e)) {
            var l = {};
            b.each(e, function (a) {
              window.ins_enter(3152);
              l[a] = a;
              window.ins_exit(3152);
            });
            e = l;
          }
          b.each(e, function (a, c) {
            window.ins_enter(3175);
            var d = document.createElement('option');
            d.innerHTML = c;
            d.setAttribute('value', a);
            k.__select.appendChild(d);
            window.ins_exit(3175);
          });
          this.updateDisplay();
          a.bind(this.__select, 'change', function () {
            window.ins_enter(3226);
            k.setValue(this.options[this.selectedIndex].value);
            window.ins_exit(3226);
          });
          this.domElement.appendChild(this.__select);
          window.ins_exit(3102);
        };
        d.superclass = e;
        b.extend(d.prototype, e.prototype, {
          setValue: function (a) {
            window.ins_enter(3276);
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            {
              window.ins_exit(3276);
              return a;
            }
          },
          updateDisplay: function () {
            window.ins_enter(3318);
            this.__select.value = this.getValue();
            {
              var ___ret52 = d.superclass.prototype.updateDisplay.call(this);
              window.ins_exit(3318);
              return ___ret52;
            }
          }
        });
        {
          window.ins_exit(3090);
          return d;
        }
      }(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
      dat.controllers.NumberController = function (e, a) {
        window.ins_enter(3372);
        var b = function (d, f, c) {
          window.ins_enter(3383);
          b.superclass.call(this, d, f);
          c = c || {};
          this.__min = c.min;
          this.__max = c.max;
          this.__step = c.step;
          a.isUndefined(this.__step) ? this.__impliedStep = 0 == this.initialValue ? 1 : Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step;
          d = this.__impliedStep;
          d = d.toString();
          d = -1 < d.indexOf('.') ? d.length - d.indexOf('.') - 1 : 0;
          this.__precision = d;
          window.ins_exit(3383);
        };
        b.superclass = e;
        a.extend(b.prototype, e.prototype, {
          setValue: function (a) {
            window.ins_enter(3544);
            void 0 !== this.__min && a < this.__min ? a = this.__min : void 0 !== this.__max && a > this.__max && (a = this.__max);
            void 0 !== this.__step && 0 != a % this.__step && (a = Math.round(a / this.__step) * this.__step);
            {
              var ___ret53 = b.superclass.prototype.setValue.call(this, a);
              window.ins_exit(3544);
              return ___ret53;
            }
          },
          min: function (a) {
            window.ins_enter(3634);
            this.__min = a;
            {
              var ___ret54 = this;
              window.ins_exit(3634);
              return ___ret54;
            }
          },
          max: function (a) {
            window.ins_enter(3651);
            this.__max = a;
            {
              var ___ret55 = this;
              window.ins_exit(3651);
              return ___ret55;
            }
          },
          step: function (a) {
            window.ins_enter(3668);
            this.__step = a;
            {
              var ___ret56 = this;
              window.ins_exit(3668);
              return ___ret56;
            }
          }
        });
        {
          window.ins_exit(3372);
          return b;
        }
      }(dat.controllers.Controller, dat.utils.common);
      dat.controllers.NumberControllerBox = function (e, a, b) {
        window.ins_enter(3703);
        var d = function (f, c, e) {
          window.ins_enter(3715);
          function k() {
            window.ins_enter(3724);
            var a = parseFloat(n.__input.value);
            b.isNaN(a) || n.setValue(a);
            window.ins_exit(3724);
          }
          function l(a) {
            window.ins_enter(3753);
            var c = r - a.clientY;
            n.setValue(n.getValue() + c * n.__impliedStep);
            r = a.clientY;
            window.ins_exit(3753);
          }
          function q() {
            window.ins_enter(3790);
            a.unbind(window, 'mousemove', l);
            a.unbind(window, 'mouseup', q);
            window.ins_exit(3790);
          }
          this.__truncationSuspended = !1;
          d.superclass.call(this, f, c, e);
          var n = this, r;
          this.__input = document.createElement('input');
          this.__input.setAttribute('type', 'text');
          a.bind(this.__input, 'change', k);
          a.bind(this.__input, 'blur', function () {
            window.ins_enter(3875);
            k();
            n.__onFinishChange && n.__onFinishChange.call(n, n.getValue());
            window.ins_exit(3875);
          });
          a.bind(this.__input, 'mousedown', function (c) {
            window.ins_enter(3909);
            a.bind(window, 'mousemove', l);
            a.bind(window, 'mouseup', q);
            r = c.clientY;
            window.ins_exit(3909);
          });
          a.bind(this.__input, 'keydown', function (a) {
            window.ins_enter(3947);
            13 === a.keyCode && (n.__truncationSuspended = !0, this.blur(), n.__truncationSuspended = !1);
            window.ins_exit(3947);
          });
          this.updateDisplay();
          this.domElement.appendChild(this.__input);
          window.ins_exit(3715);
        };
        d.superclass = e;
        b.extend(d.prototype, e.prototype, {
          updateDisplay: function () {
            window.ins_enter(4013);
            var a = this.__input, c;
            if (this.__truncationSuspended)
              c = this.getValue();
            else {
              c = this.getValue();
              var b = Math.pow(10, this.__precision);
              c = Math.round(c * b) / b;
            }
            a.value = c;
            {
              var ___ret57 = d.superclass.prototype.updateDisplay.call(this);
              window.ins_exit(4013);
              return ___ret57;
            }
          }
        });
        {
          window.ins_exit(3703);
          return d;
        }
      }(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
      dat.controllers.NumberControllerSlider = function (e, a, b, d, f) {
        window.ins_enter(4112);
        function c(a, c, d, b, f) {
          window.ins_enter(4123);
          {
            var ___ret58 = b + (a - c) / (d - c) * (f - b);
            window.ins_exit(4123);
            return ___ret58;
          }
        }
        var p = function (d, b, f, e, r) {
          window.ins_enter(4152);
          function y(d) {
            window.ins_enter(4163);
            d.preventDefault();
            var b = a.getOffset(h.__background), f = a.getWidth(h.__background);
            h.setValue(c(d.clientX, b.left, b.left + f, h.__min, h.__max));
            {
              var ___ret59 = !1;
              window.ins_exit(4163);
              return ___ret59;
            }
          }
          function g() {
            window.ins_enter(4222);
            a.unbind(window, 'mousemove', y);
            a.unbind(window, 'mouseup', g);
            h.__onFinishChange && h.__onFinishChange.call(h, h.getValue());
            window.ins_exit(4222);
          }
          p.superclass.call(this, d, b, {
            min: f,
            max: e,
            step: r
          });
          var h = this;
          this.__background = document.createElement('div');
          this.__foreground = document.createElement('div');
          a.bind(this.__background, 'mousedown', function (c) {
            window.ins_enter(4314);
            a.bind(window, 'mousemove', y);
            a.bind(window, 'mouseup', g);
            y(c);
            window.ins_exit(4314);
          });
          a.addClass(this.__background, 'slider');
          a.addClass(this.__foreground, 'slider-fg');
          this.updateDisplay();
          this.__background.appendChild(this.__foreground);
          this.domElement.appendChild(this.__background);
          window.ins_exit(4152);
        };
        p.superclass = e;
        p.useDefaultStyles = function () {
          window.ins_enter(4395);
          b.inject(f);
          window.ins_exit(4395);
        };
        d.extend(p.prototype, e.prototype, {
          updateDisplay: function () {
            window.ins_enter(4421);
            var a = (this.getValue() - this.__min) / (this.__max - this.__min);
            this.__foreground.style.width = 100 * a + '%';
            {
              var ___ret60 = p.superclass.prototype.updateDisplay.call(this);
              window.ins_exit(4421);
              return ___ret60;
            }
          }
        });
        {
          window.ins_exit(4112);
          return p;
        }
      }(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, '/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the "License");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: \'\';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}');
      dat.controllers.FunctionController = function (e, a, b) {
        window.ins_enter(4503);
        var d = function (b, c, e) {
          window.ins_enter(4515);
          d.superclass.call(this, b, c);
          var k = this;
          this.__button = document.createElement('div');
          this.__button.innerHTML = void 0 === e ? 'Fire' : e;
          a.bind(this.__button, 'click', function (a) {
            window.ins_enter(4571);
            a.preventDefault();
            k.fire();
            {
              var ___ret61 = !1;
              window.ins_exit(4571);
              return ___ret61;
            }
          });
          a.addClass(this.__button, 'button');
          this.domElement.appendChild(this.__button);
          window.ins_exit(4515);
        };
        d.superclass = e;
        b.extend(d.prototype, e.prototype, {
          fire: function () {
            window.ins_enter(4630);
            this.__onChange && this.__onChange.call(this);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.getValue().call(this.object);
            window.ins_exit(4630);
          }
        });
        {
          window.ins_exit(4503);
          return d;
        }
      }(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
      dat.controllers.BooleanController = function (e, a, b) {
        window.ins_enter(4700);
        var d = function (b, c) {
          window.ins_enter(4712);
          d.superclass.call(this, b, c);
          var e = this;
          this.__prev = this.getValue();
          this.__checkbox = document.createElement('input');
          this.__checkbox.setAttribute('type', 'checkbox');
          a.bind(this.__checkbox, 'change', function () {
            window.ins_enter(4771);
            e.setValue(!e.__prev);
            window.ins_exit(4771);
          }, !1);
          this.domElement.appendChild(this.__checkbox);
          this.updateDisplay();
          window.ins_exit(4712);
        };
        d.superclass = e;
        b.extend(d.prototype, e.prototype, {
          setValue: function (a) {
            window.ins_enter(4823);
            a = d.superclass.prototype.setValue.call(this, a);
            this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            this.__prev = this.getValue();
            {
              window.ins_exit(4823);
              return a;
            }
          },
          updateDisplay: function () {
            window.ins_enter(4874);
            !0 === this.getValue() ? (this.__checkbox.setAttribute('checked', 'checked'), this.__checkbox.checked = !0) : this.__checkbox.checked = !1;
            {
              var ___ret62 = d.superclass.prototype.updateDisplay.call(this);
              window.ins_exit(4874);
              return ___ret62;
            }
          }
        });
        {
          window.ins_exit(4700);
          return d;
        }
      }(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
      dat.color.toString = function (e) {
        window.ins_enter(4951);
        {
          var ___ret63 = function (a) {
            if (1 == a.a || e.isUndefined(a.a)) {
              for (a = a.hex.toString(16); 6 > a.length;)
                a = '0' + a;
              {
                var ___ret64 = '#' + a;
                window.ins_exit(4951);
                return ___ret64;
              }
            }
            {
              var ___ret65 = 'rgba(' + Math.round(a.r) + ',' + Math.round(a.g) + ',' + Math.round(a.b) + ',' + a.a + ')';
              window.ins_exit(4951);
              return ___ret65;
            }
          };
          window.ins_exit(4951);
          return ___ret63;
        }
      }(dat.utils.common);
      dat.color.interpret = function (e, a) {
        window.ins_enter(5053);
        var b, d, f = [
            {
              litmus: a.isString,
              conversions: {
                THREE_CHAR_HEX: {
                  read: function (a) {
                    window.ins_enter(5083);
                    a = a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                    {
                      var ___ret66 = null === a ? !1 : {
                          space: 'HEX',
                          hex: parseInt('0x' + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString())
                        };
                      window.ins_exit(5083);
                      return ___ret66;
                    }
                  },
                  write: e
                },
                SIX_CHAR_HEX: {
                  read: function (a) {
                    window.ins_enter(5164);
                    a = a.match(/^#([A-F0-9]{6})$/i);
                    {
                      var ___ret67 = null === a ? !1 : {
                          space: 'HEX',
                          hex: parseInt('0x' + a[1].toString())
                        };
                      window.ins_exit(5164);
                      return ___ret67;
                    }
                  },
                  write: e
                },
                CSS_RGB: {
                  read: function (a) {
                    window.ins_enter(5210);
                    a = a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    {
                      var ___ret68 = null === a ? !1 : {
                          space: 'RGB',
                          r: parseFloat(a[1]),
                          g: parseFloat(a[2]),
                          b: parseFloat(a[3])
                        };
                      window.ins_exit(5210);
                      return ___ret68;
                    }
                  },
                  write: e
                },
                CSS_RGBA: {
                  read: function (a) {
                    window.ins_enter(5265);
                    a = a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                    {
                      var ___ret69 = null === a ? !1 : {
                          space: 'RGB',
                          r: parseFloat(a[1]),
                          g: parseFloat(a[2]),
                          b: parseFloat(a[3]),
                          a: parseFloat(a[4])
                        };
                      window.ins_exit(5265);
                      return ___ret69;
                    }
                  },
                  write: e
                }
              }
            },
            {
              litmus: a.isNumber,
              conversions: {
                HEX: {
                  read: function (a) {
                    window.ins_enter(5336);
                    {
                      var ___ret70 = {
                          space: 'HEX',
                          hex: a,
                          conversionName: 'HEX'
                        };
                      window.ins_exit(5336);
                      return ___ret70;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5356);
                    {
                      var ___ret71 = a.hex;
                      window.ins_exit(5356);
                      return ___ret71;
                    }
                  }
                }
              }
            },
            {
              litmus: a.isArray,
              conversions: {
                RGB_ARRAY: {
                  read: function (a) {
                    window.ins_enter(5381);
                    {
                      var ___ret72 = 3 != a.length ? !1 : {
                          space: 'RGB',
                          r: a[0],
                          g: a[1],
                          b: a[2]
                        };
                      window.ins_exit(5381);
                      return ___ret72;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5418);
                    {
                      var ___ret73 = [
                          a.r,
                          a.g,
                          a.b
                        ];
                      window.ins_exit(5418);
                      return ___ret73;
                    }
                  }
                },
                RGBA_ARRAY: {
                  read: function (a) {
                    window.ins_enter(5441);
                    {
                      var ___ret74 = 4 != a.length ? !1 : {
                          space: 'RGB',
                          r: a[0],
                          g: a[1],
                          b: a[2],
                          a: a[3]
                        };
                      window.ins_exit(5441);
                      return ___ret74;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5483);
                    {
                      var ___ret75 = [
                          a.r,
                          a.g,
                          a.b,
                          a.a
                        ];
                      window.ins_exit(5483);
                      return ___ret75;
                    }
                  }
                }
              }
            },
            {
              litmus: a.isObject,
              conversions: {
                RGBA_OBJ: {
                  read: function (c) {
                    window.ins_enter(5518);
                    {
                      var ___ret76 = a.isNumber(c.r) && a.isNumber(c.g) && a.isNumber(c.b) && a.isNumber(c.a) ? {
                          space: 'RGB',
                          r: c.r,
                          g: c.g,
                          b: c.b,
                          a: c.a
                        } : !1;
                      window.ins_exit(5518);
                      return ___ret76;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5586);
                    {
                      var ___ret77 = {
                          r: a.r,
                          g: a.g,
                          b: a.b,
                          a: a.a
                        };
                      window.ins_exit(5586);
                      return ___ret77;
                    }
                  }
                },
                RGB_OBJ: {
                  read: function (c) {
                    window.ins_enter(5620);
                    {
                      var ___ret78 = a.isNumber(c.r) && a.isNumber(c.g) && a.isNumber(c.b) ? {
                          space: 'RGB',
                          r: c.r,
                          g: c.g,
                          b: c.b
                        } : !1;
                      window.ins_exit(5620);
                      return ___ret78;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5675);
                    {
                      var ___ret79 = {
                          r: a.r,
                          g: a.g,
                          b: a.b
                        };
                      window.ins_exit(5675);
                      return ___ret79;
                    }
                  }
                },
                HSVA_OBJ: {
                  read: function (c) {
                    window.ins_enter(5704);
                    {
                      var ___ret80 = a.isNumber(c.h) && a.isNumber(c.s) && a.isNumber(c.v) && a.isNumber(c.a) ? {
                          space: 'HSV',
                          h: c.h,
                          s: c.s,
                          v: c.v,
                          a: c.a
                        } : !1;
                      window.ins_exit(5704);
                      return ___ret80;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5772);
                    {
                      var ___ret81 = {
                          h: a.h,
                          s: a.s,
                          v: a.v,
                          a: a.a
                        };
                      window.ins_exit(5772);
                      return ___ret81;
                    }
                  }
                },
                HSV_OBJ: {
                  read: function (d) {
                    window.ins_enter(5806);
                    {
                      var ___ret82 = a.isNumber(d.h) && a.isNumber(d.s) && a.isNumber(d.v) ? {
                          space: 'HSV',
                          h: d.h,
                          s: d.s,
                          v: d.v
                        } : !1;
                      window.ins_exit(5806);
                      return ___ret82;
                    }
                  },
                  write: function (a) {
                    window.ins_enter(5861);
                    {
                      var ___ret83 = {
                          h: a.h,
                          s: a.s,
                          v: a.v
                        };
                      window.ins_exit(5861);
                      return ___ret83;
                    }
                  }
                }
              }
            }
          ];
        {
          var ___ret84 = function () {
            d = !1;
            var c = 1 < arguments.length ? a.toArray(arguments) : arguments[0];
            a.each(f, function (e) {
              window.ins_enter(5916);
              if (e.litmus(c)) {
                var ___ret85 = (a.each(e.conversions, function (e, f) {
                    window.ins_enter(5938);
                    b = e.read(c);
                    if (!1 === d && !1 !== b) {
                      var ___ret86 = (d = b, b.conversionName = f, b.conversion = e, a.BREAK);
                      window.ins_exit(5938);
                      return ___ret86;
                    }
                    window.ins_exit(5938);
                  }), a.BREAK);
                window.ins_exit(5916);
                return ___ret85;
              }
              window.ins_exit(5916);
            });
            {
              window.ins_exit(5053);
              return d;
            }
          };
          window.ins_exit(5053);
          return ___ret84;
        }
      }(dat.color.toString, dat.utils.common);
      dat.GUI = dat.gui.GUI = function (e, a, b, d, f, c, p, k, l, q, n, r, y, g, h) {
        window.ins_enter(6009);
        function t(a, c, b, e) {
          window.ins_enter(6030);
          if (void 0 === c[b])
            throw Error('Object ' + c + ' has no property "' + b + '"');
          e.color ? c = new n(c, b) : (c = [
            c,
            b
          ].concat(e.factoryArgs), c = d.apply(a, c));
          e.before instanceof f && (e.before = e.before.__li);
          v(a, c);
          g.addClass(c.domElement, 'c');
          b = document.createElement('span');
          g.addClass(b, 'property-name');
          b.innerHTML = c.property;
          var q = document.createElement('div');
          q.appendChild(b);
          q.appendChild(c.domElement);
          e = u(a, q, e.before);
          g.addClass(e, m.CLASS_CONTROLLER_ROW);
          g.addClass(e, typeof c.getValue());
          s(a, e, c);
          a.__controllers.push(c);
          {
            window.ins_exit(6030);
            return c;
          }
        }
        function u(a, d, c) {
          window.ins_enter(6212);
          var b = document.createElement('li');
          d && b.appendChild(d);
          c ? a.__ul.insertBefore(b, params.before) : a.__ul.appendChild(b);
          a.onResize();
          {
            window.ins_exit(6212);
            return b;
          }
        }
        function s(a, d, b) {
          window.ins_enter(6265);
          b.__li = d;
          b.__gui = a;
          h.extend(b, {
            options: function (d) {
              window.ins_enter(6296);
              if (1 < arguments.length) {
                var ___ret87 = (b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [h.toArray(arguments)]
                  }));
                window.ins_exit(6296);
                return ___ret87;
              }
              if (h.isArray(d) || h.isObject(d)) {
                var ___ret88 = (b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [d]
                  }));
                window.ins_exit(6296);
                return ___ret88;
              }
              window.ins_exit(6296);
            },
            name: function (a) {
              window.ins_enter(6381);
              b.__li.firstElementChild.firstElementChild.innerHTML = a;
              {
                window.ins_exit(6381);
                return b;
              }
            },
            listen: function () {
              window.ins_enter(6404);
              b.__gui.listen(b);
              {
                window.ins_exit(6404);
                return b;
              }
            },
            remove: function () {
              window.ins_enter(6422);
              b.__gui.remove(b);
              {
                window.ins_exit(6422);
                return b;
              }
            }
          });
          if (b instanceof l) {
            var e = new k(b.object, b.property, {
                min: b.__min,
                max: b.__max,
                step: b.__step
              });
            h.each([
              'updateDisplay',
              'onChange',
              'onFinishChange'
            ], function (a) {
              window.ins_enter(6479);
              var d = b[a], J = e[a];
              b[a] = e[a] = function () {
                window.ins_enter(6506);
                var a = Array.prototype.slice.call(arguments);
                d.apply(b, a);
                {
                  var ___ret89 = J.apply(e, a);
                  window.ins_exit(6506);
                  return ___ret89;
                }
              };
              window.ins_exit(6479);
            });
            g.addClass(d, 'has-slider');
            b.domElement.insertBefore(e.domElement, b.domElement.firstElementChild);
          } else if (b instanceof k) {
            var f = function (d) {
              window.ins_enter(6568);
              {
                var ___ret90 = h.isNumber(b.__min) && h.isNumber(b.__max) ? (b.remove(), t(a, b.object, b.property, {
                    before: b.__li.nextElementSibling,
                    factoryArgs: [
                      b.__min,
                      b.__max,
                      b.__step
                    ]
                  })) : d;
                window.ins_exit(6568);
                return ___ret90;
              }
            };
            b.min = h.compose(f, b.min);
            b.max = h.compose(f, b.max);
          } else
            b instanceof c ? (g.bind(d, 'click', function () {
              window.ins_enter(6665);
              g.fakeEvent(b.__checkbox, 'click');
              window.ins_exit(6665);
            }), g.bind(b.__checkbox, 'click', function (a) {
              window.ins_enter(6688);
              a.stopPropagation();
              window.ins_exit(6688);
            })) : b instanceof p ? (g.bind(d, 'click', function () {
              window.ins_enter(6711);
              g.fakeEvent(b.__button, 'click');
              window.ins_exit(6711);
            }), g.bind(d, 'mouseover', function () {
              window.ins_enter(6732);
              g.addClass(b.__button, 'hover');
              window.ins_exit(6732);
            }), g.bind(d, 'mouseout', function () {
              window.ins_enter(6753);
              g.removeClass(b.__button, 'hover');
              window.ins_exit(6753);
            })) : b instanceof n && (g.addClass(d, 'color'), b.updateDisplay = h.compose(function (a) {
              window.ins_enter(6787);
              d.style.borderLeftColor = b.__color.toString();
              {
                window.ins_exit(6787);
                return a;
              }
            }, b.updateDisplay), b.updateDisplay());
          b.setValue = h.compose(function (d) {
            window.ins_enter(6825);
            a.getRoot().__preset_select && b.isModified() && D(a.getRoot(), !0);
            {
              window.ins_exit(6825);
              return d;
            }
          }, b.setValue);
          window.ins_exit(6265);
        }
        function v(a, d) {
          window.ins_enter(6858);
          var b = a.getRoot(), c = b.__rememberedObjects.indexOf(d.object);
          if (-1 != c) {
            var e = b.__rememberedObjectIndecesToControllers[c];
            void 0 === e && (e = {}, b.__rememberedObjectIndecesToControllers[c] = e);
            e[d.property] = d;
            if (b.load && b.load.remembered) {
              b = b.load.remembered;
              if (b[a.preset])
                b = b[a.preset];
              else if (b[z]) {
                window.ins_exit(6858);
                return;
              } else
                return;
              b[c] && void 0 !== b[c][d.property] && (c = b[c][d.property], d.initialValue = c, d.setValue(c));
            }
          }
          window.ins_exit(6858);
        }
        function K(a) {
          window.ins_enter(7004);
          var b = a.__save_row = document.createElement('li');
          g.addClass(a.domElement, 'has-save');
          a.__ul.insertBefore(b, a.__ul.firstChild);
          g.addClass(b, 'save-row');
          var d = document.createElement('span');
          d.innerHTML = '&nbsp;';
          g.addClass(d, 'button gears');
          var c = document.createElement('span');
          c.innerHTML = 'Save';
          g.addClass(c, 'button');
          g.addClass(c, 'save');
          var e = document.createElement('span');
          e.innerHTML = 'New';
          g.addClass(e, 'button');
          g.addClass(e, 'save-as');
          var f = document.createElement('span');
          f.innerHTML = 'Revert';
          g.addClass(f, 'button');
          g.addClass(f, 'revert');
          var q = a.__preset_select = document.createElement('select');
          a.load && a.load.remembered ? h.each(a.load.remembered, function (b, d) {
            window.ins_enter(7190);
            E(a, d, d == a.preset);
            window.ins_exit(7190);
          }) : E(a, z, !1);
          g.bind(q, 'change', function () {
            window.ins_enter(7221);
            for (var b = 0; b < a.__preset_select.length; b++)
              a.__preset_select[b].innerHTML = a.__preset_select[b].value;
            a.preset = this.value;
            window.ins_exit(7221);
          });
          b.appendChild(q);
          b.appendChild(d);
          b.appendChild(c);
          b.appendChild(e);
          b.appendChild(f);
          if (w) {
            var b = document.getElementById('dg-save-locally'), n = document.getElementById('dg-local-explain');
            b.style.display = 'block';
            b = document.getElementById('dg-local-storage');
            'true' === localStorage.getItem(document.location.href + '.isLocal') && b.setAttribute('checked', 'checked');
            var k = function () {
              window.ins_enter(7353);
              n.style.display = a.useLocalStorage ? 'block' : 'none';
              window.ins_exit(7353);
            };
            k();
            g.bind(b, 'change', function () {
              window.ins_enter(7382);
              a.useLocalStorage = !a.useLocalStorage;
              k();
              window.ins_exit(7382);
            });
          }
          var r = document.getElementById('dg-new-constructor');
          g.bind(r, 'keydown', function (a) {
            window.ins_enter(7415);
            !a.metaKey || 67 !== a.which && 67 != a.keyCode || A.hide();
            window.ins_exit(7415);
          });
          g.bind(d, 'click', function () {
            window.ins_enter(7451);
            r.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2);
            A.show();
            r.focus();
            r.select();
            window.ins_exit(7451);
          });
          g.bind(c, 'click', function () {
            window.ins_enter(7495);
            a.save();
            window.ins_exit(7495);
          });
          g.bind(e, 'click', function () {
            window.ins_enter(7513);
            var b = prompt('Enter a new preset name.');
            b && a.saveAs(b);
            window.ins_exit(7513);
          });
          g.bind(f, 'click', function () {
            window.ins_enter(7540);
            a.revert();
            window.ins_exit(7540);
          });
          window.ins_exit(7004);
        }
        function L(a) {
          window.ins_enter(7551);
          function b(f) {
            window.ins_enter(7559);
            f.preventDefault();
            e = f.clientX;
            g.addClass(a.__closeButton, m.CLASS_DRAG);
            g.bind(window, 'mousemove', d);
            g.bind(window, 'mouseup', c);
            {
              var ___ret91 = !1;
              window.ins_exit(7559);
              return ___ret91;
            }
          }
          function d(b) {
            window.ins_enter(7608);
            b.preventDefault();
            a.width += e - b.clientX;
            a.onResize();
            e = b.clientX;
            {
              var ___ret92 = !1;
              window.ins_exit(7608);
              return ___ret92;
            }
          }
          function c() {
            window.ins_enter(7645);
            g.removeClass(a.__closeButton, m.CLASS_DRAG);
            g.unbind(window, 'mousemove', d);
            g.unbind(window, 'mouseup', c);
            window.ins_exit(7645);
          }
          a.__resize_handle = document.createElement('div');
          h.extend(a.__resize_handle.style, {
            width: '6px',
            marginLeft: '-3px',
            height: '200px',
            cursor: 'ew-resize',
            position: 'absolute'
          });
          var e;
          g.bind(a.__resize_handle, 'mousedown', b);
          g.bind(a.__closeButton, 'mousedown', b);
          a.domElement.insertBefore(a.__resize_handle, a.domElement.firstElementChild);
          window.ins_exit(7551);
        }
        function F(a, b) {
          window.ins_enter(7753);
          a.domElement.style.width = b + 'px';
          a.__save_row && a.autoPlace && (a.__save_row.style.width = b + 'px');
          a.__closeButton && (a.__closeButton.style.width = b + 'px');
          window.ins_exit(7753);
        }
        function B(a, b) {
          window.ins_enter(7810);
          var d = {};
          h.each(a.__rememberedObjects, function (c, e) {
            window.ins_enter(7831);
            var f = {};
            h.each(a.__rememberedObjectIndecesToControllers[e], function (a, d) {
              window.ins_enter(7853);
              f[d] = b ? a.initialValue : a.getValue();
              window.ins_exit(7853);
            });
            d[e] = f;
            window.ins_exit(7831);
          });
          {
            window.ins_exit(7810);
            return d;
          }
        }
        function E(a, b, d) {
          window.ins_enter(7883);
          var c = document.createElement('option');
          c.innerHTML = b;
          c.value = b;
          a.__preset_select.appendChild(c);
          d && (a.__preset_select.selectedIndex = a.__preset_select.length - 1);
          window.ins_exit(7883);
        }
        function D(a, b) {
          window.ins_enter(7937);
          var d = a.__preset_select[a.__preset_select.selectedIndex];
          d.innerHTML = b ? d.value + '*' : d.value;
          window.ins_exit(7937);
        }
        function G(a) {
          window.ins_enter(7973);
          0 != a.length && r(function () {
            window.ins_enter(7990);
            G(a);
            window.ins_exit(7990);
          });
          h.each(a, function (a) {
            window.ins_enter(8006);
            a.updateDisplay();
            window.ins_exit(8006);
          });
          window.ins_exit(7973);
        }
        e.inject(b);
        var z = 'Default', w;
        try {
          w = 'localStorage' in window && null !== window.localStorage;
        } catch (M) {
          w = !1;
        }
        var A, H = !0, x, C = !1, I = [], m = function (a) {
            window.ins_enter(8070);
            function b() {
              window.ins_enter(8077);
              localStorage.setItem(document.location.href + '.gui', JSON.stringify(c.getSaveObject()));
              window.ins_exit(8077);
            }
            function d() {
              window.ins_enter(8104);
              var a = c.getRoot();
              a.width += 1;
              h.defer(function () {
                window.ins_enter(8129);
                a.width -= 1;
                window.ins_exit(8129);
              });
              window.ins_exit(8104);
            }
            var c = this;
            this.domElement = document.createElement('div');
            this.__ul = document.createElement('ul');
            this.domElement.appendChild(this.__ul);
            g.addClass(this.domElement, 'dg');
            this.__folders = {};
            this.__controllers = [];
            this.__rememberedObjects = [];
            this.__rememberedObjectIndecesToControllers = [];
            this.__listening = [];
            a = a || {};
            a = h.defaults(a, {
              autoPlace: !0,
              width: m.DEFAULT_WIDTH
            });
            a = h.defaults(a, {
              resizable: a.autoPlace,
              hideable: a.autoPlace
            });
            h.isUndefined(a.load) ? a.load = { preset: z } : a.preset && (a.load.preset = a.preset);
            h.isUndefined(a.parent) && a.hideable && I.push(this);
            a.resizable = h.isUndefined(a.parent) && a.resizable;
            a.autoPlace && h.isUndefined(a.scrollable) && (a.scrollable = !0);
            var e = w && 'true' === localStorage.getItem(document.location.href + '.isLocal');
            Object.defineProperties(this, {
              parent: {
                get: function () {
                  window.ins_enter(8370);
                  {
                    var ___ret93 = a.parent;
                    window.ins_exit(8370);
                    return ___ret93;
                  }
                }
              },
              scrollable: {
                get: function () {
                  window.ins_enter(8385);
                  {
                    var ___ret94 = a.scrollable;
                    window.ins_exit(8385);
                    return ___ret94;
                  }
                }
              },
              autoPlace: {
                get: function () {
                  window.ins_enter(8400);
                  {
                    var ___ret95 = a.autoPlace;
                    window.ins_exit(8400);
                    return ___ret95;
                  }
                }
              },
              preset: {
                get: function () {
                  window.ins_enter(8415);
                  {
                    var ___ret96 = c.parent ? c.getRoot().preset : a.load.preset;
                    window.ins_exit(8415);
                    return ___ret96;
                  }
                },
                set: function (b) {
                  window.ins_enter(8439);
                  c.parent ? c.getRoot().preset = b : a.load.preset = b;
                  for (b = 0; b < this.__preset_select.length; b++)
                    this.__preset_select[b].value == this.preset && (this.__preset_select.selectedIndex = b);
                  c.revert();
                  window.ins_exit(8439);
                }
              },
              width: {
                get: function () {
                  window.ins_enter(8509);
                  {
                    var ___ret97 = a.width;
                    window.ins_exit(8509);
                    return ___ret97;
                  }
                },
                set: function (b) {
                  window.ins_enter(8521);
                  a.width = b;
                  F(c, b);
                  window.ins_exit(8521);
                }
              },
              name: {
                get: function () {
                  window.ins_enter(8544);
                  {
                    var ___ret98 = a.name;
                    window.ins_exit(8544);
                    return ___ret98;
                  }
                },
                set: function (b) {
                  window.ins_enter(8556);
                  a.name = b;
                  q && (q.innerHTML = a.name);
                  window.ins_exit(8556);
                }
              },
              closed: {
                get: function () {
                  window.ins_enter(8584);
                  {
                    var ___ret99 = a.closed;
                    window.ins_exit(8584);
                    return ___ret99;
                  }
                },
                set: function (b) {
                  window.ins_enter(8596);
                  a.closed = b;
                  a.closed ? g.addClass(c.__ul, m.CLASS_CLOSED) : g.removeClass(c.__ul, m.CLASS_CLOSED);
                  this.onResize();
                  c.__closeButton && (c.__closeButton.innerHTML = b ? m.TEXT_OPEN : m.TEXT_CLOSED);
                  window.ins_exit(8596);
                }
              },
              load: {
                get: function () {
                  window.ins_enter(8663);
                  {
                    var ___ret100 = a.load;
                    window.ins_exit(8663);
                    return ___ret100;
                  }
                }
              },
              useLocalStorage: {
                get: function () {
                  window.ins_enter(8678);
                  {
                    window.ins_exit(8678);
                    return e;
                  }
                },
                set: function (a) {
                  window.ins_enter(8688);
                  w && ((e = a) ? g.bind(window, 'unload', b) : g.unbind(window, 'unload', b), localStorage.setItem(document.location.href + '.isLocal', a));
                  window.ins_exit(8688);
                }
              }
            });
            if (h.isUndefined(a.parent)) {
              a.closed = !1;
              g.addClass(this.domElement, m.CLASS_MAIN);
              g.makeSelectable(this.domElement, !1);
              if (w && e) {
                c.useLocalStorage = !0;
                var f = localStorage.getItem(document.location.href + '.gui');
                f && (a.load = JSON.parse(f));
              }
              this.__closeButton = document.createElement('div');
              this.__closeButton.innerHTML = m.TEXT_CLOSED;
              g.addClass(this.__closeButton, m.CLASS_CLOSE_BUTTON);
              this.domElement.appendChild(this.__closeButton);
              g.bind(this.__closeButton, 'click', function () {
                window.ins_enter(8854);
                c.closed = !c.closed;
                window.ins_exit(8854);
              });
            } else {
              void 0 === a.closed && (a.closed = !0);
              var q = document.createTextNode(a.name);
              g.addClass(q, 'controller-name');
              f = u(c, q);
              g.addClass(this.__ul, m.CLASS_CLOSED);
              g.addClass(f, 'title');
              g.bind(f, 'click', function (a) {
                window.ins_enter(8933);
                a.preventDefault();
                c.closed = !c.closed;
                {
                  var ___ret101 = !1;
                  window.ins_exit(8933);
                  return ___ret101;
                }
              });
              a.closed || (this.closed = !1);
            }
            a.autoPlace && (h.isUndefined(a.parent) && (H && (x = document.createElement('div'), g.addClass(x, 'dg'), g.addClass(x, m.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(x), H = !1), x.appendChild(this.domElement), g.addClass(this.domElement, m.CLASS_AUTO_PLACE)), this.parent || F(c, a.width));
            g.bind(window, 'resize', function () {
              window.ins_enter(9052);
              c.onResize();
              window.ins_exit(9052);
            });
            g.bind(this.__ul, 'webkitTransitionEnd', function () {
              window.ins_enter(9072);
              c.onResize();
              window.ins_exit(9072);
            });
            g.bind(this.__ul, 'transitionend', function () {
              window.ins_enter(9092);
              c.onResize();
              window.ins_exit(9092);
            });
            g.bind(this.__ul, 'oTransitionEnd', function () {
              window.ins_enter(9112);
              c.onResize();
              window.ins_exit(9112);
            });
            this.onResize();
            a.resizable && L(this);
            c.getRoot();
            a.parent || d();
            window.ins_exit(8070);
          };
        m.toggleHide = function () {
          window.ins_enter(9153);
          C = !C;
          h.each(I, function (a) {
            window.ins_enter(9170);
            a.domElement.style.zIndex = C ? -999 : 999;
            a.domElement.style.opacity = C ? 0 : 1;
            window.ins_exit(9170);
          });
          window.ins_exit(9153);
        };
        m.CLASS_AUTO_PLACE = 'a';
        m.CLASS_AUTO_PLACE_CONTAINER = 'ac';
        m.CLASS_MAIN = 'main';
        m.CLASS_CONTROLLER_ROW = 'cr';
        m.CLASS_TOO_TALL = 'taller-than-window';
        m.CLASS_CLOSED = 'closed';
        m.CLASS_CLOSE_BUTTON = 'close-button';
        m.CLASS_DRAG = 'drag';
        m.DEFAULT_WIDTH = 245;
        m.TEXT_CLOSED = 'Close Controls';
        m.TEXT_OPEN = 'Open Controls';
        g.bind(window, 'keydown', function (a) {
          window.ins_enter(9277);
          'text' === document.activeElement.type || 72 !== a.which && 72 != a.keyCode || m.toggleHide();
          window.ins_exit(9277);
        }, !1);
        h.extend(m.prototype, {
          add: function (a, b) {
            window.ins_enter(9322);
            {
              var ___ret102 = t(this, a, b, { factoryArgs: Array.prototype.slice.call(arguments, 2) });
              window.ins_exit(9322);
              return ___ret102;
            }
          },
          addColor: function (a, b) {
            window.ins_enter(9351);
            {
              var ___ret103 = t(this, a, b, { color: !0 });
              window.ins_exit(9351);
              return ___ret103;
            }
          },
          remove: function (a) {
            window.ins_enter(9372);
            this.__ul.removeChild(a.__li);
            this.__controllers.slice(this.__controllers.indexOf(a), 1);
            var b = this;
            h.defer(function () {
              window.ins_enter(9413);
              b.onResize();
              window.ins_exit(9413);
            });
            window.ins_exit(9372);
          },
          destroy: function () {
            window.ins_enter(9426);
            this.autoPlace && x.removeChild(this.domElement);
            window.ins_exit(9426);
          },
          addFolder: function (a) {
            window.ins_enter(9446);
            if (void 0 !== this.__folders[a])
              throw Error('You already have a folder in this GUI by the name "' + a + '"');
            var b = {
                name: a,
                parent: this
              };
            b.autoPlace = this.autoPlace;
            this.load && this.load.folders && this.load.folders[a] && (b.closed = this.load.folders[a].closed, b.load = this.load.folders[a]);
            b = new m(b);
            this.__folders[a] = b;
            a = u(this, b.domElement);
            g.addClass(a, 'folder');
            {
              window.ins_exit(9446);
              return b;
            }
          },
          open: function () {
            window.ins_enter(9566);
            this.closed = !1;
            window.ins_exit(9566);
          },
          close: function () {
            window.ins_enter(9581);
            this.closed = !0;
            window.ins_exit(9581);
          },
          onResize: function () {
            window.ins_enter(9596);
            var a = this.getRoot();
            if (a.scrollable) {
              var b = g.getOffset(a.__ul).top, d = 0;
              h.each(a.__ul.childNodes, function (b) {
                window.ins_enter(9639);
                a.autoPlace && b === a.__save_row || (d += g.getHeight(b));
                window.ins_exit(9639);
              });
              window.innerHeight - b - 20 < d ? (g.addClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = window.innerHeight - b - 20 + 'px') : (g.removeClass(a.domElement, m.CLASS_TOO_TALL), a.__ul.style.height = 'auto');
            }
            a.__resize_handle && h.defer(function () {
              window.ins_enter(9732);
              a.__resize_handle.style.height = a.__ul.offsetHeight + 'px';
              window.ins_exit(9732);
            });
            a.__closeButton && (a.__closeButton.style.width = a.width + 'px');
            window.ins_exit(9596);
          },
          remember: function () {
            window.ins_enter(9774);
            h.isUndefined(A) && (A = new y(), A.domElement.innerHTML = a);
            if (this.parent)
              throw Error('You can only call remember on a top level GUI.');
            var b = this;
            h.each(Array.prototype.slice.call(arguments), function (a) {
              window.ins_enter(9825);
              0 == b.__rememberedObjects.length && K(b);
              -1 == b.__rememberedObjects.indexOf(a) && b.__rememberedObjects.push(a);
              window.ins_exit(9825);
            });
            this.autoPlace && F(this, this.width);
            window.ins_exit(9774);
          },
          getRoot: function () {
            window.ins_enter(9876);
            for (var a = this; a.parent;)
              a = a.parent;
            {
              window.ins_exit(9876);
              return a;
            }
          },
          getSaveObject: function () {
            window.ins_enter(9900);
            var a = this.load;
            a.closed = this.closed;
            0 < this.__rememberedObjects.length && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = B(this));
            a.folders = {};
            h.each(this.__folders, function (b, d) {
              window.ins_enter(9971);
              a.folders[d] = b.getSaveObject();
              window.ins_exit(9971);
            });
            {
              window.ins_exit(9900);
              return a;
            }
          },
          save: function () {
            window.ins_enter(9994);
            this.load.remembered || (this.load.remembered = {});
            this.load.remembered[this.preset] = B(this);
            D(this, !1);
            window.ins_exit(9994);
          },
          saveAs: function (a) {
            window.ins_enter(10036);
            this.load.remembered || (this.load.remembered = {}, this.load.remembered[z] = B(this, !0));
            this.load.remembered[a] = B(this);
            this.preset = a;
            E(this, a, !0);
            window.ins_exit(10036);
          },
          revert: function (a) {
            window.ins_enter(10098);
            h.each(this.__controllers, function (b) {
              window.ins_enter(10113);
              this.getRoot().load.remembered ? v(a || this.getRoot(), b) : b.setValue(b.initialValue);
              window.ins_exit(10113);
            }, this);
            h.each(this.__folders, function (a) {
              window.ins_enter(10155);
              a.revert(a);
              window.ins_exit(10155);
            });
            a || D(this.getRoot(), !1);
            window.ins_exit(10098);
          },
          listen: function (a) {
            window.ins_enter(10181);
            var b = 0 == this.__listening.length;
            this.__listening.push(a);
            b && G(this.__listening);
            window.ins_exit(10181);
          }
        });
        {
          window.ins_exit(6009);
          return m;
        }
      }(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', '.dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI\'s */\n  /* Line items that don\'t contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don\'t hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px \'Lucida Grande\', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n', dat.controllers.factory = function (e, a, b, d, f, c, p) {
        window.ins_enter(10230);
        {
          var ___ret104 = function (k, l, q, n) {
            var r = k[l];
            if (p.isArray(q) || p.isObject(q)) {
              var ___ret105 = new e(k, l, q);
              window.ins_exit(10230);
              return ___ret105;
            }
            if (p.isNumber(r)) {
              var ___ret106 = p.isNumber(q) && p.isNumber(n) ? new b(k, l, q, n) : new a(k, l, {
                  min: q,
                  max: n
                });
              window.ins_exit(10230);
              return ___ret106;
            }
            if (p.isString(r)) {
              var ___ret107 = new d(k, l);
              window.ins_exit(10230);
              return ___ret107;
            }
            if (p.isFunction(r)) {
              var ___ret108 = new f(k, l, '');
              window.ins_exit(10230);
              return ___ret108;
            }
            if (p.isBoolean(r)) {
              var ___ret109 = new c(k, l);
              window.ins_exit(10230);
              return ___ret109;
            }
            window.ins_exit(10230);
          };
          window.ins_exit(10230);
          return ___ret104;
        }
      }(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function (e, a, b) {
        window.ins_enter(10366);
        var d = function (b, c) {
          window.ins_enter(10378);
          function e() {
            window.ins_enter(10386);
            k.setValue(k.__input.value);
            window.ins_exit(10386);
          }
          d.superclass.call(this, b, c);
          var k = this;
          this.__input = document.createElement('input');
          this.__input.setAttribute('type', 'text');
          a.bind(this.__input, 'keyup', e);
          a.bind(this.__input, 'change', e);
          a.bind(this.__input, 'blur', function () {
            window.ins_enter(10465);
            k.__onFinishChange && k.__onFinishChange.call(k, k.getValue());
            window.ins_exit(10465);
          });
          a.bind(this.__input, 'keydown', function (a) {
            window.ins_enter(10496);
            13 === a.keyCode && this.blur();
            window.ins_exit(10496);
          });
          this.updateDisplay();
          this.domElement.appendChild(this.__input);
          window.ins_exit(10378);
        };
        d.superclass = e;
        b.extend(d.prototype, e.prototype, {
          updateDisplay: function () {
            window.ins_enter(10549);
            a.isActive(this.__input) || (this.__input.value = this.getValue());
            {
              var ___ret110 = d.superclass.prototype.updateDisplay.call(this);
              window.ins_exit(10549);
              return ___ret110;
            }
          }
        });
        {
          window.ins_exit(10366);
          return d;
        }
      }(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function (e, a, b, d, f) {
        window.ins_enter(10655);
        function c(a, b, d, c) {
          window.ins_enter(10666);
          a.style.background = '';
          f.each(l, function (e) {
            window.ins_enter(10691);
            a.style.cssText += 'background: ' + e + 'linear-gradient(' + b + ', ' + d + ' 0%, ' + c + ' 100%); ';
            window.ins_exit(10691);
          });
          window.ins_exit(10666);
        }
        function p(a) {
          window.ins_enter(10722);
          a.style.background = '';
          a.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
          a.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
          a.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
          a.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
          a.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
          window.ins_exit(10722);
        }
        var k = function (e, n) {
          window.ins_enter(10781);
          function r(b) {
            window.ins_enter(10789);
            t(b);
            a.bind(window, 'mousemove', t);
            a.bind(window, 'mouseup', l);
            window.ins_exit(10789);
          }
          function l() {
            window.ins_enter(10817);
            a.unbind(window, 'mousemove', t);
            a.unbind(window, 'mouseup', l);
            window.ins_exit(10817);
          }
          function g() {
            window.ins_enter(10840);
            var a = d(this.value);
            !1 !== a ? (s.__color.__state = a, s.setValue(s.__color.toOriginal())) : this.value = s.__color.toString();
            window.ins_exit(10840);
          }
          function h() {
            window.ins_enter(10889);
            a.unbind(window, 'mousemove', u);
            a.unbind(window, 'mouseup', h);
            window.ins_exit(10889);
          }
          function t(b) {
            window.ins_enter(10912);
            b.preventDefault();
            var d = a.getWidth(s.__saturation_field), c = a.getOffset(s.__saturation_field), e = (b.clientX - c.left + document.body.scrollLeft) / d;
            b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;
            1 < b ? b = 1 : 0 > b && (b = 0);
            1 < e ? e = 1 : 0 > e && (e = 0);
            s.__color.v = b;
            s.__color.s = e;
            s.setValue(s.__color.toOriginal());
            {
              var ___ret111 = !1;
              window.ins_exit(10912);
              return ___ret111;
            }
          }
          function u(b) {
            window.ins_enter(11041);
            b.preventDefault();
            var d = a.getHeight(s.__hue_field), c = a.getOffset(s.__hue_field);
            b = 1 - (b.clientY - c.top + document.body.scrollTop) / d;
            1 < b ? b = 1 : 0 > b && (b = 0);
            s.__color.h = 360 * b;
            s.setValue(s.__color.toOriginal());
            {
              var ___ret112 = !1;
              window.ins_exit(11041);
              return ___ret112;
            }
          }
          k.superclass.call(this, e, n);
          this.__color = new b(this.getValue());
          this.__temp = new b(0);
          var s = this;
          this.domElement = document.createElement('div');
          a.makeSelectable(this.domElement, !1);
          this.__selector = document.createElement('div');
          this.__selector.className = 'selector';
          this.__saturation_field = document.createElement('div');
          this.__saturation_field.className = 'saturation-field';
          this.__field_knob = document.createElement('div');
          this.__field_knob.className = 'field-knob';
          this.__field_knob_border = '2px solid ';
          this.__hue_knob = document.createElement('div');
          this.__hue_knob.className = 'hue-knob';
          this.__hue_field = document.createElement('div');
          this.__hue_field.className = 'hue-field';
          this.__input = document.createElement('input');
          this.__input.type = 'text';
          this.__input_textShadow = '0 1px 1px ';
          a.bind(this.__input, 'keydown', function (a) {
            window.ins_enter(11314);
            13 === a.keyCode && g.call(this);
            window.ins_exit(11314);
          });
          a.bind(this.__input, 'blur', g);
          a.bind(this.__selector, 'mousedown', function (b) {
            window.ins_enter(11352);
            a.addClass(this, 'drag').bind(window, 'mouseup', function (b) {
              window.ins_enter(11371);
              a.removeClass(s.__selector, 'drag');
              window.ins_exit(11371);
            });
            window.ins_exit(11352);
          });
          var v = document.createElement('div');
          f.extend(this.__selector.style, {
            width: '122px',
            height: '102px',
            padding: '3px',
            backgroundColor: '#222',
            boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
          });
          f.extend(this.__field_knob.style, {
            position: 'absolute',
            width: '12px',
            height: '12px',
            border: this.__field_knob_border + (0.5 > this.__color.v ? '#fff' : '#000'),
            boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
            borderRadius: '12px',
            zIndex: 1
          });
          f.extend(this.__hue_knob.style, {
            position: 'absolute',
            width: '15px',
            height: '2px',
            borderRight: '4px solid #fff',
            zIndex: 1
          });
          f.extend(this.__saturation_field.style, {
            width: '100px',
            height: '100px',
            border: '1px solid #555',
            marginRight: '3px',
            display: 'inline-block',
            cursor: 'pointer'
          });
          f.extend(v.style, {
            width: '100%',
            height: '100%',
            background: 'none'
          });
          c(v, 'top', 'rgba(0,0,0,0)', '#000');
          f.extend(this.__hue_field.style, {
            width: '15px',
            height: '100px',
            display: 'inline-block',
            border: '1px solid #555',
            cursor: 'ns-resize'
          });
          p(this.__hue_field);
          f.extend(this.__input.style, {
            outline: 'none',
            textAlign: 'center',
            color: '#fff',
            border: 0,
            fontWeight: 'bold',
            textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
          });
          a.bind(this.__saturation_field, 'mousedown', r);
          a.bind(this.__field_knob, 'mousedown', r);
          a.bind(this.__hue_field, 'mousedown', function (b) {
            window.ins_enter(11640);
            u(b);
            a.bind(window, 'mousemove', u);
            a.bind(window, 'mouseup', h);
            window.ins_exit(11640);
          });
          this.__saturation_field.appendChild(v);
          this.__selector.appendChild(this.__field_knob);
          this.__selector.appendChild(this.__saturation_field);
          this.__selector.appendChild(this.__hue_field);
          this.__hue_field.appendChild(this.__hue_knob);
          this.domElement.appendChild(this.__input);
          this.domElement.appendChild(this.__selector);
          this.updateDisplay();
          window.ins_exit(10781);
        };
        k.superclass = e;
        f.extend(k.prototype, e.prototype, {
          updateDisplay: function () {
            window.ins_enter(11760);
            var a = d(this.getValue());
            if (!1 !== a) {
              var e = !1;
              f.each(b.COMPONENTS, function (b) {
                window.ins_enter(11794);
                if (!f.isUndefined(a[b]) && !f.isUndefined(this.__color.__state[b]) && a[b] !== this.__color.__state[b]) {
                  var ___ret113 = (e = !0, {});
                  window.ins_exit(11794);
                  return ___ret113;
                }
                window.ins_exit(11794);
              }, this);
              e && f.extend(this.__color.__state, a);
            }
            f.extend(this.__temp.__state, this.__color.__state);
            this.__temp.a = 1;
            var k = 0.5 > this.__color.v || 0.5 < this.__color.s ? 255 : 0, l = 255 - k;
            f.extend(this.__field_knob.style, {
              marginLeft: 100 * this.__color.s - 7 + 'px',
              marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
              backgroundColor: this.__temp.toString(),
              border: this.__field_knob_border + 'rgb(' + k + ',' + k + ',' + k + ')'
            });
            this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + 'px';
            this.__temp.s = 1;
            this.__temp.v = 1;
            c(this.__saturation_field, 'left', '#fff', this.__temp.toString());
            f.extend(this.__input.style, {
              backgroundColor: this.__input.value = this.__color.toString(),
              color: 'rgb(' + k + ',' + k + ',' + k + ')',
              textShadow: this.__input_textShadow + 'rgba(' + l + ',' + l + ',' + l + ',.7)'
            });
            window.ins_exit(11760);
          }
        });
        var l = [
            '-moz-',
            '-o-',
            '-webkit-',
            '-ms-',
            ''
          ];
        {
          window.ins_exit(10655);
          return k;
        }
      }(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function (e, a, b, d) {
        window.ins_enter(12110);
        function f(a, b, d) {
          window.ins_enter(12120);
          Object.defineProperty(a, b, {
            get: function () {
              window.ins_enter(12140);
              if ('RGB' === this.__state.space) {
                var ___ret114 = this.__state[b];
                window.ins_exit(12140);
                return ___ret114;
              }
              p(this, b, d);
              {
                var ___ret115 = this.__state[b];
                window.ins_exit(12140);
                return ___ret115;
              }
            },
            set: function (a) {
              window.ins_enter(12174);
              'RGB' !== this.__state.space && (p(this, b, d), this.__state.space = 'RGB');
              this.__state[b] = a;
              window.ins_exit(12174);
            }
          });
          window.ins_exit(12120);
        }
        function c(a, b) {
          window.ins_enter(12211);
          Object.defineProperty(a, b, {
            get: function () {
              window.ins_enter(12230);
              if ('HSV' === this.__state.space) {
                var ___ret116 = this.__state[b];
                window.ins_exit(12230);
                return ___ret116;
              }
              k(this);
              {
                var ___ret117 = this.__state[b];
                window.ins_exit(12230);
                return ___ret117;
              }
            },
            set: function (a) {
              window.ins_enter(12262);
              'HSV' !== this.__state.space && (k(this), this.__state.space = 'HSV');
              this.__state[b] = a;
              window.ins_exit(12262);
            }
          });
          window.ins_exit(12211);
        }
        function p(b, c, e) {
          window.ins_enter(12297);
          if ('HEX' === b.__state.space)
            b.__state[c] = a.component_from_hex(b.__state.hex, e);
          else if ('HSV' === b.__state.space)
            d.extend(b.__state, a.hsv_to_rgb(b.__state.h, b.__state.s, b.__state.v));
          else
            throw 'Corrupted color state';
          window.ins_exit(12297);
        }
        function k(b) {
          window.ins_enter(12369);
          var c = a.rgb_to_hsv(b.r, b.g, b.b);
          d.extend(b.__state, {
            s: c.s,
            v: c.v
          });
          d.isNaN(c.h) ? d.isUndefined(b.__state.h) && (b.__state.h = 0) : b.__state.h = c.h;
          window.ins_exit(12369);
        }
        var l = function () {
          window.ins_enter(12450);
          this.__state = e.apply(this, arguments);
          if (!1 === this.__state)
            throw 'Failed to interpret color arguments';
          this.__state.a = this.__state.a || 1;
          window.ins_exit(12450);
        };
        l.COMPONENTS = 'r g b h s v hex a'.split(' ');
        d.extend(l.prototype, {
          toString: function () {
            window.ins_enter(12511);
            {
              var ___ret118 = b(this);
              window.ins_exit(12511);
              return ___ret118;
            }
          },
          toOriginal: function () {
            window.ins_enter(12523);
            {
              var ___ret119 = this.__state.conversion.write(this);
              window.ins_exit(12523);
              return ___ret119;
            }
          }
        });
        f(l.prototype, 'r', 2);
        f(l.prototype, 'g', 1);
        f(l.prototype, 'b', 0);
        c(l.prototype, 'h');
        c(l.prototype, 's');
        c(l.prototype, 'v');
        Object.defineProperty(l.prototype, 'a', {
          get: function () {
            window.ins_enter(12596);
            {
              var ___ret120 = this.__state.a;
              window.ins_exit(12596);
              return ___ret120;
            }
          },
          set: function (a) {
            window.ins_enter(12610);
            this.__state.a = a;
            window.ins_exit(12610);
          }
        });
        Object.defineProperty(l.prototype, 'hex', {
          get: function () {
            window.ins_enter(12637);
            'HEX' !== !this.__state.space && (this.__state.hex = a.rgb_to_hex(this.r, this.g, this.b));
            {
              var ___ret121 = this.__state.hex;
              window.ins_exit(12637);
              return ___ret121;
            }
          },
          set: function (a) {
            window.ins_enter(12680);
            this.__state.space = 'HEX';
            this.__state.hex = a;
            window.ins_exit(12680);
          }
        });
        {
          window.ins_exit(12110);
          return l;
        }
      }(dat.color.interpret, dat.color.math = function () {
        window.ins_enter(12717);
        var e;
        {
          var ___ret122 = {
              hsv_to_rgb: function (a, b, d) {
                window.ins_enter(12730);
                var e = a / 60 - Math.floor(a / 60), c = d * (1 - b), p = d * (1 - e * b);
                b = d * (1 - (1 - e) * b);
                a = [
                  [
                    d,
                    b,
                    c
                  ],
                  [
                    p,
                    d,
                    c
                  ],
                  [
                    c,
                    d,
                    b
                  ],
                  [
                    c,
                    p,
                    d
                  ],
                  [
                    b,
                    c,
                    d
                  ],
                  [
                    d,
                    c,
                    p
                  ]
                ][Math.floor(a / 60) % 6];
                {
                  var ___ret123 = {
                      r: 255 * a[0],
                      g: 255 * a[1],
                      b: 255 * a[2]
                    };
                  window.ins_exit(12730);
                  return ___ret123;
                }
              },
              rgb_to_hsv: function (a, b, d) {
                window.ins_enter(12844);
                var e = Math.min(a, b, d), c = Math.max(a, b, d), e = c - e;
                if (0 == c) {
                  var ___ret124 = {
                      h: NaN,
                      s: 0,
                      v: 0
                    };
                  window.ins_exit(12844);
                  return ___ret124;
                }
                a = (a == c ? (b - d) / e : b == c ? 2 + (d - a) / e : 4 + (a - b) / e) / 6;
                0 > a && (a += 1);
                {
                  var ___ret125 = {
                      h: 360 * a,
                      s: e / c,
                      v: c / 255
                    };
                  window.ins_exit(12844);
                  return ___ret125;
                }
              },
              rgb_to_hex: function (a, b, d) {
                window.ins_enter(12951);
                a = this.hex_with_component(0, 2, a);
                a = this.hex_with_component(a, 1, b);
                {
                  var ___ret126 = a = this.hex_with_component(a, 0, d);
                  window.ins_exit(12951);
                  return ___ret126;
                }
              },
              component_from_hex: function (a, b) {
                window.ins_enter(12992);
                {
                  var ___ret127 = a >> 8 * b & 255;
                  window.ins_exit(12992);
                  return ___ret127;
                }
              },
              hex_with_component: function (a, b, d) {
                window.ins_enter(13010);
                {
                  var ___ret128 = d << (e = 8 * b) | a & ~(255 << e);
                  window.ins_exit(13010);
                  return ___ret128;
                }
              }
            };
          window.ins_exit(12717);
          return ___ret122;
        }
      }(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function () {
        window.ins_enter(13061);
        {
          var ___ret129 = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e, a) {
              window.setTimeout(e, 1000 / 60);
              window.ins_exit(13061);
            };
          window.ins_exit(13061);
          return ___ret129;
        }
      }(), dat.dom.CenteredDiv = function (e, a) {
        window.ins_enter(13104);
        var b = function () {
          window.ins_enter(13115);
          this.backgroundElement = document.createElement('div');
          a.extend(this.backgroundElement.style, {
            backgroundColor: 'rgba(0,0,0,0.8)',
            top: 0,
            left: 0,
            display: 'none',
            zIndex: '1000',
            opacity: 0,
            WebkitTransition: 'opacity 0.2s linear'
          });
          e.makeFullscreen(this.backgroundElement);
          this.backgroundElement.style.position = 'fixed';
          this.domElement = document.createElement('div');
          a.extend(this.domElement.style, {
            position: 'fixed',
            display: 'none',
            zIndex: '1001',
            opacity: 0,
            WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear'
          });
          document.body.appendChild(this.backgroundElement);
          document.body.appendChild(this.domElement);
          var b = this;
          e.bind(this.backgroundElement, 'click', function () {
            window.ins_enter(13250);
            b.hide();
            window.ins_exit(13250);
          });
          window.ins_exit(13115);
        };
        b.prototype.show = function () {
          window.ins_enter(13268);
          var b = this;
          this.backgroundElement.style.display = 'block';
          this.domElement.style.display = 'block';
          this.domElement.style.opacity = 0;
          this.domElement.style.webkitTransform = 'scale(1.1)';
          this.layout();
          a.defer(function () {
            window.ins_enter(13328);
            b.backgroundElement.style.opacity = 1;
            b.domElement.style.opacity = 1;
            b.domElement.style.webkitTransform = 'scale(1)';
            window.ins_exit(13328);
          });
          window.ins_exit(13268);
        };
        b.prototype.hide = function () {
          window.ins_enter(13371);
          var a = this, b = function () {
              window.ins_enter(13383);
              a.domElement.style.display = 'none';
              a.backgroundElement.style.display = 'none';
              e.unbind(a.domElement, 'webkitTransitionEnd', b);
              e.unbind(a.domElement, 'transitionend', b);
              e.unbind(a.domElement, 'oTransitionEnd', b);
              window.ins_exit(13383);
            };
          e.bind(this.domElement, 'webkitTransitionEnd', b);
          e.bind(this.domElement, 'transitionend', b);
          e.bind(this.domElement, 'oTransitionEnd', b);
          this.backgroundElement.style.opacity = 0;
          this.domElement.style.opacity = 0;
          this.domElement.style.webkitTransform = 'scale(1.1)';
          window.ins_exit(13371);
        };
        b.prototype.layout = function () {
          window.ins_enter(13506);
          this.domElement.style.left = window.innerWidth / 2 - e.getWidth(this.domElement) / 2 + 'px';
          this.domElement.style.top = window.innerHeight / 2 - e.getHeight(this.domElement) / 2 + 'px';
          window.ins_exit(13506);
        };
        {
          window.ins_exit(13104);
          return b;
        }
      }(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);
      module.exports = dat;
      window.ins_exit(undefined);
    },
    {}
  ],
  'grapheen': [
    function (require, module, exports) {
      window.ins_enter(13596);
      module.exports = require('epB21t');
      window.ins_exit(13596);
    },
    {}
  ],
  'epB21t': [
    function (require, module, exports) {
      window.ins_enter(13617);
      var GraphView = require('./src/graph_view.js');
      var Parser = require('./src/parser.js');
      module.exports = {
        GraphView: GraphView,
        Parser: Parser,
        insFiles: function (directory) {
          window.ins_enter(13652);
          var path = require('path');
          var p = new Parser();
          var files = fs.readdirSync(directory);
          var source = '';
          for (var i = 0; i < files.length; i++) {
            var infile = path.join(directory, files[i]);
            var out = path.join(directory, 'ins', files[i]);
            var stat = fs.statSync(infile);
            if (stat.isFile()) {
              source = fs.readFileSync(infile, 'utf8');
              p.parse(source);
              var modSource = p.instrument('window.ins_enter', 'window.ins_exit');
              console.log(out);
              fs.writeFileSync(out, modSource);
            }
          }
          window.ins_exit(13652);
        }
      };
      window.ins_exit(13617);
    },
    {
      './src/graph_view.js': 33,
      './src/parser.js': 35,
      'path': 2
    }
  ],
  7: [
    function (require, module, exports) {
      window.ins_enter(13782);
      (function (global) {
        (function () {
          window.ins_enter(13799);
          'use strict';
          var Syntax, Precedence, BinaryPrecedence, SourceNode, estraverse, esutils, isArray, base, indent, json, renumber, hexadecimal, quotes, escapeless, newline, space, parentheses, semicolons, safeConcatenation, directive, extra, parse, sourceMap, FORMAT_MINIFY, FORMAT_DEFAULTS;
          estraverse = require('estraverse');
          esutils = require('esutils');
          Syntax = {
            AssignmentExpression: 'AssignmentExpression',
            ArrayExpression: 'ArrayExpression',
            ArrayPattern: 'ArrayPattern',
            ArrowFunctionExpression: 'ArrowFunctionExpression',
            BlockStatement: 'BlockStatement',
            BinaryExpression: 'BinaryExpression',
            BreakStatement: 'BreakStatement',
            CallExpression: 'CallExpression',
            CatchClause: 'CatchClause',
            ComprehensionBlock: 'ComprehensionBlock',
            ComprehensionExpression: 'ComprehensionExpression',
            ConditionalExpression: 'ConditionalExpression',
            ContinueStatement: 'ContinueStatement',
            DirectiveStatement: 'DirectiveStatement',
            DoWhileStatement: 'DoWhileStatement',
            DebuggerStatement: 'DebuggerStatement',
            EmptyStatement: 'EmptyStatement',
            ExportDeclaration: 'ExportDeclaration',
            ExpressionStatement: 'ExpressionStatement',
            ForStatement: 'ForStatement',
            ForInStatement: 'ForInStatement',
            ForOfStatement: 'ForOfStatement',
            FunctionDeclaration: 'FunctionDeclaration',
            FunctionExpression: 'FunctionExpression',
            GeneratorExpression: 'GeneratorExpression',
            Identifier: 'Identifier',
            IfStatement: 'IfStatement',
            ImportDeclaration: 'ImportDeclaration',
            Literal: 'Literal',
            LabeledStatement: 'LabeledStatement',
            LogicalExpression: 'LogicalExpression',
            MemberExpression: 'MemberExpression',
            NewExpression: 'NewExpression',
            ObjectExpression: 'ObjectExpression',
            ObjectPattern: 'ObjectPattern',
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
            WithStatement: 'WithStatement',
            YieldExpression: 'YieldExpression'
          };
          Precedence = {
            Sequence: 0,
            Yield: 1,
            Assignment: 1,
            Conditional: 2,
            ArrowFunction: 2,
            LogicalOR: 3,
            LogicalAND: 4,
            BitwiseOR: 5,
            BitwiseXOR: 6,
            BitwiseAND: 7,
            Equality: 8,
            Relational: 9,
            BitwiseSHIFT: 10,
            Additive: 11,
            Multiplicative: 12,
            Unary: 13,
            Postfix: 14,
            Call: 15,
            New: 16,
            Member: 17,
            Primary: 18
          };
          BinaryPrecedence = {
            '||': Precedence.LogicalOR,
            '&&': Precedence.LogicalAND,
            '|': Precedence.BitwiseOR,
            '^': Precedence.BitwiseXOR,
            '&': Precedence.BitwiseAND,
            '==': Precedence.Equality,
            '!=': Precedence.Equality,
            '===': Precedence.Equality,
            '!==': Precedence.Equality,
            'is': Precedence.Equality,
            'isnt': Precedence.Equality,
            '<': Precedence.Relational,
            '>': Precedence.Relational,
            '<=': Precedence.Relational,
            '>=': Precedence.Relational,
            'in': Precedence.Relational,
            'instanceof': Precedence.Relational,
            '<<': Precedence.BitwiseSHIFT,
            '>>': Precedence.BitwiseSHIFT,
            '>>>': Precedence.BitwiseSHIFT,
            '+': Precedence.Additive,
            '-': Precedence.Additive,
            '*': Precedence.Multiplicative,
            '%': Precedence.Multiplicative,
            '/': Precedence.Multiplicative
          };
          function getDefaultOptions() {
            window.ins_enter(14223);
            {
              var ___ret130 = {
                  indent: null,
                  base: null,
                  parse: null,
                  comment: false,
                  format: {
                    indent: {
                      style: '    ',
                      base: 0,
                      adjustMultilineComment: false
                    },
                    newline: '\n',
                    space: ' ',
                    json: false,
                    renumber: false,
                    hexadecimal: false,
                    quotes: 'single',
                    escapeless: false,
                    compact: false,
                    parentheses: true,
                    semicolons: true,
                    safeConcatenation: false
                  },
                  moz: {
                    comprehensionExpressionStartsWithAssignment: false,
                    starlessGenerator: false,
                    parenthesizedComprehensionBlock: false
                  },
                  sourceMap: null,
                  sourceMapRoot: null,
                  sourceMapWithCode: false,
                  directive: false,
                  raw: true,
                  verbatim: null
                };
              window.ins_exit(14223);
              return ___ret130;
            }
          }
          function stringRepeat(str, num) {
            window.ins_enter(14322);
            var result = '';
            for (num |= 0; num > 0; num >>>= 1, str += str) {
              if (num & 1) {
                result += str;
              }
            }
            {
              window.ins_exit(14322);
              return result;
            }
          }
          isArray = Array.isArray;
          if (!isArray) {
            isArray = function isArray(array) {
              window.ins_enter(14374);
              {
                var ___ret131 = Object.prototype.toString.call(array) === '[object Array]';
                window.ins_exit(14374);
                return ___ret131;
              }
            };
          }
          function hasLineTerminator(str) {
            window.ins_enter(14394);
            {
              var ___ret132 = /[\r\n]/g.test(str);
              window.ins_exit(14394);
              return ___ret132;
            }
          }
          function endsWithLineTerminator(str) {
            window.ins_enter(14408);
            var len = str.length;
            {
              var ___ret133 = len && esutils.code.isLineTerminator(str.charCodeAt(len - 1));
              window.ins_exit(14408);
              return ___ret133;
            }
          }
          function updateDeeply(target, override) {
            window.ins_enter(14438);
            var key, val;
            function isHashObject(target) {
              window.ins_enter(14452);
              {
                var ___ret134 = typeof target === 'object' && target instanceof Object && !(target instanceof RegExp);
                window.ins_exit(14452);
                return ___ret134;
              }
            }
            for (key in override) {
              if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                  if (isHashObject(target[key])) {
                    updateDeeply(target[key], val);
                  } else {
                    target[key] = updateDeeply({}, val);
                  }
                } else {
                  target[key] = val;
                }
              }
            }
            {
              window.ins_exit(14438);
              return target;
            }
          }
          function generateNumber(value) {
            window.ins_enter(14529);
            var result, point, temp, exponent, pos;
            if (value !== value) {
              throw new Error('Numeric literal whose value is NaN');
            }
            if (value < 0 || value === 0 && 1 / value < 0) {
              throw new Error('Numeric literal whose value is negative');
            }
            if (value === 1 / 0) {
              {
                var ___ret135 = json ? 'null' : renumber ? '1e400' : '1e+400';
                window.ins_exit(14529);
                return ___ret135;
              }
            }
            result = '' + value;
            if (!renumber || result.length < 3) {
              {
                window.ins_exit(14529);
                return result;
              }
            }
            point = result.indexOf('.');
            if (!json && result.charCodeAt(0) === 48 && point === 1) {
              point = 0;
              result = result.slice(1);
            }
            temp = result;
            result = result.replace('e+', 'e');
            exponent = 0;
            if ((pos = temp.indexOf('e')) > 0) {
              exponent = +temp.slice(pos + 1);
              temp = temp.slice(0, pos);
            }
            if (point >= 0) {
              exponent -= temp.length - point - 1;
              temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
            }
            pos = 0;
            while (temp.charCodeAt(temp.length + pos - 1) === 48) {
              --pos;
            }
            if (pos !== 0) {
              exponent -= pos;
              temp = temp.slice(0, pos);
            }
            if (exponent !== 0) {
              temp += 'e' + exponent;
            }
            if ((temp.length < result.length || hexadecimal && value > 1000000000000 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length) && +temp === value) {
              result = temp;
            }
            {
              window.ins_exit(14529);
              return result;
            }
          }
          function escapeRegExpCharacter(ch, previousIsBackslash) {
            window.ins_enter(14829);
            if ((ch & ~1) === 8232) {
              {
                var ___ret136 = (previousIsBackslash ? 'u' : '\\u') + (ch === 8232 ? '2028' : '2029');
                window.ins_exit(14829);
                return ___ret136;
              }
            } else if (ch === 10 || ch === 13) {
              {
                var ___ret137 = (previousIsBackslash ? '' : '\\') + (ch === 10 ? 'n' : 'r');
                window.ins_exit(14829);
                return ___ret137;
              }
            }
            {
              var ___ret138 = String.fromCharCode(ch);
              window.ins_exit(14829);
              return ___ret138;
            }
          }
          function generateRegExp(reg) {
            window.ins_enter(14885);
            var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;
            result = reg.toString();
            if (reg.source) {
              match = result.match(/\/([^/]*)$/);
              if (!match) {
                {
                  window.ins_exit(14885);
                  return result;
                }
              }
              flags = match[1];
              result = '';
              characterInBrack = false;
              previousIsBackslash = false;
              for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);
                if (!previousIsBackslash) {
                  if (characterInBrack) {
                    if (ch === 93) {
                      characterInBrack = false;
                    }
                  } else {
                    if (ch === 47) {
                      result += '\\';
                    } else if (ch === 91) {
                      characterInBrack = true;
                    }
                  }
                  result += escapeRegExpCharacter(ch, previousIsBackslash);
                  previousIsBackslash = ch === 92;
                } else {
                  result += escapeRegExpCharacter(ch, previousIsBackslash);
                  previousIsBackslash = false;
                }
              }
              {
                var ___ret139 = '/' + result + '/' + flags;
                window.ins_exit(14885);
                return ___ret139;
              }
            }
            {
              window.ins_exit(14885);
              return result;
            }
          }
          function escapeAllowedCharacter(code, next) {
            window.ins_enter(15052);
            var hex, result = '\\';
            switch (code) {
            case 8:
              result += 'b';
              break;
            case 12:
              result += 'f';
              break;
            case 9:
              result += 't';
              break;
            default:
              hex = code.toString(16).toUpperCase();
              if (json || code > 255) {
                result += 'u' + '0000'.slice(hex.length) + hex;
              } else if (code === 0 && !esutils.code.isDecimalDigit(next)) {
                result += '0';
              } else if (code === 11) {
                result += 'x0B';
              } else {
                result += 'x' + '00'.slice(hex.length) + hex;
              }
              break;
            }
            {
              window.ins_exit(15052);
              return result;
            }
          }
          function escapeDisallowedCharacter(code) {
            window.ins_enter(15168);
            var result = '\\';
            switch (code) {
            case 92:
              result += '\\';
              break;
            case 10:
              result += 'n';
              break;
            case 13:
              result += 'r';
              break;
            case 8232:
              result += 'u2028';
              break;
            case 8233:
              result += 'u2029';
              break;
            default:
              throw new Error('Incorrectly classified character');
            }
            {
              window.ins_exit(15168);
              return result;
            }
          }
          function escapeDirective(str) {
            window.ins_enter(15224);
            var i, iz, code, quote;
            quote = quotes === 'double' ? '"' : '\'';
            for (i = 0, iz = str.length; i < iz; ++i) {
              code = str.charCodeAt(i);
              if (code === 39) {
                quote = '"';
                break;
              } else if (code === 34) {
                quote = '\'';
                break;
              } else if (code === 92) {
                ++i;
              }
            }
            {
              var ___ret140 = quote + str + quote;
              window.ins_exit(15224);
              return ___ret140;
            }
          }
          function escapeString(str) {
            window.ins_enter(15308);
            var result = '', i, len, code, singleQuotes = 0, doubleQuotes = 0, single, quote;
            for (i = 0, len = str.length; i < len; ++i) {
              code = str.charCodeAt(i);
              if (code === 39) {
                ++singleQuotes;
              } else if (code === 34) {
                ++doubleQuotes;
              } else if (code === 47 && json) {
                result += '\\';
              } else if (esutils.code.isLineTerminator(code) || code === 92) {
                result += escapeDisallowedCharacter(code);
                continue;
              } else if (json && code < 32 || !(json || escapeless || code >= 32 && code <= 126)) {
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
              }
              result += String.fromCharCode(code);
            }
            single = !(quotes === 'double' || quotes === 'auto' && doubleQuotes < singleQuotes);
            quote = single ? '\'' : '"';
            if (!(single ? singleQuotes : doubleQuotes)) {
              {
                var ___ret141 = quote + result + quote;
                window.ins_exit(15308);
                return ___ret141;
              }
            }
            str = result;
            result = quote;
            for (i = 0, len = str.length; i < len; ++i) {
              code = str.charCodeAt(i);
              if (code === 39 && single || code === 34 && !single) {
                result += '\\';
              }
              result += String.fromCharCode(code);
            }
            {
              var ___ret142 = result + quote;
              window.ins_exit(15308);
              return ___ret142;
            }
          }
          function flattenToString(arr) {
            window.ins_enter(15546);
            var i, iz, elem, result = '';
            for (i = 0, iz = arr.length; i < iz; ++i) {
              elem = arr[i];
              result += isArray(elem) ? flattenToString(elem) : elem;
            }
            {
              window.ins_exit(15546);
              return result;
            }
          }
          function toSourceNodeWhenNeeded(generated, node) {
            window.ins_enter(15599);
            if (!sourceMap) {
              if (isArray(generated)) {
                {
                  var ___ret143 = flattenToString(generated);
                  window.ins_exit(15599);
                  return ___ret143;
                }
              } else {
                {
                  window.ins_exit(15599);
                  return generated;
                }
              }
            }
            if (node == null) {
              if (generated instanceof SourceNode) {
                {
                  window.ins_exit(15599);
                  return generated;
                }
              } else {
                node = {};
              }
            }
            if (node.loc == null) {
              {
                var ___ret144 = new SourceNode(null, null, sourceMap, generated, node.name || null);
                window.ins_exit(15599);
                return ___ret144;
              }
            }
            {
              var ___ret145 = new SourceNode(node.loc.start.line, node.loc.start.column, sourceMap === true ? node.loc.source || null : sourceMap, generated, node.name || null);
              window.ins_exit(15599);
              return ___ret145;
            }
          }
          function noEmptySpace() {
            window.ins_enter(15695);
            {
              var ___ret146 = space ? space : ' ';
              window.ins_exit(15695);
              return ___ret146;
            }
          }
          function join(left, right) {
            window.ins_enter(15707);
            var leftSource = toSourceNodeWhenNeeded(left).toString(), rightSource = toSourceNodeWhenNeeded(right).toString(), leftCharCode = leftSource.charCodeAt(leftSource.length - 1), rightCharCode = rightSource.charCodeAt(0);
            if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode) || leftCharCode === 47 && rightCharCode === 105) {
              {
                var ___ret147 = [
                    left,
                    noEmptySpace(),
                    right
                  ];
                window.ins_exit(15707);
                return ___ret147;
              }
            } else if (esutils.code.isWhiteSpace(leftCharCode) || esutils.code.isLineTerminator(leftCharCode) || esutils.code.isWhiteSpace(rightCharCode) || esutils.code.isLineTerminator(rightCharCode)) {
              {
                var ___ret148 = [
                    left,
                    right
                  ];
                window.ins_exit(15707);
                return ___ret148;
              }
            }
            {
              var ___ret149 = [
                  left,
                  space,
                  right
                ];
              window.ins_exit(15707);
              return ___ret149;
            }
          }
          function addIndent(stmt) {
            window.ins_enter(15836);
            {
              var ___ret150 = [
                  base,
                  stmt
                ];
              window.ins_exit(15836);
              return ___ret150;
            }
          }
          function withIndent(fn) {
            window.ins_enter(15848);
            var previousBase, result;
            previousBase = base;
            base += indent;
            result = fn.call(this, base);
            base = previousBase;
            {
              window.ins_exit(15848);
              return result;
            }
          }
          function calculateSpaces(str) {
            window.ins_enter(15884);
            var i;
            for (i = str.length - 1; i >= 0; --i) {
              if (esutils.code.isLineTerminator(str.charCodeAt(i))) {
                break;
              }
            }
            {
              var ___ret151 = str.length - 1 - i;
              window.ins_exit(15884);
              return ___ret151;
            }
          }
          function adjustMultilineComment(value, specialBase) {
            window.ins_enter(15931);
            var array, i, len, line, j, spaces, previousBase, sn;
            array = value.split(/\r\n|[\r\n]/);
            spaces = Number.MAX_VALUE;
            for (i = 1, len = array.length; i < len; ++i) {
              line = array[i];
              j = 0;
              while (j < line.length && esutils.code.isWhiteSpace(line.charCodeAt(j))) {
                ++j;
              }
              if (spaces > j) {
                spaces = j;
              }
            }
            if (typeof specialBase !== 'undefined') {
              previousBase = base;
              if (array[1][spaces] === '*') {
                specialBase += ' ';
              }
              base = specialBase;
            } else {
              if (spaces & 1) {
                --spaces;
              }
              previousBase = base;
            }
            for (i = 1, len = array.length; i < len; ++i) {
              sn = toSourceNodeWhenNeeded(addIndent(array[i].slice(spaces)));
              array[i] = sourceMap ? sn.join('') : sn;
            }
            base = previousBase;
            {
              var ___ret152 = array.join('\n');
              window.ins_exit(15931);
              return ___ret152;
            }
          }
          function generateComment(comment, specialBase) {
            window.ins_enter(16121);
            if (comment.type === 'Line') {
              if (endsWithLineTerminator(comment.value)) {
                {
                  var ___ret153 = '//' + comment.value;
                  window.ins_exit(16121);
                  return ___ret153;
                }
              } else {
                {
                  var ___ret154 = '//' + comment.value + '\n';
                  window.ins_exit(16121);
                  return ___ret154;
                }
              }
            }
            if (extra.format.indent.adjustMultilineComment && /[\n\r]/.test(comment.value)) {
              {
                var ___ret155 = adjustMultilineComment('/*' + comment.value + '*/', specialBase);
                window.ins_exit(16121);
                return ___ret155;
              }
            }
            {
              var ___ret156 = '/*' + comment.value + '*/';
              window.ins_exit(16121);
              return ___ret156;
            }
          }
          function addComments(stmt, result) {
            window.ins_enter(16195);
            var i, len, comment, save, tailingToStatement, specialBase, fragment;
            if (stmt.leadingComments && stmt.leadingComments.length > 0) {
              save = result;
              comment = stmt.leadingComments[0];
              result = [];
              if (safeConcatenation && stmt.type === Syntax.Program && stmt.body.length === 0) {
                result.push('\n');
              }
              result.push(generateComment(comment));
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push('\n');
              }
              for (i = 1, len = stmt.leadingComments.length; i < len; ++i) {
                comment = stmt.leadingComments[i];
                fragment = [generateComment(comment)];
                if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  fragment.push('\n');
                }
                result.push(addIndent(fragment));
              }
              result.push(addIndent(save));
            }
            if (stmt.trailingComments) {
              tailingToStatement = !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
              specialBase = stringRepeat(' ', calculateSpaces(toSourceNodeWhenNeeded([
                base,
                result,
                indent
              ]).toString()));
              for (i = 0, len = stmt.trailingComments.length; i < len; ++i) {
                comment = stmt.trailingComments[i];
                if (tailingToStatement) {
                  if (i === 0) {
                    result = [
                      result,
                      indent
                    ];
                  } else {
                    result = [
                      result,
                      specialBase
                    ];
                  }
                  result.push(generateComment(comment, specialBase));
                } else {
                  result = [
                    result,
                    addIndent(generateComment(comment))
                  ];
                }
                if (i !== len - 1 && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                  result = [
                    result,
                    '\n'
                  ];
                }
              }
            }
            {
              window.ins_exit(16195);
              return result;
            }
          }
          function parenthesize(text, current, should) {
            window.ins_enter(16490);
            if (current < should) {
              {
                var ___ret157 = [
                    '(',
                    text,
                    ')'
                  ];
                window.ins_exit(16490);
                return ___ret157;
              }
            }
            {
              window.ins_exit(16490);
              return text;
            }
          }
          function maybeBlock(stmt, semicolonOptional, functionBody) {
            window.ins_enter(16512);
            var result, noLeadingComment;
            noLeadingComment = !extra.comment || !stmt.leadingComments;
            if (stmt.type === Syntax.BlockStatement && noLeadingComment) {
              {
                var ___ret158 = [
                    space,
                    generateStatement(stmt, { functionBody: functionBody })
                  ];
                window.ins_exit(16512);
                return ___ret158;
              }
            }
            if (stmt.type === Syntax.EmptyStatement && noLeadingComment) {
              {
                var ___ret159 = ';';
                window.ins_exit(16512);
                return ___ret159;
              }
            }
            withIndent(function () {
              window.ins_enter(16576);
              result = [
                newline,
                addIndent(generateStatement(stmt, {
                  semicolonOptional: semicolonOptional,
                  functionBody: functionBody
                }))
              ];
              window.ins_exit(16576);
            });
            {
              window.ins_exit(16512);
              return result;
            }
          }
          function maybeBlockSuffix(stmt, result) {
            window.ins_enter(16601);
            var ends = endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString());
            if (stmt.type === Syntax.BlockStatement && (!extra.comment || !stmt.leadingComments) && !ends) {
              {
                var ___ret160 = [
                    result,
                    space
                  ];
                window.ins_exit(16601);
                return ___ret160;
              }
            }
            if (ends) {
              {
                var ___ret161 = [
                    result,
                    base
                  ];
                window.ins_exit(16601);
                return ___ret161;
              }
            }
            {
              var ___ret162 = [
                  result,
                  newline,
                  base
                ];
              window.ins_exit(16601);
              return ___ret162;
            }
          }
          function generateVerbatimString(string) {
            window.ins_enter(16659);
            var i, iz, result;
            result = string.split(/\r\n|\n/);
            for (i = 1, iz = result.length; i < iz; i++) {
              result[i] = newline + base + result[i];
            }
            {
              window.ins_exit(16659);
              return result;
            }
          }
          function generateVerbatim(expr, option) {
            window.ins_enter(16712);
            var verbatim, result, prec;
            verbatim = expr[extra.verbatim];
            if (typeof verbatim === 'string') {
              result = parenthesize(generateVerbatimString(verbatim), Precedence.Sequence, option.precedence);
            } else {
              result = generateVerbatimString(verbatim.content);
              prec = verbatim.precedence != null ? verbatim.precedence : Precedence.Sequence;
              result = parenthesize(result, prec, option.precedence);
            }
            {
              var ___ret163 = toSourceNodeWhenNeeded(result, expr);
              window.ins_exit(16712);
              return ___ret163;
            }
          }
          function generateIdentifier(node) {
            window.ins_enter(16795);
            {
              var ___ret164 = toSourceNodeWhenNeeded(node.name, node);
              window.ins_exit(16795);
              return ___ret164;
            }
          }
          function generatePattern(node, options) {
            window.ins_enter(16810);
            var result;
            if (node.type === Syntax.Identifier) {
              result = generateIdentifier(node);
            } else {
              result = generateExpression(node, {
                precedence: options.precedence,
                allowIn: options.allowIn,
                allowCall: true
              });
            }
            {
              window.ins_exit(16810);
              return result;
            }
          }
          function generateFunctionBody(node) {
            window.ins_enter(16860);
            var result, i, len, expr, arrow;
            arrow = node.type === Syntax.ArrowFunctionExpression;
            if (arrow && node.params.length === 1 && node.params[0].type === Syntax.Identifier) {
              result = [generateIdentifier(node.params[0])];
            } else {
              result = ['('];
              for (i = 0, len = node.params.length; i < len; ++i) {
                result.push(generatePattern(node.params[i], {
                  precedence: Precedence.Assignment,
                  allowIn: true
                }));
                if (i + 1 < len) {
                  result.push(',' + space);
                }
              }
              result.push(')');
            }
            if (arrow) {
              result.push(space);
              result.push('=>');
            }
            if (node.expression) {
              result.push(space);
              expr = generateExpression(node.body, {
                precedence: Precedence.Assignment,
                allowIn: true,
                allowCall: true
              });
              if (expr.toString().charAt(0) === '{') {
                expr = [
                  '(',
                  expr,
                  ')'
                ];
              }
              result.push(expr);
            } else {
              result.push(maybeBlock(node.body, false, true));
            }
            {
              window.ins_exit(16860);
              return result;
            }
          }
          function generateIterationForStatement(operator, stmt, semicolonIsNotNeeded) {
            window.ins_enter(17075);
            var result = ['for' + space + '('];
            withIndent(function () {
              window.ins_enter(17097);
              if (stmt.left.type === Syntax.VariableDeclaration) {
                withIndent(function () {
                  window.ins_enter(17117);
                  result.push(stmt.left.kind + noEmptySpace());
                  result.push(generateStatement(stmt.left.declarations[0], { allowIn: false }));
                  window.ins_exit(17117);
                });
              } else {
                result.push(generateExpression(stmt.left, {
                  precedence: Precedence.Call,
                  allowIn: true,
                  allowCall: true
                }));
              }
              result = join(result, operator);
              result = [
                join(result, generateExpression(stmt.right, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true
                })),
                ')'
              ];
              window.ins_exit(17097);
            });
            result.push(maybeBlock(stmt.body, semicolonIsNotNeeded));
            {
              window.ins_exit(17075);
              return result;
            }
          }
          function generateLiteral(expr) {
            window.ins_enter(17222);
            var raw;
            if (expr.hasOwnProperty('raw') && parse && extra.raw) {
              try {
                raw = parse(expr.raw).body[0].expression;
                if (raw.type === Syntax.Literal) {
                  if (raw.value === expr.value) {
                    {
                      var ___ret165 = expr.raw;
                      window.ins_exit(17222);
                      return ___ret165;
                    }
                  }
                }
              } catch (e) {
              }
            }
            if (expr.value === null) {
              {
                var ___ret166 = 'null';
                window.ins_exit(17222);
                return ___ret166;
              }
            }
            if (expr.value === undefined) {
              {
                var ___ret167 = 'undefined';
                window.ins_exit(17222);
                return ___ret167;
              }
            }
            if (typeof expr.value === 'string') {
              {
                var ___ret168 = escapeString(expr.value);
                window.ins_exit(17222);
                return ___ret168;
              }
            }
            if (typeof expr.value === 'number') {
              {
                var ___ret169 = generateNumber(expr.value);
                window.ins_exit(17222);
                return ___ret169;
              }
            }
            if (typeof expr.value === 'boolean') {
              {
                var ___ret170 = expr.value ? 'true' : 'false';
                window.ins_exit(17222);
                return ___ret170;
              }
            }
            if (!expr.value) {
              console.log(expr);
            }
            {
              var ___ret171 = generateRegExp(expr.value);
              window.ins_exit(17222);
              return ___ret171;
            }
          }
          function generateExpression(expr, option) {
            window.ins_enter(17366);
            var result, precedence, type, currentPrecedence, i, len, fragment, multiline, leftCharCode, leftSource, rightCharCode, allowIn, allowCall, allowUnparenthesizedNew, property, isGenerator;
            precedence = option.precedence;
            allowIn = option.allowIn;
            allowCall = option.allowCall;
            type = expr.type || option.type;
            if (extra.verbatim && expr.hasOwnProperty(extra.verbatim)) {
              {
                var ___ret172 = generateVerbatim(expr, option);
                window.ins_exit(17366);
                return ___ret172;
              }
            }
            switch (type) {
            case Syntax.SequenceExpression:
              result = [];
              allowIn |= Precedence.Sequence < precedence;
              for (i = 0, len = expr.expressions.length; i < len; ++i) {
                result.push(generateExpression(expr.expressions[i], {
                  precedence: Precedence.Assignment,
                  allowIn: allowIn,
                  allowCall: true
                }));
                if (i + 1 < len) {
                  result.push(',' + space);
                }
              }
              result = parenthesize(result, Precedence.Sequence, precedence);
              break;
            case Syntax.AssignmentExpression:
              allowIn |= Precedence.Assignment < precedence;
              result = parenthesize([
                generateExpression(expr.left, {
                  precedence: Precedence.Call,
                  allowIn: allowIn,
                  allowCall: true
                }),
                space + expr.operator + space,
                generateExpression(expr.right, {
                  precedence: Precedence.Assignment,
                  allowIn: allowIn,
                  allowCall: true
                })
              ], Precedence.Assignment, precedence);
              break;
            case Syntax.ArrowFunctionExpression:
              allowIn |= Precedence.ArrowFunction < precedence;
              result = parenthesize(generateFunctionBody(expr), Precedence.ArrowFunction, precedence);
              break;
            case Syntax.ConditionalExpression:
              allowIn |= Precedence.Conditional < precedence;
              result = parenthesize([
                generateExpression(expr.test, {
                  precedence: Precedence.LogicalOR,
                  allowIn: allowIn,
                  allowCall: true
                }),
                space + '?' + space,
                generateExpression(expr.consequent, {
                  precedence: Precedence.Assignment,
                  allowIn: allowIn,
                  allowCall: true
                }),
                space + ':' + space,
                generateExpression(expr.alternate, {
                  precedence: Precedence.Assignment,
                  allowIn: allowIn,
                  allowCall: true
                })
              ], Precedence.Conditional, precedence);
              break;
            case Syntax.LogicalExpression:
            case Syntax.BinaryExpression:
              currentPrecedence = BinaryPrecedence[expr.operator];
              allowIn |= currentPrecedence < precedence;
              fragment = generateExpression(expr.left, {
                precedence: currentPrecedence,
                allowIn: allowIn,
                allowCall: true
              });
              leftSource = fragment.toString();
              if (leftSource.charCodeAt(leftSource.length - 1) === 47 && esutils.code.isIdentifierPart(expr.operator.charCodeAt(0))) {
                result = [
                  fragment,
                  noEmptySpace(),
                  expr.operator
                ];
              } else {
                result = join(fragment, expr.operator);
              }
              fragment = generateExpression(expr.right, {
                precedence: currentPrecedence + 1,
                allowIn: allowIn,
                allowCall: true
              });
              if (expr.operator === '/' && fragment.toString().charAt(0) === '/' || expr.operator.slice(-1) === '<' && fragment.toString().slice(0, 3) === '!--') {
                result.push(noEmptySpace());
                result.push(fragment);
              } else {
                result = join(result, fragment);
              }
              if (expr.operator === 'in' && !allowIn) {
                result = [
                  '(',
                  result,
                  ')'
                ];
              } else {
                result = parenthesize(result, currentPrecedence, precedence);
              }
              break;
            case Syntax.CallExpression:
              result = [generateExpression(expr.callee, {
                  precedence: Precedence.Call,
                  allowIn: true,
                  allowCall: true,
                  allowUnparenthesizedNew: false
                })];
              result.push('(');
              for (i = 0, len = expr['arguments'].length; i < len; ++i) {
                result.push(generateExpression(expr['arguments'][i], {
                  precedence: Precedence.Assignment,
                  allowIn: true,
                  allowCall: true
                }));
                if (i + 1 < len) {
                  result.push(',' + space);
                }
              }
              result.push(')');
              if (!allowCall) {
                result = [
                  '(',
                  result,
                  ')'
                ];
              } else {
                result = parenthesize(result, Precedence.Call, precedence);
              }
              break;
            case Syntax.NewExpression:
              len = expr['arguments'].length;
              allowUnparenthesizedNew = option.allowUnparenthesizedNew === undefined || option.allowUnparenthesizedNew;
              result = join('new', generateExpression(expr.callee, {
                precedence: Precedence.New,
                allowIn: true,
                allowCall: false,
                allowUnparenthesizedNew: allowUnparenthesizedNew && !parentheses && len === 0
              }));
              if (!allowUnparenthesizedNew || parentheses || len > 0) {
                result.push('(');
                for (i = 0; i < len; ++i) {
                  result.push(generateExpression(expr['arguments'][i], {
                    precedence: Precedence.Assignment,
                    allowIn: true,
                    allowCall: true
                  }));
                  if (i + 1 < len) {
                    result.push(',' + space);
                  }
                }
                result.push(')');
              }
              result = parenthesize(result, Precedence.New, precedence);
              break;
            case Syntax.MemberExpression:
              result = [generateExpression(expr.object, {
                  precedence: Precedence.Call,
                  allowIn: true,
                  allowCall: allowCall,
                  allowUnparenthesizedNew: false
                })];
              if (expr.computed) {
                result.push('[');
                result.push(generateExpression(expr.property, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: allowCall
                }));
                result.push(']');
              } else {
                if (expr.object.type === Syntax.Literal && typeof expr.object.value === 'number') {
                  fragment = toSourceNodeWhenNeeded(result).toString();
                  if (fragment.indexOf('.') < 0 && !/[eExX]/.test(fragment) && esutils.code.isDecimalDigit(fragment.charCodeAt(fragment.length - 1)) && !(fragment.length >= 2 && fragment.charCodeAt(0) === 48)) {
                    result.push('.');
                  }
                }
                result.push('.');
                result.push(generateIdentifier(expr.property));
              }
              result = parenthesize(result, Precedence.Member, precedence);
              break;
            case Syntax.UnaryExpression:
              fragment = generateExpression(expr.argument, {
                precedence: Precedence.Unary,
                allowIn: true,
                allowCall: true
              });
              if (space === '') {
                result = join(expr.operator, fragment);
              } else {
                result = [expr.operator];
                if (expr.operator.length > 2) {
                  result = join(result, fragment);
                } else {
                  leftSource = toSourceNodeWhenNeeded(result).toString();
                  leftCharCode = leftSource.charCodeAt(leftSource.length - 1);
                  rightCharCode = fragment.toString().charCodeAt(0);
                  if ((leftCharCode === 43 || leftCharCode === 45) && leftCharCode === rightCharCode || esutils.code.isIdentifierPart(leftCharCode) && esutils.code.isIdentifierPart(rightCharCode)) {
                    result.push(noEmptySpace());
                    result.push(fragment);
                  } else {
                    result.push(fragment);
                  }
                }
              }
              result = parenthesize(result, Precedence.Unary, precedence);
              break;
            case Syntax.YieldExpression:
              if (expr.delegate) {
                result = 'yield*';
              } else {
                result = 'yield';
              }
              if (expr.argument) {
                result = join(result, generateExpression(expr.argument, {
                  precedence: Precedence.Yield,
                  allowIn: true,
                  allowCall: true
                }));
              }
              result = parenthesize(result, Precedence.Yield, precedence);
              break;
            case Syntax.UpdateExpression:
              if (expr.prefix) {
                result = parenthesize([
                  expr.operator,
                  generateExpression(expr.argument, {
                    precedence: Precedence.Unary,
                    allowIn: true,
                    allowCall: true
                  })
                ], Precedence.Unary, precedence);
              } else {
                result = parenthesize([
                  generateExpression(expr.argument, {
                    precedence: Precedence.Postfix,
                    allowIn: true,
                    allowCall: true
                  }),
                  expr.operator
                ], Precedence.Postfix, precedence);
              }
              break;
            case Syntax.FunctionExpression:
              isGenerator = expr.generator && !extra.moz.starlessGenerator;
              result = isGenerator ? 'function*' : 'function';
              if (expr.id) {
                result = [
                  result,
                  isGenerator ? space : noEmptySpace(),
                  generateIdentifier(expr.id),
                  generateFunctionBody(expr)
                ];
              } else {
                result = [
                  result + space,
                  generateFunctionBody(expr)
                ];
              }
              break;
            case Syntax.ArrayPattern:
            case Syntax.ArrayExpression:
              if (!expr.elements.length) {
                result = '[]';
                break;
              }
              multiline = expr.elements.length > 1;
              result = [
                '[',
                multiline ? newline : ''
              ];
              withIndent(function (indent) {
                window.ins_enter(18737);
                for (i = 0, len = expr.elements.length; i < len; ++i) {
                  if (!expr.elements[i]) {
                    if (multiline) {
                      result.push(indent);
                    }
                    if (i + 1 === len) {
                      result.push(',');
                    }
                  } else {
                    result.push(multiline ? indent : '');
                    result.push(generateExpression(expr.elements[i], {
                      precedence: Precedence.Assignment,
                      allowIn: true,
                      allowCall: true
                    }));
                  }
                  if (i + 1 < len) {
                    result.push(',' + (multiline ? newline : space));
                  }
                }
                window.ins_exit(18737);
              });
              if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              result.push(multiline ? base : '');
              result.push(']');
              break;
            case Syntax.Property:
              if (expr.kind === 'get' || expr.kind === 'set') {
                result = [
                  expr.kind,
                  noEmptySpace(),
                  generateExpression(expr.key, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  generateFunctionBody(expr.value)
                ];
              } else {
                if (expr.shorthand) {
                  result = generateExpression(expr.key, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  });
                } else if (expr.method) {
                  result = [];
                  if (expr.value.generator) {
                    result.push('*');
                  }
                  result.push(generateExpression(expr.key, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }));
                  result.push(generateFunctionBody(expr.value));
                } else {
                  result = [
                    generateExpression(expr.key, {
                      precedence: Precedence.Sequence,
                      allowIn: true,
                      allowCall: true
                    }),
                    ':' + space,
                    generateExpression(expr.value, {
                      precedence: Precedence.Assignment,
                      allowIn: true,
                      allowCall: true
                    })
                  ];
                }
              }
              break;
            case Syntax.ObjectExpression:
              if (!expr.properties.length) {
                result = '{}';
                break;
              }
              multiline = expr.properties.length > 1;
              withIndent(function () {
                window.ins_enter(19080);
                fragment = generateExpression(expr.properties[0], {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true,
                  type: Syntax.Property
                });
                window.ins_exit(19080);
              });
              if (!multiline) {
                if (!hasLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  result = [
                    '{',
                    space,
                    fragment,
                    space,
                    '}'
                  ];
                  break;
                }
              }
              withIndent(function (indent) {
                window.ins_enter(19141);
                result = [
                  '{',
                  newline,
                  indent,
                  fragment
                ];
                if (multiline) {
                  result.push(',' + newline);
                  for (i = 1, len = expr.properties.length; i < len; ++i) {
                    result.push(indent);
                    result.push(generateExpression(expr.properties[i], {
                      precedence: Precedence.Sequence,
                      allowIn: true,
                      allowCall: true,
                      type: Syntax.Property
                    }));
                    if (i + 1 < len) {
                      result.push(',' + newline);
                    }
                  }
                }
                window.ins_exit(19141);
              });
              if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              result.push(base);
              result.push('}');
              break;
            case Syntax.ObjectPattern:
              if (!expr.properties.length) {
                result = '{}';
                break;
              }
              multiline = false;
              if (expr.properties.length === 1) {
                property = expr.properties[0];
                if (property.value.type !== Syntax.Identifier) {
                  multiline = true;
                }
              } else {
                for (i = 0, len = expr.properties.length; i < len; ++i) {
                  property = expr.properties[i];
                  if (!property.shorthand) {
                    multiline = true;
                    break;
                  }
                }
              }
              result = [
                '{',
                multiline ? newline : ''
              ];
              withIndent(function (indent) {
                window.ins_enter(19368);
                for (i = 0, len = expr.properties.length; i < len; ++i) {
                  result.push(multiline ? indent : '');
                  result.push(generateExpression(expr.properties[i], {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }));
                  if (i + 1 < len) {
                    result.push(',' + (multiline ? newline : space));
                  }
                }
                window.ins_exit(19368);
              });
              if (multiline && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                result.push(newline);
              }
              result.push(multiline ? base : '');
              result.push('}');
              break;
            case Syntax.ThisExpression:
              result = 'this';
              break;
            case Syntax.Identifier:
              result = generateIdentifier(expr);
              break;
            case Syntax.Literal:
              result = generateLiteral(expr);
              break;
            case Syntax.GeneratorExpression:
            case Syntax.ComprehensionExpression:
              result = type === Syntax.GeneratorExpression ? ['('] : ['['];
              if (extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = generateExpression(expr.body, {
                  precedence: Precedence.Assignment,
                  allowIn: true,
                  allowCall: true
                });
                result.push(fragment);
              }
              if (expr.blocks) {
                withIndent(function () {
                  window.ins_enter(19572);
                  for (i = 0, len = expr.blocks.length; i < len; ++i) {
                    fragment = generateExpression(expr.blocks[i], {
                      precedence: Precedence.Sequence,
                      allowIn: true,
                      allowCall: true
                    });
                    if (i > 0 || extra.moz.comprehensionExpressionStartsWithAssignment) {
                      result = join(result, fragment);
                    } else {
                      result.push(fragment);
                    }
                  }
                  window.ins_exit(19572);
                });
              }
              if (expr.filter) {
                result = join(result, 'if' + space);
                fragment = generateExpression(expr.filter, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true
                });
                if (extra.moz.parenthesizedComprehensionBlock) {
                  result = join(result, [
                    '(',
                    fragment,
                    ')'
                  ]);
                } else {
                  result = join(result, fragment);
                }
              }
              if (!extra.moz.comprehensionExpressionStartsWithAssignment) {
                fragment = generateExpression(expr.body, {
                  precedence: Precedence.Assignment,
                  allowIn: true,
                  allowCall: true
                });
                result = join(result, fragment);
              }
              result.push(type === Syntax.GeneratorExpression ? ')' : ']');
              break;
            case Syntax.ComprehensionBlock:
              if (expr.left.type === Syntax.VariableDeclaration) {
                fragment = [
                  expr.left.kind,
                  noEmptySpace(),
                  generateStatement(expr.left.declarations[0], { allowIn: false })
                ];
              } else {
                fragment = generateExpression(expr.left, {
                  precedence: Precedence.Call,
                  allowIn: true,
                  allowCall: true
                });
              }
              fragment = join(fragment, expr.of ? 'of' : 'in');
              fragment = join(fragment, generateExpression(expr.right, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
              }));
              if (extra.moz.parenthesizedComprehensionBlock) {
                result = [
                  'for' + space + '(',
                  fragment,
                  ')'
                ];
              } else {
                result = join('for' + space, fragment);
              }
              break;
            default:
              throw new Error('Unknown expression type: ' + expr.type);
            }
            if (extra.comment) {
              result = addComments(expr, result);
            }
            {
              var ___ret173 = toSourceNodeWhenNeeded(result, expr);
              window.ins_exit(17366);
              return ___ret173;
            }
          }
          function generateStatement(stmt, option) {
            window.ins_enter(19901);
            var i, len, result, node, specifier, allowIn, functionBody, directiveContext, fragment, semicolon, isGenerator;
            allowIn = true;
            semicolon = ';';
            functionBody = false;
            directiveContext = false;
            if (option) {
              allowIn = option.allowIn === undefined || option.allowIn;
              if (!semicolons && option.semicolonOptional === true) {
                semicolon = '';
              }
              functionBody = option.functionBody;
              directiveContext = option.directiveContext;
            }
            switch (stmt.type) {
            case Syntax.BlockStatement:
              result = [
                '{',
                newline
              ];
              withIndent(function () {
                window.ins_enter(20007);
                for (i = 0, len = stmt.body.length; i < len; ++i) {
                  fragment = addIndent(generateStatement(stmt.body[i], {
                    semicolonOptional: i === len - 1,
                    directiveContext: functionBody
                  }));
                  result.push(fragment);
                  if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                  }
                }
                window.ins_exit(20007);
              });
              result.push(addIndent('}'));
              break;
            case Syntax.BreakStatement:
              if (stmt.label) {
                result = 'break ' + stmt.label.name + semicolon;
              } else {
                result = 'break' + semicolon;
              }
              break;
            case Syntax.ContinueStatement:
              if (stmt.label) {
                result = 'continue ' + stmt.label.name + semicolon;
              } else {
                result = 'continue' + semicolon;
              }
              break;
            case Syntax.DirectiveStatement:
              if (extra.raw && stmt.raw) {
                result = stmt.raw + semicolon;
              } else {
                result = escapeDirective(stmt.directive) + semicolon;
              }
              break;
            case Syntax.DoWhileStatement:
              result = join('do', maybeBlock(stmt.body));
              result = maybeBlockSuffix(stmt.body, result);
              result = join(result, [
                'while' + space + '(',
                generateExpression(stmt.test, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true
                }),
                ')' + semicolon
              ]);
              break;
            case Syntax.CatchClause:
              withIndent(function () {
                window.ins_enter(20241);
                var guard;
                result = [
                  'catch' + space + '(',
                  generateExpression(stmt.param, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  ')'
                ];
                if (stmt.guard) {
                  guard = generateExpression(stmt.guard, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  });
                  result.splice(2, 0, ' if ', guard);
                }
                window.ins_exit(20241);
              });
              result.push(maybeBlock(stmt.body));
              break;
            case Syntax.DebuggerStatement:
              result = 'debugger' + semicolon;
              break;
            case Syntax.EmptyStatement:
              result = ';';
              break;
            case Syntax.ExportDeclaration:
              result = 'export ';
              if (stmt.declaration) {
                result = [
                  result,
                  generateStatement(stmt.declaration, { semicolonOptional: semicolon === '' })
                ];
                break;
              }
              break;
            case Syntax.ExpressionStatement:
              result = [generateExpression(stmt.expression, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true
                })];
              fragment = toSourceNodeWhenNeeded(result).toString();
              if (fragment.charAt(0) === '{' || fragment.slice(0, 8) === 'function' && '* ('.indexOf(fragment.charAt(8)) >= 0 || directive && directiveContext && stmt.expression.type === Syntax.Literal && typeof stmt.expression.value === 'string') {
                result = [
                  '(',
                  result,
                  ')' + semicolon
                ];
              } else {
                result.push(semicolon);
              }
              break;
            case Syntax.ImportDeclaration:
              if (stmt.specifiers.length === 0) {
                result = [
                  'import',
                  space,
                  generateLiteral(stmt.source)
                ];
              } else {
                if (stmt.kind === 'default') {
                  result = [
                    'import',
                    noEmptySpace(),
                    stmt.specifiers[0].id.name,
                    noEmptySpace()
                  ];
                } else {
                  result = [
                    'import',
                    space,
                    '{'
                  ];
                  if (stmt.specifiers.length === 1) {
                    specifier = stmt.specifiers[0];
                    result.push(space + specifier.id.name);
                    if (specifier.name) {
                      result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                    }
                    result.push(space + '}' + space);
                  } else {
                    withIndent(function (indent) {
                      window.ins_enter(20601);
                      var i, iz;
                      result.push(newline);
                      for (i = 0, iz = stmt.specifiers.length; i < iz; ++i) {
                        specifier = stmt.specifiers[i];
                        result.push(indent + specifier.id.name);
                        if (specifier.name) {
                          result.push(noEmptySpace() + 'as' + noEmptySpace() + specifier.name.name);
                        }
                        if (i + 1 < iz) {
                          result.push(',' + newline);
                        }
                      }
                      window.ins_exit(20601);
                    });
                    if (!endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                      result.push(newline);
                    }
                    result.push(base + '}' + space);
                  }
                }
                result.push('from' + space);
                result.push(generateLiteral(stmt.source));
              }
              result.push(semicolon);
              break;
            case Syntax.VariableDeclarator:
              if (stmt.init) {
                result = [
                  generateExpression(stmt.id, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                  }),
                  space,
                  '=',
                  space,
                  generateExpression(stmt.init, {
                    precedence: Precedence.Assignment,
                    allowIn: allowIn,
                    allowCall: true
                  })
                ];
              } else {
                result = generatePattern(stmt.id, {
                  precedence: Precedence.Assignment,
                  allowIn: allowIn
                });
              }
              break;
            case Syntax.VariableDeclaration:
              result = [stmt.kind];
              if (stmt.declarations.length === 1 && stmt.declarations[0].init && stmt.declarations[0].init.type === Syntax.FunctionExpression) {
                result.push(noEmptySpace());
                result.push(generateStatement(stmt.declarations[0], { allowIn: allowIn }));
              } else {
                withIndent(function () {
                  window.ins_enter(20885);
                  node = stmt.declarations[0];
                  if (extra.comment && node.leadingComments) {
                    result.push('\n');
                    result.push(addIndent(generateStatement(node, { allowIn: allowIn })));
                  } else {
                    result.push(noEmptySpace());
                    result.push(generateStatement(node, { allowIn: allowIn }));
                  }
                  for (i = 1, len = stmt.declarations.length; i < len; ++i) {
                    node = stmt.declarations[i];
                    if (extra.comment && node.leadingComments) {
                      result.push(',' + newline);
                      result.push(addIndent(generateStatement(node, { allowIn: allowIn })));
                    } else {
                      result.push(',' + space);
                      result.push(generateStatement(node, { allowIn: allowIn }));
                    }
                  }
                  window.ins_exit(20885);
                });
              }
              result.push(semicolon);
              break;
            case Syntax.ThrowStatement:
              result = [
                join('throw', generateExpression(stmt.argument, {
                  precedence: Precedence.Sequence,
                  allowIn: true,
                  allowCall: true
                })),
                semicolon
              ];
              break;
            case Syntax.TryStatement:
              result = [
                'try',
                maybeBlock(stmt.block)
              ];
              result = maybeBlockSuffix(stmt.block, result);
              if (stmt.handlers) {
                for (i = 0, len = stmt.handlers.length; i < len; ++i) {
                  result = join(result, generateStatement(stmt.handlers[i]));
                  if (stmt.finalizer || i + 1 !== len) {
                    result = maybeBlockSuffix(stmt.handlers[i].body, result);
                  }
                }
              } else {
                stmt.guardedHandlers = stmt.guardedHandlers || [];
                for (i = 0, len = stmt.guardedHandlers.length; i < len; ++i) {
                  result = join(result, generateStatement(stmt.guardedHandlers[i]));
                  if (stmt.finalizer || i + 1 !== len) {
                    result = maybeBlockSuffix(stmt.guardedHandlers[i].body, result);
                  }
                }
                if (stmt.handler) {
                  if (isArray(stmt.handler)) {
                    for (i = 0, len = stmt.handler.length; i < len; ++i) {
                      result = join(result, generateStatement(stmt.handler[i]));
                      if (stmt.finalizer || i + 1 !== len) {
                        result = maybeBlockSuffix(stmt.handler[i].body, result);
                      }
                    }
                  } else {
                    result = join(result, generateStatement(stmt.handler));
                    if (stmt.finalizer) {
                      result = maybeBlockSuffix(stmt.handler.body, result);
                    }
                  }
                }
              }
              if (stmt.finalizer) {
                result = join(result, [
                  'finally',
                  maybeBlock(stmt.finalizer)
                ]);
              }
              break;
            case Syntax.SwitchStatement:
              withIndent(function () {
                window.ins_enter(21333);
                result = [
                  'switch' + space + '(',
                  generateExpression(stmt.discriminant, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  ')' + space + '{' + newline
                ];
                window.ins_exit(21333);
              });
              if (stmt.cases) {
                for (i = 0, len = stmt.cases.length; i < len; ++i) {
                  fragment = addIndent(generateStatement(stmt.cases[i], { semicolonOptional: i === len - 1 }));
                  result.push(fragment);
                  if (!endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                  }
                }
              }
              result.push(addIndent('}'));
              break;
            case Syntax.SwitchCase:
              withIndent(function () {
                window.ins_enter(21454);
                if (stmt.test) {
                  result = [
                    join('case', generateExpression(stmt.test, {
                      precedence: Precedence.Sequence,
                      allowIn: true,
                      allowCall: true
                    })),
                    ':'
                  ];
                } else {
                  result = ['default:'];
                }
                i = 0;
                len = stmt.consequent.length;
                if (len && stmt.consequent[0].type === Syntax.BlockStatement) {
                  fragment = maybeBlock(stmt.consequent[0]);
                  result.push(fragment);
                  i = 1;
                }
                if (i !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(result).toString())) {
                  result.push(newline);
                }
                for (; i < len; ++i) {
                  fragment = addIndent(generateStatement(stmt.consequent[i], { semicolonOptional: i === len - 1 && semicolon === '' }));
                  result.push(fragment);
                  if (i + 1 !== len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                    result.push(newline);
                  }
                }
                window.ins_exit(21454);
              });
              break;
            case Syntax.IfStatement:
              withIndent(function () {
                window.ins_enter(21632);
                result = [
                  'if' + space + '(',
                  generateExpression(stmt.test, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  ')'
                ];
                window.ins_exit(21632);
              });
              if (stmt.alternate) {
                result.push(maybeBlock(stmt.consequent));
                result = maybeBlockSuffix(stmt.consequent, result);
                if (stmt.alternate.type === Syntax.IfStatement) {
                  result = join(result, [
                    'else ',
                    generateStatement(stmt.alternate, { semicolonOptional: semicolon === '' })
                  ]);
                } else {
                  result = join(result, join('else', maybeBlock(stmt.alternate, semicolon === '')));
                }
              } else {
                result.push(maybeBlock(stmt.consequent, semicolon === ''));
              }
              break;
            case Syntax.ForStatement:
              withIndent(function () {
                window.ins_enter(21759);
                result = ['for' + space + '('];
                if (stmt.init) {
                  if (stmt.init.type === Syntax.VariableDeclaration) {
                    result.push(generateStatement(stmt.init, { allowIn: false }));
                  } else {
                    result.push(generateExpression(stmt.init, {
                      precedence: Precedence.Sequence,
                      allowIn: false,
                      allowCall: true
                    }));
                    result.push(';');
                  }
                } else {
                  result.push(';');
                }
                if (stmt.test) {
                  result.push(space);
                  result.push(generateExpression(stmt.test, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }));
                  result.push(';');
                } else {
                  result.push(';');
                }
                if (stmt.update) {
                  result.push(space);
                  result.push(generateExpression(stmt.update, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }));
                  result.push(')');
                } else {
                  result.push(')');
                }
                window.ins_exit(21759);
              });
              result.push(maybeBlock(stmt.body, semicolon === ''));
              break;
            case Syntax.ForInStatement:
              result = generateIterationForStatement('in', stmt, semicolon === '');
              break;
            case Syntax.ForOfStatement:
              result = generateIterationForStatement('of', stmt, semicolon === '');
              break;
            case Syntax.LabeledStatement:
              result = [
                stmt.label.name + ':',
                maybeBlock(stmt.body, semicolon === '')
              ];
              break;
            case Syntax.Program:
              len = stmt.body.length;
              result = [safeConcatenation && len > 0 ? '\n' : ''];
              for (i = 0; i < len; ++i) {
                fragment = addIndent(generateStatement(stmt.body[i], {
                  semicolonOptional: !safeConcatenation && i === len - 1,
                  directiveContext: true
                }));
                result.push(fragment);
                if (i + 1 < len && !endsWithLineTerminator(toSourceNodeWhenNeeded(fragment).toString())) {
                  result.push(newline);
                }
              }
              break;
            case Syntax.FunctionDeclaration:
              isGenerator = stmt.generator && !extra.moz.starlessGenerator;
              result = [
                isGenerator ? 'function*' : 'function',
                isGenerator ? space : noEmptySpace(),
                generateIdentifier(stmt.id),
                generateFunctionBody(stmt)
              ];
              break;
            case Syntax.ReturnStatement:
              if (stmt.argument) {
                result = [
                  join('return', generateExpression(stmt.argument, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  })),
                  semicolon
                ];
              } else {
                result = ['return' + semicolon];
              }
              break;
            case Syntax.WhileStatement:
              withIndent(function () {
                window.ins_enter(22179);
                result = [
                  'while' + space + '(',
                  generateExpression(stmt.test, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  ')'
                ];
                window.ins_exit(22179);
              });
              result.push(maybeBlock(stmt.body, semicolon === ''));
              break;
            case Syntax.WithStatement:
              withIndent(function () {
                window.ins_enter(22233);
                result = [
                  'with' + space + '(',
                  generateExpression(stmt.object, {
                    precedence: Precedence.Sequence,
                    allowIn: true,
                    allowCall: true
                  }),
                  ')'
                ];
                window.ins_exit(22233);
              });
              result.push(maybeBlock(stmt.body, semicolon === ''));
              break;
            default:
              throw new Error('Unknown statement type: ' + stmt.type);
            }
            if (extra.comment) {
              result = addComments(stmt, result);
            }
            fragment = toSourceNodeWhenNeeded(result).toString();
            if (stmt.type === Syntax.Program && !safeConcatenation && newline === '' && fragment.charAt(fragment.length - 1) === '\n') {
              result = sourceMap ? toSourceNodeWhenNeeded(result).replaceRight(/\s+$/, '') : fragment.replace(/\s+$/, '');
            }
            {
              var ___ret174 = toSourceNodeWhenNeeded(result, stmt);
              window.ins_exit(19901);
              return ___ret174;
            }
          }
          function generate(node, options) {
            window.ins_enter(22362);
            var defaultOptions = getDefaultOptions(), result, pair;
            if (options != null) {
              if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
              }
              if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
              }
              options = updateDeeply(defaultOptions, options);
              indent = options.format.indent.style;
              if (typeof options.base === 'string') {
                base = options.base;
              } else {
                base = stringRepeat(indent, options.format.indent.base);
              }
            } else {
              options = defaultOptions;
              indent = options.format.indent.style;
              base = stringRepeat(indent, options.format.indent.base);
            }
            json = options.format.json;
            renumber = options.format.renumber;
            hexadecimal = json ? false : options.format.hexadecimal;
            quotes = json ? 'double' : options.format.quotes;
            escapeless = options.format.escapeless;
            newline = options.format.newline;
            space = options.format.space;
            if (options.format.compact) {
              newline = space = indent = base = '';
            }
            parentheses = options.format.parentheses;
            semicolons = options.format.semicolons;
            safeConcatenation = options.format.safeConcatenation;
            directive = options.directive;
            parse = json ? null : options.parse;
            sourceMap = options.sourceMap;
            extra = options;
            if (sourceMap) {
              if (!exports.browser) {
                SourceNode = require('source-map').SourceNode;
              } else {
                SourceNode = global.sourceMap.SourceNode;
              }
            }
            switch (node.type) {
            case Syntax.BlockStatement:
            case Syntax.BreakStatement:
            case Syntax.CatchClause:
            case Syntax.ContinueStatement:
            case Syntax.DirectiveStatement:
            case Syntax.DoWhileStatement:
            case Syntax.DebuggerStatement:
            case Syntax.EmptyStatement:
            case Syntax.ExpressionStatement:
            case Syntax.ForStatement:
            case Syntax.ForInStatement:
            case Syntax.ForOfStatement:
            case Syntax.FunctionDeclaration:
            case Syntax.IfStatement:
            case Syntax.LabeledStatement:
            case Syntax.Program:
            case Syntax.ReturnStatement:
            case Syntax.SwitchStatement:
            case Syntax.SwitchCase:
            case Syntax.ThrowStatement:
            case Syntax.TryStatement:
            case Syntax.VariableDeclaration:
            case Syntax.VariableDeclarator:
            case Syntax.WhileStatement:
            case Syntax.WithStatement:
              result = generateStatement(node);
              break;
            case Syntax.AssignmentExpression:
            case Syntax.ArrayExpression:
            case Syntax.ArrayPattern:
            case Syntax.BinaryExpression:
            case Syntax.CallExpression:
            case Syntax.ConditionalExpression:
            case Syntax.FunctionExpression:
            case Syntax.Identifier:
            case Syntax.Literal:
            case Syntax.LogicalExpression:
            case Syntax.MemberExpression:
            case Syntax.NewExpression:
            case Syntax.ObjectExpression:
            case Syntax.ObjectPattern:
            case Syntax.Property:
            case Syntax.SequenceExpression:
            case Syntax.ThisExpression:
            case Syntax.UnaryExpression:
            case Syntax.UpdateExpression:
            case Syntax.YieldExpression:
              result = generateExpression(node, {
                precedence: Precedence.Sequence,
                allowIn: true,
                allowCall: true
              });
              break;
            default:
              throw new Error('Unknown node type: ' + node.type);
            }
            if (!sourceMap) {
              pair = {
                code: result.toString(),
                map: null
              };
              {
                var ___ret175 = options.sourceMapWithCode ? pair : pair.code;
                window.ins_exit(22362);
                return ___ret175;
              }
            }
            pair = result.toStringWithSourceMap({
              file: options.file,
              sourceRoot: options.sourceMapRoot
            });
            if (options.sourceContent) {
              pair.map.setSourceContent(options.sourceMap, options.sourceContent);
            }
            if (options.sourceMapWithCode) {
              {
                window.ins_exit(22362);
                return pair;
              }
            }
            {
              var ___ret176 = pair.map.toString();
              window.ins_exit(22362);
              return ___ret176;
            }
          }
          FORMAT_MINIFY = {
            indent: {
              style: '',
              base: 0
            },
            renumber: true,
            hexadecimal: true,
            quotes: 'auto',
            escapeless: true,
            compact: true,
            parentheses: false,
            semicolons: false
          };
          FORMAT_DEFAULTS = getDefaultOptions().format;
          exports.version = require('./package.json').version;
          exports.generate = generate;
          exports.attachComments = estraverse.attachComments;
          exports.Precedence = updateDeeply({}, Precedence);
          exports.browser = false;
          exports.FORMAT_MINIFY = FORMAT_MINIFY;
          exports.FORMAT_DEFAULTS = FORMAT_DEFAULTS;
          window.ins_exit(13799);
        }());
        window.ins_exit(13782);
      }.call(this, typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {}));
      window.ins_exit(undefined);
    },
    {
      './package.json': 22,
      'estraverse': 8,
      'esutils': 11,
      'source-map': 12
    }
  ],
  8: [
    function (require, module, exports) {
      window.ins_enter(23070);
      (function (root, factory) {
        window.ins_enter(23081);
        'use strict';
        if (typeof define === 'function' && define.amd) {
          define(['exports'], factory);
        } else if (typeof exports !== 'undefined') {
          factory(exports);
        } else {
          factory(root.estraverse = {});
        }
        window.ins_exit(23081);
      }(this, function (exports) {
        window.ins_enter(23127);
        'use strict';
        var Syntax, isArray, VisitorOption, VisitorKeys, BREAK, SKIP;
        Syntax = {
          AssignmentExpression: 'AssignmentExpression',
          ArrayExpression: 'ArrayExpression',
          ArrayPattern: 'ArrayPattern',
          ArrowFunctionExpression: 'ArrowFunctionExpression',
          BlockStatement: 'BlockStatement',
          BinaryExpression: 'BinaryExpression',
          BreakStatement: 'BreakStatement',
          CallExpression: 'CallExpression',
          CatchClause: 'CatchClause',
          ClassBody: 'ClassBody',
          ClassDeclaration: 'ClassDeclaration',
          ClassExpression: 'ClassExpression',
          ConditionalExpression: 'ConditionalExpression',
          ContinueStatement: 'ContinueStatement',
          DebuggerStatement: 'DebuggerStatement',
          DirectiveStatement: 'DirectiveStatement',
          DoWhileStatement: 'DoWhileStatement',
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
          MethodDefinition: 'MethodDefinition',
          NewExpression: 'NewExpression',
          ObjectExpression: 'ObjectExpression',
          ObjectPattern: 'ObjectPattern',
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
          WithStatement: 'WithStatement',
          YieldExpression: 'YieldExpression'
        };
        function ignoreJSHintError() {
          window.ins_enter(23300);
          window.ins_exit(23300);
        }
        isArray = Array.isArray;
        if (!isArray) {
          isArray = function isArray(array) {
            window.ins_enter(23320);
            {
              var ___ret177 = Object.prototype.toString.call(array) === '[object Array]';
              window.ins_exit(23320);
              return ___ret177;
            }
          };
        }
        function deepCopy(obj) {
          window.ins_enter(23340);
          var ret = {}, key, val;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              val = obj[key];
              if (typeof val === 'object' && val !== null) {
                ret[key] = deepCopy(val);
              } else {
                ret[key] = val;
              }
            }
          }
          {
            window.ins_exit(23340);
            return ret;
          }
        }
        function shallowCopy(obj) {
          window.ins_enter(23400);
          var ret = {}, key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              ret[key] = obj[key];
            }
          }
          {
            window.ins_exit(23400);
            return ret;
          }
        }
        ignoreJSHintError(shallowCopy);
        function upperBound(array, func) {
          window.ins_enter(23439);
          var diff, len, i, current;
          len = array.length;
          i = 0;
          while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
              len = diff;
            } else {
              i = current + 1;
              len -= diff + 1;
            }
          }
          {
            window.ins_exit(23439);
            return i;
          }
        }
        function lowerBound(array, func) {
          window.ins_enter(23508);
          var diff, len, i, current;
          len = array.length;
          i = 0;
          while (len) {
            diff = len >>> 1;
            current = i + diff;
            if (func(array[current])) {
              i = current + 1;
              len -= diff + 1;
            } else {
              len = diff;
            }
          }
          {
            window.ins_exit(23508);
            return i;
          }
        }
        ignoreJSHintError(lowerBound);
        VisitorKeys = {
          AssignmentExpression: [
            'left',
            'right'
          ],
          ArrayExpression: ['elements'],
          ArrayPattern: ['elements'],
          ArrowFunctionExpression: [
            'params',
            'defaults',
            'rest',
            'body'
          ],
          BlockStatement: ['body'],
          BinaryExpression: [
            'left',
            'right'
          ],
          BreakStatement: ['label'],
          CallExpression: [
            'callee',
            'arguments'
          ],
          CatchClause: [
            'param',
            'body'
          ],
          ClassBody: ['body'],
          ClassDeclaration: [
            'id',
            'body',
            'superClass'
          ],
          ClassExpression: [
            'id',
            'body',
            'superClass'
          ],
          ConditionalExpression: [
            'test',
            'consequent',
            'alternate'
          ],
          ContinueStatement: ['label'],
          DebuggerStatement: [],
          DirectiveStatement: [],
          DoWhileStatement: [
            'body',
            'test'
          ],
          EmptyStatement: [],
          ExpressionStatement: ['expression'],
          ForStatement: [
            'init',
            'test',
            'update',
            'body'
          ],
          ForInStatement: [
            'left',
            'right',
            'body'
          ],
          FunctionDeclaration: [
            'id',
            'params',
            'defaults',
            'rest',
            'body'
          ],
          FunctionExpression: [
            'id',
            'params',
            'defaults',
            'rest',
            'body'
          ],
          Identifier: [],
          IfStatement: [
            'test',
            'consequent',
            'alternate'
          ],
          Literal: [],
          LabeledStatement: [
            'label',
            'body'
          ],
          LogicalExpression: [
            'left',
            'right'
          ],
          MemberExpression: [
            'object',
            'property'
          ],
          MethodDefinition: [
            'key',
            'value'
          ],
          NewExpression: [
            'callee',
            'arguments'
          ],
          ObjectExpression: ['properties'],
          ObjectPattern: ['properties'],
          Program: ['body'],
          Property: [
            'key',
            'value'
          ],
          ReturnStatement: ['argument'],
          SequenceExpression: ['expressions'],
          SwitchStatement: [
            'discriminant',
            'cases'
          ],
          SwitchCase: [
            'test',
            'consequent'
          ],
          ThisExpression: [],
          ThrowStatement: ['argument'],
          TryStatement: [
            'block',
            'handlers',
            'handler',
            'guardedHandlers',
            'finalizer'
          ],
          UnaryExpression: ['argument'],
          UpdateExpression: ['argument'],
          VariableDeclaration: ['declarations'],
          VariableDeclarator: [
            'id',
            'init'
          ],
          WhileStatement: [
            'test',
            'body'
          ],
          WithStatement: [
            'object',
            'body'
          ],
          YieldExpression: ['argument']
        };
        BREAK = {};
        SKIP = {};
        VisitorOption = {
          Break: BREAK,
          Skip: SKIP
        };
        function Reference(parent, key) {
          window.ins_enter(23837);
          this.parent = parent;
          this.key = key;
          window.ins_exit(23837);
        }
        Reference.prototype.replace = function replace(node) {
          window.ins_enter(23865);
          this.parent[this.key] = node;
          window.ins_exit(23865);
        };
        function Element(node, path, wrap, ref) {
          window.ins_enter(23883);
          this.node = node;
          this.path = path;
          this.wrap = wrap;
          this.ref = ref;
          window.ins_exit(23883);
        }
        function Controller() {
          window.ins_enter(23918);
          window.ins_exit(23918);
        }
        Controller.prototype.path = function path() {
          window.ins_enter(23932);
          var i, iz, j, jz, result, element;
          function addToPath(result, path) {
            window.ins_enter(23952);
            if (isArray(path)) {
              for (j = 0, jz = path.length; j < jz; ++j) {
                result.push(path[j]);
              }
            } else {
              result.push(path);
            }
            window.ins_exit(23952);
          }
          if (!this.__current.path) {
            {
              var ___ret178 = null;
              window.ins_exit(23932);
              return ___ret178;
            }
          }
          result = [];
          for (i = 2, iz = this.__leavelist.length; i < iz; ++i) {
            element = this.__leavelist[i];
            addToPath(result, element.path);
          }
          addToPath(result, this.__current.path);
          {
            window.ins_exit(23932);
            return result;
          }
        };
        Controller.prototype.parents = function parents() {
          window.ins_enter(24062);
          var i, iz, result;
          result = [];
          for (i = 1, iz = this.__leavelist.length; i < iz; ++i) {
            result.push(this.__leavelist[i].node);
          }
          {
            window.ins_exit(24062);
            return result;
          }
        };
        Controller.prototype.current = function current() {
          window.ins_enter(24119);
          {
            var ___ret179 = this.__current.node;
            window.ins_exit(24119);
            return ___ret179;
          }
        };
        Controller.prototype.__execute = function __execute(callback, element) {
          window.ins_enter(24139);
          var previous, result;
          result = undefined;
          previous = this.__current;
          this.__current = element;
          this.__state = null;
          if (callback) {
            result = callback.call(this, element.node, this.__leavelist[this.__leavelist.length - 1].node);
          }
          this.__current = previous;
          {
            window.ins_exit(24139);
            return result;
          }
        };
        Controller.prototype.notify = function notify(flag) {
          window.ins_enter(24217);
          this.__state = flag;
          window.ins_exit(24217);
        };
        Controller.prototype.skip = function () {
          window.ins_enter(24238);
          this.notify(SKIP);
          window.ins_exit(24238);
        };
        Controller.prototype['break'] = function () {
          window.ins_enter(24257);
          this.notify(BREAK);
          window.ins_exit(24257);
        };
        Controller.prototype.__initialize = function (root, visitor) {
          window.ins_enter(24276);
          this.visitor = visitor;
          this.root = root;
          this.__worklist = [];
          this.__leavelist = [];
          this.__current = null;
          this.__state = null;
          window.ins_exit(24276);
        };
        Controller.prototype.traverse = function traverse(root, visitor) {
          window.ins_enter(24327);
          var worklist, leavelist, element, node, nodeType, ret, key, current, current2, candidates, candidate, sentinel;
          this.__initialize(root, visitor);
          sentinel = {};
          worklist = this.__worklist;
          leavelist = this.__leavelist;
          worklist.push(new Element(root, null, null, null));
          leavelist.push(new Element(null, null, null, null));
          while (worklist.length) {
            element = worklist.pop();
            if (element === sentinel) {
              element = leavelist.pop();
              ret = this.__execute(visitor.leave, element);
              if (this.__state === BREAK || ret === BREAK) {
                {
                  window.ins_exit(24327);
                  return;
                }
              }
              continue;
            }
            if (element.node) {
              ret = this.__execute(visitor.enter, element);
              if (this.__state === BREAK || ret === BREAK) {
                {
                  window.ins_exit(24327);
                  return;
                }
              }
              worklist.push(sentinel);
              leavelist.push(element);
              if (this.__state === SKIP || ret === SKIP) {
                continue;
              }
              node = element.node;
              nodeType = element.wrap || node.type;
              candidates = VisitorKeys[nodeType];
              current = candidates.length;
              while ((current -= 1) >= 0) {
                key = candidates[current];
                candidate = node[key];
                if (!candidate) {
                  continue;
                }
                if (!isArray(candidate)) {
                  worklist.push(new Element(candidate, key, null, null));
                  continue;
                }
                current2 = candidate.length;
                while ((current2 -= 1) >= 0) {
                  if (!candidate[current2]) {
                    continue;
                  }
                  if ((nodeType === Syntax.ObjectExpression || nodeType === Syntax.ObjectPattern) && 'properties' === candidates[current]) {
                    element = new Element(candidate[current2], [
                      key,
                      current2
                    ], 'Property', null);
                  } else {
                    element = new Element(candidate[current2], [
                      key,
                      current2
                    ], null, null);
                  }
                  worklist.push(element);
                }
              }
            }
          }
          window.ins_exit(24327);
        };
        Controller.prototype.replace = function replace(root, visitor) {
          window.ins_enter(24655);
          var worklist, leavelist, node, nodeType, target, element, current, current2, candidates, candidate, sentinel, outer, key;
          this.__initialize(root, visitor);
          sentinel = {};
          worklist = this.__worklist;
          leavelist = this.__leavelist;
          outer = { root: root };
          element = new Element(root, null, null, new Reference(outer, 'root'));
          worklist.push(element);
          leavelist.push(element);
          while (worklist.length) {
            element = worklist.pop();
            if (element === sentinel) {
              element = leavelist.pop();
              target = this.__execute(visitor.leave, element);
              if (target !== undefined && target !== BREAK && target !== SKIP) {
                element.ref.replace(target);
              }
              if (this.__state === BREAK || target === BREAK) {
                {
                  var ___ret180 = outer.root;
                  window.ins_exit(24655);
                  return ___ret180;
                }
              }
              continue;
            }
            target = this.__execute(visitor.enter, element);
            if (target !== undefined && target !== BREAK && target !== SKIP) {
              element.ref.replace(target);
              element.node = target;
            }
            if (this.__state === BREAK || target === BREAK) {
              {
                var ___ret181 = outer.root;
                window.ins_exit(24655);
                return ___ret181;
              }
            }
            node = element.node;
            if (!node) {
              continue;
            }
            worklist.push(sentinel);
            leavelist.push(element);
            if (this.__state === SKIP || target === SKIP) {
              continue;
            }
            nodeType = element.wrap || node.type;
            candidates = VisitorKeys[nodeType];
            current = candidates.length;
            while ((current -= 1) >= 0) {
              key = candidates[current];
              candidate = node[key];
              if (!candidate) {
                continue;
              }
              if (!isArray(candidate)) {
                worklist.push(new Element(candidate, key, null, new Reference(node, key)));
                continue;
              }
              current2 = candidate.length;
              while ((current2 -= 1) >= 0) {
                if (!candidate[current2]) {
                  continue;
                }
                if (nodeType === Syntax.ObjectExpression && 'properties' === candidates[current]) {
                  element = new Element(candidate[current2], [
                    key,
                    current2
                  ], 'Property', new Reference(candidate, current2));
                } else {
                  element = new Element(candidate[current2], [
                    key,
                    current2
                  ], null, new Reference(candidate, current2));
                }
                worklist.push(element);
              }
            }
          }
          {
            var ___ret182 = outer.root;
            window.ins_exit(24655);
            return ___ret182;
          }
        };
        function traverse(root, visitor) {
          window.ins_enter(25048);
          var controller = new Controller();
          {
            var ___ret183 = controller.traverse(root, visitor);
            window.ins_exit(25048);
            return ___ret183;
          }
        }
        function replace(root, visitor) {
          window.ins_enter(25069);
          var controller = new Controller();
          {
            var ___ret184 = controller.replace(root, visitor);
            window.ins_exit(25069);
            return ___ret184;
          }
        }
        function extendCommentRange(comment, tokens) {
          window.ins_enter(25090);
          var target;
          target = upperBound(tokens, function search(token) {
            window.ins_enter(25108);
            {
              var ___ret185 = token.range[0] > comment.range[0];
              window.ins_exit(25108);
              return ___ret185;
            }
          });
          comment.extendedRange = [
            comment.range[0],
            comment.range[1]
          ];
          if (target !== tokens.length) {
            comment.extendedRange[1] = tokens[target].range[0];
          }
          target -= 1;
          if (target >= 0) {
            comment.extendedRange[0] = tokens[target].range[1];
          }
          {
            window.ins_exit(25090);
            return comment;
          }
        }
        function attachComments(tree, providedComments, tokens) {
          window.ins_enter(25190);
          var comments = [], comment, len, i, cursor;
          if (!tree.range) {
            throw new Error('attachComments needs range information');
          }
          if (!tokens.length) {
            if (providedComments.length) {
              for (i = 0, len = providedComments.length; i < len; i += 1) {
                comment = deepCopy(providedComments[i]);
                comment.extendedRange = [
                  0,
                  tree.range[0]
                ];
                comments.push(comment);
              }
              tree.leadingComments = comments;
            }
            {
              window.ins_exit(25190);
              return tree;
            }
          }
          for (i = 0, len = providedComments.length; i < len; i += 1) {
            comments.push(extendCommentRange(deepCopy(providedComments[i]), tokens));
          }
          cursor = 0;
          traverse(tree, {
            enter: function (node) {
              window.ins_enter(25325);
              var comment;
              while (cursor < comments.length) {
                comment = comments[cursor];
                if (comment.extendedRange[1] > node.range[0]) {
                  break;
                }
                if (comment.extendedRange[1] === node.range[0]) {
                  if (!node.leadingComments) {
                    node.leadingComments = [];
                  }
                  node.leadingComments.push(comment);
                  comments.splice(cursor, 1);
                } else {
                  cursor += 1;
                }
              }
              if (cursor === comments.length) {
                {
                  var ___ret186 = VisitorOption.Break;
                  window.ins_exit(25325);
                  return ___ret186;
                }
              }
              if (comments[cursor].extendedRange[0] > node.range[1]) {
                {
                  var ___ret187 = VisitorOption.Skip;
                  window.ins_exit(25325);
                  return ___ret187;
                }
              }
              window.ins_exit(25325);
            }
          });
          cursor = 0;
          traverse(tree, {
            leave: function (node) {
              window.ins_enter(25448);
              var comment;
              while (cursor < comments.length) {
                comment = comments[cursor];
                if (node.range[1] < comment.extendedRange[0]) {
                  break;
                }
                if (node.range[1] === comment.extendedRange[0]) {
                  if (!node.trailingComments) {
                    node.trailingComments = [];
                  }
                  node.trailingComments.push(comment);
                  comments.splice(cursor, 1);
                } else {
                  cursor += 1;
                }
              }
              if (cursor === comments.length) {
                {
                  var ___ret188 = VisitorOption.Break;
                  window.ins_exit(25448);
                  return ___ret188;
                }
              }
              if (comments[cursor].extendedRange[0] > node.range[1]) {
                {
                  var ___ret189 = VisitorOption.Skip;
                  window.ins_exit(25448);
                  return ___ret189;
                }
              }
              window.ins_exit(25448);
            }
          });
          {
            window.ins_exit(25190);
            return tree;
          }
        }
        exports.version = '1.3.3-dev';
        exports.Syntax = Syntax;
        exports.traverse = traverse;
        exports.replace = replace;
        exports.attachComments = attachComments;
        exports.VisitorKeys = VisitorKeys;
        exports.VisitorOption = VisitorOption;
        exports.Controller = Controller;
        window.ins_exit(23127);
      }));
      window.ins_exit(23070);
    },
    {}
  ],
  9: [
    function (require, module, exports) {
      window.ins_enter(25614);
      (function () {
        window.ins_enter(25625);
        'use strict';
        var Regex;
        Regex = {
          NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
          NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
        };
        function isDecimalDigit(ch) {
          window.ins_enter(25650);
          {
            var ___ret190 = ch >= 48 && ch <= 57;
            window.ins_exit(25650);
            return ___ret190;
          }
        }
        function isHexDigit(ch) {
          window.ins_enter(25666);
          {
            var ___ret191 = isDecimalDigit(ch) || 97 <= ch && ch <= 102 || 65 <= ch && ch <= 70;
            window.ins_exit(25666);
            return ___ret191;
          }
        }
        function isOctalDigit(ch) {
          window.ins_enter(25694);
          {
            var ___ret192 = ch >= 48 && ch <= 55;
            window.ins_exit(25694);
            return ___ret192;
          }
        }
        function isWhiteSpace(ch) {
          window.ins_enter(25710);
          {
            var ___ret193 = ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && [
                5760,
                6158,
                8192,
                8193,
                8194,
                8195,
                8196,
                8197,
                8198,
                8199,
                8200,
                8201,
                8202,
                8239,
                8287,
                12288,
                65279
              ].indexOf(ch) >= 0;
            window.ins_exit(25710);
            return ___ret193;
          }
        }
        function isLineTerminator(ch) {
          window.ins_enter(25767);
          {
            var ___ret194 = ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
            window.ins_exit(25767);
            return ___ret194;
          }
        }
        function isIdentifierStart(ch) {
          window.ins_enter(25791);
          {
            var ___ret195 = ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
            window.ins_exit(25791);
            return ___ret195;
          }
        }
        function isIdentifierPart(ch) {
          window.ins_enter(25843);
          {
            var ___ret196 = ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
            window.ins_exit(25843);
            return ___ret196;
          }
        }
        module.exports = {
          isDecimalDigit: isDecimalDigit,
          isHexDigit: isHexDigit,
          isOctalDigit: isOctalDigit,
          isWhiteSpace: isWhiteSpace,
          isLineTerminator: isLineTerminator,
          isIdentifierStart: isIdentifierStart,
          isIdentifierPart: isIdentifierPart
        };
        window.ins_exit(25625);
      }());
      window.ins_exit(25614);
    },
    {}
  ],
  10: [
    function (require, module, exports) {
      window.ins_enter(25934);
      (function () {
        window.ins_enter(25945);
        'use strict';
        var code = require('./code');
        function isStrictModeReservedWordES6(id) {
          window.ins_enter(25959);
          switch (id) {
          case 'implements':
          case 'interface':
          case 'package':
          case 'private':
          case 'protected':
          case 'public':
          case 'static':
          case 'let': {
              var ___ret197 = true;
              window.ins_exit(25959);
              return ___ret197;
            }
          default: {
              var ___ret198 = false;
              window.ins_exit(25959);
              return ___ret198;
            }
          }
          window.ins_exit(25959);
        }
        function isKeywordES5(id, strict) {
          window.ins_enter(25990);
          if (!strict && id === 'yield') {
            {
              var ___ret199 = false;
              window.ins_exit(25990);
              return ___ret199;
            }
          }
          {
            var ___ret200 = isKeywordES6(id, strict);
            window.ins_exit(25990);
            return ___ret200;
          }
        }
        function isKeywordES6(id, strict) {
          window.ins_enter(26014);
          if (strict && isStrictModeReservedWordES6(id)) {
            {
              var ___ret201 = true;
              window.ins_exit(26014);
              return ___ret201;
            }
          }
          switch (id.length) {
          case 2: {
              var ___ret202 = id === 'if' || id === 'in' || id === 'do';
              window.ins_exit(26014);
              return ___ret202;
            }
          case 3: {
              var ___ret203 = id === 'var' || id === 'for' || id === 'new' || id === 'try';
              window.ins_exit(26014);
              return ___ret203;
            }
          case 4: {
              var ___ret204 = id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
              window.ins_exit(26014);
              return ___ret204;
            }
          case 5: {
              var ___ret205 = id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
              window.ins_exit(26014);
              return ___ret205;
            }
          case 6: {
              var ___ret206 = id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
              window.ins_exit(26014);
              return ___ret206;
            }
          case 7: {
              var ___ret207 = id === 'default' || id === 'finally' || id === 'extends';
              window.ins_exit(26014);
              return ___ret207;
            }
          case 8: {
              var ___ret208 = id === 'function' || id === 'continue' || id === 'debugger';
              window.ins_exit(26014);
              return ___ret208;
            }
          case 10: {
              var ___ret209 = id === 'instanceof';
              window.ins_exit(26014);
              return ___ret209;
            }
          default: {
              var ___ret210 = false;
              window.ins_exit(26014);
              return ___ret210;
            }
          }
          window.ins_exit(26014);
        }
        function isRestrictedWord(id) {
          window.ins_enter(26191);
          {
            var ___ret211 = id === 'eval' || id === 'arguments';
            window.ins_exit(26191);
            return ___ret211;
          }
        }
        function isIdentifierName(id) {
          window.ins_enter(26207);
          var i, iz, ch;
          if (id.length === 0) {
            {
              var ___ret212 = false;
              window.ins_exit(26207);
              return ___ret212;
            }
          }
          ch = id.charCodeAt(0);
          if (!code.isIdentifierStart(ch) || ch === 92) {
            {
              var ___ret213 = false;
              window.ins_exit(26207);
              return ___ret213;
            }
          }
          for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPart(ch) || ch === 92) {
              {
                var ___ret214 = false;
                window.ins_exit(26207);
                return ___ret214;
              }
            }
          }
          {
            var ___ret215 = true;
            window.ins_exit(26207);
            return ___ret215;
          }
        }
        module.exports = {
          isKeywordES5: isKeywordES5,
          isKeywordES6: isKeywordES6,
          isRestrictedWord: isRestrictedWord,
          isIdentifierName: isIdentifierName
        };
        window.ins_exit(25945);
      }());
      window.ins_exit(25934);
    },
    { './code': 9 }
  ],
  11: [
    function (require, module, exports) {
      window.ins_enter(26318);
      (function () {
        window.ins_enter(26329);
        'use strict';
        exports.code = require('./code');
        exports.keyword = require('./keyword');
        window.ins_exit(26329);
      }());
      window.ins_exit(26318);
    },
    {
      './code': 9,
      './keyword': 10
    }
  ],
  12: [
    function (require, module, exports) {
      window.ins_enter(26363);
      exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
      exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
      exports.SourceNode = require('./source-map/source-node').SourceNode;
      window.ins_exit(26363);
    },
    {
      './source-map/source-map-consumer': 17,
      './source-map/source-map-generator': 18,
      './source-map/source-node': 19
    }
  ],
  13: [
    function (require, module, exports) {
      window.ins_enter(26415);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(26442);
        var util = require('./util');
        function ArraySet() {
          window.ins_enter(26457);
          this._array = [];
          this._set = {};
          window.ins_exit(26457);
        }
        ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
          window.ins_enter(26481);
          var set = new ArraySet();
          for (var i = 0, len = aArray.length; i < len; i++) {
            set.add(aArray[i], aAllowDuplicates);
          }
          {
            window.ins_exit(26481);
            return set;
          }
        };
        ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
          window.ins_enter(26529);
          var isDuplicate = this.has(aStr);
          var idx = this._array.length;
          if (!isDuplicate || aAllowDuplicates) {
            this._array.push(aStr);
          }
          if (!isDuplicate) {
            this._set[util.toSetString(aStr)] = idx;
          }
          window.ins_exit(26529);
        };
        ArraySet.prototype.has = function ArraySet_has(aStr) {
          window.ins_enter(26591);
          {
            var ___ret216 = Object.prototype.hasOwnProperty.call(this._set, util.toSetString(aStr));
            window.ins_exit(26591);
            return ___ret216;
          }
        };
        ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
          window.ins_enter(26623);
          if (this.has(aStr)) {
            {
              var ___ret217 = this._set[util.toSetString(aStr)];
              window.ins_exit(26623);
              return ___ret217;
            }
          }
          throw new Error('"' + aStr + '" is not in the set.');
          window.ins_exit(26623);
        };
        ArraySet.prototype.at = function ArraySet_at(aIdx) {
          window.ins_enter(26663);
          if (aIdx >= 0 && aIdx < this._array.length) {
            {
              var ___ret218 = this._array[aIdx];
              window.ins_exit(26663);
              return ___ret218;
            }
          }
          throw new Error('No element indexed by ' + aIdx);
          window.ins_exit(26663);
        };
        ArraySet.prototype.toArray = function ArraySet_toArray() {
          window.ins_enter(26703);
          {
            var ___ret219 = this._array.slice();
            window.ins_exit(26703);
            return ___ret219;
          }
        };
        exports.ArraySet = ArraySet;
        window.ins_exit(26442);
      });
      window.ins_exit(26415);
    },
    {
      './util': 20,
      'amdefine': 21
    }
  ],
  14: [
    function (require, module, exports) {
      window.ins_enter(26733);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(26760);
        var base64 = require('./base64');
        var VLQ_BASE_SHIFT = 5;
        var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
        var VLQ_BASE_MASK = VLQ_BASE - 1;
        var VLQ_CONTINUATION_BIT = VLQ_BASE;
        function toVLQSigned(aValue) {
          window.ins_enter(26795);
          {
            var ___ret220 = aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
            window.ins_exit(26795);
            return ___ret220;
          }
        }
        function fromVLQSigned(aValue) {
          window.ins_enter(26819);
          var isNegative = (aValue & 1) === 1;
          var shifted = aValue >> 1;
          {
            var ___ret221 = isNegative ? -shifted : shifted;
            window.ins_exit(26819);
            return ___ret221;
          }
        }
        exports.encode = function base64VLQ_encode(aValue) {
          window.ins_enter(26852);
          var encoded = '';
          var digit;
          var vlq = toVLQSigned(aValue);
          do {
            digit = vlq & VLQ_BASE_MASK;
            vlq >>>= VLQ_BASE_SHIFT;
            if (vlq > 0) {
              digit |= VLQ_CONTINUATION_BIT;
            }
            encoded += base64.encode(digit);
          } while (vlq > 0);
          {
            window.ins_exit(26852);
            return encoded;
          }
        };
        exports.decode = function base64VLQ_decode(aStr) {
          window.ins_enter(26912);
          var i = 0;
          var strLen = aStr.length;
          var result = 0;
          var shift = 0;
          var continuation, digit;
          do {
            if (i >= strLen) {
              throw new Error('Expected more digits in base 64 VLQ value.');
            }
            digit = base64.decode(aStr.charAt(i++));
            continuation = !!(digit & VLQ_CONTINUATION_BIT);
            digit &= VLQ_BASE_MASK;
            result = result + (digit << shift);
            shift += VLQ_BASE_SHIFT;
          } while (continuation);
          {
            var ___ret222 = {
                value: fromVLQSigned(result),
                rest: aStr.slice(i)
              };
            window.ins_exit(26912);
            return ___ret222;
          }
        };
        window.ins_exit(26760);
      });
      window.ins_exit(26733);
    },
    {
      './base64': 15,
      'amdefine': 21
    }
  ],
  15: [
    function (require, module, exports) {
      window.ins_enter(27016);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(27043);
        var charToIntMap = {};
        var intToCharMap = {};
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').forEach(function (ch, index) {
          window.ins_enter(27069);
          charToIntMap[ch] = index;
          intToCharMap[index] = ch;
          window.ins_exit(27069);
        });
        exports.encode = function base64_encode(aNumber) {
          window.ins_enter(27094);
          if (aNumber in intToCharMap) {
            {
              var ___ret223 = intToCharMap[aNumber];
              window.ins_exit(27094);
              return ___ret223;
            }
          }
          throw new TypeError('Must be between 0 and 63: ' + aNumber);
          window.ins_exit(27094);
        };
        exports.decode = function base64_decode(aChar) {
          window.ins_enter(27122);
          if (aChar in charToIntMap) {
            {
              var ___ret224 = charToIntMap[aChar];
              window.ins_exit(27122);
              return ___ret224;
            }
          }
          throw new TypeError('Not a valid base 64 digit: ' + aChar);
          window.ins_exit(27122);
        };
        window.ins_exit(27043);
      });
      window.ins_exit(27016);
    },
    { 'amdefine': 21 }
  ],
  16: [
    function (require, module, exports) {
      window.ins_enter(27152);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(27179);
        function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
          window.ins_enter(27188);
          var mid = Math.floor((aHigh - aLow) / 2) + aLow;
          var cmp = aCompare(aNeedle, aHaystack[mid], true);
          if (cmp === 0) {
            {
              var ___ret225 = aHaystack[mid];
              window.ins_exit(27188);
              return ___ret225;
            }
          } else if (cmp > 0) {
            if (aHigh - mid > 1) {
              {
                var ___ret226 = recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
                window.ins_exit(27188);
                return ___ret226;
              }
            }
            {
              var ___ret227 = aHaystack[mid];
              window.ins_exit(27188);
              return ___ret227;
            }
          } else {
            if (mid - aLow > 1) {
              {
                var ___ret228 = recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
                window.ins_exit(27188);
                return ___ret228;
              }
            }
            {
              var ___ret229 = aLow < 0 ? null : aHaystack[aLow];
              window.ins_exit(27188);
              return ___ret229;
            }
          }
          window.ins_exit(27188);
        }
        exports.search = function search(aNeedle, aHaystack, aCompare) {
          window.ins_enter(27287);
          {
            var ___ret230 = aHaystack.length > 0 ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare) : null;
            window.ins_exit(27287);
            return ___ret230;
          }
        };
        window.ins_exit(27179);
      });
      window.ins_exit(27152);
    },
    { 'amdefine': 21 }
  ],
  17: [
    function (require, module, exports) {
      window.ins_enter(27322);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(27349);
        var util = require('./util');
        var binarySearch = require('./binary-search');
        var ArraySet = require('./array-set').ArraySet;
        var base64VLQ = require('./base64-vlq');
        function SourceMapConsumer(aSourceMap) {
          window.ins_enter(27384);
          var sourceMap = aSourceMap;
          if (typeof aSourceMap === 'string') {
            sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
          }
          var version = util.getArg(sourceMap, 'version');
          var sources = util.getArg(sourceMap, 'sources');
          var names = util.getArg(sourceMap, 'names', []);
          var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
          var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
          var mappings = util.getArg(sourceMap, 'mappings');
          var file = util.getArg(sourceMap, 'file', null);
          if (version != this._version) {
            throw new Error('Unsupported version: ' + version);
          }
          this._names = ArraySet.fromArray(names, true);
          this._sources = ArraySet.fromArray(sources, true);
          this.sourceRoot = sourceRoot;
          this.sourcesContent = sourcesContent;
          this._mappings = mappings;
          this.file = file;
          window.ins_exit(27384);
        }
        SourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap) {
          window.ins_enter(27546);
          var smc = Object.create(SourceMapConsumer.prototype);
          smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
          smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
          smc.sourceRoot = aSourceMap._sourceRoot;
          smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
          smc.file = aSourceMap._file;
          smc.__generatedMappings = aSourceMap._mappings.slice().sort(util.compareByGeneratedPositions);
          smc.__originalMappings = aSourceMap._mappings.slice().sort(util.compareByOriginalPositions);
          {
            window.ins_exit(27546);
            return smc;
          }
        };
        SourceMapConsumer.prototype._version = 3;
        Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
          get: function () {
            window.ins_enter(27686);
            {
              var ___ret231 = this._sources.toArray().map(function (s) {
                  window.ins_enter(27702);
                  {
                    var ___ret232 = this.sourceRoot ? util.join(this.sourceRoot, s) : s;
                    window.ins_exit(27702);
                    return ___ret232;
                  }
                }, this);
              window.ins_exit(27686);
              return ___ret231;
            }
          }
        });
        SourceMapConsumer.prototype.__generatedMappings = null;
        Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
          get: function () {
            window.ins_enter(27744);
            if (!this.__generatedMappings) {
              this.__generatedMappings = [];
              this.__originalMappings = [];
              this._parseMappings(this._mappings, this.sourceRoot);
            }
            {
              var ___ret233 = this.__generatedMappings;
              window.ins_exit(27744);
              return ___ret233;
            }
          }
        });
        SourceMapConsumer.prototype.__originalMappings = null;
        Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
          get: function () {
            window.ins_enter(27803);
            if (!this.__originalMappings) {
              this.__generatedMappings = [];
              this.__originalMappings = [];
              this._parseMappings(this._mappings, this.sourceRoot);
            }
            {
              var ___ret234 = this.__originalMappings;
              window.ins_exit(27803);
              return ___ret234;
            }
          }
        });
        SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
          window.ins_enter(27849);
          var generatedLine = 1;
          var previousGeneratedColumn = 0;
          var previousOriginalLine = 0;
          var previousOriginalColumn = 0;
          var previousSource = 0;
          var previousName = 0;
          var mappingSeparator = /^[,;]/;
          var str = aStr;
          var mapping;
          var temp;
          while (str.length > 0) {
            if (str.charAt(0) === ';') {
              generatedLine++;
              str = str.slice(1);
              previousGeneratedColumn = 0;
            } else if (str.charAt(0) === ',') {
              str = str.slice(1);
            } else {
              mapping = {};
              mapping.generatedLine = generatedLine;
              temp = base64VLQ.decode(str);
              mapping.generatedColumn = previousGeneratedColumn + temp.value;
              previousGeneratedColumn = mapping.generatedColumn;
              str = temp.rest;
              if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
                temp = base64VLQ.decode(str);
                mapping.source = this._sources.at(previousSource + temp.value);
                previousSource += temp.value;
                str = temp.rest;
                if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
                  throw new Error('Found a source, but no line and column');
                }
                temp = base64VLQ.decode(str);
                mapping.originalLine = previousOriginalLine + temp.value;
                previousOriginalLine = mapping.originalLine;
                mapping.originalLine += 1;
                str = temp.rest;
                if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
                  throw new Error('Found a source and line, but no column');
                }
                temp = base64VLQ.decode(str);
                mapping.originalColumn = previousOriginalColumn + temp.value;
                previousOriginalColumn = mapping.originalColumn;
                str = temp.rest;
                if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
                  temp = base64VLQ.decode(str);
                  mapping.name = this._names.at(previousName + temp.value);
                  previousName += temp.value;
                  str = temp.rest;
                }
              }
              this.__generatedMappings.push(mapping);
              if (typeof mapping.originalLine === 'number') {
                this.__originalMappings.push(mapping);
              }
            }
          }
          this.__generatedMappings.sort(util.compareByGeneratedPositions);
          this.__originalMappings.sort(util.compareByOriginalPositions);
          window.ins_exit(27849);
        };
        SourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator) {
          window.ins_enter(28252);
          if (aNeedle[aLineName] <= 0) {
            throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
          }
          if (aNeedle[aColumnName] < 0) {
            throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
          }
          {
            var ___ret235 = binarySearch.search(aNeedle, aMappings, aComparator);
            window.ins_exit(28252);
            return ___ret235;
          }
        };
        SourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
          window.ins_enter(28309);
          var needle = {
              generatedLine: util.getArg(aArgs, 'line'),
              generatedColumn: util.getArg(aArgs, 'column')
            };
          var mapping = this._findMapping(needle, this._generatedMappings, 'generatedLine', 'generatedColumn', util.compareByGeneratedPositions);
          if (mapping && mapping.generatedLine === needle.generatedLine) {
            var source = util.getArg(mapping, 'source', null);
            if (source && this.sourceRoot) {
              source = util.join(this.sourceRoot, source);
            }
            {
              var ___ret236 = {
                  source: source,
                  line: util.getArg(mapping, 'originalLine', null),
                  column: util.getArg(mapping, 'originalColumn', null),
                  name: util.getArg(mapping, 'name', null)
                };
              window.ins_exit(28309);
              return ___ret236;
            }
          }
          {
            var ___ret237 = {
                source: null,
                line: null,
                column: null,
                name: null
              };
            window.ins_exit(28309);
            return ___ret237;
          }
        };
        SourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource) {
          window.ins_enter(28445);
          if (!this.sourcesContent) {
            {
              var ___ret238 = null;
              window.ins_exit(28445);
              return ___ret238;
            }
          }
          if (this.sourceRoot) {
            aSource = util.relative(this.sourceRoot, aSource);
          }
          if (this._sources.has(aSource)) {
            {
              var ___ret239 = this.sourcesContent[this._sources.indexOf(aSource)];
              window.ins_exit(28445);
              return ___ret239;
            }
          }
          var url;
          if (this.sourceRoot && (url = util.urlParse(this.sourceRoot))) {
            var fileUriAbsPath = aSource.replace(/^file:\/\//, '');
            if (url.scheme == 'file' && this._sources.has(fileUriAbsPath)) {
              {
                var ___ret240 = this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
                window.ins_exit(28445);
                return ___ret240;
              }
            }
            if ((!url.path || url.path == '/') && this._sources.has('/' + aSource)) {
              {
                var ___ret241 = this.sourcesContent[this._sources.indexOf('/' + aSource)];
                window.ins_exit(28445);
                return ___ret241;
              }
            }
          }
          throw new Error('"' + aSource + '" is not in the SourceMap.');
          window.ins_exit(28445);
        };
        SourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
          window.ins_enter(28603);
          var needle = {
              source: util.getArg(aArgs, 'source'),
              originalLine: util.getArg(aArgs, 'line'),
              originalColumn: util.getArg(aArgs, 'column')
            };
          if (this.sourceRoot) {
            needle.source = util.relative(this.sourceRoot, needle.source);
          }
          var mapping = this._findMapping(needle, this._originalMappings, 'originalLine', 'originalColumn', util.compareByOriginalPositions);
          if (mapping) {
            {
              var ___ret242 = {
                  line: util.getArg(mapping, 'generatedLine', null),
                  column: util.getArg(mapping, 'generatedColumn', null)
                };
              window.ins_exit(28603);
              return ___ret242;
            }
          }
          {
            var ___ret243 = {
                line: null,
                column: null
              };
            window.ins_exit(28603);
            return ___ret243;
          }
        };
        SourceMapConsumer.GENERATED_ORDER = 1;
        SourceMapConsumer.ORIGINAL_ORDER = 2;
        SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
          window.ins_enter(28725);
          var context = aContext || null;
          var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
          var mappings;
          switch (order) {
          case SourceMapConsumer.GENERATED_ORDER:
            mappings = this._generatedMappings;
            break;
          case SourceMapConsumer.ORIGINAL_ORDER:
            mappings = this._originalMappings;
            break;
          default:
            throw new Error('Unknown order of iteration.');
          }
          var sourceRoot = this.sourceRoot;
          mappings.map(function (mapping) {
            window.ins_enter(28794);
            var source = mapping.source;
            if (source && sourceRoot) {
              source = util.join(sourceRoot, source);
            }
            {
              var ___ret244 = {
                  source: source,
                  generatedLine: mapping.generatedLine,
                  generatedColumn: mapping.generatedColumn,
                  originalLine: mapping.originalLine,
                  originalColumn: mapping.originalColumn,
                  name: mapping.name
                };
              window.ins_exit(28794);
              return ___ret244;
            }
          }).forEach(aCallback, context);
          window.ins_exit(28725);
        };
        exports.SourceMapConsumer = SourceMapConsumer;
        window.ins_exit(27349);
      });
      window.ins_exit(27322);
    },
    {
      './array-set': 13,
      './base64-vlq': 14,
      './binary-search': 16,
      './util': 20,
      'amdefine': 21
    }
  ],
  18: [
    function (require, module, exports) {
      window.ins_enter(28879);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(28906);
        var base64VLQ = require('./base64-vlq');
        var util = require('./util');
        var ArraySet = require('./array-set').ArraySet;
        function SourceMapGenerator(aArgs) {
          window.ins_enter(28935);
          if (!aArgs) {
            aArgs = {};
          }
          this._file = util.getArg(aArgs, 'file', null);
          this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
          this._sources = new ArraySet();
          this._names = new ArraySet();
          this._mappings = [];
          this._sourcesContents = null;
          window.ins_exit(28935);
        }
        SourceMapGenerator.prototype._version = 3;
        SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
          window.ins_enter(29014);
          var sourceRoot = aSourceMapConsumer.sourceRoot;
          var generator = new SourceMapGenerator({
              file: aSourceMapConsumer.file,
              sourceRoot: sourceRoot
            });
          aSourceMapConsumer.eachMapping(function (mapping) {
            window.ins_enter(29047);
            var newMapping = {
                generated: {
                  line: mapping.generatedLine,
                  column: mapping.generatedColumn
                }
              };
            if (mapping.source) {
              newMapping.source = mapping.source;
              if (sourceRoot) {
                newMapping.source = util.relative(sourceRoot, newMapping.source);
              }
              newMapping.original = {
                line: mapping.originalLine,
                column: mapping.originalColumn
              };
              if (mapping.name) {
                newMapping.name = mapping.name;
              }
            }
            generator.addMapping(newMapping);
            window.ins_exit(29047);
          });
          aSourceMapConsumer.sources.forEach(function (sourceFile) {
            window.ins_enter(29142);
            var content = aSourceMapConsumer.sourceContentFor(sourceFile);
            if (content) {
              generator.setSourceContent(sourceFile, content);
            }
            window.ins_exit(29142);
          });
          {
            window.ins_exit(29014);
            return generator;
          }
        };
        SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
          window.ins_enter(29176);
          var generated = util.getArg(aArgs, 'generated');
          var original = util.getArg(aArgs, 'original', null);
          var source = util.getArg(aArgs, 'source', null);
          var name = util.getArg(aArgs, 'name', null);
          this._validateMapping(generated, original, source, name);
          if (source && !this._sources.has(source)) {
            this._sources.add(source);
          }
          if (name && !this._names.has(name)) {
            this._names.add(name);
          }
          this._mappings.push({
            generatedLine: generated.line,
            generatedColumn: generated.column,
            originalLine: original != null && original.line,
            originalColumn: original != null && original.column,
            source: source,
            name: name
          });
          window.ins_exit(29176);
        };
        SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
          window.ins_enter(29321);
          var source = aSourceFile;
          if (this._sourceRoot) {
            source = util.relative(this._sourceRoot, source);
          }
          if (aSourceContent !== null) {
            if (!this._sourcesContents) {
              this._sourcesContents = {};
            }
            this._sourcesContents[util.toSetString(source)] = aSourceContent;
          } else {
            delete this._sourcesContents[util.toSetString(source)];
            if (Object.keys(this._sourcesContents).length === 0) {
              this._sourcesContents = null;
            }
          }
          window.ins_exit(29321);
        };
        SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
          window.ins_enter(29417);
          if (!aSourceFile) {
            if (!aSourceMapConsumer.file) {
              throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
            }
            aSourceFile = aSourceMapConsumer.file;
          }
          var sourceRoot = this._sourceRoot;
          if (sourceRoot) {
            aSourceFile = util.relative(sourceRoot, aSourceFile);
          }
          var newSources = new ArraySet();
          var newNames = new ArraySet();
          this._mappings.forEach(function (mapping) {
            window.ins_enter(29484);
            if (mapping.source === aSourceFile && mapping.originalLine) {
              var original = aSourceMapConsumer.originalPositionFor({
                  line: mapping.originalLine,
                  column: mapping.originalColumn
                });
              if (original.source !== null) {
                mapping.source = original.source;
                if (aSourceMapPath) {
                  mapping.source = util.join(aSourceMapPath, mapping.source);
                }
                if (sourceRoot) {
                  mapping.source = util.relative(sourceRoot, mapping.source);
                }
                mapping.originalLine = original.line;
                mapping.originalColumn = original.column;
                if (original.name !== null && mapping.name !== null) {
                  mapping.name = original.name;
                }
              }
            }
            var source = mapping.source;
            if (source && !newSources.has(source)) {
              newSources.add(source);
            }
            var name = mapping.name;
            if (name && !newNames.has(name)) {
              newNames.add(name);
            }
            window.ins_exit(29484);
          }, this);
          this._sources = newSources;
          this._names = newNames;
          aSourceMapConsumer.sources.forEach(function (sourceFile) {
            window.ins_enter(29668);
            var content = aSourceMapConsumer.sourceContentFor(sourceFile);
            if (content) {
              if (sourceRoot) {
                sourceFile = util.relative(sourceRoot, sourceFile);
              }
              this.setSourceContent(sourceFile, content);
            }
            window.ins_exit(29668);
          }, this);
          window.ins_exit(29417);
        };
        SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
          window.ins_enter(29713);
          if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
            {
              window.ins_exit(29713);
              return;
            }
          } else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
            {
              window.ins_exit(29713);
              return;
            }
          } else {
            throw new Error('Invalid mapping: ' + JSON.stringify({
              generated: aGenerated,
              source: aSource,
              original: aOriginal,
              name: aName
            }));
          }
          window.ins_exit(29713);
        };
        SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
          window.ins_enter(29835);
          var previousGeneratedColumn = 0;
          var previousGeneratedLine = 1;
          var previousOriginalColumn = 0;
          var previousOriginalLine = 0;
          var previousName = 0;
          var previousSource = 0;
          var result = '';
          var mapping;
          this._mappings.sort(util.compareByGeneratedPositions);
          for (var i = 0, len = this._mappings.length; i < len; i++) {
            mapping = this._mappings[i];
            if (mapping.generatedLine !== previousGeneratedLine) {
              previousGeneratedColumn = 0;
              while (mapping.generatedLine !== previousGeneratedLine) {
                result += ';';
                previousGeneratedLine++;
              }
            } else {
              if (i > 0) {
                if (!util.compareByGeneratedPositions(mapping, this._mappings[i - 1])) {
                  continue;
                }
                result += ',';
              }
            }
            result += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
            previousGeneratedColumn = mapping.generatedColumn;
            if (mapping.source) {
              result += base64VLQ.encode(this._sources.indexOf(mapping.source) - previousSource);
              previousSource = this._sources.indexOf(mapping.source);
              result += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
              previousOriginalLine = mapping.originalLine - 1;
              result += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
              previousOriginalColumn = mapping.originalColumn;
              if (mapping.name) {
                result += base64VLQ.encode(this._names.indexOf(mapping.name) - previousName);
                previousName = this._names.indexOf(mapping.name);
              }
            }
          }
          {
            window.ins_exit(29835);
            return result;
          }
        };
        SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
          window.ins_enter(30097);
          {
            var ___ret245 = aSources.map(function (source) {
                window.ins_enter(30111);
                if (!this._sourcesContents) {
                  {
                    var ___ret246 = null;
                    window.ins_exit(30111);
                    return ___ret246;
                  }
                }
                if (aSourceRoot) {
                  source = util.relative(aSourceRoot, source);
                }
                var key = util.toSetString(source);
                {
                  var ___ret247 = Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
                  window.ins_exit(30111);
                  return ___ret247;
                }
              }, this);
            window.ins_exit(30097);
            return ___ret245;
          }
        };
        SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
          window.ins_enter(30174);
          var map = {
              version: this._version,
              file: this._file,
              sources: this._sources.toArray(),
              names: this._names.toArray(),
              mappings: this._serializeMappings()
            };
          if (this._sourceRoot) {
            map.sourceRoot = this._sourceRoot;
          }
          if (this._sourcesContents) {
            map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
          }
          {
            window.ins_exit(30174);
            return map;
          }
        };
        SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
          window.ins_enter(30259);
          {
            var ___ret248 = JSON.stringify(this);
            window.ins_exit(30259);
            return ___ret248;
          }
        };
        exports.SourceMapGenerator = SourceMapGenerator;
        window.ins_exit(28906);
      });
      window.ins_exit(28879);
    },
    {
      './array-set': 13,
      './base64-vlq': 14,
      './util': 20,
      'amdefine': 21
    }
  ],
  19: [
    function (require, module, exports) {
      window.ins_enter(30294);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(30321);
        var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;
        var util = require('./util');
        function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
          window.ins_enter(30344);
          this.children = [];
          this.sourceContents = {};
          this.line = aLine === undefined ? null : aLine;
          this.column = aColumn === undefined ? null : aColumn;
          this.source = aSource === undefined ? null : aSource;
          this.name = aName === undefined ? null : aName;
          if (aChunks != null)
            this.add(aChunks);
          window.ins_exit(30344);
        }
        SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer) {
          window.ins_enter(30427);
          var node = new SourceNode();
          var remainingLines = aGeneratedCode.split('\n');
          var lastGeneratedLine = 1, lastGeneratedColumn = 0;
          var lastMapping = null;
          aSourceMapConsumer.eachMapping(function (mapping) {
            window.ins_enter(30465);
            if (lastMapping !== null) {
              if (lastGeneratedLine < mapping.generatedLine) {
                var code = '';
                addMappingWithCode(lastMapping, remainingLines.shift() + '\n');
                lastGeneratedLine++;
                lastGeneratedColumn = 0;
              } else {
                var nextLine = remainingLines[0];
                var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                lastGeneratedColumn = mapping.generatedColumn;
                addMappingWithCode(lastMapping, code);
                lastMapping = mapping;
                {
                  window.ins_exit(30465);
                  return;
                }
              }
            }
            while (lastGeneratedLine < mapping.generatedLine) {
              node.add(remainingLines.shift() + '\n');
              lastGeneratedLine++;
            }
            if (lastGeneratedColumn < mapping.generatedColumn) {
              var nextLine = remainingLines[0];
              node.add(nextLine.substr(0, mapping.generatedColumn));
              remainingLines[0] = nextLine.substr(mapping.generatedColumn);
              lastGeneratedColumn = mapping.generatedColumn;
            }
            lastMapping = mapping;
            window.ins_exit(30465);
          }, this);
          if (remainingLines.length > 0) {
            if (lastMapping) {
              var lastLine = remainingLines.shift();
              if (remainingLines.length > 0)
                lastLine += '\n';
              addMappingWithCode(lastMapping, lastLine);
            }
            node.add(remainingLines.join('\n'));
          }
          aSourceMapConsumer.sources.forEach(function (sourceFile) {
            window.ins_enter(30674);
            var content = aSourceMapConsumer.sourceContentFor(sourceFile);
            if (content) {
              node.setSourceContent(sourceFile, content);
            }
            window.ins_exit(30674);
          });
          {
            window.ins_exit(30427);
            return node;
          }
          function addMappingWithCode(mapping, code) {
            window.ins_enter(30701);
            if (mapping === null || mapping.source === undefined) {
              node.add(code);
            } else {
              node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, mapping.source, code, mapping.name));
            }
            window.ins_exit(30701);
          }
          window.ins_exit(30427);
        };
        SourceNode.prototype.add = function SourceNode_add(aChunk) {
          window.ins_enter(30755);
          if (Array.isArray(aChunk)) {
            aChunk.forEach(function (chunk) {
              window.ins_enter(30775);
              this.add(chunk);
              window.ins_exit(30775);
            }, this);
          } else if (aChunk instanceof SourceNode || typeof aChunk === 'string') {
            if (aChunk) {
              this.children.push(aChunk);
            }
          } else {
            throw new TypeError('Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk);
          }
          {
            var ___ret249 = this;
            window.ins_exit(30755);
            return ___ret249;
          }
        };
        SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
          window.ins_enter(30826);
          if (Array.isArray(aChunk)) {
            for (var i = aChunk.length - 1; i >= 0; i--) {
              this.prepend(aChunk[i]);
            }
          } else if (aChunk instanceof SourceNode || typeof aChunk === 'string') {
            this.children.unshift(aChunk);
          } else {
            throw new TypeError('Expected a SourceNode, string, or an array of SourceNodes and strings. Got ' + aChunk);
          }
          {
            var ___ret250 = this;
            window.ins_exit(30826);
            return ___ret250;
          }
        };
        SourceNode.prototype.walk = function SourceNode_walk(aFn) {
          window.ins_enter(30898);
          var chunk;
          for (var i = 0, len = this.children.length; i < len; i++) {
            chunk = this.children[i];
            if (chunk instanceof SourceNode) {
              chunk.walk(aFn);
            } else {
              if (chunk !== '') {
                aFn(chunk, {
                  source: this.source,
                  line: this.line,
                  column: this.column,
                  name: this.name
                });
              }
            }
          }
          window.ins_exit(30898);
        };
        SourceNode.prototype.join = function SourceNode_join(aSep) {
          window.ins_enter(30984);
          var newChildren;
          var i;
          var len = this.children.length;
          if (len > 0) {
            newChildren = [];
            for (i = 0; i < len - 1; i++) {
              newChildren.push(this.children[i]);
              newChildren.push(aSep);
            }
            newChildren.push(this.children[i]);
            this.children = newChildren;
          }
          {
            var ___ret251 = this;
            window.ins_exit(30984);
            return ___ret251;
          }
        };
        SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
          window.ins_enter(31068);
          var lastChild = this.children[this.children.length - 1];
          if (lastChild instanceof SourceNode) {
            lastChild.replaceRight(aPattern, aReplacement);
          } else if (typeof lastChild === 'string') {
            this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
          } else {
            this.children.push(''.replace(aPattern, aReplacement));
          }
          {
            var ___ret252 = this;
            window.ins_exit(31068);
            return ___ret252;
          }
        };
        SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
          window.ins_enter(31151);
          this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
          window.ins_exit(31151);
        };
        SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
          window.ins_enter(31179);
          for (var i = 0, len = this.children.length; i < len; i++) {
            if (this.children[i] instanceof SourceNode) {
              this.children[i].walkSourceContents(aFn);
            }
          }
          var sources = Object.keys(this.sourceContents);
          for (var i = 0, len = sources.length; i < len; i++) {
            aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
          }
          window.ins_exit(31179);
        };
        SourceNode.prototype.toString = function SourceNode_toString() {
          window.ins_enter(31274);
          var str = '';
          this.walk(function (chunk) {
            window.ins_enter(31290);
            str += chunk;
            window.ins_exit(31290);
          });
          {
            window.ins_exit(31274);
            return str;
          }
        };
        SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
          window.ins_enter(31310);
          var generated = {
              code: '',
              line: 1,
              column: 0
            };
          var map = new SourceMapGenerator(aArgs);
          var sourceMappingActive = false;
          var lastOriginalSource = null;
          var lastOriginalLine = null;
          var lastOriginalColumn = null;
          var lastOriginalName = null;
          this.walk(function (chunk, original) {
            window.ins_enter(31362);
            generated.code += chunk;
            if (original.source !== null && original.line !== null && original.column !== null) {
              if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
                map.addMapping({
                  source: original.source,
                  original: {
                    line: original.line,
                    column: original.column
                  },
                  generated: {
                    line: generated.line,
                    column: generated.column
                  },
                  name: original.name
                });
              }
              lastOriginalSource = original.source;
              lastOriginalLine = original.line;
              lastOriginalColumn = original.column;
              lastOriginalName = original.name;
              sourceMappingActive = true;
            } else if (sourceMappingActive) {
              map.addMapping({
                generated: {
                  line: generated.line,
                  column: generated.column
                }
              });
              lastOriginalSource = null;
              sourceMappingActive = false;
            }
            chunk.split('').forEach(function (ch, idx, array) {
              window.ins_enter(31529);
              if (ch === '\n') {
                generated.line++;
                generated.column = 0;
                if (idx + 1 === array.length) {
                  lastOriginalSource = null;
                  sourceMappingActive = false;
                } else if (sourceMappingActive) {
                  map.addMapping({
                    source: original.source,
                    original: {
                      line: original.line,
                      column: original.column
                    },
                    generated: {
                      line: generated.line,
                      column: generated.column
                    },
                    name: original.name
                  });
                }
              } else {
                generated.column++;
              }
              window.ins_exit(31529);
            });
            window.ins_exit(31362);
          });
          this.walkSourceContents(function (sourceFile, sourceContent) {
            window.ins_enter(31627);
            map.setSourceContent(sourceFile, sourceContent);
            window.ins_exit(31627);
          });
          {
            var ___ret253 = {
                code: generated.code,
                map: map
              };
            window.ins_exit(31310);
            return ___ret253;
          }
        };
        exports.SourceNode = SourceNode;
        window.ins_exit(30321);
      });
      window.ins_exit(30294);
    },
    {
      './source-map-generator': 18,
      './util': 20,
      'amdefine': 21
    }
  ],
  20: [
    function (require, module, exports) {
      window.ins_enter(31671);
      if (typeof define !== 'function') {
        var define = require('amdefine')(module, require);
      }
      define(function (require, exports, module) {
        window.ins_enter(31698);
        function getArg(aArgs, aName, aDefaultValue) {
          window.ins_enter(31707);
          if (aName in aArgs) {
            {
              var ___ret254 = aArgs[aName];
              window.ins_exit(31707);
              return ___ret254;
            }
          } else if (arguments.length === 3) {
            {
              window.ins_exit(31707);
              return aDefaultValue;
            }
          } else {
            throw new Error('"' + aName + '" is a required argument.');
          }
          window.ins_exit(31707);
        }
        exports.getArg = getArg;
        var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
        var dataUrlRegexp = /^data:.+\,.+$/;
        function urlParse(aUrl) {
          window.ins_enter(31758);
          var match = aUrl.match(urlRegexp);
          if (!match) {
            {
              var ___ret255 = null;
              window.ins_exit(31758);
              return ___ret255;
            }
          }
          {
            var ___ret256 = {
                scheme: match[1],
                auth: match[2],
                host: match[3],
                port: match[4],
                path: match[5]
              };
            window.ins_exit(31758);
            return ___ret256;
          }
        }
        exports.urlParse = urlParse;
        function urlGenerate(aParsedUrl) {
          window.ins_enter(31813);
          var url = '';
          if (aParsedUrl.scheme) {
            url += aParsedUrl.scheme + ':';
          }
          url += '//';
          if (aParsedUrl.auth) {
            url += aParsedUrl.auth + '@';
          }
          if (aParsedUrl.host) {
            url += aParsedUrl.host;
          }
          if (aParsedUrl.port) {
            url += ':' + aParsedUrl.port;
          }
          if (aParsedUrl.path) {
            url += aParsedUrl.path;
          }
          {
            window.ins_exit(31813);
            return url;
          }
        }
        exports.urlGenerate = urlGenerate;
        function normalize(aPath) {
          window.ins_enter(31898);
          var path = aPath;
          var url = urlParse(aPath);
          if (url) {
            if (!url.path) {
              {
                window.ins_exit(31898);
                return aPath;
              }
            }
            path = url.path;
          }
          var isAbsolute = path.charAt(0) === '/';
          var parts = path.split(/\/+/);
          for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
            part = parts[i];
            if (part === '.') {
              parts.splice(i, 1);
            } else if (part === '..') {
              up++;
            } else if (up > 0) {
              if (part === '') {
                parts.splice(i + 1, up);
                up = 0;
              } else {
                parts.splice(i, 2);
                up--;
              }
            }
          }
          path = parts.join('/');
          if (path === '') {
            path = isAbsolute ? '/' : '.';
          }
          if (url) {
            url.path = path;
            {
              var ___ret257 = urlGenerate(url);
              window.ins_exit(31898);
              return ___ret257;
            }
          }
          {
            window.ins_exit(31898);
            return path;
          }
        }
        exports.normalize = normalize;
        function join(aRoot, aPath) {
          window.ins_enter(32072);
          var aPathUrl = urlParse(aPath);
          var aRootUrl = urlParse(aRoot);
          if (aRootUrl) {
            aRoot = aRootUrl.path || '/';
          }
          if (aPathUrl && !aPathUrl.scheme) {
            if (aRootUrl) {
              aPathUrl.scheme = aRootUrl.scheme;
            }
            {
              var ___ret258 = urlGenerate(aPathUrl);
              window.ins_exit(32072);
              return ___ret258;
            }
          }
          if (aPathUrl || aPath.match(dataUrlRegexp)) {
            {
              window.ins_exit(32072);
              return aPath;
            }
          }
          if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
            aRootUrl.host = aPath;
            {
              var ___ret259 = urlGenerate(aRootUrl);
              window.ins_exit(32072);
              return ___ret259;
            }
          }
          var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
          if (aRootUrl) {
            aRootUrl.path = joined;
            {
              var ___ret260 = urlGenerate(aRootUrl);
              window.ins_exit(32072);
              return ___ret260;
            }
          }
          {
            window.ins_exit(32072);
            return joined;
          }
        }
        exports.join = join;
        function toSetString(aStr) {
          window.ins_enter(32206);
          {
            var ___ret261 = '$' + aStr;
            window.ins_exit(32206);
            return ___ret261;
          }
        }
        exports.toSetString = toSetString;
        function fromSetString(aStr) {
          window.ins_enter(32224);
          {
            var ___ret262 = aStr.substr(1);
            window.ins_exit(32224);
            return ___ret262;
          }
        }
        exports.fromSetString = fromSetString;
        function relative(aRoot, aPath) {
          window.ins_enter(32244);
          aRoot = aRoot.replace(/\/$/, '');
          var url = urlParse(aRoot);
          if (aPath.charAt(0) == '/' && url && url.path == '/') {
            {
              var ___ret263 = aPath.slice(1);
              window.ins_exit(32244);
              return ___ret263;
            }
          }
          {
            var ___ret264 = aPath.indexOf(aRoot + '/') === 0 ? aPath.substr(aRoot.length + 1) : aPath;
            window.ins_exit(32244);
            return ___ret264;
          }
        }
        exports.relative = relative;
        function strcmp(aStr1, aStr2) {
          window.ins_enter(32318);
          var s1 = aStr1 || '';
          var s2 = aStr2 || '';
          {
            var ___ret265 = (s1 > s2) - (s1 < s2);
            window.ins_exit(32318);
            return ___ret265;
          }
        }
        function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
          window.ins_enter(32347);
          var cmp;
          cmp = strcmp(mappingA.source, mappingB.source);
          if (cmp) {
            {
              window.ins_exit(32347);
              return cmp;
            }
          }
          cmp = mappingA.originalLine - mappingB.originalLine;
          if (cmp) {
            {
              window.ins_exit(32347);
              return cmp;
            }
          }
          cmp = mappingA.originalColumn - mappingB.originalColumn;
          if (cmp || onlyCompareOriginal) {
            {
              window.ins_exit(32347);
              return cmp;
            }
          }
          cmp = strcmp(mappingA.name, mappingB.name);
          if (cmp) {
            {
              window.ins_exit(32347);
              return cmp;
            }
          }
          cmp = mappingA.generatedLine - mappingB.generatedLine;
          if (cmp) {
            {
              window.ins_exit(32347);
              return cmp;
            }
          }
          {
            var ___ret266 = mappingA.generatedColumn - mappingB.generatedColumn;
            window.ins_exit(32347);
            return ___ret266;
          }
        }
        ;
        exports.compareByOriginalPositions = compareByOriginalPositions;
        function compareByGeneratedPositions(mappingA, mappingB, onlyCompareGenerated) {
          window.ins_enter(32454);
          var cmp;
          cmp = mappingA.generatedLine - mappingB.generatedLine;
          if (cmp) {
            {
              window.ins_exit(32454);
              return cmp;
            }
          }
          cmp = mappingA.generatedColumn - mappingB.generatedColumn;
          if (cmp || onlyCompareGenerated) {
            {
              window.ins_exit(32454);
              return cmp;
            }
          }
          cmp = strcmp(mappingA.source, mappingB.source);
          if (cmp) {
            {
              window.ins_exit(32454);
              return cmp;
            }
          }
          cmp = mappingA.originalLine - mappingB.originalLine;
          if (cmp) {
            {
              window.ins_exit(32454);
              return cmp;
            }
          }
          cmp = mappingA.originalColumn - mappingB.originalColumn;
          if (cmp) {
            {
              window.ins_exit(32454);
              return cmp;
            }
          }
          {
            var ___ret267 = strcmp(mappingA.name, mappingB.name);
            window.ins_exit(32454);
            return ___ret267;
          }
        }
        ;
        exports.compareByGeneratedPositions = compareByGeneratedPositions;
        window.ins_exit(31698);
      });
      window.ins_exit(31671);
    },
    { 'amdefine': 21 }
  ],
  21: [
    function (require, module, exports) {
      window.ins_enter(32568);
      (function (process, __filename) {
        'use strict';
        function amdefine(module, requireFn) {
          window.ins_enter(32586);
          'use strict';
          var defineCache = {}, loaderCache = {}, alreadyCalled = false, path = require('path'), makeRequire, stringRequire;
          function trimDots(ary) {
            window.ins_enter(32616);
            var i, part;
            for (i = 0; ary[i]; i += 1) {
              part = ary[i];
              if (part === '.') {
                ary.splice(i, 1);
                i -= 1;
              } else if (part === '..') {
                if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                  break;
                } else if (i > 0) {
                  ary.splice(i - 1, 2);
                  i -= 2;
                }
              }
            }
            window.ins_exit(32616);
          }
          function normalize(name, baseName) {
            window.ins_enter(32703);
            var baseParts;
            if (name && name.charAt(0) === '.') {
              if (baseName) {
                baseParts = baseName.split('/');
                baseParts = baseParts.slice(0, baseParts.length - 1);
                baseParts = baseParts.concat(name.split('/'));
                trimDots(baseParts);
                name = baseParts.join('/');
              }
            }
            {
              window.ins_exit(32703);
              return name;
            }
          }
          function makeNormalize(relName) {
            window.ins_enter(32776);
            {
              var ___ret268 = function (name) {
                {
                  var ___ret269 = normalize(name, relName);
                  window.ins_exit(32776);
                  return ___ret269;
                }
              };
              window.ins_exit(32776);
              return ___ret268;
            }
          }
          function makeLoad(id) {
            window.ins_enter(32793);
            function load(value) {
              window.ins_enter(32801);
              loaderCache[id] = value;
              window.ins_exit(32801);
            }
            load.fromText = function (id, text) {
              window.ins_enter(32820);
              throw new Error('amdefine does not implement load.fromText');
              window.ins_exit(32820);
            };
            {
              window.ins_exit(32793);
              return load;
            }
          }
          makeRequire = function (systemRequire, exports, module, relId) {
            window.ins_enter(32837);
            function amdRequire(deps, callback) {
              window.ins_enter(32847);
              if (typeof deps === 'string') {
                {
                  var ___ret270 = stringRequire(systemRequire, exports, module, deps, relId);
                  window.ins_exit(32847);
                  return ___ret270;
                }
              } else {
                deps = deps.map(function (depName) {
                  window.ins_enter(32878);
                  {
                    var ___ret271 = stringRequire(systemRequire, exports, module, depName, relId);
                    window.ins_exit(32878);
                    return ___ret271;
                  }
                });
                process.nextTick(function () {
                  window.ins_enter(32898);
                  callback.apply(null, deps);
                  window.ins_exit(32898);
                });
              }
              window.ins_exit(32847);
            }
            amdRequire.toUrl = function (filePath) {
              window.ins_enter(32916);
              if (filePath.indexOf('.') === 0) {
                {
                  var ___ret272 = normalize(filePath, path.dirname(module.filename));
                  window.ins_exit(32916);
                  return ___ret272;
                }
              } else {
                {
                  window.ins_exit(32916);
                  return filePath;
                }
              }
              window.ins_exit(32916);
            };
            {
              window.ins_exit(32837);
              return amdRequire;
            }
          };
          requireFn = requireFn || function req() {
            {
              var ___ret273 = module.require.apply(module, arguments);
              window.ins_exit(32568);
              return ___ret273;
            }
          };
          function runFactory(id, deps, factory) {
            window.ins_enter(32965);
            var r, e, m, result;
            if (id) {
              e = loaderCache[id] = {};
              m = {
                id: id,
                uri: __filename,
                exports: e
              };
              r = makeRequire(requireFn, e, m, id);
            } else {
              if (alreadyCalled) {
                throw new Error('amdefine with no module ID cannot be called more than once per file.');
              }
              alreadyCalled = true;
              e = module.exports;
              m = module;
              r = makeRequire(requireFn, e, m, module.id);
            }
            if (deps) {
              deps = deps.map(function (depName) {
                window.ins_enter(33060);
                {
                  var ___ret274 = r(depName);
                  window.ins_exit(33060);
                  return ___ret274;
                }
              });
            }
            if (typeof factory === 'function') {
              result = factory.apply(m.exports, deps);
            } else {
              result = factory;
            }
            if (result !== undefined) {
              m.exports = result;
              if (id) {
                loaderCache[id] = m.exports;
              }
            }
            window.ins_exit(32965);
          }
          stringRequire = function (systemRequire, exports, module, id, relId) {
            window.ins_enter(33118);
            var index = id.indexOf('!'), originalId = id, prefix, plugin;
            if (index === -1) {
              id = normalize(id, relId);
              if (id === 'require') {
                {
                  var ___ret275 = makeRequire(systemRequire, exports, module, relId);
                  window.ins_exit(33118);
                  return ___ret275;
                }
              } else if (id === 'exports') {
                {
                  window.ins_exit(33118);
                  return exports;
                }
              } else if (id === 'module') {
                {
                  window.ins_exit(33118);
                  return module;
                }
              } else if (loaderCache.hasOwnProperty(id)) {
                {
                  var ___ret276 = loaderCache[id];
                  window.ins_exit(33118);
                  return ___ret276;
                }
              } else if (defineCache[id]) {
                runFactory.apply(null, defineCache[id]);
                {
                  var ___ret277 = loaderCache[id];
                  window.ins_exit(33118);
                  return ___ret277;
                }
              } else {
                if (systemRequire) {
                  {
                    var ___ret278 = systemRequire(originalId);
                    window.ins_exit(33118);
                    return ___ret278;
                  }
                } else {
                  throw new Error('No module with ID: ' + id);
                }
              }
            } else {
              prefix = id.substring(0, index);
              id = id.substring(index + 1, id.length);
              plugin = stringRequire(systemRequire, exports, module, prefix, relId);
              if (plugin.normalize) {
                id = plugin.normalize(id, makeNormalize(relId));
              } else {
                id = normalize(id, relId);
              }
              if (loaderCache[id]) {
                {
                  var ___ret279 = loaderCache[id];
                  window.ins_exit(33118);
                  return ___ret279;
                }
              } else {
                plugin.load(id, makeRequire(systemRequire, exports, module, relId), makeLoad(id), {});
                {
                  var ___ret280 = loaderCache[id];
                  window.ins_exit(33118);
                  return ___ret280;
                }
              }
            }
            window.ins_exit(33118);
          };
          function define(id, deps, factory) {
            window.ins_enter(33314);
            if (Array.isArray(id)) {
              factory = deps;
              deps = id;
              id = undefined;
            } else if (typeof id !== 'string') {
              factory = id;
              id = deps = undefined;
            }
            if (deps && !Array.isArray(deps)) {
              factory = deps;
              deps = undefined;
            }
            if (!deps) {
              deps = [
                'require',
                'exports',
                'module'
              ];
            }
            if (id) {
              defineCache[id] = [
                id,
                deps,
                factory
              ];
            } else {
              runFactory(id, deps, factory);
            }
            window.ins_exit(33314);
          }
          define.require = function (id) {
            window.ins_enter(33412);
            if (loaderCache[id]) {
              {
                var ___ret281 = loaderCache[id];
                window.ins_exit(33412);
                return ___ret281;
              }
            }
            if (defineCache[id]) {
              runFactory.apply(null, defineCache[id]);
              {
                var ___ret282 = loaderCache[id];
                window.ins_exit(33412);
                return ___ret282;
              }
            }
            window.ins_exit(33412);
          };
          define.amd = {};
          {
            window.ins_exit(undefined);
            return define;
          }
        }
        module.exports = amdefine;
        window.ins_exit(undefined);
      }.call(this, require('cfTRzy'), '/node_modules/escodegen/node_modules/source-map/node_modules/amdefine/amdefine.js'));
      window.ins_exit(undefined);
    },
    {
      'cfTRzy': 3,
      'path': 2
    }
  ],
  22: [
    function (require, module, exports) {
      window.ins_enter(33476);
      module.exports = {
        'name': 'escodegen',
        'description': 'ECMAScript code generator',
        'homepage': 'http://github.com/Constellation/escodegen',
        'main': 'escodegen.js',
        'bin': {
          'esgenerate': './bin/esgenerate.js',
          'escodegen': './bin/escodegen.js'
        },
        'version': '1.3.3',
        'engines': { 'node': '>=0.10.0' },
        'maintainers': [{
            'name': 'constellation',
            'email': 'utatane.tea@gmail.com'
          }],
        'repository': {
          'type': 'git',
          'url': 'http://github.com/Constellation/escodegen.git'
        },
        'dependencies': {
          'esutils': '~1.0.0',
          'estraverse': '~1.5.0',
          'esprima': '~1.1.1',
          'source-map': '~0.1.33'
        },
        'optionalDependencies': { 'source-map': '~0.1.33' },
        'devDependencies': {
          'esprima-moz': '*',
          'semver': '*',
          'chai': '~1.7.2',
          'gulp': '~3.5.0',
          'gulp-mocha': '~0.4.1',
          'gulp-eslint': '~0.1.2',
          'jshint-stylish': '~0.1.5',
          'gulp-jshint': '~1.4.0',
          'commonjs-everywhere': '~0.9.6',
          'bluebird': '~1.2.0',
          'bower-registry-client': '~0.2.0'
        },
        'licenses': [{
            'type': 'BSD',
            'url': 'http://github.com/Constellation/escodegen/raw/master/LICENSE.BSD'
          }],
        'scripts': {
          'test': 'gulp travis',
          'unit-test': 'gulp test',
          'lint': 'gulp lint',
          'release': 'node tools/release.js',
          'build-min': 'cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js',
          'build': 'cjsify -a path: tools/entry-point.js > escodegen.browser.js'
        },
        'bugs': { 'url': 'https://github.com/Constellation/escodegen/issues' },
        '_id': 'escodegen@1.3.3',
        'dist': {
          'shasum': 'f024016f5a88e046fd12005055e939802e6c5f23',
          'tarball': 'http://registry.npmjs.org/escodegen/-/escodegen-1.3.3.tgz'
        },
        '_from': 'escodegen@*',
        '_npmVersion': '1.4.3',
        '_npmUser': {
          'name': 'constellation',
          'email': 'utatane.tea@gmail.com'
        },
        'directories': {},
        '_shasum': 'f024016f5a88e046fd12005055e939802e6c5f23',
        '_resolved': 'https://registry.npmjs.org/escodegen/-/escodegen-1.3.3.tgz'
      };
      window.ins_exit(33476);
    },
    {}
  ],
  23: [
    function (require, module, exports) {
      window.ins_enter(33674);
      (function (root, factory) {
        window.ins_enter(33685);
        'use strict';
        if (typeof define === 'function' && define.amd) {
          define(['exports'], factory);
        } else if (typeof exports !== 'undefined') {
          factory(exports);
        } else {
          factory(root.esprima = {});
        }
        window.ins_exit(33685);
      }(this, function (exports) {
        window.ins_enter(33731);
        'use strict';
        var Token, TokenName, FnExprTokens, Syntax, PropertyKind, Messages, Regex, SyntaxTreeDelegate, source, strict, index, lineNumber, lineStart, length, delegate, lookahead, state, extra;
        Token = {
          BooleanLiteral: 1,
          EOF: 2,
          Identifier: 3,
          Keyword: 4,
          NullLiteral: 5,
          NumericLiteral: 6,
          Punctuator: 7,
          StringLiteral: 8,
          RegularExpression: 9
        };
        TokenName = {};
        TokenName[Token.BooleanLiteral] = 'Boolean';
        TokenName[Token.EOF] = '<end>';
        TokenName[Token.Identifier] = 'Identifier';
        TokenName[Token.Keyword] = 'Keyword';
        TokenName[Token.NullLiteral] = 'Null';
        TokenName[Token.NumericLiteral] = 'Numeric';
        TokenName[Token.Punctuator] = 'Punctuator';
        TokenName[Token.StringLiteral] = 'String';
        TokenName[Token.RegularExpression] = 'RegularExpression';
        FnExprTokens = [
          '(',
          '{',
          '[',
          'in',
          'typeof',
          'instanceof',
          'new',
          'return',
          'case',
          'delete',
          'throw',
          'void',
          '=',
          '+=',
          '-=',
          '*=',
          '/=',
          '%=',
          '<<=',
          '>>=',
          '>>>=',
          '&=',
          '|=',
          '^=',
          ',',
          '+',
          '-',
          '*',
          '/',
          '%',
          '++',
          '--',
          '<<',
          '>>',
          '>>>',
          '&',
          '|',
          '^',
          '!',
          '~',
          '&&',
          '||',
          '?',
          ':',
          '===',
          '==',
          '>=',
          '<=',
          '<',
          '>',
          '!=',
          '!=='
        ];
        Syntax = {
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
        PropertyKind = {
          Data: 1,
          Get: 2,
          Set: 4
        };
        Messages = {
          UnexpectedToken: 'Unexpected token %0',
          UnexpectedNumber: 'Unexpected number',
          UnexpectedString: 'Unexpected string',
          UnexpectedIdentifier: 'Unexpected identifier',
          UnexpectedReserved: 'Unexpected reserved word',
          UnexpectedEOS: 'Unexpected end of input',
          NewlineAfterThrow: 'Illegal newline after throw',
          InvalidRegExp: 'Invalid regular expression',
          UnterminatedRegExp: 'Invalid regular expression: missing /',
          InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
          InvalidLHSInForIn: 'Invalid left-hand side in for-in',
          MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
          NoCatchOrFinally: 'Missing catch or finally after try',
          UnknownLabel: 'Undefined label \'%0\'',
          Redeclaration: '%0 \'%1\' has already been declared',
          IllegalContinue: 'Illegal continue statement',
          IllegalBreak: 'Illegal break statement',
          IllegalReturn: 'Illegal return statement',
          StrictModeWith: 'Strict mode code may not include a with statement',
          StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
          StrictVarName: 'Variable name may not be eval or arguments in strict mode',
          StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
          StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
          StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
          StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
          StrictDelete: 'Delete of an unqualified identifier in strict mode.',
          StrictDuplicateProperty: 'Duplicate data property in object literal not allowed in strict mode',
          AccessorDataProperty: 'Object literal may not have data and accessor property with the same name',
          AccessorGetSet: 'Object literal may not have multiple get/set accessors with the same name',
          StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
          StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
          StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
          StrictReservedWord: 'Use of future reserved word in strict mode'
        };
        Regex = {
          NonAsciiIdentifierStart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]'),
          NonAsciiIdentifierPart: new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]')
        };
        function assert(condition, message) {
          window.ins_enter(34194);
          if (!condition) {
            throw new Error('ASSERT: ' + message);
          }
          window.ins_exit(34194);
        }
        function isDecimalDigit(ch) {
          window.ins_enter(34213);
          {
            var ___ret283 = ch >= 48 && ch <= 57;
            window.ins_exit(34213);
            return ___ret283;
          }
        }
        function isHexDigit(ch) {
          window.ins_enter(34229);
          {
            var ___ret284 = '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
            window.ins_exit(34229);
            return ___ret284;
          }
        }
        function isOctalDigit(ch) {
          window.ins_enter(34245);
          {
            var ___ret285 = '01234567'.indexOf(ch) >= 0;
            window.ins_exit(34245);
            return ___ret285;
          }
        }
        function isWhiteSpace(ch) {
          window.ins_enter(34261);
          {
            var ___ret286 = ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch === 160 || ch >= 5760 && [
                5760,
                6158,
                8192,
                8193,
                8194,
                8195,
                8196,
                8197,
                8198,
                8199,
                8200,
                8201,
                8202,
                8239,
                8287,
                12288,
                65279
              ].indexOf(ch) >= 0;
            window.ins_exit(34261);
            return ___ret286;
          }
        }
        function isLineTerminator(ch) {
          window.ins_enter(34318);
          {
            var ___ret287 = ch === 10 || ch === 13 || ch === 8232 || ch === 8233;
            window.ins_exit(34318);
            return ___ret287;
          }
        }
        function isIdentifierStart(ch) {
          window.ins_enter(34342);
          {
            var ___ret288 = ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierStart.test(String.fromCharCode(ch));
            window.ins_exit(34342);
            return ___ret288;
          }
        }
        function isIdentifierPart(ch) {
          window.ins_enter(34394);
          {
            var ___ret289 = ch === 36 || ch === 95 || ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57 || ch === 92 || ch >= 128 && Regex.NonAsciiIdentifierPart.test(String.fromCharCode(ch));
            window.ins_exit(34394);
            return ___ret289;
          }
        }
        function isFutureReservedWord(id) {
          window.ins_enter(34454);
          switch (id) {
          case 'class':
          case 'enum':
          case 'export':
          case 'extends':
          case 'import':
          case 'super': {
              var ___ret290 = true;
              window.ins_exit(34454);
              return ___ret290;
            }
          default: {
              var ___ret291 = false;
              window.ins_exit(34454);
              return ___ret291;
            }
          }
          window.ins_exit(34454);
        }
        function isStrictModeReservedWord(id) {
          window.ins_enter(34481);
          switch (id) {
          case 'implements':
          case 'interface':
          case 'package':
          case 'private':
          case 'protected':
          case 'public':
          case 'static':
          case 'yield':
          case 'let': {
              var ___ret292 = true;
              window.ins_exit(34481);
              return ___ret292;
            }
          default: {
              var ___ret293 = false;
              window.ins_exit(34481);
              return ___ret293;
            }
          }
          window.ins_exit(34481);
        }
        function isRestrictedWord(id) {
          window.ins_enter(34514);
          {
            var ___ret294 = id === 'eval' || id === 'arguments';
            window.ins_exit(34514);
            return ___ret294;
          }
        }
        function isKeyword(id) {
          window.ins_enter(34530);
          if (strict && isStrictModeReservedWord(id)) {
            {
              var ___ret295 = true;
              window.ins_exit(34530);
              return ___ret295;
            }
          }
          switch (id.length) {
          case 2: {
              var ___ret296 = id === 'if' || id === 'in' || id === 'do';
              window.ins_exit(34530);
              return ___ret296;
            }
          case 3: {
              var ___ret297 = id === 'var' || id === 'for' || id === 'new' || id === 'try' || id === 'let';
              window.ins_exit(34530);
              return ___ret297;
            }
          case 4: {
              var ___ret298 = id === 'this' || id === 'else' || id === 'case' || id === 'void' || id === 'with' || id === 'enum';
              window.ins_exit(34530);
              return ___ret298;
            }
          case 5: {
              var ___ret299 = id === 'while' || id === 'break' || id === 'catch' || id === 'throw' || id === 'const' || id === 'yield' || id === 'class' || id === 'super';
              window.ins_exit(34530);
              return ___ret299;
            }
          case 6: {
              var ___ret300 = id === 'return' || id === 'typeof' || id === 'delete' || id === 'switch' || id === 'export' || id === 'import';
              window.ins_exit(34530);
              return ___ret300;
            }
          case 7: {
              var ___ret301 = id === 'default' || id === 'finally' || id === 'extends';
              window.ins_exit(34530);
              return ___ret301;
            }
          case 8: {
              var ___ret302 = id === 'function' || id === 'continue' || id === 'debugger';
              window.ins_exit(34530);
              return ___ret302;
            }
          case 10: {
              var ___ret303 = id === 'instanceof';
              window.ins_exit(34530);
              return ___ret303;
            }
          default: {
              var ___ret304 = false;
              window.ins_exit(34530);
              return ___ret304;
            }
          }
          window.ins_exit(34530);
        }
        function addComment(type, value, start, end, loc) {
          window.ins_enter(34710);
          var comment, attacher;
          assert(typeof start === 'number', 'Comment must have valid position');
          if (state.lastCommentStart >= start) {
            {
              window.ins_exit(34710);
              return;
            }
          }
          state.lastCommentStart = start;
          comment = {
            type: type,
            value: value
          };
          if (extra.range) {
            comment.range = [
              start,
              end
            ];
          }
          if (extra.loc) {
            comment.loc = loc;
          }
          extra.comments.push(comment);
          if (extra.attachComment) {
            extra.leadingComments.push(comment);
            extra.trailingComments.push(comment);
          }
          window.ins_exit(34710);
        }
        function skipSingleLineComment(offset) {
          window.ins_enter(34812);
          var start, loc, ch, comment;
          start = index - offset;
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart - offset
            }
          };
          while (index < length) {
            ch = source.charCodeAt(index);
            ++index;
            if (isLineTerminator(ch)) {
              if (extra.comments) {
                comment = source.slice(start + offset, index - 1);
                loc.end = {
                  line: lineNumber,
                  column: index - lineStart - 1
                };
                addComment('Line', comment, start, index - 1, loc);
              }
              if (ch === 13 && source.charCodeAt(index) === 10) {
                ++index;
              }
              ++lineNumber;
              lineStart = index;
              {
                window.ins_exit(34812);
                return;
              }
            }
          }
          if (extra.comments) {
            comment = source.slice(start + offset, index);
            loc.end = {
              line: lineNumber,
              column: index - lineStart
            };
            addComment('Line', comment, start, index, loc);
          }
          window.ins_exit(34812);
        }
        function skipMultiLineComment() {
          window.ins_enter(34979);
          var start, loc, ch, comment;
          if (extra.comments) {
            start = index - 2;
            loc = {
              start: {
                line: lineNumber,
                column: index - lineStart - 2
              }
            };
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (isLineTerminator(ch)) {
              if (ch === 13 && source.charCodeAt(index + 1) === 10) {
                ++index;
              }
              ++lineNumber;
              ++index;
              lineStart = index;
              if (index >= length) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            } else if (ch === 42) {
              if (source.charCodeAt(index + 1) === 47) {
                ++index;
                ++index;
                if (extra.comments) {
                  comment = source.slice(start + 2, index - 2);
                  loc.end = {
                    line: lineNumber,
                    column: index - lineStart
                  };
                  addComment('Block', comment, start, index, loc);
                }
                {
                  window.ins_exit(34979);
                  return;
                }
              }
              ++index;
            } else {
              ++index;
            }
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          window.ins_exit(34979);
        }
        function skipComment() {
          window.ins_enter(35160);
          var ch, start;
          start = index === 0;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (isWhiteSpace(ch)) {
              ++index;
            } else if (isLineTerminator(ch)) {
              ++index;
              if (ch === 13 && source.charCodeAt(index) === 10) {
                ++index;
              }
              ++lineNumber;
              lineStart = index;
              start = true;
            } else if (ch === 47) {
              ch = source.charCodeAt(index + 1);
              if (ch === 47) {
                ++index;
                ++index;
                skipSingleLineComment(2);
                start = true;
              } else if (ch === 42) {
                ++index;
                ++index;
                skipMultiLineComment();
              } else {
                break;
              }
            } else if (start && ch === 45) {
              if (source.charCodeAt(index + 1) === 45 && source.charCodeAt(index + 2) === 62) {
                index += 3;
                skipSingleLineComment(3);
              } else {
                break;
              }
            } else if (ch === 60) {
              if (source.slice(index + 1, index + 4) === '!--') {
                ++index;
                ++index;
                ++index;
                ++index;
                skipSingleLineComment(4);
              } else {
                break;
              }
            } else {
              break;
            }
          }
          window.ins_exit(35160);
        }
        function scanHexEscape(prefix) {
          window.ins_enter(35361);
          var i, len, ch, code = 0;
          len = prefix === 'u' ? 4 : 2;
          for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
              ch = source[index++];
              code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
              {
                var ___ret305 = '';
                window.ins_exit(35361);
                return ___ret305;
              }
            }
          }
          {
            var ___ret306 = String.fromCharCode(code);
            window.ins_exit(35361);
            return ___ret306;
          }
        }
        function getEscapedIdentifier() {
          window.ins_enter(35440);
          var ch, id;
          ch = source.charCodeAt(index++);
          id = String.fromCharCode(ch);
          if (ch === 92) {
            if (source.charCodeAt(index) !== 117) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            ++index;
            ch = scanHexEscape('u');
            if (!ch || ch === '\\' || !isIdentifierStart(ch.charCodeAt(0))) {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
            id = ch;
          }
          while (index < length) {
            ch = source.charCodeAt(index);
            if (!isIdentifierPart(ch)) {
              break;
            }
            ++index;
            id += String.fromCharCode(ch);
            if (ch === 92) {
              id = id.substr(0, id.length - 1);
              if (source.charCodeAt(index) !== 117) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              ++index;
              ch = scanHexEscape('u');
              if (!ch || ch === '\\' || !isIdentifierPart(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
              id += ch;
            }
          }
          {
            window.ins_exit(35440);
            return id;
          }
        }
        function getIdentifier() {
          window.ins_enter(35635);
          var start, ch;
          start = index++;
          while (index < length) {
            ch = source.charCodeAt(index);
            if (ch === 92) {
              index = start;
              {
                var ___ret307 = getEscapedIdentifier();
                window.ins_exit(35635);
                return ___ret307;
              }
            }
            if (isIdentifierPart(ch)) {
              ++index;
            } else {
              break;
            }
          }
          {
            var ___ret308 = source.slice(start, index);
            window.ins_exit(35635);
            return ___ret308;
          }
        }
        function scanIdentifier() {
          window.ins_enter(35694);
          var start, id, type;
          start = index;
          id = source.charCodeAt(index) === 92 ? getEscapedIdentifier() : getIdentifier();
          if (id.length === 1) {
            type = Token.Identifier;
          } else if (isKeyword(id)) {
            type = Token.Keyword;
          } else if (id === 'null') {
            type = Token.NullLiteral;
          } else if (id === 'true' || id === 'false') {
            type = Token.BooleanLiteral;
          } else {
            type = Token.Identifier;
          }
          {
            var ___ret309 = {
                type: type,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            window.ins_exit(35694);
            return ___ret309;
          }
        }
        function scanPunctuator() {
          window.ins_enter(35804);
          var start = index, code = source.charCodeAt(index), code2, ch1 = source[index], ch2, ch3, ch4;
          switch (code) {
          case 46:
          case 40:
          case 41:
          case 59:
          case 44:
          case 123:
          case 125:
          case 91:
          case 93:
          case 58:
          case 63:
          case 126:
            ++index;
            if (extra.tokenize) {
              if (code === 40) {
                extra.openParenToken = extra.tokens.length;
              } else if (code === 123) {
                extra.openCurlyToken = extra.tokens.length;
              }
            }
            {
              var ___ret310 = {
                  type: Token.Punctuator,
                  value: String.fromCharCode(code),
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(35804);
              return ___ret310;
            }
          default:
            code2 = source.charCodeAt(index + 1);
            if (code2 === 61) {
              switch (code) {
              case 43:
              case 45:
              case 47:
              case 60:
              case 62:
              case 94:
              case 124:
              case 37:
              case 38:
              case 42:
                index += 2;
                {
                  var ___ret311 = {
                      type: Token.Punctuator,
                      value: String.fromCharCode(code) + String.fromCharCode(code2),
                      lineNumber: lineNumber,
                      lineStart: lineStart,
                      start: start,
                      end: index
                    };
                  window.ins_exit(35804);
                  return ___ret311;
                }
              case 33:
              case 61:
                index += 2;
                if (source.charCodeAt(index) === 61) {
                  ++index;
                }
                {
                  var ___ret312 = {
                      type: Token.Punctuator,
                      value: source.slice(start, index),
                      lineNumber: lineNumber,
                      lineStart: lineStart,
                      start: start,
                      end: index
                    };
                  window.ins_exit(35804);
                  return ___ret312;
                }
              }
            }
          }
          ch4 = source.substr(index, 4);
          if (ch4 === '>>>=') {
            index += 4;
            {
              var ___ret313 = {
                  type: Token.Punctuator,
                  value: ch4,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(35804);
              return ___ret313;
            }
          }
          ch3 = ch4.substr(0, 3);
          if (ch3 === '>>>' || ch3 === '<<=' || ch3 === '>>=') {
            index += 3;
            {
              var ___ret314 = {
                  type: Token.Punctuator,
                  value: ch3,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(35804);
              return ___ret314;
            }
          }
          ch2 = ch3.substr(0, 2);
          if (ch1 === ch2[1] && '+-<>&|'.indexOf(ch1) >= 0 || ch2 === '=>') {
            index += 2;
            {
              var ___ret315 = {
                  type: Token.Punctuator,
                  value: ch2,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(35804);
              return ___ret315;
            }
          }
          if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
            ++index;
            {
              var ___ret316 = {
                  type: Token.Punctuator,
                  value: ch1,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(35804);
              return ___ret316;
            }
          }
          throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          window.ins_exit(35804);
        }
        function scanHexLiteral(start) {
          window.ins_enter(36230);
          var number = '';
          while (index < length) {
            if (!isHexDigit(source[index])) {
              break;
            }
            number += source[index++];
          }
          if (number.length === 0) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          {
            var ___ret317 = {
                type: Token.NumericLiteral,
                value: parseInt('0x' + number, 16),
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            window.ins_exit(36230);
            return ___ret317;
          }
        }
        function scanOctalLiteral(start) {
          window.ins_enter(36322);
          var number = '0' + source[index++];
          while (index < length) {
            if (!isOctalDigit(source[index])) {
              break;
            }
            number += source[index++];
          }
          if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          {
            var ___ret318 = {
                type: Token.NumericLiteral,
                value: parseInt(number, 8),
                octal: true,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            window.ins_exit(36322);
            return ___ret318;
          }
        }
        function scanNumericLiteral() {
          window.ins_enter(36413);
          var number, start, ch;
          ch = source[index];
          assert(isDecimalDigit(ch.charCodeAt(0)) || ch === '.', 'Numeric literal must start with a decimal digit or a decimal point');
          start = index;
          number = '';
          if (ch !== '.') {
            number = source[index++];
            ch = source[index];
            if (number === '0') {
              if (ch === 'x' || ch === 'X') {
                ++index;
                {
                  var ___ret319 = scanHexLiteral(start);
                  window.ins_exit(36413);
                  return ___ret319;
                }
              }
              if (isOctalDigit(ch)) {
                {
                  var ___ret320 = scanOctalLiteral(start);
                  window.ins_exit(36413);
                  return ___ret320;
                }
              }
              if (ch && isDecimalDigit(ch.charCodeAt(0))) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            }
            while (isDecimalDigit(source.charCodeAt(index))) {
              number += source[index++];
            }
            ch = source[index];
          }
          if (ch === '.') {
            number += source[index++];
            while (isDecimalDigit(source.charCodeAt(index))) {
              number += source[index++];
            }
            ch = source[index];
          }
          if (ch === 'e' || ch === 'E') {
            number += source[index++];
            ch = source[index];
            if (ch === '+' || ch === '-') {
              number += source[index++];
            }
            if (isDecimalDigit(source.charCodeAt(index))) {
              while (isDecimalDigit(source.charCodeAt(index))) {
                number += source[index++];
              }
            } else {
              throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
          }
          if (isIdentifierStart(source.charCodeAt(index))) {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          {
            var ___ret321 = {
                type: Token.NumericLiteral,
                value: parseFloat(number),
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            window.ins_exit(36413);
            return ___ret321;
          }
        }
        function scanStringLiteral() {
          window.ins_enter(36692);
          var str = '', quote, start, ch, code, unescaped, restore, octal = false, startLineNumber, startLineStart;
          startLineNumber = lineNumber;
          startLineStart = lineStart;
          quote = source[index];
          assert(quote === '\'' || quote === '"', 'String literal must starts with a quote');
          start = index;
          ++index;
          while (index < length) {
            ch = source[index++];
            if (ch === quote) {
              quote = '';
              break;
            } else if (ch === '\\') {
              ch = source[index++];
              if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
                switch (ch) {
                case 'u':
                case 'x':
                  restore = index;
                  unescaped = scanHexEscape(ch);
                  if (unescaped) {
                    str += unescaped;
                  } else {
                    index = restore;
                    str += ch;
                  }
                  break;
                case 'n':
                  str += '\n';
                  break;
                case 'r':
                  str += '\r';
                  break;
                case 't':
                  str += '\t';
                  break;
                case 'b':
                  str += '\b';
                  break;
                case 'f':
                  str += '\f';
                  break;
                case 'v':
                  str += '\x0B';
                  break;
                default:
                  if (isOctalDigit(ch)) {
                    code = '01234567'.indexOf(ch);
                    if (code !== 0) {
                      octal = true;
                    }
                    if (index < length && isOctalDigit(source[index])) {
                      octal = true;
                      code = code * 8 + '01234567'.indexOf(source[index++]);
                      if ('0123'.indexOf(ch) >= 0 && index < length && isOctalDigit(source[index])) {
                        code = code * 8 + '01234567'.indexOf(source[index++]);
                      }
                    }
                    str += String.fromCharCode(code);
                  } else {
                    str += ch;
                  }
                  break;
                }
              } else {
                ++lineNumber;
                if (ch === '\r' && source[index] === '\n') {
                  ++index;
                }
                lineStart = index;
              }
            } else if (isLineTerminator(ch.charCodeAt(0))) {
              break;
            } else {
              str += ch;
            }
          }
          if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
          }
          {
            var ___ret322 = {
                type: Token.StringLiteral,
                value: str,
                octal: octal,
                startLineNumber: startLineNumber,
                startLineStart: startLineStart,
                lineNumber: lineNumber,
                lineStart: lineStart,
                start: start,
                end: index
              };
            window.ins_exit(36692);
            return ___ret322;
          }
        }
        function testRegExp(pattern, flags) {
          window.ins_enter(37058);
          var value;
          try {
            value = new RegExp(pattern, flags);
          } catch (e) {
            throwError({}, Messages.InvalidRegExp);
          }
          {
            window.ins_exit(37058);
            return value;
          }
        }
        function scanRegExpBody() {
          window.ins_enter(37091);
          var ch, str, classMarker, terminated, body;
          ch = source[index];
          assert(ch === '/', 'Regular expression literal must start with a slash');
          str = source[index++];
          classMarker = false;
          terminated = false;
          while (index < length) {
            ch = source[index++];
            str += ch;
            if (ch === '\\') {
              ch = source[index++];
              if (isLineTerminator(ch.charCodeAt(0))) {
                throwError({}, Messages.UnterminatedRegExp);
              }
              str += ch;
            } else if (isLineTerminator(ch.charCodeAt(0))) {
              throwError({}, Messages.UnterminatedRegExp);
            } else if (classMarker) {
              if (ch === ']') {
                classMarker = false;
              }
            } else {
              if (ch === '/') {
                terminated = true;
                break;
              } else if (ch === '[') {
                classMarker = true;
              }
            }
          }
          if (!terminated) {
            throwError({}, Messages.UnterminatedRegExp);
          }
          body = str.substr(1, str.length - 2);
          {
            var ___ret323 = {
                value: body,
                literal: str
              };
            window.ins_exit(37091);
            return ___ret323;
          }
        }
        function scanRegExpFlags() {
          window.ins_enter(37265);
          var ch, str, flags, restore;
          str = '';
          flags = '';
          while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch.charCodeAt(0))) {
              break;
            }
            ++index;
            if (ch === '\\' && index < length) {
              ch = source[index];
              if (ch === 'u') {
                ++index;
                restore = index;
                ch = scanHexEscape('u');
                if (ch) {
                  flags += ch;
                  for (str += '\\u'; restore < index; ++restore) {
                    str += source[restore];
                  }
                } else {
                  index = restore;
                  flags += 'u';
                  str += '\\u';
                }
                throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
              } else {
                str += '\\';
                throwErrorTolerant({}, Messages.UnexpectedToken, 'ILLEGAL');
              }
            } else {
              flags += ch;
              str += ch;
            }
          }
          {
            var ___ret324 = {
                value: flags,
                literal: str
              };
            window.ins_exit(37265);
            return ___ret324;
          }
        }
        function scanRegExp() {
          window.ins_enter(37421);
          var start, body, flags, pattern, value;
          lookahead = null;
          skipComment();
          start = index;
          body = scanRegExpBody();
          flags = scanRegExpFlags();
          value = testRegExp(body.value, flags.value);
          if (extra.tokenize) {
            {
              var ___ret325 = {
                  type: Token.RegularExpression,
                  value: value,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: start,
                  end: index
                };
              window.ins_exit(37421);
              return ___ret325;
            }
          }
          {
            var ___ret326 = {
                literal: body.literal + flags.literal,
                value: value,
                start: start,
                end: index
              };
            window.ins_exit(37421);
            return ___ret326;
          }
        }
        function collectRegex() {
          window.ins_enter(37518);
          var pos, loc, regex, token;
          skipComment();
          pos = index;
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart
            }
          };
          regex = scanRegExp();
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          if (!extra.tokenize) {
            if (extra.tokens.length > 0) {
              token = extra.tokens[extra.tokens.length - 1];
              if (token.range[0] === pos && token.type === 'Punctuator') {
                if (token.value === '/' || token.value === '/=') {
                  extra.tokens.pop();
                }
              }
            }
            extra.tokens.push({
              type: 'RegularExpression',
              value: regex.literal,
              range: [
                pos,
                index
              ],
              loc: loc
            });
          }
          {
            window.ins_exit(37518);
            return regex;
          }
        }
        function isIdentifierName(token) {
          window.ins_enter(37665);
          {
            var ___ret327 = token.type === Token.Identifier || token.type === Token.Keyword || token.type === Token.BooleanLiteral || token.type === Token.NullLiteral;
            window.ins_exit(37665);
            return ___ret327;
          }
        }
        function advanceSlash() {
          window.ins_enter(37705);
          var prevToken, checkToken;
          prevToken = extra.tokens[extra.tokens.length - 1];
          if (!prevToken) {
            {
              var ___ret328 = collectRegex();
              window.ins_exit(37705);
              return ___ret328;
            }
          }
          if (prevToken.type === 'Punctuator') {
            if (prevToken.value === ']') {
              {
                var ___ret329 = scanPunctuator();
                window.ins_exit(37705);
                return ___ret329;
              }
            }
            if (prevToken.value === ')') {
              checkToken = extra.tokens[extra.openParenToken - 1];
              if (checkToken && checkToken.type === 'Keyword' && (checkToken.value === 'if' || checkToken.value === 'while' || checkToken.value === 'for' || checkToken.value === 'with')) {
                {
                  var ___ret330 = collectRegex();
                  window.ins_exit(37705);
                  return ___ret330;
                }
              }
              {
                var ___ret331 = scanPunctuator();
                window.ins_exit(37705);
                return ___ret331;
              }
            }
            if (prevToken.value === '}') {
              if (extra.tokens[extra.openCurlyToken - 3] && extra.tokens[extra.openCurlyToken - 3].type === 'Keyword') {
                checkToken = extra.tokens[extra.openCurlyToken - 4];
                if (!checkToken) {
                  {
                    var ___ret332 = scanPunctuator();
                    window.ins_exit(37705);
                    return ___ret332;
                  }
                }
              } else if (extra.tokens[extra.openCurlyToken - 4] && extra.tokens[extra.openCurlyToken - 4].type === 'Keyword') {
                checkToken = extra.tokens[extra.openCurlyToken - 5];
                if (!checkToken) {
                  {
                    var ___ret333 = collectRegex();
                    window.ins_exit(37705);
                    return ___ret333;
                  }
                }
              } else {
                {
                  var ___ret334 = scanPunctuator();
                  window.ins_exit(37705);
                  return ___ret334;
                }
              }
              if (FnExprTokens.indexOf(checkToken.value) >= 0) {
                {
                  var ___ret335 = scanPunctuator();
                  window.ins_exit(37705);
                  return ___ret335;
                }
              }
              {
                var ___ret336 = collectRegex();
                window.ins_exit(37705);
                return ___ret336;
              }
            }
            {
              var ___ret337 = collectRegex();
              window.ins_exit(37705);
              return ___ret337;
            }
          }
          if (prevToken.type === 'Keyword') {
            {
              var ___ret338 = collectRegex();
              window.ins_exit(37705);
              return ___ret338;
            }
          }
          {
            var ___ret339 = scanPunctuator();
            window.ins_exit(37705);
            return ___ret339;
          }
        }
        function advance() {
          window.ins_enter(37945);
          var ch;
          skipComment();
          if (index >= length) {
            {
              var ___ret340 = {
                  type: Token.EOF,
                  lineNumber: lineNumber,
                  lineStart: lineStart,
                  start: index,
                  end: index
                };
              window.ins_exit(37945);
              return ___ret340;
            }
          }
          ch = source.charCodeAt(index);
          if (isIdentifierStart(ch)) {
            {
              var ___ret341 = scanIdentifier();
              window.ins_exit(37945);
              return ___ret341;
            }
          }
          if (ch === 40 || ch === 41 || ch === 59) {
            {
              var ___ret342 = scanPunctuator();
              window.ins_exit(37945);
              return ___ret342;
            }
          }
          if (ch === 39 || ch === 34) {
            {
              var ___ret343 = scanStringLiteral();
              window.ins_exit(37945);
              return ___ret343;
            }
          }
          if (ch === 46) {
            if (isDecimalDigit(source.charCodeAt(index + 1))) {
              {
                var ___ret344 = scanNumericLiteral();
                window.ins_exit(37945);
                return ___ret344;
              }
            }
            {
              var ___ret345 = scanPunctuator();
              window.ins_exit(37945);
              return ___ret345;
            }
          }
          if (isDecimalDigit(ch)) {
            {
              var ___ret346 = scanNumericLiteral();
              window.ins_exit(37945);
              return ___ret346;
            }
          }
          if (extra.tokenize && ch === 47) {
            {
              var ___ret347 = advanceSlash();
              window.ins_exit(37945);
              return ___ret347;
            }
          }
          {
            var ___ret348 = scanPunctuator();
            window.ins_exit(37945);
            return ___ret348;
          }
        }
        function collectToken() {
          window.ins_enter(38071);
          var loc, token, range, value;
          skipComment();
          loc = {
            start: {
              line: lineNumber,
              column: index - lineStart
            }
          };
          token = advance();
          loc.end = {
            line: lineNumber,
            column: index - lineStart
          };
          if (token.type !== Token.EOF) {
            value = source.slice(token.start, token.end);
            extra.tokens.push({
              type: TokenName[token.type],
              value: value,
              range: [
                token.start,
                token.end
              ],
              loc: loc
            });
          }
          {
            window.ins_exit(38071);
            return token;
          }
        }
        function lex() {
          window.ins_enter(38178);
          var token;
          token = lookahead;
          index = token.end;
          lineNumber = token.lineNumber;
          lineStart = token.lineStart;
          lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
          index = token.end;
          lineNumber = token.lineNumber;
          lineStart = token.lineStart;
          {
            window.ins_exit(38178);
            return token;
          }
        }
        function peek() {
          window.ins_enter(38244);
          var pos, line, start;
          pos = index;
          line = lineNumber;
          start = lineStart;
          lookahead = typeof extra.tokens !== 'undefined' ? collectToken() : advance();
          index = pos;
          lineNumber = line;
          lineStart = start;
          window.ins_exit(38244);
        }
        function Position(line, column) {
          window.ins_enter(38296);
          this.line = line;
          this.column = column;
          window.ins_exit(38296);
        }
        function SourceLocation(startLine, startColumn, line, column) {
          window.ins_enter(38317);
          this.start = new Position(startLine, startColumn);
          this.end = new Position(line, column);
          window.ins_exit(38317);
        }
        SyntaxTreeDelegate = {
          name: 'SyntaxTree',
          processComment: function (node) {
            window.ins_enter(38355);
            var lastChild, trailingComments;
            if (node.type === Syntax.Program) {
              if (node.body.length > 0) {
                {
                  window.ins_exit(38355);
                  return;
                }
              }
            }
            if (extra.trailingComments.length > 0) {
              if (extra.trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.trailingComments;
                extra.trailingComments = [];
              } else {
                extra.trailingComments.length = 0;
              }
            } else {
              if (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments && extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments[0].range[0] >= node.range[1]) {
                trailingComments = extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
                delete extra.bottomRightStack[extra.bottomRightStack.length - 1].trailingComments;
              }
            }
            while (extra.bottomRightStack.length > 0 && extra.bottomRightStack[extra.bottomRightStack.length - 1].range[0] >= node.range[0]) {
              lastChild = extra.bottomRightStack.pop();
            }
            if (lastChild) {
              if (lastChild.leadingComments && lastChild.leadingComments[lastChild.leadingComments.length - 1].range[1] <= node.range[0]) {
                node.leadingComments = lastChild.leadingComments;
                delete lastChild.leadingComments;
              }
            } else if (extra.leadingComments.length > 0 && extra.leadingComments[extra.leadingComments.length - 1].range[1] <= node.range[0]) {
              node.leadingComments = extra.leadingComments;
              extra.leadingComments = [];
            }
            if (trailingComments) {
              node.trailingComments = trailingComments;
            }
            extra.bottomRightStack.push(node);
            window.ins_exit(38355);
          },
          markEnd: function (node, startToken) {
            window.ins_enter(38661);
            if (extra.range) {
              node.range = [
                startToken.start,
                index
              ];
            }
            if (extra.loc) {
              node.loc = new SourceLocation(startToken.startLineNumber === undefined ? startToken.lineNumber : startToken.startLineNumber, startToken.start - (startToken.startLineStart === undefined ? startToken.lineStart : startToken.startLineStart), lineNumber, index - lineStart);
              this.postProcess(node);
            }
            if (extra.attachComment) {
              this.processComment(node);
            }
            {
              window.ins_exit(38661);
              return node;
            }
          },
          postProcess: function (node) {
            window.ins_enter(38749);
            if (extra.source) {
              node.loc.source = extra.source;
            }
            {
              window.ins_exit(38749);
              return node;
            }
          },
          createArrayExpression: function (elements) {
            window.ins_enter(38775);
            {
              var ___ret349 = {
                  type: Syntax.ArrayExpression,
                  elements: elements
                };
              window.ins_exit(38775);
              return ___ret349;
            }
          },
          createAssignmentExpression: function (operator, left, right) {
            window.ins_enter(38794);
            {
              var ___ret350 = {
                  type: Syntax.AssignmentExpression,
                  operator: operator,
                  left: left,
                  right: right
                };
              window.ins_exit(38794);
              return ___ret350;
            }
          },
          createBinaryExpression: function (operator, left, right) {
            window.ins_enter(38821);
            var type = operator === '||' || operator === '&&' ? Syntax.LogicalExpression : Syntax.BinaryExpression;
            {
              var ___ret351 = {
                  type: type,
                  operator: operator,
                  left: left,
                  right: right
                };
              window.ins_exit(38821);
              return ___ret351;
            }
          },
          createBlockStatement: function (body) {
            window.ins_enter(38863);
            {
              var ___ret352 = {
                  type: Syntax.BlockStatement,
                  body: body
                };
              window.ins_exit(38863);
              return ___ret352;
            }
          },
          createBreakStatement: function (label) {
            window.ins_enter(38882);
            {
              var ___ret353 = {
                  type: Syntax.BreakStatement,
                  label: label
                };
              window.ins_exit(38882);
              return ___ret353;
            }
          },
          createCallExpression: function (callee, args) {
            window.ins_enter(38901);
            {
              var ___ret354 = {
                  type: Syntax.CallExpression,
                  callee: callee,
                  'arguments': args
                };
              window.ins_exit(38901);
              return ___ret354;
            }
          },
          createCatchClause: function (param, body) {
            window.ins_enter(38924);
            {
              var ___ret355 = {
                  type: Syntax.CatchClause,
                  param: param,
                  body: body
                };
              window.ins_exit(38924);
              return ___ret355;
            }
          },
          createConditionalExpression: function (test, consequent, alternate) {
            window.ins_enter(38947);
            {
              var ___ret356 = {
                  type: Syntax.ConditionalExpression,
                  test: test,
                  consequent: consequent,
                  alternate: alternate
                };
              window.ins_exit(38947);
              return ___ret356;
            }
          },
          createContinueStatement: function (label) {
            window.ins_enter(38974);
            {
              var ___ret357 = {
                  type: Syntax.ContinueStatement,
                  label: label
                };
              window.ins_exit(38974);
              return ___ret357;
            }
          },
          createDebuggerStatement: function () {
            window.ins_enter(38993);
            {
              var ___ret358 = { type: Syntax.DebuggerStatement };
              window.ins_exit(38993);
              return ___ret358;
            }
          },
          createDoWhileStatement: function (body, test) {
            window.ins_enter(39008);
            {
              var ___ret359 = {
                  type: Syntax.DoWhileStatement,
                  body: body,
                  test: test
                };
              window.ins_exit(39008);
              return ___ret359;
            }
          },
          createEmptyStatement: function () {
            window.ins_enter(39031);
            {
              var ___ret360 = { type: Syntax.EmptyStatement };
              window.ins_exit(39031);
              return ___ret360;
            }
          },
          createExpressionStatement: function (expression) {
            window.ins_enter(39046);
            {
              var ___ret361 = {
                  type: Syntax.ExpressionStatement,
                  expression: expression
                };
              window.ins_exit(39046);
              return ___ret361;
            }
          },
          createForStatement: function (init, test, update, body) {
            window.ins_enter(39065);
            {
              var ___ret362 = {
                  type: Syntax.ForStatement,
                  init: init,
                  test: test,
                  update: update,
                  body: body
                };
              window.ins_exit(39065);
              return ___ret362;
            }
          },
          createForInStatement: function (left, right, body) {
            window.ins_enter(39096);
            {
              var ___ret363 = {
                  type: Syntax.ForInStatement,
                  left: left,
                  right: right,
                  body: body,
                  each: false
                };
              window.ins_exit(39096);
              return ___ret363;
            }
          },
          createFunctionDeclaration: function (id, params, defaults, body) {
            window.ins_enter(39126);
            {
              var ___ret364 = {
                  type: Syntax.FunctionDeclaration,
                  id: id,
                  params: params,
                  defaults: defaults,
                  body: body,
                  rest: null,
                  generator: false,
                  expression: false
                };
              window.ins_exit(39126);
              return ___ret364;
            }
          },
          createFunctionExpression: function (id, params, defaults, body) {
            window.ins_enter(39166);
            {
              var ___ret365 = {
                  type: Syntax.FunctionExpression,
                  id: id,
                  params: params,
                  defaults: defaults,
                  body: body,
                  rest: null,
                  generator: false,
                  expression: false
                };
              window.ins_exit(39166);
              return ___ret365;
            }
          },
          createIdentifier: function (name) {
            window.ins_enter(39206);
            {
              var ___ret366 = {
                  type: Syntax.Identifier,
                  name: name
                };
              window.ins_exit(39206);
              return ___ret366;
            }
          },
          createIfStatement: function (test, consequent, alternate) {
            window.ins_enter(39225);
            {
              var ___ret367 = {
                  type: Syntax.IfStatement,
                  test: test,
                  consequent: consequent,
                  alternate: alternate
                };
              window.ins_exit(39225);
              return ___ret367;
            }
          },
          createLabeledStatement: function (label, body) {
            window.ins_enter(39252);
            {
              var ___ret368 = {
                  type: Syntax.LabeledStatement,
                  label: label,
                  body: body
                };
              window.ins_exit(39252);
              return ___ret368;
            }
          },
          createLiteral: function (token) {
            window.ins_enter(39275);
            {
              var ___ret369 = {
                  type: Syntax.Literal,
                  value: token.value,
                  raw: source.slice(token.start, token.end)
                };
              window.ins_exit(39275);
              return ___ret369;
            }
          },
          createMemberExpression: function (accessor, object, property) {
            window.ins_enter(39308);
            {
              var ___ret370 = {
                  type: Syntax.MemberExpression,
                  computed: accessor === '[',
                  object: object,
                  property: property
                };
              window.ins_exit(39308);
              return ___ret370;
            }
          },
          createNewExpression: function (callee, args) {
            window.ins_enter(39337);
            {
              var ___ret371 = {
                  type: Syntax.NewExpression,
                  callee: callee,
                  'arguments': args
                };
              window.ins_exit(39337);
              return ___ret371;
            }
          },
          createObjectExpression: function (properties) {
            window.ins_enter(39360);
            {
              var ___ret372 = {
                  type: Syntax.ObjectExpression,
                  properties: properties
                };
              window.ins_exit(39360);
              return ___ret372;
            }
          },
          createPostfixExpression: function (operator, argument) {
            window.ins_enter(39379);
            {
              var ___ret373 = {
                  type: Syntax.UpdateExpression,
                  operator: operator,
                  argument: argument,
                  prefix: false
                };
              window.ins_exit(39379);
              return ___ret373;
            }
          },
          createProgram: function (body) {
            window.ins_enter(39405);
            {
              var ___ret374 = {
                  type: Syntax.Program,
                  body: body
                };
              window.ins_exit(39405);
              return ___ret374;
            }
          },
          createProperty: function (kind, key, value) {
            window.ins_enter(39424);
            {
              var ___ret375 = {
                  type: Syntax.Property,
                  key: key,
                  value: value,
                  kind: kind
                };
              window.ins_exit(39424);
              return ___ret375;
            }
          },
          createReturnStatement: function (argument) {
            window.ins_enter(39451);
            {
              var ___ret376 = {
                  type: Syntax.ReturnStatement,
                  argument: argument
                };
              window.ins_exit(39451);
              return ___ret376;
            }
          },
          createSequenceExpression: function (expressions) {
            window.ins_enter(39470);
            {
              var ___ret377 = {
                  type: Syntax.SequenceExpression,
                  expressions: expressions
                };
              window.ins_exit(39470);
              return ___ret377;
            }
          },
          createSwitchCase: function (test, consequent) {
            window.ins_enter(39489);
            {
              var ___ret378 = {
                  type: Syntax.SwitchCase,
                  test: test,
                  consequent: consequent
                };
              window.ins_exit(39489);
              return ___ret378;
            }
          },
          createSwitchStatement: function (discriminant, cases) {
            window.ins_enter(39512);
            {
              var ___ret379 = {
                  type: Syntax.SwitchStatement,
                  discriminant: discriminant,
                  cases: cases
                };
              window.ins_exit(39512);
              return ___ret379;
            }
          },
          createThisExpression: function () {
            window.ins_enter(39535);
            {
              var ___ret380 = { type: Syntax.ThisExpression };
              window.ins_exit(39535);
              return ___ret380;
            }
          },
          createThrowStatement: function (argument) {
            window.ins_enter(39550);
            {
              var ___ret381 = {
                  type: Syntax.ThrowStatement,
                  argument: argument
                };
              window.ins_exit(39550);
              return ___ret381;
            }
          },
          createTryStatement: function (block, guardedHandlers, handlers, finalizer) {
            window.ins_enter(39569);
            {
              var ___ret382 = {
                  type: Syntax.TryStatement,
                  block: block,
                  guardedHandlers: guardedHandlers,
                  handlers: handlers,
                  finalizer: finalizer
                };
              window.ins_exit(39569);
              return ___ret382;
            }
          },
          createUnaryExpression: function (operator, argument) {
            window.ins_enter(39600);
            if (operator === '++' || operator === '--') {
              {
                var ___ret383 = {
                    type: Syntax.UpdateExpression,
                    operator: operator,
                    argument: argument,
                    prefix: true
                  };
                window.ins_exit(39600);
                return ___ret383;
              }
            }
            {
              var ___ret384 = {
                  type: Syntax.UnaryExpression,
                  operator: operator,
                  argument: argument,
                  prefix: true
                };
              window.ins_exit(39600);
              return ___ret384;
            }
          },
          createVariableDeclaration: function (declarations, kind) {
            window.ins_enter(39651);
            {
              var ___ret385 = {
                  type: Syntax.VariableDeclaration,
                  declarations: declarations,
                  kind: kind
                };
              window.ins_exit(39651);
              return ___ret385;
            }
          },
          createVariableDeclarator: function (id, init) {
            window.ins_enter(39674);
            {
              var ___ret386 = {
                  type: Syntax.VariableDeclarator,
                  id: id,
                  init: init
                };
              window.ins_exit(39674);
              return ___ret386;
            }
          },
          createWhileStatement: function (test, body) {
            window.ins_enter(39697);
            {
              var ___ret387 = {
                  type: Syntax.WhileStatement,
                  test: test,
                  body: body
                };
              window.ins_exit(39697);
              return ___ret387;
            }
          },
          createWithStatement: function (object, body) {
            window.ins_enter(39720);
            {
              var ___ret388 = {
                  type: Syntax.WithStatement,
                  object: object,
                  body: body
                };
              window.ins_exit(39720);
              return ___ret388;
            }
          }
        };
        function peekLineTerminator() {
          window.ins_enter(39741);
          var pos, line, start, found;
          pos = index;
          line = lineNumber;
          start = lineStart;
          skipComment();
          found = lineNumber !== line;
          index = pos;
          lineNumber = line;
          lineStart = start;
          {
            window.ins_exit(39741);
            return found;
          }
        }
        function throwError(token, messageFormat) {
          window.ins_enter(39792);
          var error, args = Array.prototype.slice.call(arguments, 2), msg = messageFormat.replace(/%(\d)/g, function (whole, index) {
              window.ins_enter(39823);
              assert(index < args.length, 'Message reference must be in range');
              {
                var ___ret389 = args[index];
                window.ins_exit(39823);
                return ___ret389;
              }
            });
          if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.start;
            error.lineNumber = token.lineNumber;
            error.column = token.start - lineStart + 1;
          } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
          }
          error.description = msg;
          throw error;
          window.ins_exit(39792);
        }
        function throwErrorTolerant() {
          window.ins_enter(39937);
          try {
            throwError.apply(null, arguments);
          } catch (e) {
            if (extra.errors) {
              extra.errors.push(e);
            } else {
              throw e;
            }
          }
          window.ins_exit(39937);
        }
        function throwUnexpected(token) {
          window.ins_enter(39972);
          if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
          }
          if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
          }
          if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
          }
          if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
          }
          if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
              throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
              throwErrorTolerant(token, Messages.StrictReservedWord);
              {
                window.ins_exit(39972);
                return;
              }
            }
            throwError(token, Messages.UnexpectedToken, token.value);
          }
          throwError(token, Messages.UnexpectedToken, token.value);
          window.ins_exit(39972);
        }
        function expect(value) {
          window.ins_enter(40104);
          var token = lex();
          if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
          }
          window.ins_exit(40104);
        }
        function expectKeyword(keyword) {
          window.ins_enter(40136);
          var token = lex();
          if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
          }
          window.ins_exit(40136);
        }
        function match(value) {
          window.ins_enter(40168);
          {
            var ___ret390 = lookahead.type === Token.Punctuator && lookahead.value === value;
            window.ins_exit(40168);
            return ___ret390;
          }
        }
        function matchKeyword(keyword) {
          window.ins_enter(40190);
          {
            var ___ret391 = lookahead.type === Token.Keyword && lookahead.value === keyword;
            window.ins_exit(40190);
            return ___ret391;
          }
        }
        function matchAssign() {
          window.ins_enter(40212);
          var op;
          if (lookahead.type !== Token.Punctuator) {
            {
              var ___ret392 = false;
              window.ins_exit(40212);
              return ___ret392;
            }
          }
          op = lookahead.value;
          {
            var ___ret393 = op === '=' || op === '*=' || op === '/=' || op === '%=' || op === '+=' || op === '-=' || op === '<<=' || op === '>>=' || op === '>>>=' || op === '&=' || op === '^=' || op === '|=';
            window.ins_exit(40212);
            return ___ret393;
          }
        }
        function consumeSemicolon() {
          window.ins_enter(40287);
          var line;
          if (source.charCodeAt(index) === 59 || match(';')) {
            lex();
            {
              window.ins_exit(40287);
              return;
            }
          }
          line = lineNumber;
          skipComment();
          if (lineNumber !== line) {
            {
              window.ins_exit(40287);
              return;
            }
          }
          if (lookahead.type !== Token.EOF && !match('}')) {
            throwUnexpected(lookahead);
          }
          window.ins_exit(40287);
        }
        function isLeftHandSide(expr) {
          window.ins_enter(40345);
          {
            var ___ret394 = expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
            window.ins_exit(40345);
            return ___ret394;
          }
        }
        function parseArrayInitialiser() {
          window.ins_enter(40369);
          var elements = [], startToken;
          startToken = lookahead;
          expect('[');
          while (!match(']')) {
            if (match(',')) {
              lex();
              elements.push(null);
            } else {
              elements.push(parseAssignmentExpression());
              if (!match(']')) {
                expect(',');
              }
            }
          }
          lex();
          {
            var ___ret395 = delegate.markEnd(delegate.createArrayExpression(elements), startToken);
            window.ins_exit(40369);
            return ___ret395;
          }
        }
        function parsePropertyFunction(param, first) {
          window.ins_enter(40442);
          var previousStrict, body, startToken;
          previousStrict = strict;
          startToken = lookahead;
          body = parseFunctionSourceElements();
          if (first && strict && isRestrictedWord(param[0].name)) {
            throwErrorTolerant(first, Messages.StrictParamName);
          }
          strict = previousStrict;
          {
            var ___ret396 = delegate.markEnd(delegate.createFunctionExpression(null, param, [], body), startToken);
            window.ins_exit(40442);
            return ___ret396;
          }
        }
        function parseObjectPropertyKey() {
          window.ins_enter(40509);
          var token, startToken;
          startToken = lookahead;
          token = lex();
          if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
              throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            {
              var ___ret397 = delegate.markEnd(delegate.createLiteral(token), startToken);
              window.ins_exit(40509);
              return ___ret397;
            }
          }
          {
            var ___ret398 = delegate.markEnd(delegate.createIdentifier(token.value), startToken);
            window.ins_exit(40509);
            return ___ret398;
          }
        }
        function parseObjectProperty() {
          window.ins_enter(40585);
          var token, key, id, value, param, startToken;
          token = lookahead;
          startToken = lookahead;
          if (token.type === Token.Identifier) {
            id = parseObjectPropertyKey();
            if (token.value === 'get' && !match(':')) {
              key = parseObjectPropertyKey();
              expect('(');
              expect(')');
              value = parsePropertyFunction([]);
              {
                var ___ret399 = delegate.markEnd(delegate.createProperty('get', key, value), startToken);
                window.ins_exit(40585);
                return ___ret399;
              }
            }
            if (token.value === 'set' && !match(':')) {
              key = parseObjectPropertyKey();
              expect('(');
              token = lookahead;
              if (token.type !== Token.Identifier) {
                expect(')');
                throwErrorTolerant(token, Messages.UnexpectedToken, token.value);
                value = parsePropertyFunction([]);
              } else {
                param = [parseVariableIdentifier()];
                expect(')');
                value = parsePropertyFunction(param, token);
              }
              {
                var ___ret400 = delegate.markEnd(delegate.createProperty('set', key, value), startToken);
                window.ins_exit(40585);
                return ___ret400;
              }
            }
            expect(':');
            value = parseAssignmentExpression();
            {
              var ___ret401 = delegate.markEnd(delegate.createProperty('init', id, value), startToken);
              window.ins_exit(40585);
              return ___ret401;
            }
          }
          if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
          } else {
            key = parseObjectPropertyKey();
            expect(':');
            value = parseAssignmentExpression();
            {
              var ___ret402 = delegate.markEnd(delegate.createProperty('init', key, value), startToken);
              window.ins_exit(40585);
              return ___ret402;
            }
          }
          window.ins_exit(40585);
        }
        function parseObjectInitialiser() {
          window.ins_enter(40827);
          var properties = [], property, name, key, kind, map = {}, toString = String, startToken;
          startToken = lookahead;
          expect('{');
          while (!match('}')) {
            property = parseObjectProperty();
            if (property.key.type === Syntax.Identifier) {
              name = property.key.name;
            } else {
              name = toString(property.key.value);
            }
            kind = property.kind === 'init' ? PropertyKind.Data : property.kind === 'get' ? PropertyKind.Get : PropertyKind.Set;
            key = '$' + name;
            if (Object.prototype.hasOwnProperty.call(map, key)) {
              if (map[key] === PropertyKind.Data) {
                if (strict && kind === PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                } else if (kind !== PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.AccessorDataProperty);
                }
              } else {
                if (kind === PropertyKind.Data) {
                  throwErrorTolerant({}, Messages.AccessorDataProperty);
                } else if (map[key] & kind) {
                  throwErrorTolerant({}, Messages.AccessorGetSet);
                }
              }
              map[key] |= kind;
            } else {
              map[key] = kind;
            }
            properties.push(property);
            if (!match('}')) {
              expect(',');
            }
          }
          expect('}');
          {
            var ___ret403 = delegate.markEnd(delegate.createObjectExpression(properties), startToken);
            window.ins_exit(40827);
            return ___ret403;
          }
        }
        function parseGroupExpression() {
          window.ins_enter(41057);
          var expr;
          expect('(');
          expr = parseExpression();
          expect(')');
          {
            window.ins_exit(41057);
            return expr;
          }
        }
        function parsePrimaryExpression() {
          window.ins_enter(41082);
          var type, token, expr, startToken;
          if (match('(')) {
            {
              var ___ret404 = parseGroupExpression();
              window.ins_exit(41082);
              return ___ret404;
            }
          }
          if (match('[')) {
            {
              var ___ret405 = parseArrayInitialiser();
              window.ins_exit(41082);
              return ___ret405;
            }
          }
          if (match('{')) {
            {
              var ___ret406 = parseObjectInitialiser();
              window.ins_exit(41082);
              return ___ret406;
            }
          }
          type = lookahead.type;
          startToken = lookahead;
          if (type === Token.Identifier) {
            expr = delegate.createIdentifier(lex().value);
          } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && lookahead.octal) {
              throwErrorTolerant(lookahead, Messages.StrictOctalLiteral);
            }
            expr = delegate.createLiteral(lex());
          } else if (type === Token.Keyword) {
            if (matchKeyword('function')) {
              {
                var ___ret407 = parseFunctionExpression();
                window.ins_exit(41082);
                return ___ret407;
              }
            }
            if (matchKeyword('this')) {
              lex();
              expr = delegate.createThisExpression();
            } else {
              throwUnexpected(lex());
            }
          } else if (type === Token.BooleanLiteral) {
            token = lex();
            token.value = token.value === 'true';
            expr = delegate.createLiteral(token);
          } else if (type === Token.NullLiteral) {
            token = lex();
            token.value = null;
            expr = delegate.createLiteral(token);
          } else if (match('/') || match('/=')) {
            if (typeof extra.tokens !== 'undefined') {
              expr = delegate.createLiteral(collectRegex());
            } else {
              expr = delegate.createLiteral(scanRegExp());
            }
            peek();
          } else {
            throwUnexpected(lex());
          }
          {
            var ___ret408 = delegate.markEnd(expr, startToken);
            window.ins_exit(41082);
            return ___ret408;
          }
        }
        function parseArguments() {
          window.ins_enter(41330);
          var args = [];
          expect('(');
          if (!match(')')) {
            while (index < length) {
              args.push(parseAssignmentExpression());
              if (match(')')) {
                break;
              }
              expect(',');
            }
          }
          expect(')');
          {
            window.ins_exit(41330);
            return args;
          }
        }
        function parseNonComputedProperty() {
          window.ins_enter(41379);
          var token, startToken;
          startToken = lookahead;
          token = lex();
          if (!isIdentifierName(token)) {
            throwUnexpected(token);
          }
          {
            var ___ret409 = delegate.markEnd(delegate.createIdentifier(token.value), startToken);
            window.ins_exit(41379);
            return ___ret409;
          }
        }
        function parseNonComputedMember() {
          window.ins_enter(41423);
          expect('.');
          {
            var ___ret410 = parseNonComputedProperty();
            window.ins_exit(41423);
            return ___ret410;
          }
        }
        function parseComputedMember() {
          window.ins_enter(41437);
          var expr;
          expect('[');
          expr = parseExpression();
          expect(']');
          {
            window.ins_exit(41437);
            return expr;
          }
        }
        function parseNewExpression() {
          window.ins_enter(41462);
          var callee, args, startToken;
          startToken = lookahead;
          expectKeyword('new');
          callee = parseLeftHandSideExpression();
          args = match('(') ? parseArguments() : [];
          {
            var ___ret411 = delegate.markEnd(delegate.createNewExpression(callee, args), startToken);
            window.ins_exit(41462);
            return ___ret411;
          }
        }
        function parseLeftHandSideExpressionAllowCall() {
          window.ins_enter(41511);
          var previousAllowIn, expr, args, property, startToken;
          startToken = lookahead;
          previousAllowIn = state.allowIn;
          state.allowIn = true;
          expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
          state.allowIn = previousAllowIn;
          for (;;) {
            if (match('.')) {
              property = parseNonComputedMember();
              expr = delegate.createMemberExpression('.', expr, property);
            } else if (match('(')) {
              args = parseArguments();
              expr = delegate.createCallExpression(expr, args);
            } else if (match('[')) {
              property = parseComputedMember();
              expr = delegate.createMemberExpression('[', expr, property);
            } else {
              break;
            }
            delegate.markEnd(expr, startToken);
          }
          {
            window.ins_exit(41511);
            return expr;
          }
        }
        function parseLeftHandSideExpression() {
          window.ins_enter(41634);
          var previousAllowIn, expr, property, startToken;
          startToken = lookahead;
          previousAllowIn = state.allowIn;
          expr = matchKeyword('new') ? parseNewExpression() : parsePrimaryExpression();
          state.allowIn = previousAllowIn;
          while (match('.') || match('[')) {
            if (match('[')) {
              property = parseComputedMember();
              expr = delegate.createMemberExpression('[', expr, property);
            } else {
              property = parseNonComputedMember();
              expr = delegate.createMemberExpression('.', expr, property);
            }
            delegate.markEnd(expr, startToken);
          }
          {
            window.ins_exit(41634);
            return expr;
          }
        }
        function parsePostfixExpression() {
          window.ins_enter(41731);
          var expr, token, startToken = lookahead;
          expr = parseLeftHandSideExpressionAllowCall();
          if (lookahead.type === Token.Punctuator) {
            if ((match('++') || match('--')) && !peekLineTerminator()) {
              if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwErrorTolerant({}, Messages.StrictLHSPostfix);
              }
              if (!isLeftHandSide(expr)) {
                throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
              }
              token = lex();
              expr = delegate.markEnd(delegate.createPostfixExpression(token.value, expr), startToken);
            }
          }
          {
            window.ins_exit(41731);
            return expr;
          }
        }
        function parseUnaryExpression() {
          window.ins_enter(41833);
          var token, expr, startToken;
          if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
            expr = parsePostfixExpression();
          } else if (match('++') || match('--')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
              throwErrorTolerant({}, Messages.StrictLHSPrefix);
            }
            if (!isLeftHandSide(expr)) {
              throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
          } else if (match('+') || match('-') || match('~') || match('!')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
          } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            startToken = lookahead;
            token = lex();
            expr = parseUnaryExpression();
            expr = delegate.createUnaryExpression(token.value, expr);
            expr = delegate.markEnd(expr, startToken);
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
              throwErrorTolerant({}, Messages.StrictDelete);
            }
          } else {
            expr = parsePostfixExpression();
          }
          {
            window.ins_exit(41833);
            return expr;
          }
        }
        function binaryPrecedence(token, allowIn) {
          window.ins_enter(42081);
          var prec = 0;
          if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
            {
              var ___ret412 = 0;
              window.ins_exit(42081);
              return ___ret412;
            }
          }
          switch (token.value) {
          case '||':
            prec = 1;
            break;
          case '&&':
            prec = 2;
            break;
          case '|':
            prec = 3;
            break;
          case '^':
            prec = 4;
            break;
          case '&':
            prec = 5;
            break;
          case '==':
          case '!=':
          case '===':
          case '!==':
            prec = 6;
            break;
          case '<':
          case '>':
          case '<=':
          case '>=':
          case 'instanceof':
            prec = 7;
            break;
          case 'in':
            prec = allowIn ? 7 : 0;
            break;
          case '<<':
          case '>>':
          case '>>>':
            prec = 8;
            break;
          case '+':
          case '-':
            prec = 9;
            break;
          case '*':
          case '/':
          case '%':
            prec = 11;
            break;
          default:
            break;
          }
          {
            window.ins_exit(42081);
            return prec;
          }
        }
        function parseBinaryExpression() {
          window.ins_enter(42225);
          var marker, markers, expr, token, prec, stack, right, operator, left, i;
          marker = lookahead;
          left = parseUnaryExpression();
          token = lookahead;
          prec = binaryPrecedence(token, state.allowIn);
          if (prec === 0) {
            {
              window.ins_exit(42225);
              return left;
            }
          }
          token.prec = prec;
          lex();
          markers = [
            marker,
            lookahead
          ];
          right = parseUnaryExpression();
          stack = [
            left,
            token,
            right
          ];
          while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
            while (stack.length > 2 && prec <= stack[stack.length - 2].prec) {
              right = stack.pop();
              operator = stack.pop().value;
              left = stack.pop();
              expr = delegate.createBinaryExpression(operator, left, right);
              markers.pop();
              marker = markers[markers.length - 1];
              delegate.markEnd(expr, marker);
              stack.push(expr);
            }
            token = lex();
            token.prec = prec;
            stack.push(token);
            markers.push(lookahead);
            expr = parseUnaryExpression();
            stack.push(expr);
          }
          i = stack.length - 1;
          expr = stack[i];
          markers.pop();
          while (i > 1) {
            expr = delegate.createBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
            i -= 2;
            marker = markers.pop();
            delegate.markEnd(expr, marker);
          }
          {
            window.ins_exit(42225);
            return expr;
          }
        }
        function parseConditionalExpression() {
          window.ins_enter(42499);
          var expr, previousAllowIn, consequent, alternate, startToken;
          startToken = lookahead;
          expr = parseBinaryExpression();
          if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');
            alternate = parseAssignmentExpression();
            expr = delegate.createConditionalExpression(expr, consequent, alternate);
            delegate.markEnd(expr, startToken);
          }
          {
            window.ins_exit(42499);
            return expr;
          }
        }
        function parseAssignmentExpression() {
          window.ins_enter(42585);
          var token, left, right, node, startToken;
          token = lookahead;
          startToken = lookahead;
          node = left = parseConditionalExpression();
          if (matchAssign()) {
            if (!isLeftHandSide(left)) {
              throwErrorTolerant({}, Messages.InvalidLHSInAssignment);
            }
            if (strict && left.type === Syntax.Identifier && isRestrictedWord(left.name)) {
              throwErrorTolerant(token, Messages.StrictLHSAssignment);
            }
            token = lex();
            right = parseAssignmentExpression();
            node = delegate.markEnd(delegate.createAssignmentExpression(token.value, left, right), startToken);
          }
          {
            window.ins_exit(42585);
            return node;
          }
        }
        function parseExpression() {
          window.ins_enter(42688);
          var expr, startToken = lookahead;
          expr = parseAssignmentExpression();
          if (match(',')) {
            expr = delegate.createSequenceExpression([expr]);
            while (index < length) {
              if (!match(',')) {
                break;
              }
              lex();
              expr.expressions.push(parseAssignmentExpression());
            }
            delegate.markEnd(expr, startToken);
          }
          {
            window.ins_exit(42688);
            return expr;
          }
        }
        function parseStatementList() {
          window.ins_enter(42753);
          var list = [], statement;
          while (index < length) {
            if (match('}')) {
              break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
              break;
            }
            list.push(statement);
          }
          {
            window.ins_exit(42753);
            return list;
          }
        }
        function parseBlock() {
          window.ins_enter(42797);
          var block, startToken;
          startToken = lookahead;
          expect('{');
          block = parseStatementList();
          expect('}');
          {
            var ___ret413 = delegate.markEnd(delegate.createBlockStatement(block), startToken);
            window.ins_exit(42797);
            return ___ret413;
          }
        }
        function parseVariableIdentifier() {
          window.ins_enter(42837);
          var token, startToken;
          startToken = lookahead;
          token = lex();
          if (token.type !== Token.Identifier) {
            throwUnexpected(token);
          }
          {
            var ___ret414 = delegate.markEnd(delegate.createIdentifier(token.value), startToken);
            window.ins_exit(42837);
            return ___ret414;
          }
        }
        function parseVariableDeclaration(kind) {
          window.ins_enter(42884);
          var init = null, id, startToken;
          startToken = lookahead;
          id = parseVariableIdentifier();
          if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
          }
          if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
          } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
          }
          {
            var ___ret415 = delegate.markEnd(delegate.createVariableDeclarator(id, init), startToken);
            window.ins_exit(42884);
            return ___ret415;
          }
        }
        function parseVariableDeclarationList(kind) {
          window.ins_enter(42964);
          var list = [];
          do {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
              break;
            }
            lex();
          } while (index < length);
          {
            window.ins_exit(42964);
            return list;
          }
        }
        function parseVariableStatement() {
          window.ins_enter(43001);
          var declarations;
          expectKeyword('var');
          declarations = parseVariableDeclarationList();
          consumeSemicolon();
          {
            var ___ret416 = delegate.createVariableDeclaration(declarations, 'var');
            window.ins_exit(43001);
            return ___ret416;
          }
        }
        function parseConstLetDeclaration(kind) {
          window.ins_enter(43030);
          var declarations, startToken;
          startToken = lookahead;
          expectKeyword(kind);
          declarations = parseVariableDeclarationList(kind);
          consumeSemicolon();
          {
            var ___ret417 = delegate.markEnd(delegate.createVariableDeclaration(declarations, kind), startToken);
            window.ins_exit(43030);
            return ___ret417;
          }
        }
        function parseEmptyStatement() {
          window.ins_enter(43072);
          expect(';');
          {
            var ___ret418 = delegate.createEmptyStatement();
            window.ins_exit(43072);
            return ___ret418;
          }
        }
        function parseExpressionStatement() {
          window.ins_enter(43088);
          var expr = parseExpression();
          consumeSemicolon();
          {
            var ___ret419 = delegate.createExpressionStatement(expr);
            window.ins_exit(43088);
            return ___ret419;
          }
        }
        function parseIfStatement() {
          window.ins_enter(43109);
          var test, consequent, alternate;
          expectKeyword('if');
          expect('(');
          test = parseExpression();
          expect(')');
          consequent = parseStatement();
          if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
          } else {
            alternate = null;
          }
          {
            var ___ret420 = delegate.createIfStatement(test, consequent, alternate);
            window.ins_exit(43109);
            return ___ret420;
          }
        }
        function parseDoWhileStatement() {
          window.ins_enter(43171);
          var body, test, oldInIteration;
          expectKeyword('do');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          expectKeyword('while');
          expect('(');
          test = parseExpression();
          expect(')');
          if (match(';')) {
            lex();
          }
          {
            var ___ret421 = delegate.createDoWhileStatement(body, test);
            window.ins_exit(43171);
            return ___ret421;
          }
        }
        function parseWhileStatement() {
          window.ins_enter(43244);
          var test, body, oldInIteration;
          expectKeyword('while');
          expect('(');
          test = parseExpression();
          expect(')');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          {
            var ___ret422 = delegate.createWhileStatement(test, body);
            window.ins_exit(43244);
            return ___ret422;
          }
        }
        function parseForVariableDeclaration() {
          window.ins_enter(43305);
          var token, declarations, startToken;
          startToken = lookahead;
          token = lex();
          declarations = parseVariableDeclarationList();
          {
            var ___ret423 = delegate.markEnd(delegate.createVariableDeclaration(declarations, token.value), startToken);
            window.ins_exit(43305);
            return ___ret423;
          }
        }
        function parseForStatement() {
          window.ins_enter(43347);
          var init, test, update, left, right, body, oldInIteration;
          init = test = update = null;
          expectKeyword('for');
          expect('(');
          if (match(';')) {
            lex();
          } else {
            if (matchKeyword('var') || matchKeyword('let')) {
              state.allowIn = false;
              init = parseForVariableDeclaration();
              state.allowIn = true;
              if (init.declarations.length === 1 && matchKeyword('in')) {
                lex();
                left = init;
                right = parseExpression();
                init = null;
              }
            } else {
              state.allowIn = false;
              init = parseExpression();
              state.allowIn = true;
              if (matchKeyword('in')) {
                if (!isLeftHandSide(init)) {
                  throwErrorTolerant({}, Messages.InvalidLHSInForIn);
                }
                lex();
                left = init;
                right = parseExpression();
                init = null;
              }
            }
            if (typeof left === 'undefined') {
              expect(';');
            }
          }
          if (typeof left === 'undefined') {
            if (!match(';')) {
              test = parseExpression();
            }
            expect(';');
            if (!match(')')) {
              update = parseExpression();
            }
          }
          expect(')');
          oldInIteration = state.inIteration;
          state.inIteration = true;
          body = parseStatement();
          state.inIteration = oldInIteration;
          {
            var ___ret424 = typeof left === 'undefined' ? delegate.createForStatement(init, test, update, body) : delegate.createForInStatement(left, right, body);
            window.ins_exit(43347);
            return ___ret424;
          }
        }
        function parseContinueStatement() {
          window.ins_enter(43591);
          var label = null, key;
          expectKeyword('continue');
          if (source.charCodeAt(index) === 59) {
            lex();
            if (!state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            {
              var ___ret425 = delegate.createContinueStatement(null);
              window.ins_exit(43591);
              return ___ret425;
            }
          }
          if (peekLineTerminator()) {
            if (!state.inIteration) {
              throwError({}, Messages.IllegalContinue);
            }
            {
              var ___ret426 = delegate.createContinueStatement(null);
              window.ins_exit(43591);
              return ___ret426;
            }
          }
          if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();
            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.UnknownLabel, label.name);
            }
          }
          consumeSemicolon();
          if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
          }
          {
            var ___ret427 = delegate.createContinueStatement(label);
            window.ins_exit(43591);
            return ___ret427;
          }
        }
        function parseBreakStatement() {
          window.ins_enter(43735);
          var label = null, key;
          expectKeyword('break');
          if (source.charCodeAt(index) === 59) {
            lex();
            if (!(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            {
              var ___ret428 = delegate.createBreakStatement(null);
              window.ins_exit(43735);
              return ___ret428;
            }
          }
          if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
              throwError({}, Messages.IllegalBreak);
            }
            {
              var ___ret429 = delegate.createBreakStatement(null);
              window.ins_exit(43735);
              return ___ret429;
            }
          }
          if (lookahead.type === Token.Identifier) {
            label = parseVariableIdentifier();
            key = '$' + label.name;
            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.UnknownLabel, label.name);
            }
          }
          consumeSemicolon();
          if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
          }
          {
            var ___ret430 = delegate.createBreakStatement(label);
            window.ins_exit(43735);
            return ___ret430;
          }
        }
        function parseReturnStatement() {
          window.ins_enter(43891);
          var argument = null;
          expectKeyword('return');
          if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
          }
          if (source.charCodeAt(index) === 32) {
            if (isIdentifierStart(source.charCodeAt(index + 1))) {
              argument = parseExpression();
              consumeSemicolon();
              {
                var ___ret431 = delegate.createReturnStatement(argument);
                window.ins_exit(43891);
                return ___ret431;
              }
            }
          }
          if (peekLineTerminator()) {
            {
              var ___ret432 = delegate.createReturnStatement(null);
              window.ins_exit(43891);
              return ___ret432;
            }
          }
          if (!match(';')) {
            if (!match('}') && lookahead.type !== Token.EOF) {
              argument = parseExpression();
            }
          }
          consumeSemicolon();
          {
            var ___ret433 = delegate.createReturnStatement(argument);
            window.ins_exit(43891);
            return ___ret433;
          }
        }
        function parseWithStatement() {
          window.ins_enter(43997);
          var object, body;
          if (strict) {
            skipComment();
            throwErrorTolerant({}, Messages.StrictModeWith);
          }
          expectKeyword('with');
          expect('(');
          object = parseExpression();
          expect(')');
          body = parseStatement();
          {
            var ___ret434 = delegate.createWithStatement(object, body);
            window.ins_exit(43997);
            return ___ret434;
          }
        }
        function parseSwitchCase() {
          window.ins_enter(44051);
          var test, consequent = [], statement, startToken;
          startToken = lookahead;
          if (matchKeyword('default')) {
            lex();
            test = null;
          } else {
            expectKeyword('case');
            test = parseExpression();
          }
          expect(':');
          while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
              break;
            }
            statement = parseStatement();
            consequent.push(statement);
          }
          {
            var ___ret435 = delegate.markEnd(delegate.createSwitchCase(test, consequent), startToken);
            window.ins_exit(44051);
            return ___ret435;
          }
        }
        function parseSwitchStatement() {
          window.ins_enter(44140);
          var discriminant, cases, clause, oldInSwitch, defaultFound;
          expectKeyword('switch');
          expect('(');
          discriminant = parseExpression();
          expect(')');
          expect('{');
          cases = [];
          if (match('}')) {
            lex();
            {
              var ___ret436 = delegate.createSwitchStatement(discriminant, cases);
              window.ins_exit(44140);
              return ___ret436;
            }
          }
          oldInSwitch = state.inSwitch;
          state.inSwitch = true;
          defaultFound = false;
          while (index < length) {
            if (match('}')) {
              break;
            }
            clause = parseSwitchCase();
            if (clause.test === null) {
              if (defaultFound) {
                throwError({}, Messages.MultipleDefaultsInSwitch);
              }
              defaultFound = true;
            }
            cases.push(clause);
          }
          state.inSwitch = oldInSwitch;
          expect('}');
          {
            var ___ret437 = delegate.createSwitchStatement(discriminant, cases);
            window.ins_exit(44140);
            return ___ret437;
          }
        }
        function parseThrowStatement() {
          window.ins_enter(44274);
          var argument;
          expectKeyword('throw');
          if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
          }
          argument = parseExpression();
          consumeSemicolon();
          {
            var ___ret438 = delegate.createThrowStatement(argument);
            window.ins_exit(44274);
            return ___ret438;
          }
        }
        function parseCatchClause() {
          window.ins_enter(44313);
          var param, body, startToken;
          startToken = lookahead;
          expectKeyword('catch');
          expect('(');
          if (match(')')) {
            throwUnexpected(lookahead);
          }
          param = parseVariableIdentifier();
          if (strict && isRestrictedWord(param.name)) {
            throwErrorTolerant({}, Messages.StrictCatchVariable);
          }
          expect(')');
          body = parseBlock();
          {
            var ___ret439 = delegate.markEnd(delegate.createCatchClause(param, body), startToken);
            window.ins_exit(44313);
            return ___ret439;
          }
        }
        function parseTryStatement() {
          window.ins_enter(44390);
          var block, handlers = [], finalizer = null;
          expectKeyword('try');
          block = parseBlock();
          if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
          }
          if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
          }
          if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
          }
          {
            var ___ret440 = delegate.createTryStatement(block, [], handlers, finalizer);
            window.ins_exit(44390);
            return ___ret440;
          }
        }
        function parseDebuggerStatement() {
          window.ins_enter(44466);
          expectKeyword('debugger');
          consumeSemicolon();
          {
            var ___ret441 = delegate.createDebuggerStatement();
            window.ins_exit(44466);
            return ___ret441;
          }
        }
        function parseStatement() {
          window.ins_enter(44485);
          var type = lookahead.type, expr, labeledBody, key, startToken;
          if (type === Token.EOF) {
            throwUnexpected(lookahead);
          }
          if (type === Token.Punctuator && lookahead.value === '{') {
            {
              var ___ret442 = parseBlock();
              window.ins_exit(44485);
              return ___ret442;
            }
          }
          startToken = lookahead;
          if (type === Token.Punctuator) {
            switch (lookahead.value) {
            case ';': {
                var ___ret443 = delegate.markEnd(parseEmptyStatement(), startToken);
                window.ins_exit(44485);
                return ___ret443;
              }
            case '(': {
                var ___ret444 = delegate.markEnd(parseExpressionStatement(), startToken);
                window.ins_exit(44485);
                return ___ret444;
              }
            default:
              break;
            }
          }
          if (type === Token.Keyword) {
            switch (lookahead.value) {
            case 'break': {
                var ___ret445 = delegate.markEnd(parseBreakStatement(), startToken);
                window.ins_exit(44485);
                return ___ret445;
              }
            case 'continue': {
                var ___ret446 = delegate.markEnd(parseContinueStatement(), startToken);
                window.ins_exit(44485);
                return ___ret446;
              }
            case 'debugger': {
                var ___ret447 = delegate.markEnd(parseDebuggerStatement(), startToken);
                window.ins_exit(44485);
                return ___ret447;
              }
            case 'do': {
                var ___ret448 = delegate.markEnd(parseDoWhileStatement(), startToken);
                window.ins_exit(44485);
                return ___ret448;
              }
            case 'for': {
                var ___ret449 = delegate.markEnd(parseForStatement(), startToken);
                window.ins_exit(44485);
                return ___ret449;
              }
            case 'function': {
                var ___ret450 = delegate.markEnd(parseFunctionDeclaration(), startToken);
                window.ins_exit(44485);
                return ___ret450;
              }
            case 'if': {
                var ___ret451 = delegate.markEnd(parseIfStatement(), startToken);
                window.ins_exit(44485);
                return ___ret451;
              }
            case 'return': {
                var ___ret452 = delegate.markEnd(parseReturnStatement(), startToken);
                window.ins_exit(44485);
                return ___ret452;
              }
            case 'switch': {
                var ___ret453 = delegate.markEnd(parseSwitchStatement(), startToken);
                window.ins_exit(44485);
                return ___ret453;
              }
            case 'throw': {
                var ___ret454 = delegate.markEnd(parseThrowStatement(), startToken);
                window.ins_exit(44485);
                return ___ret454;
              }
            case 'try': {
                var ___ret455 = delegate.markEnd(parseTryStatement(), startToken);
                window.ins_exit(44485);
                return ___ret455;
              }
            case 'var': {
                var ___ret456 = delegate.markEnd(parseVariableStatement(), startToken);
                window.ins_exit(44485);
                return ___ret456;
              }
            case 'while': {
                var ___ret457 = delegate.markEnd(parseWhileStatement(), startToken);
                window.ins_exit(44485);
                return ___ret457;
              }
            case 'with': {
                var ___ret458 = delegate.markEnd(parseWithStatement(), startToken);
                window.ins_exit(44485);
                return ___ret458;
              }
            default:
              break;
            }
          }
          expr = parseExpression();
          if (expr.type === Syntax.Identifier && match(':')) {
            lex();
            key = '$' + expr.name;
            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
              throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }
            state.labelSet[key] = true;
            labeledBody = parseStatement();
            delete state.labelSet[key];
            {
              var ___ret459 = delegate.markEnd(delegate.createLabeledStatement(expr, labeledBody), startToken);
              window.ins_exit(44485);
              return ___ret459;
            }
          }
          consumeSemicolon();
          {
            var ___ret460 = delegate.markEnd(delegate.createExpressionStatement(expr), startToken);
            window.ins_exit(44485);
            return ___ret460;
          }
        }
        function parseFunctionSourceElements() {
          window.ins_enter(44823);
          var sourceElement, sourceElements = [], token, directive, firstRestricted, oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody, startToken;
          startToken = lookahead;
          expect('{');
          while (index < length) {
            if (lookahead.type !== Token.StringLiteral) {
              break;
            }
            token = lookahead;
            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
              break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
              strict = true;
              if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
              }
            } else {
              if (!firstRestricted && token.octal) {
                firstRestricted = token;
              }
            }
          }
          oldLabelSet = state.labelSet;
          oldInIteration = state.inIteration;
          oldInSwitch = state.inSwitch;
          oldInFunctionBody = state.inFunctionBody;
          state.labelSet = {};
          state.inIteration = false;
          state.inSwitch = false;
          state.inFunctionBody = true;
          while (index < length) {
            if (match('}')) {
              break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
              break;
            }
            sourceElements.push(sourceElement);
          }
          expect('}');
          state.labelSet = oldLabelSet;
          state.inIteration = oldInIteration;
          state.inSwitch = oldInSwitch;
          state.inFunctionBody = oldInFunctionBody;
          {
            var ___ret461 = delegate.markEnd(delegate.createBlockStatement(sourceElements), startToken);
            window.ins_exit(44823);
            return ___ret461;
          }
        }
        function parseParams(firstRestricted) {
          window.ins_enter(45067);
          var param, params = [], token, stricted, paramSet, key, message;
          expect('(');
          if (!match(')')) {
            paramSet = {};
            while (index < length) {
              token = lookahead;
              param = parseVariableIdentifier();
              key = '$' + token.value;
              if (strict) {
                if (isRestrictedWord(token.value)) {
                  stricted = token;
                  message = Messages.StrictParamName;
                }
                if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                  stricted = token;
                  message = Messages.StrictParamDupe;
                }
              } else if (!firstRestricted) {
                if (isRestrictedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictParamName;
                } else if (isStrictModeReservedWord(token.value)) {
                  firstRestricted = token;
                  message = Messages.StrictReservedWord;
                } else if (Object.prototype.hasOwnProperty.call(paramSet, key)) {
                  firstRestricted = token;
                  message = Messages.StrictParamDupe;
                }
              }
              params.push(param);
              paramSet[key] = true;
              if (match(')')) {
                break;
              }
              expect(',');
            }
          }
          expect(')');
          {
            var ___ret462 = {
                params: params,
                stricted: stricted,
                firstRestricted: firstRestricted,
                message: message
              };
            window.ins_exit(45067);
            return ___ret462;
          }
        }
        function parseFunctionDeclaration() {
          window.ins_enter(45269);
          var id, params = [], body, token, stricted, tmp, firstRestricted, message, previousStrict, startToken;
          startToken = lookahead;
          expectKeyword('function');
          token = lookahead;
          id = parseVariableIdentifier();
          if (strict) {
            if (isRestrictedWord(token.value)) {
              throwErrorTolerant(token, Messages.StrictFunctionName);
            }
          } else {
            if (isRestrictedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
              firstRestricted = token;
              message = Messages.StrictReservedWord;
            }
          }
          tmp = parseParams(firstRestricted);
          params = tmp.params;
          stricted = tmp.stricted;
          firstRestricted = tmp.firstRestricted;
          if (tmp.message) {
            message = tmp.message;
          }
          previousStrict = strict;
          body = parseFunctionSourceElements();
          if (strict && firstRestricted) {
            throwError(firstRestricted, message);
          }
          if (strict && stricted) {
            throwErrorTolerant(stricted, message);
          }
          strict = previousStrict;
          {
            var ___ret463 = delegate.markEnd(delegate.createFunctionDeclaration(id, params, [], body), startToken);
            window.ins_exit(45269);
            return ___ret463;
          }
        }
        function parseFunctionExpression() {
          window.ins_enter(45449);
          var token, id = null, stricted, firstRestricted, message, tmp, params = [], body, previousStrict, startToken;
          startToken = lookahead;
          expectKeyword('function');
          if (!match('(')) {
            token = lookahead;
            id = parseVariableIdentifier();
            if (strict) {
              if (isRestrictedWord(token.value)) {
                throwErrorTolerant(token, Messages.StrictFunctionName);
              }
            } else {
              if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
              } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
              }
            }
          }
          tmp = parseParams(firstRestricted);
          params = tmp.params;
          stricted = tmp.stricted;
          firstRestricted = tmp.firstRestricted;
          if (tmp.message) {
            message = tmp.message;
          }
          previousStrict = strict;
          body = parseFunctionSourceElements();
          if (strict && firstRestricted) {
            throwError(firstRestricted, message);
          }
          if (strict && stricted) {
            throwErrorTolerant(stricted, message);
          }
          strict = previousStrict;
          {
            var ___ret464 = delegate.markEnd(delegate.createFunctionExpression(id, params, [], body), startToken);
            window.ins_exit(45449);
            return ___ret464;
          }
        }
        function parseSourceElement() {
          window.ins_enter(45636);
          if (lookahead.type === Token.Keyword) {
            switch (lookahead.value) {
            case 'const':
            case 'let': {
                var ___ret465 = parseConstLetDeclaration(lookahead.value);
                window.ins_exit(45636);
                return ___ret465;
              }
            case 'function': {
                var ___ret466 = parseFunctionDeclaration();
                window.ins_exit(45636);
                return ___ret466;
              }
            default: {
                var ___ret467 = parseStatement();
                window.ins_exit(45636);
                return ___ret467;
              }
            }
          }
          if (lookahead.type !== Token.EOF) {
            {
              var ___ret468 = parseStatement();
              window.ins_exit(45636);
              return ___ret468;
            }
          }
          window.ins_exit(45636);
        }
        function parseSourceElements() {
          window.ins_enter(45687);
          var sourceElement, sourceElements = [], token, directive, firstRestricted;
          while (index < length) {
            token = lookahead;
            if (token.type !== Token.StringLiteral) {
              break;
            }
            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
              break;
            }
            directive = source.slice(token.start + 1, token.end - 1);
            if (directive === 'use strict') {
              strict = true;
              if (firstRestricted) {
                throwErrorTolerant(firstRestricted, Messages.StrictOctalLiteral);
              }
            } else {
              if (!firstRestricted && token.octal) {
                firstRestricted = token;
              }
            }
          }
          while (index < length) {
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
              break;
            }
            sourceElements.push(sourceElement);
          }
          {
            window.ins_exit(45687);
            return sourceElements;
          }
        }
        function parseProgram() {
          window.ins_enter(45822);
          var body, startToken;
          skipComment();
          peek();
          startToken = lookahead;
          strict = false;
          body = parseSourceElements();
          {
            var ___ret469 = delegate.markEnd(delegate.createProgram(body), startToken);
            window.ins_exit(45822);
            return ___ret469;
          }
        }
        function filterTokenLocation() {
          window.ins_enter(45864);
          var i, entry, token, tokens = [];
          for (i = 0; i < extra.tokens.length; ++i) {
            entry = extra.tokens[i];
            token = {
              type: entry.type,
              value: entry.value
            };
            if (extra.range) {
              token.range = entry.range;
            }
            if (extra.loc) {
              token.loc = entry.loc;
            }
            tokens.push(token);
          }
          extra.tokens = tokens;
          window.ins_exit(45864);
        }
        function tokenize(code, options) {
          window.ins_enter(45955);
          var toString, token, tokens;
          toString = String;
          if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
          }
          delegate = SyntaxTreeDelegate;
          source = code;
          index = 0;
          lineNumber = source.length > 0 ? 1 : 0;
          lineStart = 0;
          length = source.length;
          lookahead = null;
          state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
          };
          extra = {};
          options = options || {};
          options.tokens = true;
          extra.tokens = [];
          extra.tokenize = true;
          extra.openParenToken = -1;
          extra.openCurlyToken = -1;
          extra.range = typeof options.range === 'boolean' && options.range;
          extra.loc = typeof options.loc === 'boolean' && options.loc;
          if (typeof options.comment === 'boolean' && options.comment) {
            extra.comments = [];
          }
          if (typeof options.tolerant === 'boolean' && options.tolerant) {
            extra.errors = [];
          }
          try {
            peek();
            if (lookahead.type === Token.EOF) {
              {
                var ___ret470 = extra.tokens;
                window.ins_exit(45955);
                return ___ret470;
              }
            }
            token = lex();
            while (lookahead.type !== Token.EOF) {
              try {
                token = lex();
              } catch (lexError) {
                token = lookahead;
                if (extra.errors) {
                  extra.errors.push(lexError);
                  break;
                } else {
                  throw lexError;
                }
              }
            }
            filterTokenLocation();
            tokens = extra.tokens;
            if (typeof extra.comments !== 'undefined') {
              tokens.comments = extra.comments;
            }
            if (typeof extra.errors !== 'undefined') {
              tokens.errors = extra.errors;
            }
          } catch (e) {
            throw e;
          } finally {
            extra = {};
          }
          {
            window.ins_exit(45955);
            return tokens;
          }
        }
        function parse(code, options) {
          window.ins_enter(46276);
          var program, toString;
          toString = String;
          if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
          }
          delegate = SyntaxTreeDelegate;
          source = code;
          index = 0;
          lineNumber = source.length > 0 ? 1 : 0;
          lineStart = 0;
          length = source.length;
          lookahead = null;
          state = {
            allowIn: true,
            labelSet: {},
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false,
            lastCommentStart: -1
          };
          extra = {};
          if (typeof options !== 'undefined') {
            extra.range = typeof options.range === 'boolean' && options.range;
            extra.loc = typeof options.loc === 'boolean' && options.loc;
            extra.attachComment = typeof options.attachComment === 'boolean' && options.attachComment;
            if (extra.loc && options.source !== null && options.source !== undefined) {
              extra.source = toString(options.source);
            }
            if (typeof options.tokens === 'boolean' && options.tokens) {
              extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
              extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
              extra.errors = [];
            }
            if (extra.attachComment) {
              extra.range = true;
              extra.comments = [];
              extra.bottomRightStack = [];
              extra.trailingComments = [];
              extra.leadingComments = [];
            }
          }
          try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
              program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
              filterTokenLocation();
              program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
              program.errors = extra.errors;
            }
          } catch (e) {
            throw e;
          } finally {
            extra = {};
          }
          {
            window.ins_exit(46276);
            return program;
          }
        }
        exports.version = '1.2.2';
        exports.tokenize = tokenize;
        exports.parse = parse;
        exports.Syntax = function () {
          window.ins_enter(46636);
          var name, types = {};
          if (typeof Object.create === 'function') {
            types = Object.create(null);
          }
          for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
              types[name] = Syntax[name];
            }
          }
          if (typeof Object.freeze === 'function') {
            Object.freeze(types);
          }
          {
            window.ins_exit(46636);
            return types;
          }
        }();
        window.ins_exit(33731);
      }));
      window.ins_exit(33674);
    },
    {}
  ],
  24: [
    function (require, module, exports) {
      window.ins_enter(46703);
      var DataBuffer = require('./webgl/src/databuffer');
      var IndexBuffer = require('./webgl/src/indexbuffer');
      var Program = require('./webgl/src/program');
      var RenderTarget = require('./webgl/src/rendertarget');
      var ShaderLib = require('./webgl/src/shaderlib');
      var Texture = require('./webgl/src/texture');
      var Utils = require('./webgl/src/utils');
      module.exports = {
        DataBuffer: DataBuffer,
        IndexBuffer: IndexBuffer,
        Program: Program,
        RenderTarget: RenderTarget,
        ShaderLib: ShaderLib,
        Texture: Texture,
        Matrix: Utils.Matrix,
        Camera: Utils.Camera,
        Utils: Utils.Utils
      };
      window.ins_exit(46703);
    },
    {
      './webgl/src/databuffer': 25,
      './webgl/src/indexbuffer': 26,
      './webgl/src/program': 27,
      './webgl/src/rendertarget': 28,
      './webgl/src/shaderlib': 29,
      './webgl/src/texture': 30,
      './webgl/src/utils': 31
    }
  ],
  25: [
    function (require, module, exports) {
      window.ins_enter(46818);
      var gl;
      var DataBuffer = function (itemSize, numItems, data) {
        window.ins_enter(46833);
        this.glBuffer = gl.createBuffer();
        this.itemSize = itemSize;
        this.numItems = numItems;
        if (data) {
          this.setData(data);
        }
        window.ins_exit(46833);
      };
      DataBuffer.init = function (_gl) {
        window.ins_enter(46877);
        gl = _gl;
        window.ins_exit(46877);
      };
      DataBuffer.prototype.setData = function (data) {
        window.ins_enter(46895);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        window.ins_exit(46895);
      };
      module.exports = DataBuffer;
      window.ins_exit(46818);
    },
    {}
  ],
  26: [
    function (require, module, exports) {
      window.ins_enter(46944);
      var gl;
      var IndexBuffer = function (itemSize, numItems, data, type) {
        window.ins_enter(46959);
        this.glBuffer = gl.createBuffer();
        this.itemSize = itemSize;
        this.numItems = numItems;
        this.type = type || gl.UNSIGNED_SHORT;
        if (data) {
          this.setData(data);
        }
        window.ins_exit(46959);
      };
      IndexBuffer.init = function (_gl) {
        window.ins_enter(47014);
        gl = _gl;
        window.ins_exit(47014);
      };
      IndexBuffer.prototype.setData = function (data) {
        window.ins_enter(47032);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.glBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        window.ins_exit(47032);
      };
      module.exports = IndexBuffer;
      window.ins_exit(46944);
    },
    {}
  ],
  27: [
    function (require, module, exports) {
      window.ins_enter(47081);
      var DataBuffer = require('./databuffer');
      var IndexBuffer = require('./indexbuffer');
      var RenderTarget = require('./rendertarget');
      var Texture = require('./texture');
      var gl;
      var log = function () {
        window.ins_enter(47120);
        window.ins_exit(47120);
      };
      var Program = function (vertexShader, fragmentShader, params) {
        window.ins_enter(47129);
        params = params || {};
        this.attributes = {};
        this.uniforms = {};
        this.glProgram = null;
        this.renderTarget = null;
        this.framebuffer = null;
        this.renderbuffer = null;
        this.indexBuffer = null;
        this.textureCount = 0;
        this.viewport = params.viewport || {
          x: 0,
          y: 0,
          w: 1,
          h: 1
        };
        this.blendEnabled = params.blendEnabled || false;
        this.blendEquation = params.blendEquation || gl.FUNC_ADD;
        this.blendFunc = params.blendFunc || [
          gl.SRC_ALPHA,
          gl.ONE
        ];
        this.drawMode = 'drawMode' in params ? params.drawMode : gl.TRIANGLES;
        this.cullFace = 'cullFace' in params ? params.cullFace : null;
        this.depthTest = 'depthTest' in params ? params.depthTest : true;
        this.clear = 'clear' in params ? params.clear : gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
        if (vertexShader && fragmentShader) {
          this.buildProgram(vertexShader, fragmentShader);
        }
        window.ins_exit(47129);
      };
      Program.gl = gl;
      Program.init = function (_gl) {
        window.ins_enter(47335);
        gl = _gl;
        DataBuffer.init(gl);
        IndexBuffer.init(gl);
        RenderTarget.init(gl);
        Texture.init(gl);
        gl.getExtension('OES_texture_float');
        gl.getExtension('OES_texture_float_linear');
        gl.getExtension('OES_standard_derivatives');
        gl.getExtension('OES_element_index_uint');
        window.ins_exit(47335);
      };
      Program.prototype.buildProgram = function (vertexShader, fragmentShader) {
        window.ins_enter(47401);
        var vertexShaderId = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(vertexShaderId, vertexShader);
        gl.compileShader(vertexShaderId);
        log('getShaderInfoLog', gl.getShaderInfoLog(vertexShaderId));
        gl.shaderSource(fragmentShaderId, fragmentShader);
        gl.compileShader(fragmentShaderId);
        log('getShaderInfoLog', gl.getShaderInfoLog(fragmentShaderId));
        this.glProgram = gl.createProgram();
        log(this.glProgram);
        gl.attachShader(this.glProgram, vertexShaderId);
        gl.attachShader(this.glProgram, fragmentShaderId);
        gl.linkProgram(this.glProgram);
        if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
          log('VALIDATE_STATUS', gl.getProgramParameter(this.glProgram, gl.VALIDATE_STATUS));
          log('getError', gl.getError());
        }
        log('getProgramInfoLog', gl.getProgramInfoLog(this.glProgram));
        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);
        window.ins_exit(47401);
      };
      Program.prototype.initAttribute = function (name) {
        window.ins_enter(47579);
        if (this.glProgram != null) {
          var attr = this.attributes[name];
          attr.location = gl.getAttribLocation(this.glProgram, name);
          log('initAttribute', name, attr.location);
        }
        window.ins_exit(47579);
      };
      Program.prototype.initUniform = function (name) {
        window.ins_enter(47629);
        if (this.glProgram != null) {
          var uni = this.uniforms[name];
          uni.location = gl.getUniformLocation(this.glProgram, name);
          log('initUniform', name, uni.location);
        }
        window.ins_exit(47629);
      };
      Program.prototype.addAttribute = function (name, size, type, buffer) {
        window.ins_enter(47679);
        var attr = this.attributes[name] = {
            name: name,
            location: -1,
            size: size || 4,
            type: type || gl.FLOAT,
            stride: 0,
            offset: 0,
            buffer: buffer || null
          };
        this.initAttribute(name);
        window.ins_exit(47679);
      };
      Program.prototype.setAttribute = function (name, buffer) {
        window.ins_enter(47742);
        var attr = this.attributes[name];
        attr.buffer = buffer;
        window.ins_exit(47742);
      };
      Program.prototype.loadAttributes = function () {
        window.ins_enter(47771);
        for (var k in this.attributes) {
          var attr = this.attributes[k];
          gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer.glBuffer);
          gl.vertexAttribPointer(attr.location, attr.size, attr.type, false, attr.stride, attr.offset);
          gl.enableVertexAttribArray(attr.location);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        window.ins_exit(47771);
      };
      Program.prototype.unloadAttributes = function () {
        window.ins_enter(47851);
        for (var k in this.attributes) {
          var attr = this.attributes[k];
          gl.disableVertexAttribArray(attr.location);
        }
        window.ins_exit(47851);
      };
      Program.prototype.addUniform = function (name, type, value) {
        window.ins_enter(47888);
        var uni = this.uniforms[name] = {
            name: name,
            location: -1,
            type: type || 'f',
            value: value || null
          };
        this.initUniform(name);
        window.ins_exit(47888);
      };
      Program.prototype.setUniform = function (name, value) {
        window.ins_enter(47937);
        this.uniforms[name].value = value;
        window.ins_exit(47937);
      };
      Program.prototype.loadUniforms = function () {
        window.ins_enter(47962);
        var textureCount = 0;
        for (var name in this.uniforms) {
          var uni = this.uniforms[name];
          switch (uni.type) {
          case 'i':
            gl.uniform1i(uni.location, uni.value);
            break;
          case 'f':
            gl.uniform1f(uni.location, uni.value);
            break;
          case 'v2':
            gl.uniform2f(uni.location, uni.value[0], uni.value[1]);
            break;
          case 'v3':
            gl.uniform3f(uni.location, uni.value[0], uni.value[1], uni.value[2]);
            break;
          case 'v4':
            gl.uniform4f(uni.location, uni.value[0], uni.value[1], uni.value[2], uni.value[3]);
            break;
          case 'm4':
            gl.uniformMatrix4fv(uni.location, false, uni.value);
            break;
          case 't':
            var unit = textureCount++;
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, uni.value);
            gl.uniform1i(uni.location, unit);
            break;
          }
        }
        window.ins_exit(47962);
      };
      Program.prototype.setIndexBuffer = function (indexBuffer) {
        window.ins_enter(48158);
        this.indexBuffer = indexBuffer;
        window.ins_exit(48158);
      };
      Program.prototype.setRenderTarget = function (renderTarget, setViewport) {
        window.ins_enter(48178);
        this.renderTarget = renderTarget;
        this.framebuffer = renderTarget && renderTarget.framebuffer || null;
        this.renderbuffer = renderTarget && renderTarget.renderbuffer || null;
        if (renderTarget && setViewport) {
          this.setViewport(0, 0, renderTarget.width, renderTarget.height);
        }
        window.ins_exit(48178);
      };
      Program.prototype.setViewport = function (x, y, w, h) {
        window.ins_enter(48241);
        this.viewport.x = x;
        this.viewport.y = y;
        this.viewport.w = w;
        this.viewport.h = h;
        window.ins_exit(48241);
      };
      Program.prototype.draw = function (first, count) {
        window.ins_enter(48290);
        gl.useProgram(this.glProgram);
        if (Program.framebuffer !== this.framebuffer) {
          Program.framebuffer = this.framebuffer;
          gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        }
        if (this.renderTarget) {
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.renderTarget.getGlTexture(), 0);
        }
        if (this.clear) {
          gl.clear(this.clear);
        }
        if (this.blendEnabled) {
          gl.enable(gl.BLEND);
          if (this.blendEquation.length) {
            gl.blendEquationSeparate(this.blendEquation[0], this.blendEquation[1]);
          } else {
            gl.blendEquation(this.blendEquation);
          }
          if (this.blendFunc.length == 4) {
            gl.blendFuncSeparate(this.blendFunc[0], this.blendFunc[1], this.blendFunc[2], this.blendFunc[3]);
          } else {
            gl.blendFunc(this.blendFunc[0], this.blendFunc[1]);
          }
        } else {
          gl.disable(gl.BLEND);
        }
        if (this.depthTest) {
          gl.enable(gl.DEPTH_TEST);
        } else {
          gl.disable(gl.DEPTH_TEST);
        }
        if (this.cullFace != null) {
          gl.enable(gl.CULL_FACE);
          gl.cullFace(this.cullFace);
        } else {
          gl.disable(gl.CULL_FACE);
        }
        var vp = this.viewport;
        gl.viewport(vp.x, vp.y, vp.w, vp.h);
        this.loadAttributes();
        this.loadUniforms();
        if (this.indexBuffer != null) {
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer.glBuffer);
          gl.drawElements(this.drawMode, count, this.indexBuffer.type, first * this.indexBuffer.itemSize);
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        } else {
          gl.drawArrays(this.drawMode, first, count);
        }
        this.unloadAttributes();
        window.ins_exit(48290);
      };
      module.exports = Program;
      window.ins_exit(47081);
    },
    {
      './databuffer': 25,
      './indexbuffer': 26,
      './rendertarget': 28,
      './texture': 30
    }
  ],
  28: [
    function (require, module, exports) {
      window.ins_enter(48651);
      var Texture = require('./texture');
      var gl;
      var RenderTarget = function (width, height, params) {
        window.ins_enter(48672);
        this.width = width;
        this.height = height;
        this.texture = null;
        this.framebuffer = null;
        this.renderBuffer = null;
        this.init(params || {});
        window.ins_exit(48672);
      };
      RenderTarget.init = function (_gl) {
        window.ins_enter(48724);
        gl = _gl;
        window.ins_exit(48724);
      };
      RenderTarget.prototype.init = function (params) {
        window.ins_enter(48742);
        this.texture = new Texture(this.width, this.height, params);
        if (!params.data) {
          this.texture.init().setData(null);
        }
        this.framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture.glTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        window.ins_exit(48742);
      };
      RenderTarget.prototype.getGlTexture = function () {
        window.ins_enter(48836);
        {
          var ___ret471 = this.texture && this.texture.glTexture;
          window.ins_exit(48836);
          return ___ret471;
        }
      };
      module.exports = RenderTarget;
      window.ins_exit(48651);
    },
    { './texture': 30 }
  ],
  29: [
    function (require, module, exports) {
      window.ins_enter(48865);
      var ShaderLib = {};
      ShaderLib.noise3d = [
        '//',
        '// Description : Array and textureless GLSL 2D/3D/4D simplex ',
        '//               noise functions.',
        '//      Author : Ian McEwan, Ashima Arts.',
        '//  Maintainer : ijm',
        '//     Lastmod : 20110822 (ijm)',
        '//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.',
        '//               Distributed under the MIT License. See LICENSE file.',
        '//               https://github.com/ashima/webgl-noise',
        '// ',
        '',
        'vec3 mod289(vec3 x) {',
        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',
        '',
        'vec4 mod289(vec4 x) {',
        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',
        '',
        'vec4 permute(vec4 x) {',
        '     return mod289(((x*34.0)+1.0)*x);',
        '}',
        '',
        'vec4 taylorInvSqrt(vec4 r)',
        '{',
        '  return 1.79284291400159 - 0.85373472095314 * r;',
        '}',
        '',
        'float snoise(vec3 v)',
        '{',
        '  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;',
        '  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);',
        '',
        '// First corner',
        '  vec3 i  = floor(v + dot(v, C.yyy) );',
        '  vec3 x0 =   v - i + dot(i, C.xxx) ;',
        '',
        '// Other corners',
        '  vec3 g = step(x0.yzx, x0.xyz);',
        '  vec3 l = 1.0 - g;',
        '  vec3 i1 = min( g.xyz, l.zxy );',
        '  vec3 i2 = max( g.xyz, l.zxy );',
        '',
        '  //   x0 = x0 - 0.0 + 0.0 * C.xxx;',
        '  //   x1 = x0 - i1  + 1.0 * C.xxx;',
        '  //   x2 = x0 - i2  + 2.0 * C.xxx;',
        '  //   x3 = x0 - 1.0 + 3.0 * C.xxx;',
        '  vec3 x1 = x0 - i1 + C.xxx;',
        '  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y',
        '  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y',
        '',
        '// Permutations',
        '  i = mod289(i); ',
        '  vec4 p = permute( permute( permute( ',
        '             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))',
        '           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) ',
        '           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));',
        '',
        '// Gradients: 7x7 points over a square, mapped onto an octahedron.',
        '// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)',
        '  float n_ = 0.142857142857; // 1.0/7.0',
        '  vec3  ns = n_ * D.wyz - D.xzx;',
        '',
        '  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)',
        '',
        '  vec4 x_ = floor(j * ns.z);',
        '  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)',
        '',
        '  vec4 x = x_ *ns.x + ns.yyyy;',
        '  vec4 y = y_ *ns.x + ns.yyyy;',
        '  vec4 h = 1.0 - abs(x) - abs(y);',
        '',
        '  vec4 b0 = vec4( x.xy, y.xy );',
        '  vec4 b1 = vec4( x.zw, y.zw );',
        '',
        '  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;',
        '  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;',
        '  vec4 s0 = floor(b0)*2.0 + 1.0;',
        '  vec4 s1 = floor(b1)*2.0 + 1.0;',
        '  vec4 sh = -step(h, vec4(0.0));',
        '',
        '  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;',
        '  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;',
        '',
        '  vec3 p0 = vec3(a0.xy,h.x);',
        '  vec3 p1 = vec3(a0.zw,h.y);',
        '  vec3 p2 = vec3(a1.xy,h.z);',
        '  vec3 p3 = vec3(a1.zw,h.w);',
        '',
        '//Normalise gradients',
        '  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));',
        '  p0 *= norm.x;',
        '  p1 *= norm.y;',
        '  p2 *= norm.z;',
        '  p3 *= norm.w;',
        '',
        '// Mix final noise value',
        '  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);',
        '  m = m * m;',
        '  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), ',
        '                                dot(p2,x2), dot(p3,x3) ) );',
        '}'
      ].join('\n');
      ShaderLib.noise2d = [
        '//',
        '// Description : Array and textureless GLSL 2D simplex noise function.',
        '//      Author : Ian McEwan, Ashima Arts.',
        '//  Maintainer : ijm',
        '//     Lastmod : 20110822 (ijm)',
        '//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.',
        '//               Distributed under the MIT License. See LICENSE file.',
        '//               https://github.com/ashima/webgl-noise',
        '// ',
        '',
        'vec3 mod289(vec3 x) {',
        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',
        '',
        'vec2 mod289(vec2 x) {',
        '  return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',
        '',
        'vec3 permute(vec3 x) {',
        '  return mod289(((x*34.0)+1.0)*x);',
        '}',
        '',
        'float snoise(vec2 v)',
        '  {',
        '  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0',
        '                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)',
        '                     -0.577350269189626,  // -1.0 + 2.0 * C.x',
        '                      0.024390243902439); // 1.0 / 41.0',
        '// First corner',
        '  vec2 i  = floor(v + dot(v, C.yy) );',
        '  vec2 x0 = v -   i + dot(i, C.xx);',
        '',
        '// Other corners',
        '  vec2 i1;',
        '  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0',
        '  //i1.y = 1.0 - i1.x;',
        '  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
        '  // x0 = x0 - 0.0 + 0.0 * C.xx ;',
        '  // x1 = x0 - i1 + 1.0 * C.xx ;',
        '  // x2 = x0 - 1.0 + 2.0 * C.xx ;',
        '  vec4 x12 = x0.xyxy + C.xxzz;',
        '  x12.xy -= i1;',
        '',
        '// Permutations',
        '  i = mod289(i); // Avoid truncation effects in permutation',
        '  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))',
        '    + i.x + vec3(0.0, i1.x, 1.0 ));',
        '',
        '  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
        '  m = m*m ;',
        '  m = m*m ;',
        '',
        '// Gradients: 41 points uniformly over a line, mapped onto a diamond.',
        '// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)',
        '',
        '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
        '  vec3 h = abs(x) - 0.5;',
        '  vec3 ox = floor(x + 0.5);',
        '  vec3 a0 = x - ox;',
        '',
        '// Normalise gradients implicitly by scaling m',
        '// Approximation of: m *= inversesqrt( a0*a0 + h*h );',
        '  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );',
        '',
        '// Compute final noise value at P',
        '  vec3 g;',
        '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
        '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
        '  return 130.0 * dot(m, g);',
        '}'
      ].join('\n');
      module.exports = ShaderLib;
      window.ins_exit(48865);
    },
    {}
  ],
  30: [
    function (require, module, exports) {
      window.ins_enter(49080);
      var Utils = require('./utils').Utils;
      var gl, DEFAULT_TEXTURE_DATA;
      var Texture = function (width, height, params) {
        window.ins_enter(49105);
        params = params || {};
        this.width = width;
        this.height = height;
        this.wrapS = params.wrapS || gl.CLAMP_TO_EDGE;
        this.wrapT = params.wrapT || gl.CLAMP_TO_EDGE;
        this.magFilter = params.magFilter || gl.NEAREST;
        this.minFilter = params.minFilter || gl.NEAREST;
        this.format = params.format || gl.RGBA;
        this.type = params.type || gl.UNSIGNED_BYTE;
        this.glTexture = params.glTexture || null;
        if (params.image && typeof params.image == 'string') {
          this.width = 1;
          this.height = 1;
          this.init();
          this.setData(DEFAULT_TEXTURE_DATA);
          var self = this;
          Utils.loadImage(params.image, function (img) {
            window.ins_enter(49261);
            self.width = width;
            self.height = height;
            self.setImage(img);
            if (params.onLoad) {
              params.onLoad(self, img);
            }
            window.ins_exit(49261);
          });
        } else if (params.image) {
          this.init();
          this.setImage(params.image);
        } else if (params.data) {
          this.init();
          this.setData(params.data);
        } else if (this.glTexture) {
          this.applyParameters();
        }
        window.ins_exit(49105);
      };
      Texture.init = function (_gl) {
        window.ins_enter(49349);
        gl = _gl;
        DEFAULT_TEXTURE_DATA = new Uint8Array([
          0,
          0,
          0,
          0
        ]);
        window.ins_exit(49349);
      };
      Texture.isPower2 = function (value) {
        window.ins_enter(49375);
        {
          var ___ret472 = (value & value - 1) == 0 && value != 0;
          window.ins_exit(49375);
          return ___ret472;
        }
      };
      Texture.prototype.init = function () {
        window.ins_enter(49401);
        this.glTexture = gl.createTexture();
        this.applyParameters();
        {
          var ___ret473 = this;
          window.ins_exit(49401);
          return ___ret473;
        }
      };
      Texture.prototype.applyParameters = function () {
        window.ins_enter(49430);
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.minFilter);
        gl.bindTexture(gl.TEXTURE_2D, null);
        window.ins_exit(49430);
      };
      Texture.prototype.setImage = function (image) {
        window.ins_enter(49519);
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, image);
        if (Texture.isPower2(this.width) && Texture.isPower2(this.height)) {
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        window.ins_exit(49519);
      };
      Texture.prototype.setData = function (data) {
        window.ins_enter(49597);
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.width, this.height, 0, this.format, this.type, data);
        if (Texture.isPower2(this.width) && Texture.isPower2(this.height)) {
          gl.generateMipmap(gl.TEXTURE_2D);
        }
        gl.bindTexture(gl.TEXTURE_2D, null);
        window.ins_exit(49597);
      };
      Texture.prototype.generateMipmap = function () {
        window.ins_enter(49682);
        gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
        window.ins_exit(49682);
      };
      module.exports = Texture;
      window.ins_exit(49080);
    },
    { './utils': 31 }
  ],
  31: [
    function (require, module, exports) {
      window.ins_enter(49729);
      var DataBuffer = require('./databuffer');
      var ShaderLib = require('./shaderlib');
      var fs = require('fs');
      var Utils = {};
      Utils.getTextureIndecies = function (width, height, limit, keepData) {
        window.ins_enter(49765);
        limit = limit || width * height;
        var data = [];
        var dw = 1 / width;
        var dh = 1 / height;
        for (var i = dh * 0.5; i < 1; i += dh) {
          for (var j = dw * 0.5; j < 1; j += dw) {
            data.push(j, i);
            if (data.length / 2 >= limit) {
              break;
            }
          }
          if (data.length / 2 >= limit) {
            break;
          }
        }
        var db = new DataBuffer(2, limit, new Float32Array(data));
        if (keepData)
          db.data = data;
        {
          window.ins_exit(49765);
          return db;
        }
      };
      Utils.getPotSize = function (num) {
        window.ins_enter(49879);
        var w = 1, h = 1;
        while (w * h < num) {
          w *= 2;
          if (w * h >= num)
            break;
          h *= 2;
        }
        {
          var ___ret474 = {
              w: w,
              h: h
            };
          window.ins_exit(49879);
          return ___ret474;
        }
      };
      Utils.loadImage = function (url, onLoad) {
        window.ins_enter(49928);
        var image = new Image();
        image.onload = function () {
          window.ins_enter(49946);
          onLoad(image);
          window.ins_exit(49946);
        };
        image.src = url;
        window.ins_exit(49928);
      };
      Utils.loadFile = function (url, onLoad) {
        window.ins_enter(49967);
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.onreadystatechange = function () {
          window.ins_enter(49991);
          if (xhr.readyState == 4) {
            if (onLoad) {
              onLoad(xhr);
            }
          }
          window.ins_exit(49991);
        };
        xhr.open('GET', url, true);
        xhr.send();
        window.ins_exit(49967);
      };
      Utils.processShader = function (text) {
        window.ins_enter(50029);
        var libre = /\$\{([^}]*)\}/g;
        var match;
        while (match = libre.exec(text)) {
          text = text.replace(match[0], ShaderLib[match[1]]);
        }
        {
          window.ins_exit(50029);
          return text;
        }
      };
      Utils.loadShaders = function (urls, onLoad) {
        window.ins_enter(50074);
        var libre = /\$\{([^}]*)\}/g;
        var results = urls.map(function () {
            window.ins_enter(50093);
            {
              var ___ret475 = false;
              window.ins_exit(50093);
              return ___ret475;
            }
          });
        urls.forEach(function (url, index) {
          window.ins_enter(50106);
          fs.readFile(url, 'utf8', function (error, file) {
            window.ins_enter(50121);
            if (error)
              console.log(error);
            var text = file;
            var match;
            while (match = libre.exec(text)) {
              text = text.replace(match[0], ShaderLib[match[1]]);
            }
            results[index] = text;
            if (onLoad && results.every(function (r) {
                window.ins_enter(50181);
                {
                  window.ins_exit(50181);
                  return r;
                }
              })) {
              onLoad(results);
            }
            window.ins_exit(50121);
          });
          window.ins_exit(50106);
        });
        window.ins_exit(50074);
      };
      var Camera = function (fov, aspect, near, far) {
        window.ins_enter(50198);
        this.position = [
          0,
          0,
          -1
        ];
        this.lookAt = [
          0,
          0,
          0
        ];
        this.up = [
          0,
          1,
          0
        ];
        this.quaternion = new Quaternion();
        this.tmpQuat = new Quaternion();
        this.perspective = [];
        this.world = [];
        this._matrix = [];
        this.v1 = [];
        this.v2 = [];
        this.v3 = [];
        this.setPerspective(fov, aspect, near, far);
        window.ins_exit(50198);
      };
      Camera.prototype = {
        matrix: function () {
          window.ins_enter(50303);
          if (this.needsUpdate) {
            this.updateMatrix();
            this.needsUpdate = false;
          }
          {
            var ___ret476 = this._matrix;
            window.ins_exit(50303);
            return ___ret476;
          }
        },
        setPerspective: function (fov, aspect, near, far) {
          window.ins_enter(50331);
          this.perspective = Matrix.makePerspective(fov, aspect, near, far);
          this.needsUpdate = true;
          window.ins_exit(50331);
        },
        setPosition: function (x, y, z) {
          window.ins_enter(50362);
          this.position[0] = x;
          this.position[1] = y;
          this.position[2] = z;
          this.needsUpdate = true;
          window.ins_exit(50362);
        },
        setLookAt: function (x, y, z) {
          window.ins_enter(50403);
          this.lookAt[0] = x;
          this.lookAt[1] = y;
          this.lookAt[2] = z;
          this.needsUpdate = true;
          window.ins_exit(50403);
        },
        setUp: function (x, y, z) {
          window.ins_enter(50444);
          this.up[0] = x;
          this.up[1] = y;
          this.up[2] = z;
          this.needsUpdate = true;
          window.ins_exit(50444);
        },
        zoom: function (z) {
          window.ins_enter(50485);
          var a = minus(this.position, this.lookAt, this.v1);
          mults(a, z);
          add(this.lookAt, a, this.position);
          this.needsUpdate = true;
          window.ins_exit(50485);
        },
        orbit: function (x, y) {
          window.ins_enter(50529);
          var a = this.v1;
          a[0] = x;
          a[1] = y;
          a[2] = 0;
          this.quaternion.rotVec(a);
          this.tmpQuat.fromEuler(a[0], a[1], a[2]);
          minus(this.position, this.lookAt, a);
          this.tmpQuat.rotVec(a);
          add(this.lookAt, a, this.position);
          this.tmpQuat.rotVec(this.up);
          this.tmpQuat.fromEuler(x, y, 0);
          this.quaternion.multiply(this.tmpQuat);
          this.needsUpdate = true;
          window.ins_exit(50529);
        },
        updateMatrix: function () {
          window.ins_enter(50651);
          var eye = this.position;
          var at = this.lookAt;
          var up = this.up;
          var zaxis = norm(minus(eye, at, this.v1));
          var xaxis = norm(cross(up, zaxis, this.v2));
          var yaxis = cross(zaxis, xaxis, this.v3);
          this.world[0] = xaxis[0];
          this.world[1] = yaxis[0];
          this.world[2] = zaxis[0];
          this.world[3] = 0;
          this.world[4] = xaxis[1];
          this.world[5] = yaxis[1];
          this.world[6] = zaxis[1];
          this.world[7] = 0;
          this.world[8] = xaxis[2];
          this.world[9] = yaxis[2];
          this.world[10] = zaxis[2];
          this.world[11] = 0;
          this.world[12] = -dot(xaxis, eye);
          this.world[13] = -dot(yaxis, eye);
          this.world[14] = -dot(zaxis, eye);
          this.world[15] = 1;
          Matrix.multiplyMatrix(this.world, this.perspective, this._matrix);
          window.ins_exit(50651);
        }
      };
      var Quaternion = function (x, y, z, w) {
        window.ins_enter(50884);
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w !== undefined ? w : 1;
        window.ins_exit(50884);
      };
      Quaternion.prototype = {
        fromAngle: function (x, y, z, angle) {
          window.ins_enter(50937);
          var halfAngle = angle / 2, s = Math.sin(halfAngle);
          this.x = x * s;
          this.y = y * s;
          this.z = z * s;
          this.w = Math.cos(halfAngle);
          window.ins_exit(50937);
        },
        fromEuler: function (x, y, z) {
          window.ins_enter(50996);
          var c1 = Math.cos(x / 2);
          var c2 = Math.cos(y / 2);
          var c3 = Math.cos(z / 2);
          var s1 = Math.sin(x / 2);
          var s2 = Math.sin(y / 2);
          var s3 = Math.sin(z / 2);
          this.x = s1 * c2 * c3 + c1 * s2 * s3;
          this.y = c1 * s2 * c3 - s1 * c2 * s3;
          this.z = c1 * c2 * s3 + s1 * s2 * c3;
          this.w = c1 * c2 * c3 - s1 * s2 * s3;
          window.ins_exit(50996);
        },
        length: function () {
          window.ins_enter(51131);
          {
            var ___ret477 = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            window.ins_exit(51131);
            return ___ret477;
          }
        },
        normalize: function () {
          window.ins_enter(51175);
          var l = this.length();
          if (l == 0) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.w = 1;
          } else {
            l = 1 / l;
            this.x = this.x * l;
            this.y = this.y * l;
            this.z = this.z * l;
            this.w = this.w * l;
          }
          window.ins_exit(51175);
        },
        multiply: function (b) {
          window.ins_enter(51266);
          var a = this;
          var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
          var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;
          this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
          this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
          this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
          this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
          window.ins_exit(51266);
        },
        rotVec: function (v) {
          window.ins_enter(51401);
          var x = v[0];
          var y = v[1];
          var z = v[2];
          var qx = this.x;
          var qy = this.y;
          var qz = this.z;
          var qw = this.w;
          var ix = qw * x + qy * z - qz * y;
          var iy = qw * y + qz * x - qx * z;
          var iz = qw * z + qx * y - qy * x;
          var iw = -qx * x - qy * y - qz * z;
          v[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
          v[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
          v[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
          window.ins_exit(51401);
        },
        invert: function () {
          window.ins_enter(51578);
          this.x *= -1;
          this.y *= -1;
          this.z *= -1;
          this.normalize();
          {
            var ___ret478 = this;
            window.ins_exit(51578);
            return ___ret478;
          }
        }
      };
      function norm(a, r) {
        window.ins_enter(51612);
        r = r || a;
        var sqrt = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
        r[0] = a[0] / sqrt;
        r[1] = a[1] / sqrt;
        r[2] = a[2] / sqrt;
        {
          window.ins_exit(51612);
          return r;
        }
      }
      function minus(a, b, r) {
        window.ins_enter(51689);
        r[0] = a[0] - b[0];
        r[1] = a[1] - b[1];
        r[2] = a[2] - b[2];
        {
          window.ins_exit(51689);
          return r;
        }
      }
      function add(a, b, r) {
        window.ins_enter(51737);
        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        {
          window.ins_exit(51737);
          return r;
        }
      }
      function mults(a, s) {
        window.ins_enter(51785);
        a[0] = a[0] * s;
        a[1] = a[1] * s;
        a[2] = a[2] * s;
        {
          window.ins_exit(51785);
          return a;
        }
      }
      function cross(a, b, r) {
        window.ins_enter(51826);
        r[0] = a[1] * b[2] - a[2] * b[1];
        r[1] = a[2] * b[0] - a[0] * b[2];
        r[2] = a[0] * b[1] - a[1] * b[0];
        {
          window.ins_exit(51826);
          return r;
        }
      }
      function dot(a, b) {
        window.ins_enter(51898);
        {
          var ___ret479 = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
          window.ins_exit(51898);
          return ___ret479;
        }
      }
      var Matrix = {
          normal: function (arr) {
            window.ins_enter(51937);
            var sqrt = Math.sqrt(arr[0] * arr[0] + arr[1] * arr[1] + arr[2] * arr[2]);
            {
              var ___ret480 = [
                  arr[0] / sqrt,
                  arr[1] / sqrt,
                  arr[2] / sqrt
                ];
              window.ins_exit(51937);
              return ___ret480;
            }
          },
          minus: function (a, b) {
            window.ins_enter(51993);
            {
              var ___ret481 = [
                  a[0] - b[0],
                  a[1] - b[1],
                  a[2] - b[2]
                ];
              window.ins_exit(51993);
              return ___ret481;
            }
          },
          dot: function (a, b) {
            window.ins_enter(52026);
            {
              var ___ret482 = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
              window.ins_exit(52026);
              return ___ret482;
            }
          },
          cross: function (a, b) {
            window.ins_enter(52060);
            {
              var ___ret483 = [
                  a[1] * b[2] - a[2] * b[1],
                  a[2] * b[0] - a[0] * b[2],
                  a[0] * b[1] - a[1] * b[0]
                ];
              window.ins_exit(52060);
              return ___ret483;
            }
          },
          makeLookAt: function (eye, at, up) {
            window.ins_enter(52117);
            var zaxis = Matrix.normal(Matrix.minus(eye, at));
            var xaxis = Matrix.normal(Matrix.cross(up, zaxis));
            var yaxis = Matrix.cross(zaxis, xaxis);
            {
              var ___ret484 = [
                  xaxis[0],
                  yaxis[0],
                  zaxis[0],
                  0,
                  xaxis[1],
                  yaxis[1],
                  zaxis[1],
                  0,
                  xaxis[2],
                  yaxis[2],
                  zaxis[2],
                  0,
                  -Matrix.dot(xaxis, eye),
                  -Matrix.dot(yaxis, eye),
                  -Matrix.dot(zaxis, eye),
                  1
                ];
              window.ins_exit(52117);
              return ___ret484;
            }
          },
          makePerspective: function (fieldOfViewInRadians, aspect, near, far) {
            window.ins_enter(52217);
            var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
            var rangeInv = 1 / (near - far);
            {
              var ___ret485 = [
                  f / aspect,
                  0,
                  0,
                  0,
                  0,
                  f,
                  0,
                  0,
                  0,
                  0,
                  (near + far) * rangeInv,
                  -1,
                  0,
                  0,
                  near * far * rangeInv * 2,
                  0
                ];
              window.ins_exit(52217);
              return ___ret485;
            }
          },
          makeOrthographic: function (width, height, depth) {
            window.ins_enter(52284);
            {
              var ___ret486 = [
                  2 / width,
                  0,
                  0,
                  0,
                  0,
                  -2 / height,
                  0,
                  0,
                  0,
                  0,
                  2 / depth,
                  0,
                  -1,
                  1,
                  0,
                  1
                ];
              window.ins_exit(52284);
              return ___ret486;
            }
          },
          makeTranslation: function (tx, ty, tz) {
            window.ins_enter(52321);
            {
              var ___ret487 = [
                  1,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  tx,
                  ty,
                  tz,
                  1
                ];
              window.ins_exit(52321);
              return ___ret487;
            }
          },
          setTranslation: function (m, tx, ty, tz) {
            window.ins_enter(52350);
            m[12] = tx;
            m[13] = ty;
            m[14] = tz;
            window.ins_exit(52350);
          },
          makeXRotation: function (angleInRadians) {
            window.ins_enter(52380);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            {
              var ___ret488 = [
                  1,
                  0,
                  0,
                  0,
                  0,
                  c,
                  s,
                  0,
                  0,
                  -s,
                  c,
                  0,
                  0,
                  0,
                  0,
                  1
                ];
              window.ins_exit(52380);
              return ___ret488;
            }
          },
          setXRotation: function (m, angleInRadians) {
            window.ins_enter(52424);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            m[5] = c;
            m[6] = s;
            m[9] = -s;
            m[10] = c;
            window.ins_exit(52424);
          },
          makeYRotation: function (angleInRadians) {
            window.ins_enter(52475);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            {
              var ___ret489 = [
                  c,
                  0,
                  -s,
                  0,
                  0,
                  1,
                  0,
                  0,
                  s,
                  0,
                  c,
                  0,
                  0,
                  0,
                  0,
                  1
                ];
              window.ins_exit(52475);
              return ___ret489;
            }
          },
          setYRotation: function (m, angleInRadians) {
            window.ins_enter(52519);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            m[0] = c;
            m[2] = -s;
            m[8] = s;
            m[10] = c;
            window.ins_exit(52519);
          },
          makeZRotation: function (angleInRadians) {
            window.ins_enter(52570);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            {
              var ___ret490 = [
                  c,
                  s,
                  0,
                  0,
                  -s,
                  c,
                  0,
                  0,
                  0,
                  0,
                  1,
                  0,
                  0,
                  0,
                  0,
                  1
                ];
              window.ins_exit(52570);
              return ___ret490;
            }
          },
          setZRotation: function (m, angleInRadians) {
            window.ins_enter(52614);
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            m[0] = c;
            m[1] = s;
            m[4] = -s;
            m[5] = c;
            window.ins_exit(52614);
          },
          makeScale: function (sx, sy, sz) {
            window.ins_enter(52665);
            {
              var ___ret491 = [
                  sx,
                  0,
                  0,
                  0,
                  0,
                  sy,
                  0,
                  0,
                  0,
                  0,
                  sz,
                  0,
                  0,
                  0,
                  0,
                  1
                ];
              window.ins_exit(52665);
              return ___ret491;
            }
          },
          setScale: function (m, sx, sy, sz) {
            window.ins_enter(52694);
            m[0] = sx;
            m[5] = sy;
            m[10] = sz;
            window.ins_exit(52694);
          },
          multiply: function () {
            window.ins_enter(52724);
            var m = arguments[1], t = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
              Matrix.multiplyMatrix(m, arguments[i], t);
              m = t;
            }
            {
              window.ins_exit(52724);
              return m;
            }
          },
          multiplyMatrix: function (a, b, c) {
            window.ins_enter(52772);
            c = c || [];
            var a00 = a[0];
            var a01 = a[1];
            var a02 = a[2];
            var a03 = a[3];
            var a10 = a[4];
            var a11 = a[5];
            var a12 = a[6];
            var a13 = a[7];
            var a20 = a[8];
            var a21 = a[9];
            var a22 = a[10];
            var a23 = a[11];
            var a30 = a[12];
            var a31 = a[13];
            var a32 = a[14];
            var a33 = a[15];
            var b00 = b[0];
            var b01 = b[1];
            var b02 = b[2];
            var b03 = b[3];
            var b10 = b[4];
            var b11 = b[5];
            var b12 = b[6];
            var b13 = b[7];
            var b20 = b[8];
            var b21 = b[9];
            var b22 = b[10];
            var b23 = b[11];
            var b30 = b[12];
            var b31 = b[13];
            var b32 = b[14];
            var b33 = b[15];
            c[0] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            c[1] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            c[2] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            c[3] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            c[4] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            c[5] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            c[6] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            c[7] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            c[8] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            c[9] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            c[10] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            c[11] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            c[12] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            c[13] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            c[14] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            c[15] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;
            {
              window.ins_exit(52772);
              return c;
            }
          }
        };
      module.exports = {
        Utils: Utils,
        Matrix: Matrix,
        Camera: Camera
      };
      window.ins_exit(49729);
    },
    {
      './databuffer': 25,
      './shaderlib': 29,
      'fs': 1
    }
  ],
  32: [
    function (require, module, exports) {
      window.ins_enter(53329);
      var Graph = function Graph() {
        window.ins_enter(53341);
        this._nodes = {};
        this.nodeCount = 0;
        this.edgeCount = 0;
        window.ins_exit(53341);
      };
      Graph.prototype.addNode = function (id, data) {
        window.ins_enter(53373);
        if (!this._nodes[id]) {
          this.nodeCount++;
          {
            var ___ret492 = this._nodes[id] = {
                _id: id,
                _outEdges: {},
                _inEdges: {},
                _data: data
              };
            window.ins_exit(53373);
            return ___ret492;
          }
        }
        window.ins_exit(53373);
      };
      Graph.prototype.getNode = function (id) {
        window.ins_enter(53421);
        {
          var ___ret493 = this._nodes[id];
          window.ins_exit(53421);
          return ___ret493;
        }
      };
      Graph.prototype.removeNode = function (id) {
        window.ins_enter(53441);
        var inEdgeId, nodeToRemove, outEdgeId, _ref, _ref1;
        nodeToRemove = this._nodes[id];
        if (!nodeToRemove) {
          {
            var ___ret494 = null;
            window.ins_exit(53441);
            return ___ret494;
          }
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
        {
          window.ins_exit(53441);
          return nodeToRemove;
        }
      };
      Graph.prototype.addEdge = function (fromId, toId, data) {
        window.ins_enter(53528);
        var edgeToAdd, fromNode, toNode;
        fromNode = this._nodes[fromId];
        toNode = this._nodes[toId];
        if (!fromNode || !toNode) {
          {
            window.ins_exit(53528);
            return;
          }
        }
        edgeToAdd = {
          fromNode: fromNode,
          toNode: toNode,
          fromId: fromId,
          toId: toId,
          _data: data
        };
        fromNode._outEdges[toId] = edgeToAdd;
        toNode._inEdges[fromId] = edgeToAdd;
        this.edgeCount++;
        {
          window.ins_exit(53528);
          return edgeToAdd;
        }
      };
      Graph.prototype.getEdge = function (fromId, toId) {
        window.ins_enter(53617);
        var fromNode = this._nodes[fromId];
        if (!fromNode) {
          {
            var ___ret495 = null;
            window.ins_exit(53617);
            return ___ret495;
          }
        }
        {
          var ___ret496 = fromNode._outEdges[toId] || null;
          window.ins_exit(53617);
          return ___ret496;
        }
      };
      Graph.prototype.removeEdge = function (fromId, toId) {
        window.ins_enter(53654);
        var edgeToDelete, fromNode, toNode;
        fromNode = this._nodes[fromId];
        toNode = this._nodes[toId];
        edgeToDelete = fromNode._outEdges[toId];
        if (!edgeToDelete) {
          {
            var ___ret497 = null;
            window.ins_exit(53654);
            return ___ret497;
          }
        }
        delete fromNode._outEdges[toId];
        delete toNode._inEdges[fromId];
        this.edgeCount--;
        {
          window.ins_exit(53654);
          return edgeToDelete;
        }
      };
      Graph.prototype.getInEdges = function (nodeId) {
        window.ins_enter(53727);
        {
          var ___ret498 = nodeId in this._nodes ? this._nodes[nodeId]._inEdges : null;
          window.ins_exit(53727);
          return ___ret498;
        }
      };
      Graph.prototype.getOutEdges = function (nodeId) {
        window.ins_enter(53756);
        {
          var ___ret499 = nodeId in this._nodes ? this._nodes[nodeId]._outEdges : null;
          window.ins_exit(53756);
          return ___ret499;
        }
      };
      Graph.prototype.forEachNode = function (operation) {
        window.ins_enter(53785);
        var nodeId, nodeObject, _ref;
        _ref = this._nodes;
        for (nodeId in _ref) {
          nodeObject = _ref[nodeId];
          operation(nodeObject);
        }
        window.ins_exit(53785);
      };
      Graph.prototype.forEachEdge = function (operation) {
        window.ins_enter(53826);
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
        window.ins_exit(53826);
      };
      module.exports = Graph;
      window.ins_exit(53329);
    },
    {}
  ],
  33: [
    function (require, module, exports) {
      window.ins_enter(53892);
      var Program = require('gpgpu').Program;
      var Matrix = require('gpgpu').Matrix;
      var Camera = require('gpgpu').Camera;
      var Grapheen = require('./grapheen');
      var Graph = require('./graph');
      var esprima = require('esprima');
      try {
        var dat = require('../lib/dat.gui.min');
      } catch (e) {
      }
      var Colors = {
          AssignmentExpression: [
            1,
            0.4,
            0.4,
            1
          ],
          ArrayExpression: [
            0.92,
            0.12,
            0.12,
            1
          ],
          BlockStatement: [
            0.84,
            0.2,
            0.2,
            1
          ],
          BinaryExpression: [
            1,
            0.33,
            0.4,
            1
          ],
          BreakStatement: [
            0.94,
            0.38,
            0.11,
            1
          ],
          CallExpression: [
            0.86,
            0.4,
            0.18,
            1
          ],
          CatchClause: [
            1,
            0.59,
            0.4,
            1
          ],
          ConditionalExpression: [
            0.95,
            0.61,
            0.9,
            1
          ],
          ContinueStatement: [
            0.87,
            0.62,
            0.17,
            1
          ],
          DebuggerStatement: [
            1,
            0.93,
            0.4,
            1
          ],
          DirectiveStatement: [
            0.13,
            0.91,
            0.66,
            1
          ],
          DoWhileStatement: [
            0.4,
            1,
            0.62,
            1
          ],
          EmptyStatement: [
            0.22,
            0.82,
            0.43,
            1
          ],
          ExpressionStatement: [
            0.13,
            0.92,
            0.46,
            1
          ],
          ForStatement: [
            0.4,
            1,
            0.35,
            1
          ],
          ForInStatement: [
            0.24,
            0.89,
            0.15,
            1
          ],
          FunctionDeclaration: [
            0.14,
            1,
            0.4,
            1
          ],
          FunctionExpression: [
            0.58,
            0.92,
            0.12,
            1
          ],
          Identifier: [
            0.59,
            1,
            0.4,
            1
          ],
          IfStatement: [
            0.89,
            0.91,
            0.13,
            1
          ],
          Literal: [
            0.2,
            0.84,
            0.81,
            1
          ],
          LabeledStatement: [
            0.35,
            0.77,
            0.81,
            1
          ],
          LogicalExpression: [
            0.34,
            0.65,
            0.82,
            1
          ],
          MemberExpression: [
            0.17,
            0.65,
            1,
            1
          ],
          NewExpression: [
            0.29,
            0.36,
            0.88,
            1
          ],
          ObjectExpression: [
            0,
            0.7,
            0.99,
            1
          ],
          Program: [
            0.27,
            0,
            0.99,
            1
          ],
          Property: [
            0.38,
            0.9,
            0.89,
            1
          ],
          ReturnStatement: [
            0.45,
            0.2,
            0.74,
            1
          ],
          SequenceExpression: [
            0.66,
            0,
            0.94,
            1
          ],
          SwitchStatement: [
            0.87,
            0.22,
            0.49,
            1
          ],
          SwitchCase: [
            1,
            0.16,
            0.62,
            1
          ],
          ThisExpression: [
            1,
            0.16,
            0.94,
            1
          ],
          ThrowStatement: [
            0.87,
            0.15,
            0.85,
            1
          ],
          TryStatement: [
            0.77,
            0.25,
            0.77,
            1
          ],
          UnaryExpression: [
            0.69,
            0.38,
            0.76,
            1
          ],
          UpdateExpression: [
            0.71,
            0.8,
            0.86,
            1
          ],
          VariableDeclaration: [
            1,
            0.52,
            0.52,
            1
          ],
          VariableDeclarator: [
            0.98,
            1,
            0.68,
            1
          ],
          WhileStatement: [
            0.91,
            0.65,
            0.97,
            1
          ],
          WithStatement: [
            0.89,
            0.91,
            0.9,
            1
          ]
        };
      var GraphView = function () {
        window.ins_enter(54248);
        window.ins_exit(54248);
      };
      GraphView.prototype.setColors = function (graph) {
        window.ins_enter(54261);
        graph.forEachNode(function (node) {
          window.ins_enter(54273);
          node._data.color = Colors[node._data.type];
          window.ins_exit(54273);
        });
        graph.forEachEdge(function (edge) {
          window.ins_enter(54299);
          edge._data.fromColor = edge.fromNode._data.color;
          edge._data.toColor = edge.toNode._data.color;
          window.ins_exit(54299);
        });
        window.ins_exit(54261);
      };
      GraphView.prototype.init = function (graph, canvas, container) {
        window.ins_enter(54341);
        var gl = canvas.getContext('webgl');
        Program.init(gl);
        Grapheen.init(gl);
        this.setColors(graph);
        var width = this.width = parseInt(canvas.offsetWidth);
        var height = this.height = parseInt(canvas.offsetHeight);
        var devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = width * devicePixelRatio;
        canvas.height = height * devicePixelRatio;
        canvas.style.width = canvas.style.height = '100%';
        if (!this.grapheen) {
          this.grapheen = new Grapheen(graph);
          this.grapheen.reload();
          var gui = new dat.GUI({ autoPlace: false });
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
            window.ins_enter(54577);
            moving = true;
            start.x = e.x;
            start.y = e.y;
            window.ins_exit(54577);
          }, false);
          canvas.addEventListener('mouseup', function () {
            window.ins_enter(54611);
            moving = false;
            window.ins_exit(54611);
          }, false);
          canvas.addEventListener('mouseout', function () {
            window.ins_enter(54628);
            moving = false;
            window.ins_exit(54628);
          }, false);
          canvas.addEventListener('mousemove', function (e) {
            window.ins_enter(54645);
            if (!moving) {
              window.ins_exit(54645);
              return;
            }
            var dx = e.x - start.x;
            var dy = e.y - start.y;
            start.x = e.x;
            start.y = e.y;
            self.camera.orbit(dy * 0.005, dx * -0.005);
            window.ins_exit(54645);
          }, false);
          canvas.addEventListener('wheel', function (e) {
            window.ins_enter(54713);
            if (Math.abs(e.deltaY / e.deltaX) > 0.3) {
              e.preventDefault();
            }
            var scale = 1 - e.deltaY * 0.01;
            self.camera.zoom(scale);
            window.ins_exit(54713);
          }, false);
          window.addEventListener('resize', function () {
            window.ins_enter(54765);
            console.log('resize');
            var width = self.width = parseInt(canvas.offsetWidth);
            var height = self.height = parseInt(canvas.offsetHeight);
            var ww = width * 2;
            var wh = height * 2;
            var devicePixelRatio = window.devicePixelRatio || 1;
            canvas.width = width * devicePixelRatio;
            canvas.height = height * devicePixelRatio;
            self.grapheen.drawVerticesProg.setViewport(0, 0, ww, wh);
            self.grapheen.drawEdgesProg.setViewport(0, 0, ww, wh);
            self.camera.setPerspective(0.6, width / height, 1, 100000);
            window.ins_exit(54765);
          }, false);
        }
        var ww = width * 2;
        var wh = height * 2;
        this.grapheen.drawVerticesProg.setViewport(0, 0, ww, wh);
        this.grapheen.drawEdgesProg.setViewport(0, 0, ww, wh);
        this.grapheen.runInitialPos(0.1);
        this.animate();
        window.ins_exit(54341);
      };
      GraphView.prototype.animate = function () {
        window.ins_enter(54935);
        var angle = 0;
        var camera = this.camera = new Camera(0.6, this.width / this.height, 1, 100000);
        camera.setPosition(0, 0, -300);
        var ani = function () {
            this.grapheen.step(camera);
            if (!this.stopped) {
              window.requestAnimationFrame(ani);
            }
            window.ins_exit(54935);
          }.bind(this);
        ani();
        window.ins_exit(53892);
      };
      module.exports = GraphView;
      window.ins_exit(undefined);
    },
    {
      '../lib/dat.gui.min': 4,
      './graph': 32,
      './grapheen': 34,
      'esprima': 23,
      'gpgpu': 24
    }
  ],
  34: [
    function (require, module, exports) {
      window.ins_enter(55030);
      var DataBuffer = require('gpgpu').DataBuffer;
      var Program = require('gpgpu').Program;
      var RenderTarget = require('gpgpu').RenderTarget;
      var Texture = require('gpgpu').Texture;
      var Utils = require('gpgpu').Utils;
      var Graph = require('./graph');
      var path = require('path');
      var gl, Shaders;
      var Grapheen = function (graph) {
        window.ins_enter(55099);
        this.downsampleK = 1.6;
        this.graph = graph;
        this.params = {
          dtVertices: 0.01,
          dtEdges: 0.01,
          pointSize: 3,
          edgeForces: true,
          vertexForces: true,
          renderEdges: true,
          renderVertices: true
        };
        this.numVertices = 0;
        this.numEdges = 0;
        window.ins_exit(55099);
      };
      Grapheen.init = function (_gl) {
        window.ins_enter(55162);
        gl = _gl;
        Shaders = [
          Utils.processShader('\nprecision highp float;\n\nattribute vec2 coords;\nvarying vec2 vCoords;\n\nvoid main() {\n  vCoords = coords;\n  gl_Position = vec4(coords * 2. - 1., 0.0, 1.0);\n}\n'),
          Utils.processShader('precision highp float;\nuniform float time;\nvarying vec2 vCoords;\n\n${noise3d}\n\nfloat fn(vec3 coords) {\n  return snoise(coords * 5.);\n}\n\nvoid main() {\n  vec3 pos = vec3(fn(vec3(vCoords, time)),\n    fn(vec3(vCoords.y, time, vCoords.x)),\n    fn(vec3(time, vCoords.x, vCoords.y)));\n\n  gl_FragColor = vec4(normalize(pos) * .001, 1.);\n\n  // gl_FragColor = vec4(time, time, time, 1.);\n  // gl_FragColor = vec4(time, time, time, 1.);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nconst float xsize = #{xsize};\nconst float ysize = #{ysize};\nconst float xiter = #{xiter};\nconst float yiter = #{yiter};\nconst float ymax = #{ymax};\n\nuniform sampler2D positionTexture;\nuniform sampler2D forceTexture;\n\nuniform float xstart;\nuniform float ystart;\nuniform float dt;\n\nattribute vec2 coords;\n\nvarying vec3 vPos;\n\nvec3 bruteForce(vec3 pos) {\n  vec3 f = vec3(0.);\n  for (float y = yiter; y < ymax; y += ysize) {\n    for (float x = xiter; x < 1.0; x += xsize) {\n      vec4 other = texture2D(positionTexture, vec2(x + xstart, y + ystart));\n      vec3 diff = pos.xyz - other.xyz;\n      float a = dot(diff, diff) + 0.000001;\n      f += diff / a;\n    }\n  }\n  return f * 0.1;\n}\n\nvoid main() {\n  vec3 pos = texture2D(positionTexture, coords).xyz;\n  vec3 force = texture2D(forceTexture, coords).xyz;\n\n  vec3 f = bruteForce(pos) * dt + force;\n\n  vPos = pos + clamp(f, -5., 5.);\n\n  gl_Position = vec4(coords * 2. - 1., 0.0, 1.0);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nvarying vec3 vPos;\n\nvoid main() {\n  gl_FragColor = vec4(vPos, 1.);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nuniform sampler2D positionTexture;\nuniform float forceDir;\nuniform float dt;\n\nattribute vec4 coords;\n\nvarying vec3 vPos;\n\nvoid main() {\n  vec3 posOut = texture2D(positionTexture, coords.xy).xyz;\n  vec3 posIn = texture2D(positionTexture, coords.zw).xyz;\n  vec3 diff = posIn - posOut;\n  // float dist = length(diff);\n  // vec3 f = sign(diff) * min(abs(diff), 0.1) * dt;\n  // vec3 f = (diff / dist) * dt;\n  vec3 f = diff * dt;\n  // f = sign(f) * log(abs(f) + 1.);\n  // f = sign(f) * min(abs(f), 0.01);\n  // vPos = vec3(0.);\n  if (forceDir > 0.5) {\n    vPos = f;\n    gl_Position = vec4(coords.xy * 2. - 1., 0.0, 1.0);\n  } else {\n    vPos = -f;\n    gl_Position = vec4(coords.zw * 2. - 1., 0.0, 1.0);\n  }\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nvarying vec3 vPos;\n\nvoid main() {\n  gl_FragColor = vec4(vPos, 1.);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nuniform sampler2D positionTexture;\nuniform mat4 matrix;\nuniform float pointSize;\n\nattribute vec2 coords;\nattribute vec4 color;\n\nvarying vec4 vColor;\n\nvoid main() {\n  vec3 pos = texture2D(positionTexture, coords).xyz;\n\n  vColor = color;\n\n  gl_PointSize = pointSize;\n\n  gl_Position = matrix * vec4(pos, 1.0);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nuniform sampler2D vertTex;\nvarying vec4 vColor;\n\nvoid main() {\n  // vec3 color = texture2D(vertTex, gl_PointCoord).xyz;\n  gl_FragColor = vColor;\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nuniform sampler2D positionTexture;\nuniform mat4 matrix;\n\nattribute vec2 coords;\nattribute vec4 color;\n\nvarying vec4 vColor;\n\nvoid main() {\n  vec3 pos = texture2D(positionTexture, coords).xyz;\n\n  vColor = color;\n\n  gl_Position = matrix * vec4(pos, 1.0);\n}\n'),
          Utils.processShader('\nprecision highp float;\n\nvarying vec4 vColor;\n\nvoid main() {\n  gl_FragColor = vColor;\n}\n')
        ];
        window.ins_exit(55162);
      };
      Grapheen.prototype = {
        setNumVertices: function () {
          window.ins_enter(55235);
          this.numVertices = this.graph.nodeCount;
          this.itemTS = Utils.getPotSize(this.numVertices);
          this.downsampleIdx = 0;
          this.downsample = Math.floor(this.numVertices * this.downsampleK * 0.00015 + 1);
          window.ins_exit(55235);
        },
        deleteVertexData: function () {
          window.ins_enter(55291);
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
          window.ins_exit(55291);
        },
        createVertexData: function () {
          window.ins_enter(55407);
          var size = this.itemTS;
          this.vertCoords = Utils.getTextureIndecies(size.w, size.h, this.numVertices, true);
          this.positionTarget = new RenderTarget(size.w, size.h, { type: gl.FLOAT });
          this.forceTarget = new RenderTarget(size.w, size.h, { type: gl.FLOAT });
          this.tempTarget = new RenderTarget(size.w, size.h, { type: gl.FLOAT });
          var colors = new Float32Array(this.numVertices * 4);
          this.vertColors = new DataBuffer(4, this.numVertices, colors);
          this.vertColors.floatArray = colors;
          this.updateVertexColors();
          window.ins_exit(55407);
        },
        updateVertexColors: function () {
          window.ins_enter(55532);
          var colors = this.vertColors.floatArray;
          var index = 0;
          var white = [
              1,
              1,
              1,
              1
            ];
          this.graph.forEachNode(function (node) {
            var color = node._data.color || white;
            this.setColor(colors, index, color);
            index += 4;
            window.ins_exit(55532);
          }.bind(this));
          this.vertColors.setData(colors);
          window.ins_exit(55030);
        },
        setNumEdges: function () {
          window.ins_enter(55604);
          this.numEdges = this.graph.edgeCount;
          window.ins_exit(55604);
        },
        deleteEdgeData: function () {
          window.ins_enter(55622);
          if (this.edgeCoords) {
            gl.deleteBuffer(this.edgeCoords.glBuffer);
          }
          if (this.edgeColors) {
            gl.deleteBuffer(this.edgeColors.glBuffer);
          }
          window.ins_exit(55622);
        },
        createEdgeData: function () {
          window.ins_enter(55660);
          var edges = [];
          var verts = this.vertCoords.data;
          this.graph.forEachEdge(function (edge) {
            window.ins_enter(55685);
            edges.push(verts[edge.fromId * 2], verts[edge.fromId * 2 + 1], verts[edge.toId * 2], verts[edge.toId * 2 + 1]);
            window.ins_exit(55685);
          });
          this.edgeCoords = new DataBuffer(4, this.numEdges, new Float32Array(edges));
          var colors = new Float32Array(this.numEdges * 4 * 2);
          this.edgeColors = new DataBuffer(4, this.numEdges * 2, colors);
          this.edgeColors.floatArray = colors;
          this.updateEdgeColors();
          window.ins_exit(55660);
        },
        updateEdgeColors: function () {
          window.ins_enter(55784);
          var colors = this.edgeColors.floatArray;
          var index = 0;
          var blue = [
              0,
              0,
              1,
              0.6
            ];
          var red = [
              1,
              0,
              0,
              0.6
            ];
          this.graph.forEachEdge(function (edge) {
            this.setColor(colors, index, edge._data.fromColor);
            index += 4;
            this.setColor(colors, index, edge._data.toColor);
            index += 4;
            window.ins_exit(55784);
          }.bind(this));
          this.edgeColors.setData(colors);
          window.ins_exit(undefined);
        },
        setColor: function (arr, i, c) {
          window.ins_enter(55874);
          arr[i] = c[0];
          arr[i + 1] = c[1];
          arr[i + 2] = c[2];
          arr[i + 3] = c[3];
          window.ins_exit(55874);
        },
        reload: function () {
          window.ins_enter(55923);
          this.setNumVertices();
          this.deleteVertexData();
          this.createVertexData();
          this.setNumEdges();
          this.deleteEdgeData();
          this.createEdgeData();
          this.init();
          window.ins_exit(55923);
        },
        init: function () {
          window.ins_enter(55966);
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
            this.drawEdgesProg.setAttribute('color', this.edgeColors);
            {
              window.ins_exit(55966);
              return;
            }
          }
          var sid = 0;
          this.initInitialPos(Shaders[sid++], Shaders[sid++]);
          this.initNbody(Shaders[sid++], Shaders[sid++]);
          this.initEdges(Shaders[sid++], Shaders[sid++]);
          this.initDrawVertices(Shaders[sid++], Shaders[sid++]);
          this.initDrawEdges(Shaders[sid++], Shaders[sid++]);
          window.ins_exit(55966);
        },
        initInitialPos: function (vert, frag) {
          window.ins_enter(56184);
          this.initialPosProg = new Program(vert, frag, { drawMode: gl.POINTS });
          this.initialPosProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
          this.initialPosProg.addUniform('time', 'f', 0);
          this.initialPosProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
          window.ins_exit(56184);
        },
        initNbody: function (vert, frag) {
          window.ins_enter(56253);
          var ymax = Math.ceil(this.numVertices / this.itemTS.w) / this.itemTS.h;
          vert = vert.replace(/\#\{xsize\}/, this.downsample / this.itemTS.w);
          vert = vert.replace(/\#\{ysize\}/, this.downsample / this.itemTS.h);
          vert = vert.replace(/\#\{ymax\}/, ymax.toPrecision(15));
          vert = vert.replace(/\#\{xiter\}/, 0.5 / this.itemTS.w);
          vert = vert.replace(/\#\{yiter\}/, 0.5 / this.itemTS.h);
          this.nbodyProg = new Program(vert, frag, { drawMode: gl.POINTS });
          this.nbodyProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
          this.nbodyProg.addUniform('positionTexture', 't');
          this.nbodyProg.addUniform('forceTexture', 't', this.forceTarget.getGlTexture());
          this.nbodyProg.addUniform('xstart', 'f', 0);
          this.nbodyProg.addUniform('ystart', 'f', 0);
          this.nbodyProg.addUniform('dt', 'f');
          this.nbodyProg.setViewport(0, 0, this.itemTS.w, this.itemTS.h);
          window.ins_exit(56253);
        },
        initEdges: function (vert, frag) {
          window.ins_enter(56464);
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
          window.ins_exit(56464);
        },
        initDrawVertices: function (vert, frag) {
          window.ins_enter(56566);
          var size = this.itemTS;
          this.drawVerticesProg = new Program(vert, frag, {
            drawMode: gl.POINTS,
            blendEnabled: true,
            depthTest: false
          });
          this.drawVerticesProg.addUniform('positionTexture', 't');
          this.drawVerticesProg.addUniform('matrix', 'm4');
          this.drawVerticesProg.addUniform('pointSize', 'f', this.pointSize);
          this.drawVerticesProg.addAttribute('coords', 2, gl.FLOAT, this.vertCoords);
          this.drawVerticesProg.addAttribute('color', 4, gl.FLOAT, this.vertColors);
          window.ins_exit(56566);
        },
        initDrawEdges: function (vert, frag) {
          window.ins_enter(56663);
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
          window.ins_exit(56663);
        },
        step: function (camera) {
          window.ins_enter(56751);
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
          window.ins_exit(56751);
        },
        runInitialPos: function (time) {
          window.ins_enter(56816);
          this.initialPosProg.setUniform('time', time);
          this.initialPosProg.setRenderTarget(this.tempTarget);
          this.initialPosProg.draw(0, this.numVertices);
          this.swapTargets();
          window.ins_exit(56816);
        },
        runNbody: function () {
          window.ins_enter(56860);
          this.nbodyProg.setUniform('positionTexture', this.positionTarget.getGlTexture());
          this.nbodyProg.setUniform('dt', this.params.dtVertices * this.downsample);
          this.nbodyProg.setUniform('xstart', this.downsampleIdx / this.itemTS.w);
          this.nbodyProg.setUniform('ystart', this.downsampleIdx / this.itemTS.h);
          this.nbodyProg.setRenderTarget(this.tempTarget);
          this.nbodyProg.draw(0, this.numVertices);
          this.swapTargets();
          this.downsampleIdx = (this.downsampleIdx + 1) % this.downsample;
          window.ins_exit(56860);
        },
        runEdges: function () {
          window.ins_enter(56973);
          this.edgeProg.setUniform('positionTexture', this.positionTarget.getGlTexture());
          this.edgeProg.setUniform('forceDir', 0);
          this.edgeProg.setUniform('dt', this.params.dtEdges);
          this.edgeProg.clear = gl.COLOR_BUFFER_BIT;
          this.edgeProg.draw(0, this.numEdges);
          this.edgeProg.setUniform('forceDir', 1);
          this.edgeProg.clear = false;
          this.edgeProg.draw(0, this.numEdges);
          window.ins_exit(56973);
        },
        drawVertices: function (matrix) {
          window.ins_enter(57066);
          this.drawVerticesProg.setUniform('positionTexture', this.positionTarget.getGlTexture());
          this.drawVerticesProg.setUniform('matrix', matrix);
          this.drawVerticesProg.setUniform('pointSize', this.params.pointSize);
          this.drawVerticesProg.draw(0, this.numVertices);
          window.ins_exit(57066);
        },
        drawEdges: function (matrix) {
          window.ins_enter(57122);
          this.drawEdgesProg.setUniform('positionTexture', this.positionTarget.getGlTexture());
          this.drawEdgesProg.setUniform('matrix', matrix);
          this.drawEdgesProg.draw(0, this.numEdges * 2);
          window.ins_exit(57122);
        },
        swapTargets: function () {
          window.ins_enter(57167);
          var t = this.positionTarget;
          this.positionTarget = this.tempTarget;
          this.tempTarget = t;
          window.ins_exit(57167);
        }
      };
      module.exports = Grapheen;
      window.ins_exit(undefined);
    },
    {
      './graph': 32,
      'gpgpu': 24,
      'path': 2
    }
  ],
  35: [
    function (require, module, exports) {
      window.ins_enter(57212);
      var Graph = require('./graph');
      var esprima = require('esprima');
      var escodegen = require('escodegen');
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
        window.ins_enter(57366);
        this.anonymousId = 0;
        this.returnId = 0;
        window.ins_exit(57366);
      };
      Parser.traverse = function (object, visitor, parent) {
        window.ins_enter(57389);
        var key, child;
        if (visitor.enter.call(null, object, parent) === false) {
          {
            window.ins_exit(57389);
            return;
          }
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
          {
            window.ins_exit(57389);
            return;
          }
        }
        window.ins_exit(57389);
      };
      Parser.prototype.parse = function (source) {
        window.ins_enter(57473);
        this.tree = esprima.parse(source);
        {
          var ___ret500 = this.tree;
          window.ins_exit(57473);
          return ___ret500;
        }
      };
      Parser.prototype.parseFile = function (file) {
        window.ins_enter(57501);
        this.tree = esprima.parse(fs.readFileSync(file));
        {
          var ___ret501 = this.tree;
          window.ins_exit(57501);
          return ___ret501;
        }
      };
      Parser.prototype.getGraph = function () {
        window.ins_enter(57533);
        var vertexId = 0;
        var stack = [];
        var graph = new Graph();
        Parser.traverse(this.tree, {
          enter: function (obj) {
            window.ins_enter(57563);
            if (obj.type in Syntax) {
              var id = vertexId++;
              graph.addNode(id, obj);
              if (stack.length) {
                graph.addEdge(stack[stack.length - 1], id, {});
              }
              stack.push(id);
            }
            window.ins_exit(57563);
          },
          exit: function (obj) {
            window.ins_enter(57616);
            if (obj.type in Syntax) {
              stack.pop();
            }
            window.ins_exit(57616);
          }
        });
        {
          window.ins_exit(57533);
          return graph;
        }
      };
      Parser.prototype.instrument = function (enterCall, exitCall) {
        window.ins_enter(57644);
        this.traceFunctions(enterCall, exitCall);
        {
          var ___ret502 = escodegen.generate(this.tree, { format: { indent: { style: '  ' } } });
          window.ins_exit(57644);
          return ___ret502;
        }
      };
      Parser.prototype.getEnterCall = function (enterName, funName) {
        window.ins_enter(57684);
        {
          var ___ret503 = {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: enterName
                },
                arguments: [{
                    type: 'Literal',
                    value: funName,
                    raw: '\'' + funName + '\''
                  }]
              }
            };
          window.ins_exit(57684);
          return ___ret503;
        }
      };
      Parser.prototype.getExitCall = function (exitName, funName) {
        window.ins_enter(57736);
        {
          var ___ret504 = {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: exitName
                },
                arguments: [{
                    type: 'Literal',
                    value: funName,
                    raw: '\'' + funName + '\''
                  }]
              }
            };
          window.ins_exit(57736);
          return ___ret504;
        }
      };
      Parser.prototype.wrapInBlock = function (body) {
        window.ins_enter(57788);
        {
          var ___ret505 = {
              type: 'BlockStatement',
              body: body
            };
          window.ins_exit(57788);
          return ___ret505;
        }
      };
      Parser.prototype.splitReturn = function (ret) {
        window.ins_enter(57810);
        var retVarName = '___ret' + this.returnId++;
        {
          var ___ret506 = [
              {
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: retVarName
                    },
                    init: ret.argument
                  }],
                kind: 'var'
              },
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'Identifier',
                  name: retVarName
                }
              }
            ];
          window.ins_exit(57810);
          return ___ret506;
        }
      };
      Parser.prototype.replaceNode = function (parent, node, newNode) {
        window.ins_enter(57876);
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
        window.ins_exit(57876);
      };
      Parser.prototype.getFullMemberName = function (node) {
        window.ins_enter(57947);
        var n = '';
        if (node.object) {
          if (node.object.type == Syntax.MemberExpression) {
            n += this.getFullMemberName(node.object);
          } else {
            n += node.object.name;
          }
        }
        {
          var ___ret507 = n + '.' + node.property.name;
          window.ins_exit(57947);
          return ___ret507;
        }
      };
      Parser.prototype.getFunctionName = function (node, parent) {
        window.ins_enter(58010);
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
        {
          window.ins_exit(58010);
          return func;
        }
      };
      Parser.prototype.traceFunctions = function (enterCall, exitCall) {
        window.ins_enter(58204);
        var funcStack = [];
        var self = this;
        var vertexId = 0;
        Parser.traverse(this.tree, {
          enter: function (node, parent) {
            window.ins_enter(58235);
            if (node.type in Syntax) {
              var id = vertexId++;
            }
            var func = self.getFunctionName(node, parent || []);
            if (func) {
              funcStack.push(id);
              node.body.body.unshift(self.getEnterCall(enterCall, id));
            } else if (node.type == Syntax.ReturnStatement) {
              var body;
              if (node.argument && node.argument.type != Syntax.Identifier) {
                body = self.splitReturn(node);
              } else {
                body = [node];
              }
              var exitCallNode = self.getExitCall(exitCall, funcStack[funcStack.length - 1]);
              body.splice(body.length - 1, 0, exitCallNode);
              var newNode = self.wrapInBlock(body);
              self.replaceNode(parent, node, newNode);
            }
            window.ins_exit(58235);
          },
          exit: function (node, parent) {
            window.ins_enter(58376);
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
            window.ins_exit(58376);
          }
        });
        window.ins_exit(58204);
      };
      module.exports = Parser;
      window.ins_exit(57212);
    },
    {
      './graph': 32,
      'escodegen': 7,
      'esprima': 23
    }
  ]
}, {}, []);