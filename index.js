const playerCard = document.querySelector("#player-collection")
const playerForm = document.querySelector("#form")

const handleSubmit = (event) => {
    event.preventDefault();
    const newPlayer = event.target.name.value
    const newNumber = event.target.number.value
    const newImage = event.target.image.value
    const newAverage = event.target.average.value
    const newRbis = event.target.rbis.value
    const newHomeruns = event.target.homeruns.value
    addPlayer = {
        name: newPlayer,
        number: newNumber,
        image: newImage,
        career_average: newAverage,
        career_RBIs: newRbis,
        career_homeruns: newHomeruns
    }

    renderPlayer(addPlayer)
    event.target.reset()

    // fetch("http://localhost:3000/yankees"), {
    //     method: "POST",
    //     headers: {
    //         "Conent-Type": "application/json"
    //     },
    //     body: JSON.stringify(addPlayer)
    // }
}

const renderPlayer = (playerObj) => {
    playerDiv = document.createElement("div")
    playerDiv.classList.add("card")
    const playerName = document.createElement("h2")
    playerName.innerText = playerObj.name

    const playerImg = document.createElement("img")
    playerImg.src = playerObj.image
    playerImg.alt = playerObj.name
    playerImg.classList.add("player-avatar")

    const playerNumber = document.createElement("p")
    playerNumber.innerText = `Number: ${playerObj.number}`

    const playerAverage = document.createElement("p")
    playerAverage.innerText = `Career Average: ${playerObj.career_average}`

    const playerRbi = document.createElement("p")
    playerRbi.innerText = `Career RBIs: ${playerObj.career_RBIs}`

    const playerHr = document.createElement("p")
    playerHr.innerText = `Career Homeruns: ${playerObj.career_homeruns}`

    const heart = document.createElement("span")
    heart.innerHTML = '&#9825'

    playerDiv.append(playerName, playerImg, playerName, playerAverage, playerRbi, playerHr)
    playerCard.append(playerDiv)
    playerImg.addEventListener("mouseover", (event) => handleMouseover(playerObj))

}

const fetchData = () => {
    fetch("http://localhost:3000/yankees")
    .then(response => response.json())
    .then(players => players.forEach(renderPlayer))
}

const handleMouseover = (playerObj) => {
    
    playerDiv.append(playerAverage, playerRbi, playerHr)
}

playerForm.addEventListener("submit", handleSubmit)

fetchData()