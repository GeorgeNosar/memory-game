/*СТАРТ ИГРЫ, ГЕНЕРАЦИЯ ИГРОВОГО ПОЛЯ*/

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

/*возвращает адрес рандомной карты*/
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
	/*выполняется дважды для соответствия массиву позиций*/
	cardsArray.push(imgSrc);
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

/*открывает пользователю возможность взаимодействовать с картами*/
function openAbiltyToClickCards() {
	for(var i = 1; i <= cardsNumber; i++) {
			document.getElementById(''+i).setAttribute('onclick',
			"cardClicked("+i+")" );
		}		
}

/*закрывает пользователю возможность взаимодействовать с картами*/
function closeAbiltyToClickCards() {
	for(var i = 1; i <= cardsNumber; i++) {
			document.getElementById(''+i).setAttribute('onclick',
			'' );
		}		
}


/*запускает игру*/
function startGame() {
	/*генерирует карты и их расположение*/
	generateCards();
	/*через 5 секунд переворачивает их рубашкой вверх*/
	setTimeout(hideCards, 5000);
	setTimeout(openAbiltyToClickCards, 5000);
}





/*ИГРОВОЙ ПРОЦЕСС*/


/*счетчик кликов*/
var clicks = 0;
/*массив карт, которые находятся открытыми*/
var openedCards = [];
/*массив id открытых карт*/
var opCardsIds = [];
/*количество удаленных с поля карт*/
var cardsDeleted = 0;
/*заработанные очки*/
var score = 0;

/*производит поиск картинки по id элемента*/
function findImgSrc(id) {
	var cardIndex;
	for(var i = 0; i < positionArray.length; i++) {
		if(id === positionArray[i]) {
			cardIndex = i;
			break;
		}
	}
	return cardsArray[cardIndex];
}

/*поворачивает открытые карты рубашкой вверх*/
function hideOpenedCards() {
	document.getElementById(''+opCardsIds[0]).src = '../img/card-shirt.png';
	document.getElementById(''+opCardsIds[1]).src = '../img/card-shirt.png';
	openedCards = [];
	opCardsIds = [];
}

/*убирает открытые карты с поля полностью*/
function takeOffOpenedCards() {
	document.getElementById(''+opCardsIds[0]).src = '../img/no-card.png';
	document.getElementById(''+opCardsIds[1]).src = '../img/no-card.png';
	openedCards = [];
	opCardsIds = [];
	cardsDeleted += 2;
	/*когда все карты удалены, игра заканчивается,
	  осуществляется переход на конечную страницу
	  с параметром передающим значение очков*/
	if(cardsDeleted === cardsNumber) {
		location.href='end.html?score=' + score;
	}
}

/*добавляет очки*/
function addScore() {
	score += 42 * (cardsNumber - cardsDeleted);
	document.getElementById('score').innerHTML = 
	"<span id='score'>" + score + "</span>";
}

/*отнимает очки*/
function subScore() {
	score -= 42 * cardsDeleted;
	if(score < 0) {
		score = 0;
	}
	document.getElementById('score').innerHTML = 
	"<span id='score'>" + score + "</span>";
}

/*скрипт, выполняющийся при нажатии на карту с номером id*/
function cardClicked(id) {
	clicks += 1;
	opCardsIds.push(id);
	/*блокировка доступа к нажатой карте*/
	document.getElementById(''+id).setAttribute('onclick', '' );
	switch(clicks) {
		case 1: 
			var imgSrc = findImgSrc(id);
			document.getElementById(''+id).src = imgSrc;
			openedCards.push(imgSrc);
			break;
		case 2:
			closeAbiltyToClickCards(); //закрываем доступ к взаимодействию, пока происходит обработка
			clicks = 0;
			var imgSrc = findImgSrc(id);
			document.getElementById(''+id).src = imgSrc;
			openedCards.push(imgSrc);
			/*если карты не совпали*/
			if( !(openedCards[0] === openedCards[1]) ) {
				/*переворачиваем назад рубашкой вверх*/
				setTimeout(hideOpenedCards, 1000);
				/*открываем возможность взаимодействия*/
				setTimeout(openAbiltyToClickCards, 1000);
				/*отминаем очки*/
				setTimeout(subScore, 1000);
			}
			/*если совпали*/
			else {
				/*убираем с поля*/
				setTimeout(takeOffOpenedCards, 1000);
				setTimeout(openAbiltyToClickCards, 1000);
				/*добавляем очки*/
				setTimeout(addScore, 1000);
			}
	}
}

/*парсим переданное значение очков со страницы игры
  и записываем его*/
function parseScore() {
	var endPageScore = window.location.href.split("?")[1].split("=")[1];
    document.getElementById("score-board").innerHTML = 
    "<h3 id='score-board'>" +
	"	Поздравляем!<br>"   +
	"	Ваш итоговый счет: " + endPageScore +
	"</h3>";
}