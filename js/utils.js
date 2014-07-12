/*
   * Utils and helpers (Mainly from Angular)
   **/
  function isDefined(obj){
    if (typeof obj == "undefined" || obj == ""){
      return false;
    }else{
      return true;
    }
  }

  function isFunction(value){return typeof value === 'function';}
  function isString(value){return typeof value === 'string';}
  function isObject(value){return value != null && typeof value === 'object';}
  function isNumber(value){return typeof value === 'number';}
  function isArray(value) {
    return toString.call(value) === '[object Array]';
  }

  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }

  function isArrayLike(obj) {
      if (obj == null || isWindow(obj)) {
        return false;
      }

      var length = obj.length;

      if (obj.nodeType === 1 && length) {
        return true;
      }

      return isString(obj) || isArray(obj) || length === 0 || typeof length === 'number' && length > 0 && (length - 1) in obj;
  }

  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (typeof(obj) == "function"){
        for (key in obj) {
          // Need to check if hasOwnProperty exists,
          // as on IE8 the result of querySelectorAll is an object without a hasOwnProperty function
          if (key != 'prototype' && key != 'length' && key != 'name' && (!obj.hasOwnProperty || obj.hasOwnProperty(key))) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isArrayLike(obj)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }

  function extend(dst) {
    forEach(arguments, function(obj){
      if (obj !== dst) {
        forEach(obj, function(value, key){
          dst[key] = value;
        });
      }
    });
    return dst;
  }

  function getObjects(obj, key, val) {
      var objects = [];
      for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
              objects = objects.concat(getObjects(obj[i], key, val));
          } else if (i == key && isString(obj[key]) && obj[key].toLowerCase() == val) {
              //Matches with lowercase version (we're not picky here)
              objects.push(obj);
          } else if (i == key && obj[key] == val) {
              objects.push(obj);
          }
      }
      return objects;
    }

    function loadJSON(path, success, error)
  {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function()
      {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  if (success)
                      success(JSON.parse(xhr.responseText));
              } else {
                  if (error)
                      error(xhr);
              }
          }
      };
      xhr.open("GET", path, true);
      xhr.send();
  }
