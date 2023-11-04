//? Import des fonction nécessaire pour modifier la modale//
import { creationModal } from './modale.js'

//? RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES TRAVAUX //
export async function refreshWorks(forceFlag) {
	try {
		//* Récupération des travaux sur le localStorage //
		let works = window.localStorage.getItem('works')
		//* Si pas présent récupération via l'API et stockage dans le localStorage //
		if (forceFlag || works === null) {
			// Récupération via l'API Swagger //
			const response = await fetch('http://localhost:5678/api/works', {
				headers: {
					accept: 'application/json',
				},
			})
			if (!response.ok) {
				//Gérer l'erreur ici
				throw new Error(`HTTP ${response.status}`)
			} else if (response.ok) {
				let responseData = await response.json()
				// Rajout d'un appel de la fonction avant d'utiliser la méthode stringify sur works
				galleryGeneration(responseData)
				// Stockage dans le localStorag //
				responseData = JSON.stringify(responseData)
				window.localStorage.setItem('works', responseData)
			}
		} else {
			// Sinon parse.works //
			works = JSON.parse(works)
			galleryGeneration(works)
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error)
	}
}

refreshWorks(false)
genrationContaineurFilter()
refreshCategories(false)

//* GÉNÉRATION DES TRAVAUX SUR LA PAGE D'ACCUEIL //
function galleryGeneration(works) {
	const gallery = document.querySelector('.gallery')
	gallery.innerHTML = ''
	for (let i = 0; i < works.length; i++) {
		const item = works[i]
		//Création d'une balise figure //
		const figureElement = document.createElement('figure')
		//Création de la balise img //
		const imgElement = document.createElement('img')
		imgElement.src = item.imageUrl
		imgElement.alt = `Photographie de Sophie Bluel : ${item.title}`
		//Création de la balise figcaptation //
		const figCaptationElement = document.createElement('figcaptation')
		figCaptationElement.innerText = item.title
		//Ajout des balises img et figcaptation dans la balise figure //
		figureElement.appendChild(imgElement)
		figureElement.appendChild(figCaptationElement)
		//Ajout de la balise figure dans la div gallery //
		gallery.appendChild(figureElement)
	}
}

//? RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES CATÉGORIE //
//* Récupération des catégories sur le localStorage //
async function refreshCategories(forceFlag) {
	let categories = window.localStorage.getItem('categories')
	//* Si pas présent récupération via l'API et stockage dans le localStorage //
	try {
		if (forceFlag || categories === null) {
			// Récupération via l'API Swagger //
			const response = await fetch('http://localhost:5678/api/categories', {
				accept: 'application/json',
			})

			if (!response.ok) {
				//Gérer l'erreur ici
				throw new Error(`HTTP ${response.status}`)
			} else if (response.ok) {
				// Stockage dans le localStorag //
				let responseData = await response.json()
				creatingFilter(responseData)
				listenFilter(responseData)
				// Stockage dans le localStorag //
				responseData = JSON.stringify(responseData)
				window.localStorage.setItem('categories', responseData)
			}
		} else {
			// Sinon parse.categories //
			categories = JSON.parse(categories)
			creatingFilter(categories)
			listenFilter(categories)
		}
		//Si tous est okay appel de la fonction listenFilter()
	} catch (error) {
		console.error("Une erreur s'est produite", error)
	}
}

function genrationContaineurFilter() {
	let divElement = document.createElement('div')
	divElement.classList.add('filters')
	document.querySelector('.gallery').before(divElement)
}

//? CRÉATION DES FILTRES //
function creatingFilter(categories) {
	const divElement = document.querySelector('.filters')
	divElement.innerHTML = ''
	// * Création du filtre Tous //
	const filterBtnTous = document.createElement('button')
	filterBtnTous.innerText = 'Tous'
	filterBtnTous.name = 'tous'
	divElement.appendChild(filterBtnTous)
	//* Boucle qui permet d'ajouter autant de bouton filtre qu'il a de catégorie dans le tableau categories //
	for (let i = 0; i < categories.length; i++) {
		const filtersBtn = document.createElement('button')
		const item = categories[i]
		// .replace permet de modifier Hotel par Hôtel //
		//! Attention si beaucoup d'éléments dans catégorie //
		filtersBtn.innerText = item.name.replace(/Ho/g, 'Hô')
		// .replace permet de rechercher une string entre les deux slashs et le g exécute la recherche le deuxième argument remplace la string si trouvée //
		filtersBtn.name = `${item.name.replace(/ /g, '').replace(/&r/g, '-et-r').toLowerCase()}`
		// Ajout du bouton[i] dans la divElement //
		divElement.appendChild(filtersBtn)
	}
}

function listenFilter(categories) {
	//* Récupération des noms de chaque catégories et stockage dans la const categoriesName //
	const categoriesName = categories.map((name) => name.name)
	// Ajout au tableau la string Tous //
	categoriesName.push('tous')
	//* Écoute de chaque button filters //
	const filtersBtns = document.querySelectorAll('.filters button')
	// Écoute de l'ensemble des boutons filtre //
	filtersBtns.forEach((button) => {
		button.addEventListener('click', (event) => {
			if (event.target.name === 'tous') {
				refreshWorks(true)
				refreshCategories(true)
			}
			// récupération de l'évenement dans la variable filterName et remplace la première lettre du mot en Majusculte//
			let filterName = capitalizeFirstLetter(event.target.name)
			// Remplacement si évenement de la string "Hôtel & restaurant" par la même string contenu dans le tableau //
			filterName = filterName.replace(/Hotels-et-restaurants/g, 'Hotels & restaurants')
			// Vérification que la string de l'évenement est bien présente dans le tableau categoriesName et applique la fonction filterDeletAndDisplay //
			categoriesName.includes(filterName)
				? filterDeletAndDisplay(filterName)
				: console.error("Le nom du filtre n'existe pas dans la catégorie")
		})
	})
}

function capitalizeFirstLetter(word) {
	// Vérification que la chaîne n'est pas vide
	if (word.length === 0) return word
	// Première lettre en majuscule et le reste en minuscules
	const firstLetterCapital = word.charAt(0).toUpperCase()
	const RestOfWordLowercase = word.slice(1).toLowerCase()
	return firstLetterCapital + RestOfWordLowercase
}

//* Fonction qui permet de supprimer la gallery du DOM et de l'afficher de nouveau avec la liste filtrée //
function filterDeletAndDisplay(filterName) {
	let works = JSON.parse(window.localStorage.getItem('works'))
	if (filterName === 'tous') {
		document.querySelector('.gallery').innerHTML = ''
		galleryGeneration(works)
	} else {
		const filterdWorks = works.filter((work) => work.category.name === filterName)
		document.querySelector('.gallery').innerHTML = ''
		galleryGeneration(filterdWorks)
	}
}

//? MODIFICATION DE LA PAGE SI L'UTILISATEUR EST CONNECTÉ //
//* Fonction qui permet d'appeler toutes les fonctions qui modifireont la page si l'utilisteur est connecté //
function modficationHomePageUserLogIn() {
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
	newIcon.setAttribute('aria-hidden', 'true')
	newPara.innerText = 'Mode édition'
	newDiv.appendChild(newIcon)
	newDiv.appendChild(newPara)

	document.querySelector('header').before(newDiv)
}

//* Remplacement du bouton logIn par logOut //
function replaceLogInLogOut() {
	// Suppression du bouton logIn //
	document.getElementById('loginDisabel').remove()
	// Création du bouton logOut //
	const newLi = document.createElement('li')
	const logOut = document.createElement('a')
	logOut.innerText = 'logout'
	logOut.id = 'logOut'
	logOut.href = '#'
	newLi.appendChild(logOut)
	document.getElementById('logo-instagram').before(newLi)
	//* Gestion de la déconnexion au clic sur le btn logOut //
	document.getElementById('logOut').addEventListener('click', () => {
		resetSession()
	})
}

//* Fonction qui permet d'ajouter le btn modifier à coté du titre Mes Projet //
function addButtonModify() {
	const newDiv = document.createElement('div')
	const h2 = document.querySelector('#portfolio h2')
	const subNewDiv = document.createElement('div')
	const newAncre = document.createElement('a')
	const newIcon = document.createElement('i')
	newDiv.id = 'user-modifications'
	h2.classList.add('user-connected-h2')
	subNewDiv.id = 'sub-user-modifications'
	newAncre.id = 'edit-btn'
	newAncre.innerText = 'modifier'
	newAncre.href = '#delet-modal'
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	newIcon.setAttribute('aria-hidden', 'true')
	subNewDiv.appendChild(newIcon)
	subNewDiv.appendChild(newAncre)
	// Ajout du h2 Mes Projets dans la newDiv //
	newDiv.appendChild(h2)
	// Ajout de la subNewDiv dans la newDiv //
	newDiv.appendChild(subNewDiv)
	// Ajout de la newDiv dans le DOM //
	document.querySelector('.filters').before(newDiv)
	//* Écoute du clic sur le bouton "modifier" //
	document.getElementById('edit-btn').addEventListener('click', () => {
		creationModal()
	})
}

//* Fonction qui permet de supprimer les filtres si l'utilisateur est connecté //
function disableFilters() {
	const filters = document.querySelector('main #portfolio .filters')
	filters.remove()
}

//* Récupération de l'id et du token et parse de manière à reconstruire l'objet en JavaScript //
try {
	const token = JSON.parse(window.sessionStorage.getItem('token'))
	// Si le Id et le token sont différent d'une chaine de caractère vide alors //
	if (token.userId !== '' && token.token !== '') {
		modficationHomePageUserLogIn()
		//Active la fonction qui permet de vérfier le temps d'inactivité de l'utilisateur //
		inactivityCheck()
	}
} catch {}

//? GESTION DE LA DÉCONNEXION //
//* Supprime le token du sessionStorage et réactualise la page  //
function resetSession() {
	window.sessionStorage.removeItem('token')
	location.reload()
}

//? VÉRIFICATION D'INACTIVITÉ //
let lastActivityTime = Date.now()
//* Fonction qui permet de mettre à jour la date/heure de la dernière activité de l'utilisateur //
function updateLastActivityTime() {
	lastActivityTime = Date.now()
}
//* Fonction qui permet de vérifier le temps d'inactivité (si supérieur ou égal à 15 minutes déconnexion et appel de la fonction resetSession()) //
function inactivityCheck() {
	const inactivityTimeout = 15 * 60 * 1000

	document.addEventListener('click', updateLastActivityTime)

	setInterval(function () {
		const currentTime = Date.now()
		const elapsedTime = currentTime - lastActivityTime
		if (elapsedTime >= inactivityTimeout) {
			resetSession()
		}
	}, 10000)
}
