// === Burger Handler =====================================================================
{
	let isOpen = false;

	function burgerBtnAnimation(e) {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		let classNameElem = document.querySelector('.burger').dataset.activel;

		if(!isOpen) {
			document.querySelector(`.${classNameElem}`).classList.add('open');
			 document.querySelector('.top-header').classList.add('open');
			isOpen = true;
		} else {
			document.querySelector(`.${classNameElem}`).classList.remove('open');
			 document.querySelector('.top-header').classList.remove('open');
			 // document.querySelector(`.${classNameElem}`).classList.add('close');

			 // 	setTimeout(() => {
			 // 		document.querySelector(`.${classNameElem}`).classList.remove('close');
			 // 	}, 400)
			isOpen = false;
		}

	}
	$('.burger').click((e) => burgerBtnAnimation(e));
}
// === Burger Handler =====================================================================	