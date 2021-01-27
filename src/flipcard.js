// const airportsUl = document.querySelector('#airports-ul')
// const airportsDetailOuterDiv = document.querySelector('#airport-detail-outer-div')
// const airportsDiv = document.querySelector('#airports-div')
// const amenitiesUl = document.querySelector('#amenities-ul')
// const restaurantsUl = document.querySelector('#restaurants-ul')
// const storesUl = document.querySelector('#stores-ul')
// const formDiv = document.querySelector("#form-div")
// const commentsUl = document.querySelector("#comments-ul")


//******  Event Handler for amenitiesUl */

amenitiesUl.addEventListener("click", event => {

    if(event.target.className === "amenity-likebtn"){
        const id = event.target.dataset.id

        const amenityLi = event.target.closest("li")
    
        const likeButton = amenityLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/amenities/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    } 
    if(event.target.matches(".amenity-image")){
        console.log(event.target)
    }
})


restaurantsUl.addEventListener("click", event => {

    if(event.target.className === "restaurant-likebtn"){
        const id = event.target.dataset.id

        const restaurantLi = event.target.closest("li")
    
        const likeButton = restaurantLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/restaurants/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    }
})

storesUl.addEventListener("click", event => {

    if(event.target.className === "store-likebtn"){
        const id = event.target.dataset.id

        const storeLi = event.target.closest("li")
    
        const likeButton = storeLi.querySelector("button")
        const newLikes = parseInt(likeButton.textContent) + 1

        fetch(`http://localhost:3000/stores/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(newLike => {
         
        likeButton.textContent = `${newLike.likes} 🛫`
        })
    }
})


    
