//console.log(document);
// function popUpAlert(text) {
// 	let liOne = document.getElementById('li-one');
// 	console.log(liOne);
// 	liOne.onclick=function(){alert('cici')};
// 	liOne.click();
// }
// popUpAlert();
  

document.getElementById('li-two')
  .addEventListener('click', function() {
  let popup = document.getElementById('dom-popup-container');
  //popup.style.display = 'block';
  toggleDisplay(popup);
})

document.getElementById('btn-close')
  .addEventListener('click', () => {
  let popup = document.getElementById('dom-popup-container');
  //popup.style.display = 'none';
  toggleDisplay(popup);
})

const toggleDisplay = function(element) {
  if (element && element.style != undefined) {
    // if (element.style.display === 'block') element.style.display = 'none'
    // else element.style.display = 'block';

    element.style.display === 'block' ? element.style.display = 'none' : element.style.display = 'block';
  }
}


