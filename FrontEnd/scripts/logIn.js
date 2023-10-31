//* Écoute de l'evement submit du logIn et vérification des informations + message d'erreur
async function btnLogIn() {
	document.querySelector('#logIn form').addEventListener('submit', (event) => {
		event.preventDefault()
		manageForm()
		// ! Test
		// let tokenTest = 'ieohfcsè§(!xsçfcngvin'
		// window.sessionStorage.setItem('token', tokenTest)
		// redirectionHomePage()
	})
}

btnLogIn()
//* Fonction qui permet de gérer le formulaire en demandant la vérification de l'ensemble des champs
function manageForm() {
	try {
		// Récupération de l'email //
		let logInEmail = document.getElementById('logInEmail').value
		emailValidity(logInEmail)
		// Récupération du mot de passe //
		let logInPassword = document.getElementById('logInPassword').value
		passwordValidty(logInPassword)
		showErrorMessage('')
		validationAcces(logInEmail, logInPassword)

		// Gestion des erreurs //
	} catch (error) {
		//Récupération de l'erreur est stockage dans la variable errorMessage
		let errorMessage = error.message
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
		console.error("L'Email ne respecte pas les critères pour être valide")
		throw new Error("L'Email ne respecte pas les critères pour être valide")
	}
}

/**
 **Fonction qui permet de vérifier que le mot de passe n'est pas vide
 * @param {String} logInPassword
 */

function passwordValidty(logInPassword) {
	// Si logInPassword renvoi false alors création l'erreur suivante
	if (logInPassword.trim() === '') {
		console.error('Le mot de passe ne peut pas être vide')
		throw new Error('Le mot de passe ne peut pas être vide')
	}
}
/**
 *  @param {String} erroMessage
 */
function showErrorMessage(errorMessage) {
	//Création d'une constant qui contiendra l'élement du DOM avec un id error-message
	let spanErrorMessageMail = document.getElementById('error-message-mail')
	let spanErrorMessagePassword = document.getElementById('error-message-password-logs')
	let spanErrorMessageLogs = document.getElementById('error-message-password-logs')

	console.error(errorMessage)

	// La saisie de l'email n'est pas valide
	errorMessage === "L'Email ne respecte pas les critères pour être valide"
		? (spanErrorMessageMail.innerText = errorMessage)
		: (spanErrorMessageMail.innerText = '')

	console.log(spanErrorMessageMail)

	// La saisie du mot de passe n'est pas valide

	if (errorMessage === 'Le mot de passe ne peut pas être vide') {
		spanErrorMessagePassword.innerText = errorMessage
	} else {
		spanErrorMessagePassword.innerText = ''
		// Erreur dans l’identifiant ou le mot de passe
		if (errorMessage === 'Erreur dans l’identifiant ou le mot de passe') {
			spanErrorMessageLogs.innerText = errorMessage
		} else {
			spanErrorMessageLogs.innerText = ''
		}
	}
}

//Fonction qui permet d'afficher ou supprimer le message d'erreur dans le DOM si le champ email n'est pas correctement rempli
// function generationMailErrorMessage(errorMessage) {
// 	// let inputEmail = document.getElementById('logInEmail')
// 	// console.log(inputEmail)
// 	// inputEmail.setCustomValidity(errorMessage)
// 	//Création d'une constant qui contiendra l'élement du DOM avec un id error-message
// 	let spanErrorMessage = document.getElementById('error-message-mail')
// 	spanErrorMessage.innerText = errorMessage
// }

//Fonction qui permet d'afficher ou supprimer le message d'erreur dans le DOM si le champ mot de passe n'est pas correctement rempli
// function generationPasswordErrorMessage(errorMessage) {
// 	//Création d'une constant qui contiendra l'élement du DOM avec un id error-message
// 	let paraErrorMessage = document.getElementById('error-message-password')
// 	paraErrorMessage.innerText = errorMessage
// }

async function validationAcces(logInEmail, logInPassword) {
	try {
		//* Construction de l'objet bodyFetch qui reprend les callbacks logEmail et LogInPassword
		const bodyFetch = {
			email: logInEmail,
			password: logInPassword,
		}
		console.log(JSON.stringify(bodyFetch))
		//* Fetch pour récupération de l'id et token avec le verbe POST + headers et body
		const reponse = await fetch('http://localhost:5678/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify(bodyFetch),
		})

		// Si la réponse de l'API est strictement égale à 401 alors affiche le message d'erreur suivant :
		if (reponse.status === 401) {
			let erroMessage = 'Erreur dans l’identifiant ou le mot de passe'
			showErrorMessage(erroMessage)
			console.error('Erreur dans l’identifiant ou le mot de passe')
			// Sinon si la réponse n'est pas ok, attrape l'erreur
		} else if (!reponse.ok) {
			throw new Error(`HTTP ${reponse.status}`)
		}
		// Création de la constant qui accueillera la réponse au format JavaScript
		const accesValidation = await reponse.json()
		console.log(accesValidation)
		// Si le token est bien présent alors stock le dans le sessionStorage
		if (accesValidation.token) {
			let tokenLogIn = JSON.stringify(accesValidation)
			window.sessionStorage.setItem('token', tokenLogIn)
			// Sinon affiche le message d'erreur suivant :
		} else {
			console.error("Le serveur n'a pas renvoyé de token d'authification")
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error)
	}

	redirectionHomePage()
}

//* Function qui redirige vers la page d'accueil
async function redirectionHomePage() {
	document.location.href = 'http://127.0.0.1:5500/FrontEnd/index.html'
}
