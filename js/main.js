var $ul = document.querySelector('ul');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://openlibrary.org/search.json?subject=thriller');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.docs.length; i++) {
    var list = document.createElement('li');
    var $image = document.createElement('img');
    var $div = document.createElement('div');
    var $divOne = document.createElement('div');
    var $divTwo = document.createElement('div');
    var $headingThree = document.createElement('h3');
    var $paragraph = document.createElement('p');
    var $paragraphTwo = document.createElement('p');
    $divOne.setAttribute('class', 'row');
    $divTwo.setAttribute('class', 'column-half');
    $ul.appendChild(list);
    list.appendChild($divOne);
    $divOne.appendChild($image);
    $divOne.appendChild($divTwo);
    $divTwo.appendChild($div);
    $div.appendChild($headingThree);
    $div.appendChild($paragraph);
    $div.appendChild($paragraphTwo);
    $image.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + xhr.response.docs[i].cover_i + '-M.jpg');
    $div.setAttribute('class', 'lists');
    $headingThree.setAttribute('class', 'font-fam');
    $paragraph.setAttribute('class', 'font-fam-two');
    $paragraphTwo.setAttribute('class', 'font-fam-two');
    $headingThree.textContent = xhr.response.docs[i].title;
    $paragraph.textContent = xhr.response.docs[i].author_name;
    $paragraphTwo.textContent = 'Isbn#: ' + xhr.response.docs[i].isbn[0];
  }
});
xhr.send();
