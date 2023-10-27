// const formLogIn = document.querySelector('#logIn form')
// formLogIn.addEventListener('submit', (event) => {
// 	event.preventDefault()
// 	console.log('hello')
// 	const logInEmail = document.getElementById('logInEmail').value
// 	const logInpassword = document.getElementById('logInpassword').value
// 	console.log(logInEmail)
// 	console.log(logInpassword)
// })

// document.querySelector('#logIn form').addEventListener('submit', (event) => {
// 	event.preventDefault()
// 	for (let input of document.querySelectorAll('#logIn form input')) {
// 		// input.setCustomValidity('Erreur dans l’identifiant ou le mot de passe')
//         input.reportValidity()
// 	}
// })
//* Fonction qui permet d'appeler toutes les fonctions qui modifireont la page si l'utilisteur est connecté //
export function modficationHomePageUserLogIn() {
	newDivLogIn()
	replaceLogInLogOut()
	addButtonModify()
	disableFilters()
}

//* Fonction qui permet de créer la div au dessus du header si utilisateur connecté //
function newDivLogIn() {
	const newDiv = document.createElement('div')
	const newIcon = document.createElement('i')
	const newPara = document.createElement('p')
	newDiv.classList.add('edit-mode')
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	newPara.innerText = 'Mode édition'
	newDiv.appendChild(newIcon)
	newDiv.appendChild(newPara)

	document.querySelector('header').before(newDiv)
}

//* Remplacement du bouton logIn par logOut //
function replaceLogInLogOut() {
	// Suppression du bouton logIn
	document.querySelector('a[href="pages/logIn.html"]').remove()
	// Création du bouton logOut
	const logOut = document.createElement('li')
	logOut.innerText = 'logout'
	document.querySelector('header nav ul a[href="https://www.instagram.com/"]').before(logOut)
}

function addButtonModify() {
	const newDiv = document.createElement('div')
	const subNewDiv = document.createElement('div')
	const newIcon = document.createElement('i')
	const newPara = document.createElement('p')
	newDiv.id = 'user-modifications'
	subNewDiv.id = 'sub-user-modifications'
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	// newIcon.innerHTML = 'modifier'
	newPara.innerText = 'modifier'

	subNewDiv.appendChild(newIcon)
	subNewDiv.appendChild(newPara)
	// Ajout du h2 dans la div
	newDiv.appendChild(document.querySelector('#portfolio h2'))
	newDiv.appendChild(subNewDiv)
	document.querySelector('.gallery').before(newDiv)
}

function disableFilters() {
	document.querySelector('main #portfolio .filters').remove()
}
