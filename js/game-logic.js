/*количество карт на игровом поле
  используется в некоторых циклах*/
var cardsNumber = 18;
/*массив, который содержит в себе занятые
  позиции на игровом поле*/
var positionArray = [];
/*массив, который содержит в себе занятые карты
  на игровом поле*/
var cardsArray = [];

/*возвращает рандомное целое*/
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*проверяет, занята ли позиция.
  если занята, возвращает true, если свободна - false*/
function checkPosition(position) {	
	for(var i = 0; i < positionArray.length; i++) {
		if(position === positionArray[i]) {
			return true;
		}
	}
	return false;
}

/*проверяет, занята ли карта.
  если занята, возвращает true, если свободна - false*/
function checkCard(card) {
	for(var i = 0; i < cardsArray.length; i++) {
		if(card === cardsArray[i]) {
			return true;
		}
	}
	return false;
}


function getRandomCard() {
	var imgSrc;
	var cardTaken = true;
	var cardValue;
	var cardType;
		while(cardTaken) {
			imgSrc = "../img/cards/";
			/* получаем рандомное значение карты	
		 	*/
			cardValue = getRandomInt(2, 14);
			imgSrc += cardValue;

			/* получаем рандомную масть карты	
		 	*/
			cardType = getRandomInt(1, 4);
			switch(cardType) {
				case 1: imgSrc += 'C';
						break;
				case 2: imgSrc += 'D';
						break;
				case 3: imgSrc += 'H';
						break;
				case 4: imgSrc += 'S';
						break;
			}
			imgSrc += ".png";
			cardTaken = checkCard(imgSrc);
		}
	cardsArray.push(imgSrc);
	return imgSrc; 
}


/*устанавливаем изображение карты с адресом imgSrc
  на позицию position*/
function setCard(imgSrc) {
	/*устанавливаем позицию карты, проверяя, свободна ли она
	*/
	var position;
	var positionTaken = true;
		while(positionTaken) {
			position = getRandomInt(1, 18);
			positionTaken = checkPosition(position);
		}

    /* устанавливаем на полученную позицию сгенерированную карту
		   и добавляем позицию в список занятых
	*/
	document.getElementById(''+position).src = imgSrc;
	positionArray.push(position);
}

/*генерирует рандомное игровое поле*/
function generateCards() {
	var imgSrc;
	for(var i = 0; i < cardsNumber/2; i++)
	{
		/*получаем рандомную карту*/
		imgSrc = getRandomCard();
		/*устанавливаем карту на рандомную позицию,
		  а также дублируем эту карту на другую 
		  позицию
		*/
		setCard(imgSrc);
		setCard(imgSrc);
	}
}

/*переворачивает все карты рубашкой вверх*/
function hideCards() {
	for(var i = 0; i < cardsNumber; i++) {
		document.getElementById(''+(i+1)).src =
		'../img/card-shirt.png';
	}
}

/*запускает игру*/
function startGame() {
	/*генерирует карты и их расположение*/
	generateCards();
	/*через 5 секунд переворачивает их рубашкой вверх*/
	setTimeout(hideCards, 5000);
}