// Global Variables
const ramenMenuDiv = document.getElementById("ramen-menu")
const detailImg = document.querySelector("#ramen-detail > .detail-image")
const detailName = document.querySelector("#ramen-detail > .name")
const detailRestaurant = document.querySelector("#ramen-detail > .restaurant")
const detailsRating = document.getElementById("rating-display")
const detailsComment = document.getElementById("comment-display")
const ramenForm = document.getElementById("new-ramen")



// Callbacks
const handleClick = (ramen, event) => {
    detailImg.src = ramen.image
    detailName.innerText = ramen.name
    detailRestaurant.innerText = ramen.restaurant
    detailsRating.innerText = ramen.rating
    detailsComment.innerText = ramen.comment
}

const displayRamen = (ramenObj) => {
    const ramenImg = document.createElement("img")
    ramenImg.src = ramenObj.image
    ramenImg.alt = ramenObj.name
    ramenImg.classList.add("img-slider")
    // why (ramenOb, event)
    ramenImg.addEventListener("click", (event) => handleClick(ramenObj, event)) 
    ramenMenuDiv.appendChild(ramenImg)
}

const handleSubmit = (event) => {
    event.preventDefault();
    const ramenName = event.target.name.value
    const ramenRestaurant = event.target.restaurant.value
    const ramenImg = event.target.image.value
    const ramenRating = event.target.rating.value
    const ramenComment = document.getElementById("new-comment").value
    const newRamen = {
        name: ramenName,
        restaurant: ramenRestaurant,
        image: ramenImg,
        rating: ramenRating,
        comment: ramenComment
    }

    
    event.target.reset()
    displayRamen(newRamen)

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRamen)
    })
}


// Start the logic

const fetchData = () => {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramen => ramen.forEach(displayRamen))
    .catch(error => alert(error))
}
ramenForm.addEventListener("submit", handleSubmit)
fetchData()