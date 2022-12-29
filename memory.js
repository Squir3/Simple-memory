const cardsColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

//pobranie wszystkich divów i utworzenie tablicy z listy
let cards = document.querySelectorAll("div");
cards = [...cards];

const startTime = new Date().getTime();

let activeCard = ""; //która karta została aktualnie kliknięta
const activeCards = []; //tablica dla dwóch kart

const gamePairs = cards.length/2;
let gameResult = 0;


const clickCard = function() 
{
    //Mini gra - dwa kliknięcia
    activeCard = this;

    if(activeCard == activeCards[0]) return; //czy to kliknięcie w ten sam element
    
    activeCard.classList.remove("hidden");

    //czy to 1 kliknięcie
    if(activeCards.length === 0)
    {
        activeCards[0] = activeCard;
        console.log("1");
        return;
    }
    //czy to 2 kliknięcie
    else
    {
        console.log("2");
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function()
        {
            if(activeCards[0].className === activeCards[1].className) //czy to są te same karty
        {
            console.log("Wygrana")
            activeCards.forEach(card => card.classList.add("off"))
            gameResult++;
            cards = cards.filter(card => !card.classList.contains("off"))
            if(gameResult == gamePairs) //koniec gry
            {
                const endTime = new Date().getTime();
                const gameTime = (endTime - startTime)/1000
                alert(`Udało się! Twój czas to: ${gameTime} sekund`)
                location.reload();
            }
        }
        else
        {
            console.log("Przegrana")
            activeCards.forEach(card => card.classList.add("hidden"))
        }
        activeCard = "";
        activeCards.length = 0;
        cards.forEach(card => card.addEventListener("click", clickCard))
        },500)
        
    }
};
const init = function() //losowanie kart
{
    cards.forEach(card =>
    {
        const position = Math.floor(Math.random() * cardsColors.length);
        card.classList.add(cardsColors[position]);
        cardsColors.splice(position, 1); //usunięcie wylosowanego elementu
    })

    setTimeout(function()
    {
        cards.forEach(card =>
        {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

init()
