//? Import des fonction nécessaire pour modifier la modale//
import { modalCreation } from './modale.js'

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
			if (response.ok) {
				// Stockage dans le localStorag //
				works = await response.json()
				works = JSON.stringify(works)
				window.localStorage.setItem('works', works)
				// Sinon parse.works //
			} else {
				//Gérer l'erreur ici
			}
		} else {
			works = JSON.parse(works)
			// ! PENSER À RÉACTUALISER LE LOCALSTORAGE SI RAJOUT D'UN WORK ET QUAND L'UTILISATEUR CLIC SUR LE FILTRE TOUS ! //
		}
		galleryGeneration(works)
	} catch (error) {}
}

refreshWorks(false)

//* GÉNÉRATION DES TRAVAUX SUR LA PAGE D'ACCUEIL //
function galleryGeneration(works) {
	const gallery = document.querySelector('.gallery')
	gallery.innerHTML = ''
	for (let i = 0; i < works.length; i++) {
		//Création d'une balise figure //
		const figureElement = document.createElement('figure')
		//Création de la balise img //
		const imgElement = document.createElement('img')
		imgElement.src = works[i].imageUrl
		//Création de la balise figcaptation //
		const figCaptationElement = document.createElement('figcaptation')
		figCaptationElement.innerText = works[i].title
		//Ajout des balises img et figcaptation dans la balise figure //
		figureElement.appendChild(imgElement)
		figureElement.appendChild(figCaptationElement)
		//Ajout de la balise figure dans la div gallery //
		gallery.appendChild(figureElement)
	}
}

//* RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES CATÉGORIE //

//* Récupération des catégories sur le localStorage //
let category = window.localStorage.getItem('category')
//* Si pas présent récupération via l'API et stockage dans le localStorage //
if (category === null) {
	// Récupération via l'API Swagger //
	category = await fetch('http://localhost:5678/api/categories').then((category) => category.json())
	// Stockage dans le localStorag //
	const categoryValue = JSON.stringify(category)
	window.localStorage.setItem('category', categoryValue)
	// Sinon parse.works //
} else {
	category = JSON.parse(category)
	// ! PENSER À RÉACTUALISER LE LOCALSTORAGE SI RAJOUT D'UN WORK ET QUAND L'UTILISATEUR CLIC SUR LE FILTRE TOUS ! //
}

//? CRÉATION DES FILTRES //
// Création de la div et ajout de la class filters //
const divElement = document.createElement('div')
divElement.classList.add('filters')

// * Création du filtre Tous //
const filtersBtn = document.createElement('button')
filtersBtn.innerText = 'Tous'
filtersBtn.name = 'Tous'
divElement.appendChild(filtersBtn)

//* Boucle qui permet d'ajouter autant de bouton filtre qu'il a de catégorie dans le tableau category //
const filtersBtn = document.createElement('button')
for (let i = 0; i < category.length; i++) {
	// .replace permet de modifier Hotel par Hôtel //
	filtersBtn.innerText = category[i].name.replace(/Ho/g, 'Hô')
	// .replace permet de rechercher une string entre les deux slashs et le g exécute la recherche le deuxième argument remplace la string si trouvée //
	filtersBtn.name = `${category[i].name.replace(/ /g, '').replace(/&r/g, 'EtR')}`
	// Ajout du bouton[i] dans la divElement //
	divElement.appendChild(filtersBtn)
	//! Il faudrait modifier la base de donnée catégorie pour changer le nom de la catégorie "hotel & restaurants" par "Hôtel & restaurant" //
}
// Ajout de la divElement qui contient tous les filtre avant l'enfant .gallery //
document.querySelector('.gallery').before(divElement)

//* Récupération des noms de chaque catégories et stockage dans la const categoryName //
const categoryName = category.map((name) => name.name)
// Ajout au tableau la string Tous //
categoryName.push('Tous')
//* Écoute de chaque button filters //
const filtersBtns = document.querySelectorAll('.filters button')
// Écoute de l'ensemble des boutons filtre //
filtersBtns.forEach((button) => {
	button.addEventListener('click', (event) => {
		// récupération de l'évenement dans la variable filterName //
		let filterName = event.target.name
		// Remplacement si évenement de la string "Hôtel & restaurant" par la même string contenu dans le tableau //
		filterName = filterName.replace(/HotelsEtRestaurants/g, 'Hotels & restaurants')
		// Vérification que la string de l'évenement est bien présente dans le tableau categoryName et applique la fonction filterDeletAndDisplay //
		categoryName.includes(filterName) ? filterDeletAndDisplay(filterName) : console.log('erreur')
	})
})

//* Fonction qui permet de supprimer la gallery du DOM et de l'afficher de nouveau avec la liste filtrée //
function filterDeletAndDisplay(filterName) {
	if (filterName === 'Tous') {
		document.querySelector('.gallery').innerHTML = ''
		galleryGeneration(works)
	} else {
		const filteredWorks = works.filter((work) => work.category.name === filterName)
		document.querySelector('.gallery').innerHTML = ''
		galleryGeneration(filteredWorks)
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
}

//* Fonction qui permet de supprimer les filtres si l'utilisateur est connecté //
function disableFilters() {
	const filters = document.querySelector('main #portfolio .filters')
	filters.remove()
}

//* Récupération de l'id et du token et parse de manière à reconstruire l'objet en JavaScript //
const token = JSON.parse(window.sessionStorage.getItem('token'))
// Si le Id et le token sont différent d'une chaine de caractère vide alors //
if (token.userId !== '' && token.token !== '') {
	modficationHomePageUserLogIn()
	//Active la fonction qui permet de vérfier le temps d'inactivité de l'utilisateur //
	inactivityCheck()
}

//? GESTION DE LA DÉCONNEXION //
//* Supprime le token du sessionStorage et réactualise la page  //
function resetSession() {
	window.sessionStorage.removeItem('token')
	location.reload()
}
//* Gestion de la déconnexion au clic sur le btn logOut //
document.getElementById('logOut').addEventListener('click', () => {
	resetSession()
})

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

//? GESTION DE LA MODALE //
//* Écoute du clic sur le bouton "modifier" //
document.getElementById('edit-btn').addEventListener('click', () => {
	modalCreation('modalElementsDeletWork')
})
