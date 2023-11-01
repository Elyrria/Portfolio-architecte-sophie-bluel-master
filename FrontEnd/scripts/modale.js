//? CRÉATION DE LA MODALE
//* Fonction qui permet de créer la modale
export function modalCreation(elementModal) {
	let modalDisplay = elementModal
	//Création de l'aside qui contiendra la modale
	const modalContaineur = document.createElement('aside')
	modalContaineur.id = 'modal'
	modalContaineur.setAttribute('aria-modal', 'true')
	//* Est jumelé avec l'id sur le tire h2 de la modale utilisé
	modalContaineur.setAttribute('aria-labelleby', 'title-modal')
	modalContaineur.role = 'dialog'
	//Création du modalWrapper
	const modalWrapper = document.createElement('div')
	modalWrapper.classList.add('modal-wrapper')
	//Création d'une div qui contiendra la xMark
	const moadalDivXMark = document.createElement('div')
	moadalDivXMark.classList.add('iconsXMarkArrowReturn')
	//Création de la flèche de retour de la modale ajout travau
	const modalArrowReturn = document.createElement('i')
	modalArrowReturn.classList.add('fa-solid', 'fa-arrow-left')
	modalArrowReturn.setAttribute('aria-hidden', 'true')
	//Création de la croix de fermeture de la modale
	const modalXMark = document.createElement('i')
	modalXMark.classList.add('fa-solid', 'fa-xmark')
	modalXMark.setAttribute('aria-hidden', 'true')
	//Ajout de la flèche retour et de la croix dans leur conteneur
	moadalDivXMark.appendChild(modalArrowReturn)
	moadalDivXMark.appendChild(modalXMark)
	//Ajout de la div qui contient la croix de fermture dans le modalWrapper
	modalWrapper.appendChild(moadalDivXMark)
	//Ajout de modalWrapper dans le conaineurModal
	modalContaineur.appendChild(modalWrapper)
	document.querySelector('.gallery').before(modalContaineur)

	if (modalDisplay === 'modalElementsDeletWork') {
		modalElementsDeletWork()
	}
	// elementModal === 'elementModal1' ? modalElements1() : modalElements2()
	addAttributAriaHidden()
	modalClosure()
}

//* Fonction qui permet de créer le contenu de la modale pour supprimer des travaux
function modalElementsDeletWork() {
	// Création du titre pour la modale de suppresion des travaux
	const modalH2 = document.createElement('h2')
	//* Id permet de lier le titre à l'attribut aria-labelleby de la modale pour la liseuse
	modalH2.id = 'title-modal'
	modalH2.innerText = 'Galerie photo'
	// Création d'une div modal-gallery qui contiendra la gallerie en CSS-grid
	const modalGalleryContaineur = document.createElement('div')
	modalGalleryContaineur.id = 'modal-gallery'
	//Création d'un <hr> pour la séparation de la partie gallery et du bouton
	const modalHr = document.createElement('hr')
	// Création d'un bouton pour passer à la modale d'ajout d'un travau
	const modalBtn = document.createElement('button')
	modalBtn.classList.add('button')
	modalBtn.innerText = 'Ajouter une photo'
	// récupération de l'élément du DOM modal-wrapper
	const modalWrapper = document.querySelector('.modal-wrapper')
	//Ajout à cet élément les enfants ci-dessous
	modalWrapper.appendChild(modalH2)
	modalWrapper.appendChild(modalGalleryContaineur)
	modalWrapper.appendChild(modalHr)
	modalWrapper.appendChild(modalBtn)
	//* Ajout de l'appel à la fonction qui permet d'ajouter tous les travaux à la modale
	modalGalleryGeneration()
}
//* Fonction qui permet d'ajouter l'attribut aria-hidden à tous les éléments qui non pas besoin d'être visible quand la modale est ouverte
function addAttributAriaHidden() {
	//Ajout de l'attribut aria-hidden pour qu'il ne reste plus que la modale de visible pour les outils d'accésibilité
	//! Si je rajoute une class spécifique à tous ces éléments pour ne faire qu'un ligne ?
	document.querySelector('header').setAttribute('aria-hidden', true)
	document.querySelector('footer').setAttribute('aria-hidden', true)
	document.querySelector('.edit-mode').setAttribute('aria-hidden', true)
	document.getElementById('introduction').setAttribute('aria-hidden', true)
	document.getElementById('contact').setAttribute('aria-hidden', true)
	document.getElementById('user-modifications').setAttribute('aria-hidden', true)
	document.querySelector('.gallery').setAttribute('aria-hidden', true)
}

//* Fonction qui permet de supprimer l'attribut aria-hidden à tous les éléments qui non pas besoin d'être visible quand la modale est ouverte
function removeAttributAriaHidden() {
	//Sippression de l'attribut aria-hidden pour qu'il ne reste plus que la modale de visible pour les outils d'accésibilité
	//! Si je rajoute une class spécifique à tous ces éléments pour ne faire qu'un ligne ?
	document.querySelector('header').removeAttribute('aria-hidden', true)
	document.querySelector('footer').removeAttribute('aria-hidden', true)
	document.querySelector('.edit-mode').removeAttribute('aria-hidden', true)
	document.getElementById('introduction').removeAttribute('aria-hidden', true)
	document.getElementById('contact').removeAttribute('aria-hidden', true)
	document.getElementById('user-modifications').removeAttribute('aria-hidden', true)
	document.querySelector('.gallery').removeAttribute('aria-hidden', true)
}

//* Fonction qui permet d'importer tous les travaux dans la modale
function modalGalleryGeneration() {
	const works = JSON.parse(window.localStorage.getItem('works'))
	console.log(works)
	for (let i = 0; i < works.length; i++) {
		// Création d'une balise figure //
		const figureElement = document.createElement('figure')
		// Création de la balise img //
		const imgElement = document.createElement('img')
		imgElement.src = works[i].imageUrl
		// Création de la div qui va contenir l'icone poubelle //
		const divTrashIcon = document.createElement('div')
		divTrashIcon.classList.add('trash-icon')
		// Création du logo poubelle //
		const trashIcon = document.createElement('i')
		trashIcon.classList.add('fa-solid', 'fa-trash-can')
		trashIcon.setAttribute('aria-hidden', 'true')
		// Ajout de l'icone poubelle dans son conteneur trashIcon //
		divTrashIcon.appendChild(trashIcon)
		// Ajout de la balise img et de la div contenant l'icone poubelle à la balise figure //
		figureElement.appendChild(imgElement)
		figureElement.appendChild(divTrashIcon)
		// Ajout de la balise figure dans la div gallery //
		document.getElementById('modal-gallery').appendChild(figureElement)
	}
}

export function modalClosure() {
	document.querySelector('#modal .modal-wrapper .iconsXMarkArrowReturn .fa-xmark').addEventListener(
		'click',
		() => {
			document.getElementById('modal').remove()
			removeAttributAriaHidden()
		}
	)
	document.getElementById('modal').addEventListener('click', (e) => {
		// Permet d'éviter de fermer la modale si on clique dans l'enfant de la cide écoutée 
		if (e.target === e.currentTarget) {
			document.getElementById('modal').remove()
			removeAttributAriaHidden()
		}
	})
}
//! Rajourer les aria pour chaque logo de la bibliothèque fontAwsome
//Créer une fonction qui ferme la modale et l'importer sur script.js avec un ecouteur d'évenement sur la croix et l'extérieur de la modal
