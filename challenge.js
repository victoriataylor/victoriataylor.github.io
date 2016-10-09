var flickrURL = "https://flickr.com/services/rest/?";
var API_KEY = "d31a98ef82c3b756fc32bbd29099e9ff";

window.onload = function(){
	var lightbox = document.getElementById("lightbox");
	var script = document.createElement('script');
	script.type = 'text/javascript';
	var galleryID = "72157663613668085";
	var bo = "72157665057503822";
	script.async = true; 
	script.src = flickrURL + "method=flickr.galleries.getPhotos&api_key=" + API_KEY + "&gallery_id=" + bo + "&jsoncallback=pictureshandler&format=json";
	document.getElementsByTagName('head')[0].appendChild(script);
}

//refactor
function pictureshandler(data){
	var numPhotos = Math.min(data.photos.photo.length, 50);
	var photos = data.photos.photo;
	var lightbox = document.getElementById("lightbox");
	var photoArray = [];

	for (var i = 0; i < numPhotos; i++){
		var newImage = document.createElement('img');
		var imgSrc = "https://farm" + photos[i].farm + ".staticflickr.com/" + photos[i].server + "/" + photos[i].id + "_" + photos[i].secret;
		newImage.src = imgSrc + "_q.jpg"; //small photo
		var container = document.createElement('div');
		container.className = 'thumbnail';
		container.setAttribute('imageNum', i);
		container.appendChild(newImage);
		document.getElementById('image-container').appendChild(container);
	
		photoArray[i] = {'title': photos[i].title, 'src': imgSrc + "_z.jpg"};

		container.addEventListener('click', function(event){
			lightbox.style.display = "block";
			var index = event.target.parentElement.getAttribute('imageNum');
			lightbox.getElementsByTagName('img')[0].setAttribute('currIndex', index);
			lightbox.getElementsByTagName('img')[0].setAttribute('src', photoArray[index].src);
			document.getElementById('image-title').innerHTML = photoArray[index].title;		
		})
	}


	lightbox.addEventListener('click', function(event){
		var nextIndex, img; 

		if (event.target.id == 'lightbox'){
			lightbox.style.display = 'none';
		}
		else {
			if (event.target.id == "right-arrow"){
				img = event.target.parentElement.getElementsByTagName('img')[0];
				nextIndex = (parseInt(img.getAttribute('currIndex')) + 1) % numPhotos;
			}
			else if (event.target.id == "left-arrow"){
				img = event.target.parentElement.getElementsByTagName('img')[0];
				nextIndex = ((parseInt(img.getAttribute('currIndex')) - 1) + numPhotos) % numPhotos;
			}
			else if (event.target.nodeName == "IMG" || event.target.id == "right-arrow"){
				img = event.target;
				nextIndex = (parseInt(img.getAttribute('currIndex')) + 1) % numPhotos ;
			}
			img.setAttribute('currIndex', nextIndex);
			img.setAttribute('src', photoArray[nextIndex].src);
			document.getElementById('image-title').innerHTML = photoArray[nextIndex].title;

		}
	})
}




