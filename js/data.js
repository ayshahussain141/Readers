/* exported data */
var data = {
  books: [],
  view: 'book-list',
  entries: [],
  bookId: 1
};

var word = localStorage.getItem('javascript-storage-list');
if (word !== null) {
  data.entries = JSON.parse(word);
}

window.addEventListener('beforeunload', function (event) {

  var dataJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-storage-list', dataJSON);

});
