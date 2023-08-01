const elements = document.querySelectorAll('.quest .card-body');
console.log('testing!');

elements.forEach((element) => {
  console.log(element);
  element.scrollBy(0);
  window.scrollBy(1, 10);
});
