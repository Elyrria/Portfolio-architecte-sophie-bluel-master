//? CRÉATION DE LA MODALE
//* Fuonction qui permet de créer la modale
export function modaleCreation(elementModal) {
	let modalDisplay = elementModal
	//Création de l'aside qui contiendra la modale
	const containeurModal = document.createElement('aside')
	containeurModal.id = 'modal'
	//! Element caché naturellement
	containeurModal.setAttribute('aria-hidden', 'true')
	//! A true quand la modale est active passer la valeur à true
	containeurModal.setAttribute('aria-modal', 'false')
	//* Est jumelé avec l'id sur le tire h2 de la modale utilisé
	containeurModal.setAttribute('aria-labelleby', 'title-modal1')
	containeurModal.role = 'dialog'
	//Création du wrapperModal
	const wrapperModal = document.createElement('div')
	wrapperModal.classList.add('modal-wrapper')
	//Création de la croix de fermeture de la modale
	const xMark = document.createElement('i')
	xMark.classList.add('fa-solid', 'fa-xmark')
	//Ajout de la croix de fermture dans le wrapperModal
	wrapperModal.appendChild(xMark)
	//Ajout de wrapperModal dans le conaineurModal
	containeurModal.appendChild(wrapperModal)
	document.querySelector('body').appendChild(containeurModal)

	if (modalDisplay === 'elementModal1') {
		elementsModal1()
	}
	// elementModal === 'elementModal1' ? elementsModal1() : elementsModal2()
}
//* Fonction qui permet de créer le contenu de la modale pour supprimer des travaux
function elementsModal1() {
	// Création du titre pour la modale de suppresion des travaux
	const h2Modal = document.createElement('h2')
	//* Id permet de lier le titre à l'attribut aria-labelleby de la modale pour la liseuse
	h2Modal.id = 'title-modal'
	h2Modal.innerText = 'Galerie photo'
	// Création d'une div gallery-modal qui contiendra la gallerie en CSS-grid
	const galleryModalContaineur = document.createElement('div')
	galleryModalContaineur.id = 'gallery-modal'
	//Création d'un <hr> pour la séparation de la partie gallery et du bouton
	const hrModal = document.createElement('hr')
	// Création d'un bouton pour passer à la modale d'ajout d'un travau
	const btnModal = document.createElement('button')
	btnModal.classList.add('button')
	btnModal.innerText = 'Ajouter une photo'
	// récupération de l'élément du DOM modal-wrapper
	const modalWrapper = document.querySelector('.modal-wrapper')
    //Ajout à cet élément les enfants ci-dessous
	modalWrapper.appendChild(h2Modal)
	modalWrapper.appendChild(galleryModalContaineur)
	modalWrapper.appendChild(hrModal)
	modalWrapper.appendChild(btnModal)
	//* Ajout de l'appel à la fonction qui permet d'ajouter tous les travaux à la modale
	galleryGeneration()
}

//* Fonction qui permet d'importer tous les travaux dans la modale
function galleryGeneration() {
	const works = JSON.parse(window.localStorage.getItem('works'))
	console.log(works)
	for (let i = 0; i < works.length; i++) {
		//Création d'une balise figure //
		const figureElement = document.createElement('figure')
		//Création de la balise img //
		const imgElement = document.createElement('img')
		imgElement.src = works[i].imageUrl
		//Ajout de la balise img la balise figure //
		figureElement.appendChild(imgElement)
		console.log(figureElement)
		//Ajout de la balise figure dans la div gallery //
		document.getElementById('gallery-modal').appendChild(figureElement)
	}
}
