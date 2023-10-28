//* Écoute de l'evement submit du logIn et vérification des informations + message d'erreur
async function btnLogIn() {
	document.querySelector('#logIn form').addEventListener('submit', (event) => {
		event.preventDefault()
		manageForm()
	})
}

btnLogIn()

//!!!!!!! Normalement cette phrase doit être affichée “Erreur dans l’identifiant ou le mot de passe” !!!!!! \\\\\\
//* Fonction qui permet de gérer le formulaire en demandant la vérification de l'ensemble des champs
function manageForm() {
	try {
		// Récupération de l'email //
		let logInEmail = document.getElementById('logInEmail').value
		emailValidity(logInEmail)
		console.log(logInEmail)
		// Récupération du mot de passe //
		let logInPassword = document.getElementById('logInPassword').value
		passwordValidty(logInPassword)
		console.log(logInPassword)
		showErrorMessage('')
		//! Majuscule ? ! //
		// Gestion des erreurs //
	} catch (Error) {
		//Récupération de l'erreur est stockage dans la variable errorMessage
		let errorMessage = Error.message
		showErrorMessage(errorMessage)
	}
}
/**
 ** Fonction qui permet de vérifier que l'email est bien rempli et valide selon le regExp
 *  @param {String} logInEmail
 */
function emailValidity(logInEmail) {
	const regex = new RegExp('^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]+$')
	// Si logEmail est faux alors création l'erreur suivante
	if (!regex.test(logInEmail)) {
		throw new Error("L'Email ne respecte pas les critères pour être valide")
	}
}

/** 
//* Fonction qui permet de vérifier que le mot de passe n'est pas vide 
@param {String} logInPassword
*/

function passwordValidty(logInPassword) {
	// Si logInPassword renvoi false alors création l'erreur suivante
	if (logInPassword.trim() === '') {
		throw new Error("Le mot de passe n'est pas valide")
	}
}
//?? Fonction à améliorer car trop de if/else ??//
//  @param {String} erroMessage
function showErrorMessage(errorMessage) {
	if (errorMessage === "L'Email ne respecte pas les critères pour être valide") {
		generationMailErrorMessage(errorMessage)
	} else {
		generationMailErrorMessage('')
		if (errorMessage === "Le mot de passe n'est pas valide") {
			generationPasswordErrorMessage(errorMessage)
		} else {
			generationPasswordErrorMessage('')
		}
	}
}

/** 
//* Fonction qui permet d'afficher ou supprimer le message d'erreur dans le DOM si le champ email n'est pas correctement rempli 
*@param {String} erroMessage
*/
function generationMailErrorMessage(errorMessage) {
	//Création d'une constant qui contiendra l'élement du DOM avec un id error-message
	let paraErrorMessage = document.getElementById('error-message-mail')
	//Si l'élement avec l'id error-message n'existe pas alors exécute ce qui suit
	if (!paraErrorMessage) {
		const labelPassword = document.querySelector('label[for="logInPassword"]')
		paraErrorMessage = document.createElement('p')
		paraErrorMessage.id = 'error-message-mail'
		labelPassword.before(paraErrorMessage)
	}
	paraErrorMessage.innerText = errorMessage
	console.log(errorMessage)
}

/**
 // * Fonction qui permet d'afficher ou supprimer le message d'erreur dans le DOM si le champ mot de passe n'est pas correctement rempli 
//  @param {String} erroMessage
 */
function generationPasswordErrorMessage(errorMessage) {
	//Création d'une constant qui contiendra l'élement du DOM avec un id error-message
	let paraErrorMessage = document.getElementById('error-message-password')
	//Si l'élement avec l'id error-message n'existe pas alors exécute ce qui suit
	if (!paraErrorMessage) {
		const labelPassword = document.querySelector('#logIn input[type="submit"]')
		console.log(labelPassword)
		paraErrorMessage = document.createElement('p')
		paraErrorMessage.id = 'error-message-password'
		labelPassword.before(paraErrorMessage)
	}
	paraErrorMessage.innerText = errorMessage
	console.log(errorMessage)
}

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

//* Fonction qui permet d'ajouter le btn modifier à coté du titre Mes Projet //
function addButtonModify() {
	const newDiv = document.createElement('div')
	const h2 = document.querySelector('#portfolio h2')
	const subNewDiv = document.createElement('div')
	const newIcon = document.createElement('i')
	const newPara = document.createElement('p')
	newDiv.id = 'user-modifications'
	h2.classList.add('user-connected-h2')
	subNewDiv.id = 'sub-user-modifications'
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	newPara.innerText = 'modifier'

	subNewDiv.appendChild(newIcon)
	subNewDiv.appendChild(newPara)
	// Ajout du h2 Mes Projets dans la newDiv
	newDiv.appendChild(h2)
	// Ajout de la subNewDiv dans la newDiv
	newDiv.appendChild(subNewDiv)
	// Ajout de la newDiv dans le DOM
	document.querySelector('.gallery').before(newDiv)
}

//* Fonction qui permet de supprimer les filtres si l'utilisateur est connecté //
function disableFilters() {
	document.querySelector('main #portfolio .filters').remove()
}
