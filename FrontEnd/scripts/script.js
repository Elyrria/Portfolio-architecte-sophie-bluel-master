//? Import des fonction nécessaire pour modifier la page d'accueil lors de la connexion de l'utilisateur //
import { modficationHomePageUserLogIn } from './logIn.js'

//* RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES TRAVAUX //
////* Récupération des travaux sur le localStorage ////
let works = window.localStorage.getItem('works')
//* Si pas présent récupération via l'API et stockage dans le localStorage //
if (works === null) {
	// Récupération via l'API Swagger //
	works = await fetch('http://localhost:5678/api/works').then((works) => works.json())
	// Stockage dans le localStorag //
	const worksValue = JSON.stringify(works)
	window.localStorage.setItem('works', worksValue)
	// Sinon parse.works
} else {
	works = JSON.parse(works)
	// ! PENSER À RÉACTUALISER LE LOCALSTORAGE SI RAJOUT D'UN WORK ! //
}

//* GÉNÉRATION DES TRAVAUX SUR LA PAGE D'ACCUEIL //
function galleryGeneration(works) {
	for (let i = 0; i < works.length; i++) {
		//Création d'une balise figure
		const figureElement = document.createElement('figure')
		//Création de la balise img
		const imgElement = document.createElement('img')
		imgElement.src = works[i].imageUrl
		//Création de la balise figcaptation
		const figCaptationElement = document.createElement('figcaptation')
		figCaptationElement.innerText = works[i].title
		//Ajout des balises img et figcaptation dans la balise figure
		figureElement.appendChild(imgElement)
		figureElement.appendChild(figCaptationElement)
		//Ajout de la balise figure dans la div gallery
		document.querySelector('.gallery').appendChild(figureElement)
	}
}
galleryGeneration(works)

//* RÉCUPÉRATION ET STOCKAGE DANS LE LOCAL STORAGE DES CATÉGORIE //

////* Récupération des catégories sur le localStorage ////
let category = window.localStorage.getItem('category')
//* Si pas présent récupération via l'API et stockage dans le localStorage //
if (category === null) {
	// Récupération via l'API Swagger //
	category = await fetch('http://localhost:5678/api/categories').then((category) => category.json())
	// Stockage dans le localStorag //
	const categoryValue = JSON.stringify(category)
	window.localStorage.setItem('category', categoryValue)
	// Sinon parse.works
} else {
	category = JSON.parse(category)
	// ! PENSER À RÉACTUALISER LE LOCALSTORAGE SI RAJOUT D'UN WORK ! //
}

//* CRÉATION DES FILTRES //
// Création de la div et ajout de la class filters //
const divElement = document.createElement('div')
divElement.classList.add('filters')

// * Création du filtre Tous //
const buttonFilter = document.createElement('button')
buttonFilter.innerText = 'Tous'
buttonFilter.name = 'Tous'
divElement.appendChild(buttonFilter)

//* Boucle qui permet d'ajouter autant de bouton filtre qu'il n'y a de catégorie dans le tableau category //
for (let i = 0; i < category.length; i++) {
	const buttonFilter = document.createElement('button')
	//.replace permet de modifier Hotel par Hôtel
	buttonFilter.innerText = category[i].name.replace(/Ho/g, 'Hô')
	//.replace permet de rechercher une string entre les deux slashs et le g exécute la recherche le deuxième argument remplace la string si trouvée //
	buttonFilter.name = `${category[i].name.replace(/ /g, '').replace(/&r/g, 'EtR')}`
	// Ajout du bouton[i] dans la divElement //
	divElement.appendChild(buttonFilter)
	//! Il faudrait modifier la base de donnée catégorie pour changer le nom de la catégorie "hotel & restaurants" par "Hôtel & restaurant"
}
// Ajout de la divElement qui contient tous les filtre avant l'enfant .gallery //
document.querySelector('.gallery').before(divElement)

//* ÉCOUTE DES ÉVENEMENTS AU CLIC DES BOUTONS FILTRES //

//* Récupération des noms de chaque catégories et stockage dans la const categoryName
const categoryName = category.map((name) => name.name)
//Ajout au tableau la string Tous
categoryName.push('Tous')
const btnsFilters = document.querySelectorAll('.filters button')
// Écoute de l'ensemble des boutons filtre
btnsFilters.forEach((button) => {
	button.addEventListener('click', (event) => {
		// récupération de l'évenement dans la variable filterName
		let filterName = event.target.name
		// Remplacement si évenement de la string "Hôtel & restaurant" par la même string contenu dans le tableau
		filterName = filterName.replace(/HotelsEtRestaurants/g, 'Hotels & restaurants')
		// Vérification que la string de l'évenement est bien présente dans le tableau categoryName et applique la fonction filterDeletAndDisplay
		categoryName.includes(filterName) ? filterDeletAndDisplay(filterName) : console.log('erreur')
	})
})
//* Fonction qui permet de supprimer la gallery du DOM et de l'afficher de nouveau avec la liste filtrée
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

// modficationHomePageUserLogIn()
