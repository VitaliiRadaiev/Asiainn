var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
console.log(isSafari);

@@include('forms.js');
@@include('popup.js');

function _da() {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}

$(document).ready(function() {
	_da();
	@@include('burger.js');

	document.querySelector('body').classList.add('isload');
	
	$.fancybox.defaults.loop = true;
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
			if(document.documentElement.clientWidth <= 800) {
				document.body.classList.add('lock');
			}
		});

		btnClose.addEventListener('click', () => {
			basketHead.classList.remove('_open');
			basket.classList.remove('_open');
			head.classList.remove('_isBasketOpen');
			menu.classList.remove('_isBasketOpen');
			bodyDelivery_3.classList.remove('_isBasketOpen');
			document.body.classList.remove('lock');
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



// === menu-table ==================================================================
{
	let menuTable = document.querySelector('.menu-table');
	if(menuTable) {
		document.querySelectorAll('.menu-table__triggers').forEach((item) => {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				const id = e.target.getAttribute('href').replace('#','');

				document.querySelectorAll('.menu-table__triggers').forEach((child) => {
					child.classList.remove('active');
				});

				document.querySelectorAll('.menu-table__tabs-content').forEach((child) => {
					child.classList.remove('active');
				});

				item.classList.add('active');
				document.getElementById(id).classList.add('active');
			});
		});


		document.querySelectorAll('.menu-table__tabs-content').forEach((item) => {
			item.querySelectorAll('.menu-table__sub-triggers').forEach((i) => {
				i.addEventListener('click', function(e) {
					e.preventDefault();
					const id = e.target.getAttribute('href').replace('#','');

					item.querySelectorAll('.menu-table__sub-triggers').forEach((child) => {
						child.classList.remove('active');
					});

					item.querySelectorAll('.menu-table__tabs-sub-content').forEach((child) => {
						child.classList.remove('active');
					});

					i.classList.add('active');
					document.getElementById(id).classList.add('active');
				});
			});
		});

	}
}
// === // menu-table ==================================================================


// === order-list ==================================================================
{
	let orderList = document.querySelector('.order-list');
	if(orderList) {
		orderList.querySelectorAll('.item-order__quantity').forEach((item) => {
			item.addEventListener('click', (e) => {

				if(e.target.closest('.item-order__plus')) {
					item.querySelector('input').value = +item.querySelector('input').value + 1;
				}

				if(e.target.closest('.item-order__minus')) {
					if(item.querySelector('input').value > 1) {
						item.querySelector('input').value = +item.querySelector('input').value - 1;
					}
				}
			})
		})
	}
}

{
	let popupOrder = document.querySelector('.form-order2');
	if(popupOrder) {
		popupOrder.querySelectorAll('.item-order__quantity').forEach((item) => {
			item.addEventListener('click', (e) => {

				if(e.target.closest('.item-order__plus')) {
					item.querySelector('input').value = +item.querySelector('input').value + 1;
				}

				if(e.target.closest('.item-order__minus')) {
					if(item.querySelector('input').value > 1) {
						item.querySelector('input').value = +item.querySelector('input').value - 1;
					}
				}
			})
		})
	}
}
// === // order-list ==================================================================


// ===  interior__gallery handler ==================================================================
{
	let gallery = document.querySelector('.interior__gallery');
	if(gallery) {
		if(gallery.children.length > 6) {
			let additionalPhotos = document.createElement('div');
			additionalPhotos.classList.add('interior__gallery-interior-additional-photos');
			additionalPhotos.style.display = 'none';

			gallery.after(additionalPhotos);

			let arrSix = [...gallery.children].slice(0,6);
			let arrRest = [...gallery.children].slice(6);

			arrRest.forEach(item => {
				additionalPhotos.append(item);
			})
			
		}
	}
}
// === // interior__gallery handler ==================================================================

{
	let popupOrder = document.querySelector('.popupOrder');
	if(popupOrder) {
		let observer = new MutationObserver(mutationRecords => {
		  _da()
		});

		observer.observe(popupOrder, {
		  childList: true, 
		  subtree: true, 
		  characterDataOldValue: true 
		});
	}
}


// === add datepicer ==================================================================
{
	let form = document.querySelector('.form-delivery4');
	if(form) {
		let input = form.querySelector('._date');
		datepicker(input, {
			customDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			customMonths: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			formatter: (input, date, instance) => {
				const value = date.toLocaleDateString()
				input.value = value
			},
			onSelect: function (input, instance, date) {
				input_focus_add(input.el);
			},
		});


			input.classList.add('_mask');
			// Inputmask("99.99.9999", {
			// 	//"placeholder": '',
			// 	clearIncomplete: true,
			// 	clearMaskOnLostFocus: true,
			// 	onincomplete: function () {
			// 		input_clear_mask(input);
			// 	}
			// }).mask(input);
			
	}
}
// === // add datepicer ==================================================================

// === fix btn in basket ==================================================================
{
	let basket = document.querySelector('.basket');
	if(basket) {
		if(isSafari) {
			document.write('safari')
			basket.querySelector('.basket__submit-wrap').classList.add('._isSafari');
		}
	}
}
// === // fix btn in basket ==================================================================



// === zoom popup ==================================================================
{
	
	function addZoom() {
		let popupOrder = document.querySelector('.popupOrder');
		if(popupOrder) {
			let imgUrl = popupOrder.querySelector('.form-order2__img img').src;
			console.log(imgUrl)
			popupOrder.insertAdjacentHTML('beforeend', '<div class="popupOrder__zoom"><div class="popupOrder__zoom-close"><img src="img/icons/close.svg" alt="close"></div><div class="popupOrder__zoom-img"><img src="' + imgUrl + '" alt="img"></div> </div>');
		}
	}
	addZoom()

	function zoomImgOpen() {
		let body = document.querySelector('.popupOrder__zoom');
		if(body) {
			body.classList.add('open');
		}
	}

	function zoomImgClose() {
		let body = document.querySelector('.popupOrder__zoom');
		if(body) {
			body.addEventListener('click', () => {

				body.classList.remove('open');
			})
		}
	}

	function zoomHandler() {
		let popupOrder = document.querySelector('.popupOrder');
		if(popupOrder) {
			zoomImgClose();
			let img = popupOrder.querySelector('.form-order2__img');
			img.addEventListener('click', () => {
				zoomImgOpen();
			})
		}
	}
	zoomHandler();
}

// === // zoom pupu ==================================================================



});


// ==== //  google map ===============

// {


// 	let isMap = document.getElementById("map");
// 	if(isMap) {
// 		var map;

// 		let center = {
// 			lat: 55.781977,
// 			lng: 37.469893,
// 		}

// 		let markerPosition = {
// 			lat: 55.781977,
// 			lng: 37.469893,
// 		}

// 		// Функция initMap которая отрисует карту на странице
// 		function initMap() {

// 			// В переменной map создаем объект карты GoogleMaps и вешаем эту переменную на <div id="map"></div>
// 			map = new google.maps.Map(document.getElementById('map'), {
// 				// При создании объекта карты необходимо указать его свойства
// 				// center - определяем точку на которой карта будет центрироваться
// 				center: {lat: center.lat, lng: center.lng},
// 				// zoom - определяет масштаб. 0 - видно всю платнеу. 18 - видно дома и улицы города.

// 				zoom: 17,

// 				// Добавляем свои стили для отображения карты
// 				//styles: 
// 			});

// 			// Создаем маркер на карте
// 			var marker = new google.maps.Marker({

// 				// Определяем позицию маркера
// 			    position: {lat: markerPosition.lat, lng: markerPosition.lng},

// 			    // Указываем на какой карте он должен появится. (На странице ведь может быть больше одной карты)
// 			    map: map,

// 			    // Пишем название маркера - появится если навести на него курсор и немного подождать
// 			    title: '',
// 			    label: '',

// 			    // Укажем свою иконку для маркера
// 			   // icon: 'img/contact/googlMarker.svg',
// 			});

// 		}
// 	}
// }

function initMap() {

		var options = {lat: 55.781977, lng: 37.469893};


		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: options,
			//mapTypeControl: false,
			//scrollwheel: false,
			//zoomControl: false,
			//disableDefaultUI: true,

	
		});

		var latLng = new google.maps.LatLng(55.781977, 37.469893),
				markerIcon = {
					//url: 'img/map-icon.png',
					scaledSize: new google.maps.Size(284, 284),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(142,142)
				};

		var marker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: markerIcon
		});

	}