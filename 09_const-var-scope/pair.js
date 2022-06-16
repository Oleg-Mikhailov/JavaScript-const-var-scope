(function () {

  let button = [];
  let card1 = 10;
  let card2 = 11;
  let firstCard = true;
  let secondCard = false;
  let buttonId1;
  let buttonId2;
  let twinCardsCount = 0;
  let buttonGroup;
  let form;
  let appTitle;
  let nIntervId;
  let gameOver = false;
  let numberOfCards = 4;
  const GAMETIMER = 60000;

  function startGame(container) {
    appTitle = document.createElement('h2');
    appTitle.innerHTML = 'Игра ПАРЫ';
    container.append(appTitle);
    gameOver = false;
    form = document.createElement('form');
    input = document.createElement('input');
    buttonStart = document.createElement('button');
    buttonStart.classList.add('btn', 'btn-primary');
    buttonStart.textContent = 'Начать игру';
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = ('Кол-во карточек по вертикали/горизонтали: ');
    form.append(input);
    form.append(buttonStart);
    container.append(form);
    buttonStartClick(buttonStart, container, form);
    return form;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i].value;
      array[i].value = array[j].value;
      array[j].value = temp;
    }
    return array;
  }

  function createPairsApp(container, rows) {
    const numberCards = rows * rows;
    twinCardsCount = 0;
    buttonGroup = document.createElement('div');
    buttonGroup.style.maxWidth = rows * 70 + "px";
    buttonGroup.classList.add('cardStyle');
    let buttonValue = 1;
    for (let i = 0; i < numberCards; i++) {
      button[i] = document.createElement('button');
      button[i].classList.add('btn', 'btn-primary', 'btn-style');
      button[i].textContent = 'X';
      button[i].value = buttonValue;
      if (((i + 1) % 2) == 0) buttonValue++;
      if (buttonValue > 8) buttonValue = 1;
      button[i].id = i;
      buttonGroup.append(button[i]);
      buttonClick(button[i], container, numberCards);
    }
    button.length = numberCards;
    shuffleArray(button);
    container.append(buttonGroup);

    setTimeout(() => {
      twinCardsCount = 0;
      form.remove();
      buttonGroup.remove();
      appTitle.remove();
      startGame(container);
    }, GAMETIMER)

    return container;
  }

  let buttonClick = (button, container, numberCards) => {
    button.addEventListener('click', cardButtonClick = () => {
      if (secondCard === true) cardReset();
      firstCard === true ? (card1 = button.textContent = button.value, firstCard = false, buttonId1 = button.id) :
        (card2 = button.textContent = button.value, secondCard = true, firstCard = true, buttonId2 = button.id);
      if (card1 === card2 && !gameOver) { twinCardsCount++; console.log('twinCardsCount++'); }
      if (twinCardsCount === (numberCards / 2)) { gameReset(container, form); }
      console.log('twinCardsCount ', twinCardsCount, ' numberOfCards', numberOfCards);
    });
  }

  let buttonStartClick = (buttonStart, container, form) => {
    buttonStart.addEventListener('click', function () {
      numberOfCards = input.value;
      if (numberOfCards % 2 != 0 || numberOfCards < 2 || numberOfCards > 10) numberOfCards = 4;
      form.remove();
      createPairsApp(container, numberOfCards);
    });
  }

  function cardReset() {
    if (card1 !== card2 && !gameOver) {
      button[buttonId1].textContent = 'X';
      button[buttonId2].textContent = 'Х';
      card1 = 10;
      card2 = 11;
    }
    secondCard = false;
    return button;
  }

  function gameReset(container, form) {
    card1 = 10;
    card2 = 11;
    if (!gameOver) {
      let buttonEnd = document.createElement('button');
      buttonEnd.classList.add('btn', 'btn-primary');
      buttonEnd.textContent = 'Сыграть ещё раз';
      container.append(buttonEnd);
      buttonEndClick(buttonEnd, container, form);
      gameOver = true;
    }
  }

  let buttonEndClick = (buttonEnd, container, form) => {
    buttonEnd.addEventListener('click', function () {
      form.remove();
      buttonGroup.remove();
      buttonEnd.remove();
      appTitle.remove();
      gameOver = false;
      startGame(container);
    });
  }

  document.addEventListener('DOMContentLoaded', function () { });
  window.startGame = startGame;

})()
