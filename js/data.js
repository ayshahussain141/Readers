/* exported data */
var data = {
  view: 'book-list',
  entries: [],
  search: []
};

var word = localStorage.getItem('javascript-storage-list');
if (word !== null) {
  data = JSON.parse(word);
}

window.addEventListener('beforeunload', function (event) {

  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-storage-list', dataJSON);

});
