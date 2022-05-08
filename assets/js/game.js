let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A','J','Q','K'];

const createDeck = ()=>{

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

    deck = _.shuffle(deck);
    return deck;
}
createDeck();

const askForCard = ()=>{

    if(deck.length === 0){
        throw 'No hay más cartas en el deck'
    }

    const card = deck.pop();
    return card;
}

const cardValue = (card)=>{
    const value = card.substring(0, card.length - 1);
    return (!isNaN(value)) ? Number(value) : ( value === 'A') ? 11 : 10;
}
console.log(cardValue(askForCard()));
