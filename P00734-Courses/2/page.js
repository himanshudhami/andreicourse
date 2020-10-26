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
  // popup.style.display = 'none';
  document.getElementById('popup-container-content').innerHTML = 'Popup content';

  toggleDisplay(popup);
})

const toggleDisplay = function(element) {
  if (element && element.style != undefined) {
    // if (element.style.display === 'block') element.style.display = 'none'
    // else element.style.display = 'block';

    element.style.display === 'block' ? element.style.display = 'none' : element.style.display = 'block';

    // eval(bool) ? true : false;
  }
}

// Array.from(document.getElementsByClassName('li-item'))
//   .forEach(elem => {
//     elem.addEventListener('mouseover', () => {
//       console.log('mouse over:', elem.innerHTML);
//     })
//   })

// Array.from(document.querySelectorAll('.li-item'))
//   .forEach(e => console.log(e.innerHTML));

document.addEventListener('DOMContentLoaded', () => {

  // better way to interact with elements AFTER DOM is ready
  document.getElementById('btn-load')
    .addEventListener('click', () => {
      //console.log(`load button click`);
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(json => {
          console.log(json);
          document
            .getElementById('popup-container-content')
            .innerHTML = JSON.stringify(json);
        })
        .catch(error => console.error(error))
    })

})