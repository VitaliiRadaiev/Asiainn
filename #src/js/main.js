//var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

@@include('forms.js');

$(document).ready(function() {
	@@include('burger.js');
	document.querySelector('body').classList.add('isload');

// === Проверка, поддержка браузером формата webp ==================================================================

	function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
	callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

	if (support == true) {
	document.querySelector('body').classList.add('webp');
	}else{
	document.querySelector('body').classList.add('no-webp');
	}
	});

// === // Проверка, поддержка браузером формата webp ==================================================================


// === Плавный скрол на якорях ==================================================================
	if($('.anchor').length>0) {
		$(".anchor").click(function() {
		  var elementClick = $(this).attr("href")
		  var destination = $(elementClick).offset().top;
		  jQuery("html:not(:animated),body:not(:animated)").animate({
		    scrollTop: destination
		  }, 600);
		  return false;
		});
	}
// === Плавный скрол на якорях ==================================================================




// === slider-visit ==================================================================
{
	if($('.slider-visit').length>0) {
		$('.slider-visit').slick({
		  infinite: false,
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  prevArrow: '<div class="slick-arrow slick-prev"><span class="icon-chevron-thin-left"></span></div>',
		  nextArrow: '<div class="slick-arrow slick-next"><span class="icon-chevron-thin-right"></span></div>',
		});
	}
}
// === // slider-visit ==================================================================



// === delivery-2 tab handler ==================================================================
{
	let block = document.querySelector('.aside-delivery2');
	if(block) {
		let top = block.querySelector('.aside-delivery2__top');
		let bottom = block.querySelector('.aside-delivery2__bottom');

		top.children[0].classList.add('_first');
		top.children[1].classList.add('_second');
		
		bottom.children[0].classList.add('_first');
		bottom.children[1].classList.add('_second');

		let firstBtn = top.querySelector('._first');
		let secondBtn = top.querySelector('._second');
		let firstTab = bottom.querySelector('._first');
		let secondTab = bottom.querySelector('._second');

		firstBtn.addEventListener('click', () => {
			firstBtn.classList.add('active');
			firstTab.classList.add('active');

			secondBtn.classList.remove('active');
			secondTab.classList.remove('active');
		})

		secondBtn.addEventListener('click', () => {
			secondBtn.classList.add('active');
			secondTab.classList.add('active');
			
			firstBtn.classList.remove('active');
			firstTab.classList.remove('active');

		})

	}
}
// === // delivery-2 tab handler ==================================================================



// === basket handler ==================================================================
{
	let basketHead = document.querySelector('.basket-head ');
	if(basketHead) {
		let btn = document.querySelector('.basket-head__icon');
		let btnClose = document.querySelector('.basket-head__close-btn');
		let basket = document.querySelector('.basket');
		let head = document.querySelector('.head-delivery_3');
		let menu = document.querySelector('.delivery-menu');
		let bodyDelivery_3 = document.querySelector('.body-delivery_3');

		btn.addEventListener('click', () => {
			basketHead.classList.toggle('_open');
			basket.classList.toggle('_open');
			head.classList.toggle('_isBasketOpen');
			menu.classList.toggle('_isBasketOpen');
			bodyDelivery_3.classList.toggle('_isBasketOpen');
		});

		btnClose.addEventListener('click', () => {
			basketHead.classList.remove('_open');
			basket.classList.remove('_open');
			head.classList.remove('_isBasketOpen');
			menu.classList.remove('_isBasketOpen');
			bodyDelivery_3.classList.remove('_isBasketOpen');
		})
	}
}
// === // basket handler ==================================================================



// === banner list info handler ==================================================================
{
	let infoBlock = document.querySelector('.banner-delivery__bottom');
	if(infoBlock) {
		let btn = document.querySelector('.banner-delivery__btn-mobile');
		btn.addEventListener('click', () => {
			btn.classList.toggle('_open');
			$('.banner-delivery__bottom').slideToggle(300);
		})
	}
}
// === // banner list info handler ==================================================================


// === delivery-menu scroll handler ==================================================================
{
	let deliveryMenu = document.querySelector('.aside-delivery3');
	if(deliveryMenu) {
		let list = document.querySelector('.aside-delivery3__list');
		let dishList = document.querySelector('.delivery-menu');
		window.addEventListener('scroll', () => {
			let headDeliveryHeight = document.querySelector('.head-delivery_3').clientHeight;

			if(deliveryMenu.getBoundingClientRect().top <= headDeliveryHeight) {
				list.classList.add('fixed');
				dishList.classList.add('_isListFixed');

			} else {
				list.classList.remove('fixed');
				dishList.classList.remove('_isListFixed');
			}
		});
	}
}
// === // delivery-menu scroll handler ==================================================================

// === aside-delivery3__list ==================================================================
	if($('.anchorMenu').length>0) {
		const remeveClass = (corentItem) => {
			let list = document.querySelector('.aside-delivery3__list')
			for(let item of list.children) {
				if(item == corentItem) {
					continue;
				}
				item.classList.remove('active');
			}
		}

		$(".anchorMenu").click(function() {
		  var elementClick = $(this).attr("href")
		 	$(this).parent().addClass('active');
		 	remeveClass($(this).parent()[0]);
		  var destination = $(elementClick).offset().top - 110;
		  jQuery("html:not(:animated),body:not(:animated)").animate({
		    scrollTop: destination
		  }, 600);
		  return false; 
		});
	}
// === // aside-delivery3__list==================================================================


// === delivery-menu ==================================================================
{
	let deliveryMenu = document.querySelector('.delivery-menu');
	if(deliveryMenu) {
		for(let i = 0; i < deliveryMenu.children.length; i++) {
			deliveryMenu.children[i].dataset.count = i;
		}

		let list = document.querySelector('.aside-delivery3__list');
		const leftScroll = (index, widthElem) => {
			let count = 0;

			for(let i = 0; i < index; i++) {
				count += list.children[i].getBoundingClientRect().width;
			}

			list.scrollLeft = count - widthElem;
		}

		window.addEventListener('scroll', () => {
			//console.log(list.scrollLeft)

			for(let item of deliveryMenu.children) {
				if(item.getBoundingClientRect().top <= (document.documentElement.clientHeight / 2) && item.getBoundingClientRect().bottom >= (document.documentElement.clientHeight / 2)) {
					for(let i of list.children) {
						i.classList.remove('active');

						if(i == list.children[item.dataset.count]) {
							i.classList.add('active');
							leftScroll(item.dataset.count, i.getBoundingClientRect().width / 2);
						}
					}
				}
			}
		})
	}
}
// === // delivery-menu ==================================================================




});


// ==== //  google map ===============

{


	let isMap = document.getElementById("map");
	if(isMap) {
		var map;

		let center = {
			lat: 55.781977,
			lng: 37.469893,
		}

		let markerPosition = {
			lat: 55.781977,
			lng: 37.469893,
		}

		// Функция initMap которая отрисует карту на странице
		function initMap() {

			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
			map = new google.maps.Map(document.getElementById('map'), {
				// При создании объекта карты необходимо указать его свойства
				// center - определяем точку на которой карта будет центрироваться
				center: {lat: center.lat, lng: center.lng},
				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

				zoom: 17,

				// Добавляем свои стили для отображения карты
				//styles: 
			});

			// Создаем маркер на карте
			var marker = new google.maps.Marker({

				// Определяем позицию маркера
			    position: {lat: markerPosition.lat, lng: markerPosition.lng},

			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
			    map: map,

			    // Пишем название маркера - появится если навести на него курсор и немного подождать
			    title: 'бульвар Генерала Карбышева',
			    label: '',

			    // Укажем свою иконку для маркера
			   // icon: 'img/contact/googlMarker.svg',
			});

		}
	}
}

