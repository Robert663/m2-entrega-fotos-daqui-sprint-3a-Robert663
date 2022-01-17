const foto = document.createElement('img');
const fotos = document.getElementById('fotos')
const submit = document.getElementById('submit');
const right = document.getElementById('right');
const left = document.getElementById('left');
const getTitle = document.getElementById('span');
const spanTitle = document.getElementById('title');
let textValue =  document.getElementById('text');
let receiveTargert = [];
let title = [];
let num = 0;
let i = 0;
let imageUrl = '';
let lati = 0;
let long = 0;
navigator.geolocation.getCurrentPosition(async coord => {
  lati = await coord.coords.latitude
  long = await coord.coords.longitude
}, function(error) {
  if (error.code == error.PERMISSION_DENIED)
    lati = 46.2276;
    long = 2.2137;
  });

  async function pegarImagens(){
    receiveTargert = [];
    title = [];
    const response = await fetch(`https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=cd406997f2df05b6ab9986a59e489201&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&lat=${lati}&lon=${long}&text=${textValue.value}`)
    .then(response => response.json())
    .then(data => {
    function constructImageURL(photoObj) {
      return "https://farm" + photoObj.farm +
      ".staticflickr.com/" + photoObj.server +
      "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }
    for(let i = 0; i < data.photos.photo.length; i++){
      imageUrl = constructImageURL(data.photos.photo[i]);
      console.log(imageUrl)
      receiveTargert.push(imageUrl);
      title.push(data.photos.photo[i].title);
    }
  })
  foto.src = imageUrl;
}

right.addEventListener('click', (e) =>{
  foto.src = receiveTargert[num];
  getTitle.innerText = title[num];
    num++;
    if(num >= receiveTargert.length){
      num = 0;
    }
  })
  left.addEventListener('click', (e) =>{
    foto.src = receiveTargert[num];
    getTitle.innerText = title[num];
    num -= 1;
    if(num < 0){
      num = receiveTargert.length-1;
    }
  })
fotos.appendChild(foto);
spanTitle.appendChild(getTitle);
pegarImagens();
submit.addEventListener('click', pegarImagens);