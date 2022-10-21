fetch("https://still-basin-88282.herokuapp.com/api/blogs")
  .then((res) => res.json())
  .then((data) => console.log(data));
