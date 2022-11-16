var $ul = document.querySelector('ul');
var targetUrl = encodeURIComponent('http://openlibrary.org/search.json?subject=thriller');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function (event) {
  for (var i = 0; i < xhr.response.docs.length; i++) {
    data.books.push(xhr.response.docs[i]);
    $ul.appendChild(list(xhr.response.docs[i]));
    data.bookId++;
  }

}

);
xhr.send();

function list(book) {
  var list = document.createElement('li');
  list.setAttribute('event-Id', data.bookId);
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

  $image.setAttribute('src', 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg');
  $div.setAttribute('class', 'lists');
  $headingThree.setAttribute('class', 'font-fam');
  $paragraph.setAttribute('class', 'font-fam-two');
  $paragraphTwo.setAttribute('class', 'font-fam-two');

  $headingThree.textContent = book.title;
  $paragraph.textContent = book.author_name;
  $paragraphTwo.textContent = 'Isbn#: ' + book.isbn[0];

  var $addButton = document.createElement('button');
  $addButton.setAttribute('class', 'button-add');
  $addButton.textContent = 'ADD';
  $div.appendChild($addButton);
  return list;
}

$ul.addEventListener('click', function (event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var clickedIndex = parseInt(event.target.closest('li').getAttribute('event-Id')) - 1;
  var authorName = data.books[clickedIndex].author_name;
  var isbn = data.books[clickedIndex].isbn[0];
  var title = data.books[clickedIndex].title;
  var url = 'https://covers.openlibrary.org/b/id/' + data.books[clickedIndex].cover_i + '-M.jpg';
  var object = {};
  object.authorName = authorName;
  object.isbn = isbn;
  object.title = title;
  object.url = url;
  object.index = clickedIndex;
  data.entries.push(object);
  event.target.className = 'button-added';
  event.target.textContent = 'Added';
}

);
