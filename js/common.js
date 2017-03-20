window.onload = function(){

	function AnimateSlider(options, element){
		this.divWrap = document.querySelector(element);//choice of the parent element
		this.perEl = document.createElement("div");//create  div for class slider
		this.perEl.classList.add("slider");
		this.divWrap.appendChild(this.perEl);
		this.swipeSpeed = options.swipeSpeed;//speed opacity
		this.swipeDelay = options.swipeDelay;//speed slider
		this.countSpeed = 0;
		var index = 0;//the counter	
		var self = this;
		
	!function validate(options){		
			if (options.images.length < 2) {  //the minimum amount of images 2
					alert("Передали неверное количество изображения")
			}else{
				for (var i = 0; i < options.images.length; i++) {
					self.img = document.createElement("img");
					self.img.setAttribute("src",options.images[i]);
					self.img.classList.add("slideImg");
					self.perEl.appendChild(self.img);	
				}
					self.slidesEl = self.perEl.querySelectorAll(".slideImg");
			 }
			if(options.swipeDelay < 1000 || options.swipeDelay === undefined){
				alert("Скорость слайдера меньше одной секунды или не заданна, значение по умолчанию 1 секунда");
				self.swipeDelay = 1000;
			}
			if(options.swipeSpeed < 1 || options.swipeSpeed === undefined){
				alert("скорость анимации меньше 1 секунды или не заданна , значение по умолчанию 1 секунда");
				self.swipeSpeed = 1;
			}
			}(options);	
			
		function slideTo( slide ) {
			var currentSlide = self.slidesEl[slide];	
			currentSlide.style.opacity = 1;
			currentSlide.style.WebkitTransition = "opacity " + self.swipeSpeed + "s" + " ease";
				
			for( var i = 0; i < self.slidesEl.length; i++ ) {
			var slide = self.slidesEl[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		}

		this.action =  function() {
				
		   self.countSpeed =  setInterval(function() {
			index++;
			if( index == self.slidesEl.length ) {
				index = 0;
			}
			slideTo( index );			
			}, self.swipeDelay );
		
			this.speedControl = function(){
				var divControl = document.createElement("div");
					divControl.classList.add("divControl");
					this.divWrap.appendChild(divControl);
				var back = document.createElement("button");//<<
					back.innerHTML = "<<";
					back.classList.add("back");
					divControl.appendChild(back);	
				var addSpeed = document.createElement("button");
					addSpeed.innerHTML = "+";
					addSpeed.classList.add("addSpeed");
					divControl.appendChild(addSpeed);
				var stopPlay = document.createElement("button");
					stopPlay.innerHTML = "stop";
					stopPlay.classList.add("stopPlay");
					divControl.appendChild(stopPlay);
				var minusSpeed = document.createElement("button");
					minusSpeed.innerHTML = "-";
					minusSpeed.classList.add("minusSpeed");
					divControl.appendChild(minusSpeed);
				var next = document.createElement("button");
					next.innerHTML = ">>";
					next.classList.add("back");
					divControl.appendChild(next);
				var countStopPlay = 0;
				
				addSpeed.addEventListener('click',  function(){
					self.swipeDelay = self.swipeDelay - 500;
					clearInterval(self.countSpeed);
					self.action();
				});
			
				minusSpeed.addEventListener('click',  function(){	
					self.swipeDelay = self.swipeDelay + 500;
					clearInterval(self.countSpeed);
					self.action();
				});
	
				stopPlay.addEventListener('click',  function(){			
				if(stopPlay.innerHTML === "play"){
				   addSpeed.disabled = false;
				   minusSpeed.disabled = false;
				}
				if(stopPlay.innerHTML === "stop"){
				   addSpeed.disabled = true;
				   minusSpeed.disabled = true;
				}
				if(countStopPlay === 1){
					self.action();
					stopPlay.innerHTML = "stop";
					countStopPlay = 0;
					return;		
				}

				stopPlay.innerHTML = "play";
				clearInterval(self.countSpeed);
				countStopPlay++;
			});
			
				back.addEventListener('click',  function(){	
					index--;
					if (index < 0 ) {
						index = self.slidesEl.length-1;
					}		
					if( index == self.slidesEl.length ) {
						index = 0;
					}
					slideTo(index);
				});

				next.addEventListener('click',  function(){
					index++;
					if( index == self.slidesEl.length) {
					index = 0;
					}
					slideTo( index );	
				});
			}//speedControl
		}//action
		//for add photo
		this.addPhoto = function(url){
			options.images[options.images.length] = url;

			for (var i = options.images.length-1; i < options.images.length; i++) {
				self.img = document.createElement("img");
				self.img.setAttribute("src",options.images[i]);
				self.img.classList.add("slideImg");
				self.perEl.appendChild(self.img);	
				}
			self.slidesEl = self.perEl.querySelectorAll(".slideImg");
		}

	}//AnimateSlider

	//we must transfer arrey of images and the second argument element to which we want add slider
	//not necessary transfer speed(swipeDelay) and speed animation (swipeSpeed);
	var slider = new AnimateSlider({			
	images:["images/im1.jpg","images/im2.jpg","images/im3.jpg","images/im4.jpg"],
	swipeDelay: 3000,
	swipeSpeed: 1,
	},".slider-wrapper");	
	slider.action();
	slider.speedControl();
	//add event for add photo
	document.querySelector('.but_add').addEventListener("change", addPhotoUser);

	function addPhotoUser(event){
		var photoOfUser = URL.createObjectURL(event.target.files[0]);
		
		slider.addPhoto(photoOfUser);
	}
	
}//onload



