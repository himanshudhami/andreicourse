/* DOMContentLoaded, document.readyState, document.onreadystatechange */
/*
  loading
    The document is still loading.
  interactive
    The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading.
  complete
    The document and all sub-resources have finished loading. The state indicates that the load event is about to fire.
*/


console.clear();
const getReadyState = function(readyState){ return `document.readyState: ${readyState}` }

// log initial readyState
console.log('%c' + getReadyState(document.readyState), 'background: #222; color: #bada55; padding: 2px');

// log value when try using not ready DOM elements
console.log(`document.getElementById('li-one'): ${document.getElementById('li-one')}`);

// log readyState when changes
document.onreadystatechange = () => {
  console.log('%c' + getReadyState(document.readyState), 'background: #222; color: #bada55; padding: 2px');
  console.log(`document.getElementById('li-one'): ${document.getElementById('li-one')}`);
}

// log when DOM is loaded
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM parsed and loaded');
});

// Non blocking
// Executing after a given period
// Can become blocking in case of executing earlier
setTimeout(() => { 
  console.log(`non blocking call using setTimeout`)
  for( let i = 0; i < 1000000000; i++) {
    if (i===1000000000-1) console.log('non blocking call using setTimeout ended');
  };
  //console.log(`document.getElementById('li-one'): ${document.getElementById('li-one')}`);
}, 5*1000);

// Blocking
// This synchronous script is going to delay parsing of the DOM,
// so the DOMContentLoaded event is going to launch later.
console.log(`blocking call using long-for`);
for( let i = 0; i < 1000000000; i++) {
  if (i===1000000000-1) console.log(`blocking call using long-for ended`);
} 

