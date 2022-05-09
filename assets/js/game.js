(()=>{
    'use strict'

    let deck = [];
    let playerTotalScore = 0;
    let computerTotalScore = 0;
    const types = ['C', 'D', 'H', 'S'];
    const specials = ['A','J','Q','K'];

    //HTML references
    const btnNewGame = document.querySelector('#btnNewGame');
    const btnAskCard = document.querySelector('#btnAskCard');
    const btnStop = document.querySelector('#btnStop');
    const htmlScore = document.querySelectorAll('.htmlScore');
    const cardsContainer = document.querySelectorAll('.cards-container');
    const result = document.querySelector('.result');

    const createDeck = ()=>{
        deck = [];
        for(let i = 2; i <= 10; i++){
            for (const type of types){
                deck.push(`${i + type}`);
            }
        }
        for (const special of specials){
            for (const type of types){
                deck.push(`${special + type}`);
            }
        }
       return _.shuffle(deck);
    }
    createDeck();

    const askForCard = ()=>{
        if(deck.length === 0){
            throw 'No hay más cartas en el deck'
        }
        return deck.pop();
    };

    const cardValue = (card)=>{
        const value = card.substring(0, card.length - 1);
        return (!isNaN(value)) ? Number(value) : ( value === 'A') ? 11 : 10;
    }
    //Computer turn
    const computerLogic = (playerScore)=>{
        do {
            const card = askForCard();
            const value = cardValue(askForCard());
            htmlScore[1].innerText = computerTotalScore += value;
        
            const imgCard = document.createElement('img');
            imgCard.src = `/assets/cards/${card}.png`;
            imgCard.classList.add('card');
            cardsContainer[1].append(imgCard);
        } while ((computerTotalScore < playerScore) && (computerTotalScore <= 21));

    }
    //DOM events
    btnNewGame.addEventListener('click', ()=>{
        deck = [];
        deck = createDeck();
        playerTotalScore = 0;
        computerTotalScore = 0;
        htmlScore[0].innerHTML = 0;
        htmlScore[1].innerHTML = 0
        btnAskCard.disabled = false;
        btnStop.disabled = false;
        result.innerHTML = '';
        cardsContainer[0].innerHTML = '';
        cardsContainer[1].innerHTML = '';
    });
    btnAskCard.addEventListener('click', ()=>{
        const card = askForCard();
        const value = cardValue(askForCard());
        htmlScore[0].innerText = playerTotalScore += value;
        const imgCard = document.createElement('img');
        imgCard.src = `/assets/cards/${card}.png`;
        imgCard.classList.add('card');
        cardsContainer[0].append(imgCard);

        if(Number(htmlScore[0].innerHTML) > 21){
            result.style.color = '#CB4335';
            result.innerText = 'Perdiste';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
            computerLogic(value);
        }else if(Number(htmlScore[0].innerHTML) === 21){
            result.style.color = '#2ECC71';
            result.innerText = 'Genial, obtuviste 21!';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
        }
    });
    btnStop.addEventListener('click', ()=>{
        if(playerTotalScore === 21){
            btnAskCard.disabled = true;
            btnStop.disabled = true;
            return;
        }
        computerLogic(playerTotalScore);
        if(computerTotalScore === 21){
            result.style.color = '#CB4335';
            result.innerText = 'Perdiste!';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
        } 
        if((computerTotalScore > playerTotalScore) && computerTotalScore < 21){
            result.style.color = '#CB4335';
            result.innerText = 'Perdiste!';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
        }
        if((computerTotalScore > playerTotalScore) && computerTotalScore > 21){
            result.style.color = '#2ECC71';
            result.innerText = 'Ganaste!';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
        }
        if(computerTotalScore === playerTotalScore){
            result.style.color = '#F4D03F';
            result.innerText = 'Empate!';
            btnAskCard.disabled = true;
            btnStop.disabled = true;
        }
    });
})();
