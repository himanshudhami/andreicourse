//console.log(document);
  // function popUpAlert(text) {
  // 	let liOne = document.getElementById('li-one');
  // 	console.log(liOne);
  // 	liOne.onclick=function(){alert('cici')};
  // 	liOne.click();
  // }
  // popUpAlert();
  

let secondLi = document.getElementById('li-two');
secondLi.addEventListener('click', function() {
  let popup = document.getElementById('dom-popup-container');
  popup.style.display = 'block';
  
})

let closeButton = document.getElementById('btn-close');
closeButton.addEventListener('click', () => {
  let popup = document.getElementById('dom-popup-container');
  popup.style.display = 'none';
})