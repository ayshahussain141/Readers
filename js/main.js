var bookList = {
  books: []
};

var $ul = document.querySelector('ul');
var targetUrl = encodeURIComponent('http://openlibrary.org/search.json?subject=thriller');
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
xhr.responseType = 'json';
xhr.addEventListener('load', function (event) {
  for (var i = 0; i < xhr.response.docs.length; i++) {
    bookList.books.push(xhr.response.docs[i]);
    $ul.appendChild(list(xhr.response.docs[i]));
  }
  for (var a = 0; a < data.entries.length; a++) {
    readinglist(data.entries[a]);
  }

});
xhr.send();

function list(book) {
  var list = document.createElement('li');
  list.setAttribute('event-Id', book.key);
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
  for (var i = 0; i < data.entries.length; i++) {
    if (book.key === data.entries[i].key) {
      $addButton.setAttribute('class', 'button-added');
      $addButton.textContent = 'Added ';
    }
  }
  $div.appendChild($addButton);
  return list;
}

$ul.addEventListener('click', function (event) {
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  var listKey = event.target.closest('li').getAttribute('event-Id');
  for (var i = 0; i < bookList.books.length; i++) {
    if (bookList.books[i].key === listKey) {
      var key = bookList.books[i].key;
      var authorName = bookList.books[i].author_name;
      var isbn = bookList.books[i].isbn[0];
      var title = bookList.books[i].title;
      var url = 'https://covers.openlibrary.org/b/id/' + bookList.books[i].cover_i + '-M.jpg';

    }

  }
  var object = {};
  object.authorName = authorName;
  object.isbn = isbn;
  object.title = title;
  object.url = url;
  object.key = key;
  object.listsKey = listKey;
  event.target.textContent = 'Added';
  event.target.className = 'button-added';
  data.entries.push(object);
  $readingList.appendChild((readinglist(object)));

}
);

var $readingList = document.querySelector('.readinglist-ul');
function readinglist(entries) {
  var list = document.createElement('li');
  list.setAttribute('class', 'fave-list');
  list.setAttribute('book-Id', entries.key);
  var $image = document.createElement('img');
  var $div = document.createElement('div');
  var $divOne = document.createElement('div');
  var $divTwo = document.createElement('div');
  var $headingThree = document.createElement('h3');
  var $paragraph = document.createElement('p');
  var $paragraphTwo = document.createElement('p');

  $divOne.setAttribute('class', 'row width');
  $divTwo.setAttribute('class', 'column-full');
  $readingList.appendChild(list);

  list.appendChild($divOne);
  $divOne.appendChild($image);
  $divOne.appendChild($divTwo);
  $divTwo.appendChild($div);
  $div.appendChild($headingThree);
  $div.appendChild($paragraph);
  $div.appendChild($paragraphTwo);

  $image.setAttribute('src', entries.url);
  $div.setAttribute('class', 'lists');
  $headingThree.setAttribute('class', 'font-fam');
  $paragraph.setAttribute('class', 'font-fam-two');
  $paragraphTwo.setAttribute('class', 'font-fam-two');

  $headingThree.textContent = entries.title;
  $paragraph.textContent = entries.authorName;
  $paragraphTwo.textContent = 'Isbn#: ' + entries.isbn;

  var $addButton = document.createElement('button');
  $addButton.setAttribute('class', 'remove-button');
  $addButton.textContent = 'Remove';
  $div.appendChild($addButton);

  return list;
}

var $listFav = document.querySelector('#favorite-list');
var $apiList = document.querySelector('#api-list');

function viewSwap() {
  var string = data.view;
  if (string === 'book-list') {
    $listFav.className = 'hidden';
    $apiList.className = 'view';
  }
  if (string === 'reading-list') {
    $listFav.className = 'view';
    $apiList.className = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  viewSwap();
});

var readingButton = document.querySelector('.reading-page');
var bookButton = document.querySelector('.book-page');
bookButton.addEventListener('click', function (event) {
  data.view = 'book-list';
  viewSwap();
});

readingButton.addEventListener('click', function (event) {
  data.view = 'reading-list';
  viewSwap();
});

$readingList.addEventListener('click', function () {
  if (event.target.tagName === 'BUTTON') {
    var list = event.target.closest('li');
    list.remove();
  }
  var three = event.target.closest('li').getAttribute('book-Id');
  for (var i = 0; i < data.entries.length; i++) {
    if (three === data.entries[i].key) {
      data.entries.splice(i, 1);

    }
  }
}

);
