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