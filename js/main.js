var $ul = document.querySelector('ul');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://openlibrary.org/search.json?title=book?');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  var response = xhr.response;
  console.log(xhr.status);
  console.log(response);
  list();

});
xhr.send();

function list() {
  for (var i = 0; i < xhr.response.docs.length; i++) {
    var list = document.createElement('li');
    var $image = document.createElement('img');
    var $div = document.createElement('div');
    var $headingThree = document.createElement('h3');
    var $paragraph = document.createElement('p');
    var $paragraphTwo = document.createElement('p');
    $ul.appendChild(list);
    list.appendChild($image);
    list.appendChild($div);
    $div.appendChild($headingThree);
    $div.appendChild($paragraph);
    $div.appendChild($paragraphTwo);
    $image.setAttribute('src', 'https://www.moma.org/interactives/exhibitions/2012/printout/wp-content/uploads/2012/02/PW12-316x400.jpg');
    $headingThree.setAttribute('class', 'font-fam');
    $paragraph.setAttribute('class', 'font-fam-two');
    $paragraphTwo.setAttribute('class', 'font-fam-two');
    $headingThree.textContent = xhr.response.docs[i].title;
    $paragraph.textContent = xhr.response.docs[i].author_name[0];
    $paragraphTwo.textContent = 'ISbn#: ' + Number(xhr.response.docs[i].isbn[0]);
  }
}

// for (var i = 0; i < this.response.docs.length; i++) {
//   var response = xhr.response.docs[i].title;
//   console.log(response);
// }
