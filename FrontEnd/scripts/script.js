//? Import des fonction nécessaire pour afficher la modale//
import { creatModal } from './modale.js'

//! RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES TRAVAUX ET CATÉGORIES //
//* Fonction qui permet de récupérer les données des projets via l'API Swagger //
export async function refreshWorks(forceFlag) {
	try {
		let works = window.localStorage.getItem('works') // Récupération des travaux sur le localStorage //
		// Si pas présent récupération via l'API et stockage dans le localStorage //
		if (forceFlag || works === null) {
			// Récupération via l'API Swagger //
			const response = await fetch('http://localhost:5678/api/works', {
				headers: {
					accept: 'application/json',
				},
			})
			if (!response.ok) {
				//Gére l'erreur ici
				throw new Error(`HTTP ${response.status}`)
			} else if (response.ok) {
				let responseData = await response.json()
				genertationGallery(responseData) // Affiche la galerie //
				responseData = JSON.stringify(responseData) // Transforme les données en une string //
				window.localStorage.setItem('works', responseData) // Stockage dans le localStorag //
			}
		} else {
			works = JSON.parse(works) // Sinon parse.works //
			genertationGallery(works) // Affiche la galerie //
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error)
	}
}
//* Fonction qui permet de récupérer les données des catégories des projets via l'API Swagger  //
async function refreshCategories(forceFlag) {
	let categories = window.localStorage.getItem('categories')
	// Si pas présent récupération via l'API et stockage dans le localStorage //
	try {
		if (forceFlag || categories === null) {
			// Récupération via l'API Swagger //
			const response = await fetch('http://localhost:5678/api/categories', {
				accept: 'application/json',
			})

			if (!response.ok) {
				//Gére l'erreur ici
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

refreshWorks(false) // Premier appel de la fonction pour récupérer les données des projets via l'API Swagger //
generationContaineurFilter() // Création du containeur des filtre //
refreshCategories(false) // Premier appel de la fonction pour récupérer les données des catégories des projets via l'API Swagger //

//! AFFICHAGE DE LA GALERIE //
//* Fonction qui permet d'afficher la galerie dynamiquement sur la page d'accueil //
//? Paramètre [array] type string //
function genertationGallery(works) {
	const gallery = document.querySelector('.gallery')
	gallery.innerHTML = '' // Vide l'élémenent pour être sur qu'il n'y ai pas de doublont //
	for (let i = 0; i < works.length; i++) {
		const item = works[i]

		const figureElement = document.createElement('figure') //Création d'une balise figure //

		const imgElement = document.createElement('img') //Création de la balise img //
		imgElement.src = item.imageUrl
		imgElement.alt = `Photographie de Sophie Bluel : ${item.title}`

		const figCaptationElement = document.createElement('figcaptation') //Création de la balise figcaptation //
		figCaptationElement.innerText = item.title
		//Ajout des balises img et figcaptation dans la balise figure //
		figureElement.appendChild(imgElement)
		figureElement.appendChild(figCaptationElement)

		gallery.appendChild(figureElement) //Ajout de la balise figure dans la div gallery //
	}
}

//! GESTION DES FILTRES //
//* Fonction qui permet de créer le conteneur pour l'affichage dynamique des filtres //
function generationContaineurFilter() {
	let divElement = document.createElement('div')
	divElement.classList.add('filters')
	document.querySelector('.gallery').before(divElement)
}

//* Fonction qui permet de créer les filtres dynamiquement //
//? Paramètre [array] type string //
function creatingFilter(categories) {
	const divElement = document.querySelector('.filters')
	divElement.innerHTML = ''

	const filterBtnTous = document.createElement('button') // Création du filtre Tous //
	filterBtnTous.innerText = 'Tous'
	filterBtnTous.name = 'tous'
	divElement.appendChild(filterBtnTous)
	// Boucle qui permet d'itérer autant de bouton filtre qu'il a de catégorie dans le tableau categories //
	for (let i = 0; i < categories.length; i++) {
		const filtersBtn = document.createElement('button')
		const item = categories[i] // Stockage dans une variable item de l'élément //

		//! Attention si beaucoup d'éléments dans catégorie //
		filtersBtn.innerText = item.name.replace(/Ho/g, 'Hô') // .replace permet de modifier Hotel par Hôtel //
		// .replace permet de rechercher une string entre les deux slashs et le g exécute la recherche le deuxième argument remplace la string si trouvée //
		filtersBtn.name = `${item.name.replace(/ /g, '').replace(/&r/g, '-et-r').toLowerCase()}`
		divElement.appendChild(filtersBtn) // Ajout du bouton[i] dans la divElement //
	}
}
//? Paramètre [array] type string //
//* Fonction qui permet d'ajouter un écouteur d'événement sur chaque filtres //
function listenFilter(categories) {
	const categoriesName = categories.map((name) => name.name) // Récupération des noms de chaque catégories et stockage dans la const categoriesName //
	categoriesName.push('Tous') // Ajout au tableau la string Tous //

	const filtersBtns = document.querySelectorAll('.filters button')

	filtersBtns.forEach((button) => {
		// Écoute de l'ensemble des boutons filtre //
		button.addEventListener('click', (event) => {
			if (event.target.name === 'tous') {
				refreshWorks(true) // Force le rafraichissement du localStorage pour les projets //
				refreshCategories(true) // Force le rafraichissement du localStorage pour les catégories des projets //
			}

			let filterName = capitalizeFirstLetter(event.target.name) // Récupération de l'évenement dans la variable filterName et remplace la première lettre du mot en Majusculte//
			filterName = filterName.replace(/Hotels-et-restaurants/g, 'Hotels & restaurants') // Remplacement si évenement de la string "Hôtel & restaurant" par la même string contenu dans le tableau //
			// Vérification que la string de l'évenement est bien présente dans le tableau categoriesName et applique la fonction filterDeletAndDisplay //
			categoriesName.includes(filterName)
				? filterDeletAndDisplay(filterName)
				: console.error("Le nom du filtre n'existe pas dans la catégorie")
		})
	})
}
//* Fonction qui permet de mettre une lettre majuscule à chaque début de mot //
//? Paramètre type string //
function capitalizeFirstLetter(word) {
	if (word.length === 0) {
		return word // Vérification que la chaîne n'est pas vide //
	}
	const firstLetterCapital = word.charAt(0).toUpperCase() // Récupération de la première lettre de la string et en majuscule //
	const RestOfWordLowercase = word.slice(1).toLowerCase() // Récupération du reste est en minuscule //
	return firstLetterCapital + RestOfWordLowercase
}

//* Fonction qui permet de supprimer la gallery du DOM et de l'afficher de nouveau avec la liste filtrée //
function filterDeletAndDisplay(filterName) {
	let works = JSON.parse(window.localStorage.getItem('works'))
	if (filterName === 'tous') {
		document.querySelector('.gallery').innerHTML = ''
		genertationGallery(works) // Affichage de la galerie avec l'ensemble des projets //
	} else {
		const filterdWorks = works.filter((work) => work.category.name === filterName)
		document.querySelector('.gallery').innerHTML = '' // vide la galerie //
		genertationGallery(filterdWorks) // Affichage de la galerie avec les projets filtrés //
	}
}

//! MODIFICATION DE LA PAGE SI L'UTILISATEUR EST CONNECTÉ //
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
	newDiv.classList.add('edit-mode')

	const newIcon = document.createElement('i')
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	newIcon.setAttribute('aria-hidden', 'true')

	const newPara = document.createElement('p')
	newPara.innerText = 'Mode édition'

	newDiv.appendChild(newIcon)
	newDiv.appendChild(newPara)

	document.querySelector('header').before(newDiv)
}

//* Remplacement du bouton logIn par logOut //
function replaceLogInLogOut() {
	document.getElementById('loginDisabel').remove() // Suppression du bouton logIn //
	// Création du bouton logOut //
	const newLi = document.createElement('li')

	const logOut = document.createElement('a')
	logOut.innerText = 'logout'
	logOut.id = 'logOut'
	logOut.href = '#'

	newLi.appendChild(logOut)
	document.getElementById('logo-instagram').before(newLi)
	// Gestion de la déconnexion au clic sur le btn logOut //
	document.getElementById('logOut').addEventListener('click', () => {
		resetSession() // Déconnexion //
	})
}

//* Fonction qui permet d'ajouter le btn modifier à coté du titre Mes Projet //
function addButtonModify() {
	const newDiv = document.createElement('div')
	newDiv.id = 'user-modifications'

	const h2 = document.querySelector('#portfolio h2')
	h2.classList.add('user-connected-h2')

	const subNewDiv = document.createElement('div')
	subNewDiv.id = 'sub-user-modifications'

	const newAncre = document.createElement('a')
	newAncre.id = 'edit-btn'
	newAncre.innerText = 'modifier'
	newAncre.href = '#delet-modal'

	const newIcon = document.createElement('i')
	newIcon.classList.add('fa-regular', 'fa-pen-to-square')
	newIcon.setAttribute('aria-hidden', 'true')

	subNewDiv.appendChild(newIcon)
	subNewDiv.appendChild(newAncre)

	newDiv.appendChild(h2) // Ajout du h2 Mes Projets dans la newDiv //
	newDiv.appendChild(subNewDiv) // Ajout de la subNewDiv dans la newDiv //

	document.querySelector('.filters').before(newDiv) // Ajout de la newDiv dans le DOM //
	// Écoute du clic sur le bouton "modifier" //
	document.getElementById('edit-btn').addEventListener('click', () => {
		creatModal() // Création de la modale si click sur le btn modifier //
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
		modficationHomePageUserLogIn() // Modifie la page d'accueil //
		inactivityCheck() // Active la fonction qui permet de vérfier le temps d'inactivité de l'utilisateur //
	}
} catch {}
//! GESTION DE LA DÉCONNEXION //
//* Supprime le token du sessionStorage et réactualise la page  //
function resetSession() {
	window.sessionStorage.removeItem('token') // Supprime la clé token du seesionStorage //
	location.reload() // Acctualise la page d'accueil //
}

// VÉRIFICATION D'INACTIVITÉ //
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
		const currentTime = Date.now() // Stockage du temps depuis le 1er janvier 1970 //
		const elapsedTime = currentTime - lastActivityTime // Calcule du temps écoulé //
		if (elapsedTime >= inactivityTimeout) {
			resetSession() // Déconnexion //
		}
	}, 10000) // Vérification toutes les 10 secondes //
}
