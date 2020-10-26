let x = {
  a:{
    a1: 'a1',
    a2: {
      a21: 'a21',
      a22: {
        a221: 'a221'
      },
      a23: {
        a231: {
          a2311: 'a2311'
        }
      }
    },
    a3: [1,2,3],
    a4: function() {console.log('"this" is: ', this, 'x is: ', x)}
  }
}

const traverse = function(node) {
  let keys = Object.keys(node);

  keys.forEach(key => {
    let val = node[key];
    if (!val) return;

    if (val.constructor.name === 'Object') {
      return traverse(val);

    } else if (val.constructor.name === 'Function') {
      //val();// invoke function directly
      val.call(x);// invoke it in the context of x
    } else {
      console.log(val);
    }
  });
}

traverse(x);