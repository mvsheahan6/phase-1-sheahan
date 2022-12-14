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

const handleMouseover = (playerObj, event) => {
    const statsDiv = document.createElement("div")
    statsDiv.classList.add("stats")
    const playerAverage = document.createElement("p")
    playerAverage.innerText = `Career Average: ${playerObj.career_average}`

    const playerRbi = document.createElement("p")
    playerRbi.innerText = `Career RBIs: ${playerObj.career_RBIs}`

    const playerHr = document.createElement("p")
    playerHr.innerText = `Career Homeruns: ${playerObj.career_homeruns}`

    statsDiv.append(playerAverage, playerRbi, playerHr)
    event.target.parentElement.append(statsDiv)
}

const handleMouseleave = (event) => {
    event.target.parentElement.querySelector(".stats").remove()
}

const toggleHeart = (event) => {
    // debugger
    if(event.target.innerHTML !== '♥') {
        event.target.innerHTML = "&#9829;"
        event.target.classList.add("red")
    } else {
        event.target.innerHTML = "&#9825;"
        event.target.classList.remove("red")
    }
    
}

const renderPlayer = (playerObj) => {
    const playerDiv = document.createElement("div")
    playerDiv.classList.add("card")
    const statsDiv = document.createElement("div")
    statsDiv.classList.add("stats")
    const playerName = document.createElement("h2")
    playerName.innerText = `${playerObj.name} `

    const showLove = document.createElement("h6")
    showLove.innerText = "(Show your LOVE)"
    let loveBtn = document.createElement("button")
    loveBtn.innerText = `\u2661`
    playerName.append(loveBtn, showLove)
    loveBtn.addEventListener("click", toggleHeart)


    const playerImg = document.createElement("img")
    playerImg.src = playerObj.image
    playerImg.alt = playerObj.name
    playerImg.classList.add("player-avatar")

    const playerNumber = document.createElement("p")
    playerNumber.innerText = `Number: ${playerObj.number}`

    playerImg.addEventListener("mouseover", (event) => handleMouseover(playerObj, event))
    playerImg.addEventListener("mouseleave", handleMouseleave)

    playerDiv.append(playerName, playerImg, playerName)
    playerCard.append(playerDiv)
}

const fetchData = () => {
    fetch("http://localhost:3000/yankees")
    .then(response => response.json())
    .then(players => players.forEach(renderPlayer))
}

playerForm.addEventListener("submit", handleSubmit)

fetchData()