import { refreshWorks } from './script.js'
//? CRÉATION DE LA MODALE
//* Fonction qui permet de créer la modale
export function creationModal() {
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
	//Ajout de modalWrapper dans le conaineurModal //
	modalContaineur.appendChild(modalWrapper)
	document.querySelector('.gallery').before(modalContaineur)

	deletModalElement()
	addAriaHidden()
	creationSnackBar()
}
//* Fonction qui permet de créer une div dans la modale avec une flèche et une croix
function creatModalDivXMarkAndArrow() {
	//Création d'une div qui contiendra la xMark //
	const moadalDivXMark = document.createElement('div')
	moadalDivXMark.classList.add('iconsXMarkArrowReturn')
	//Création de la flèche de retour de la modale ajout élément //
	const modalArrowReturn = document.createElement('i')
	modalArrowReturn.classList.add('fa-solid', 'fa-arrow-left')
	modalArrowReturn.setAttribute('aria-hidden', 'true')
	//Création de la croix de fermeture de la modale //
	const modalXMark = document.createElement('i')
	modalXMark.classList.add('fa-solid', 'fa-xmark')
	modalXMark.setAttribute('aria-hidden', 'true')
	//Ajout de la flèche retour et de la croix dans leur conteneur //
	moadalDivXMark.appendChild(modalArrowReturn)
	moadalDivXMark.appendChild(modalXMark)
	//Ajout de la div qui contient la croix de fermture dans le modalWrapper //
	document.getElementById('title-modal').before(moadalDivXMark)
}

//* Fonction qui permet de fermer la modale //
function closeModal() {
	document.querySelector('#modal .fa-xmark').addEventListener('click', () => {
		document.getElementById('modal').remove()
		removeAriaHidden()
	})
	document.getElementById('modal').addEventListener('click', (e) => {
		// Permet d'éviter de fermer la modale si on clique dans l'enfant de la cide écoutée
		if (e.target === e.currentTarget) {
			document.getElementById('modal').remove()
			removeAriaHidden()
		}
	})
}
//* Fonction qui permet d'ajouter l'attribut aria-hidden à tous les éléments qui non pas besoin d'être visible quand la modale est ouverte //
function addAriaHidden() {
	//Ajout de l'attribut aria-hidden pour qu'il ne reste plus que la modale de visible pour les outils d'accésibilité
	//! Si je rajoute une class spécifique à tous ces éléments pour ne faire qu'une ligne ?
	document.querySelector('header').setAttribute('aria-hidden', true)
	document.querySelector('footer').setAttribute('aria-hidden', true)
	document.querySelector('.edit-mode').setAttribute('aria-hidden', true)
	document.getElementById('introduction').setAttribute('aria-hidden', true)
	document.getElementById('contact').setAttribute('aria-hidden', true)
	document.getElementById('user-modifications').setAttribute('aria-hidden', true)
	document.querySelector('.gallery').setAttribute('aria-hidden', true)
}

//* Fonction qui permet de supprimer l'attribut aria-hidden à tous les éléments qui non pas besoin d'être visible quand la modale est ouverte //
function removeAriaHidden() {
	//Sippression de l'attribut aria-hidden pour qu'il ne reste plus que la modale de visible pour les outils d'accésibilité
	//! Si je rajoute une class spécifique à tous ces éléments pour ne faire qu'une ligne ?
	document.querySelector('header').removeAttribute('aria-hidden', true)
	document.querySelector('footer').removeAttribute('aria-hidden', true)
	document.querySelector('.edit-mode').removeAttribute('aria-hidden', true)
	document.getElementById('introduction').removeAttribute('aria-hidden', true)
	document.getElementById('contact').removeAttribute('aria-hidden', true)
	document.getElementById('user-modifications').removeAttribute('aria-hidden', true)
	document.querySelector('.gallery').removeAttribute('aria-hidden', true)
}
//* Fonction qui permet de vider le containeur de la modale pour basculer d'une modale à l'autre //
function deleteModalContent() {
	const modalWrapper = document.querySelector('.modal-wrapper')
	modalWrapper.innerHTML = ''
}

function listenModalEvents() {
	const buttonAddPicture = document.querySelector('.modal-wrapper .add-picture')
	if (buttonAddPicture !== null) {
		buttonAddPicture.addEventListener('click', () => {
			deleteModalContent()
			addModalElement()
		})
	}
	const leftReturnArrow = document.querySelector('.show')
	if (leftReturnArrow !== null) {
		leftReturnArrow.addEventListener('click', () => {
			deleteModalContent()
			deletModalElement()
		})
	}
}

//* Fonction qui permet de créer le contenu de la modale pour supprimer des projets //
function deletModalElement() {
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
	modalBtn.classList.add('button', 'add-picture')
	modalBtn.innerText = 'Ajouter une photo'
	// récupération de l'élément du DOM modal-wrapper
	const modalWrapper = document.querySelector('.modal-wrapper')
	//Ajout à cet élément les enfants ci-dessous
	modalWrapper.appendChild(modalH2)
	modalWrapper.appendChild(modalGalleryContaineur)
	modalWrapper.appendChild(modalHr)
	modalWrapper.appendChild(modalBtn)
	creatModalDivXMarkAndArrow()
	//* Ajout de l'appel à la fonction qui permet d'ajouter tous les travaux à la modale //
	createModalGallery()
	//* Ajout de l'appel à la fonction qui permet d'écouter le click sur le bouton Ajouter une photo //
	listenModalEvents()
	closeModal()
}
//* Fonction qui permet d'afficher chaque projet la modale //
async function createModalGallery() {
	const works = JSON.parse(window.localStorage.getItem('works'))
	const modalGallery = document.getElementById('modal-gallery')
	modalGallery.innerHTML = ''
	for (let i = 0; i < works.length; i++) {
		const item = works[i]
		// Création d'une balise figure //
		const figureElement = document.createElement('figure')
		// Création de la balise img //
		const imgElement = document.createElement('img')
		imgElement.src = item.imageUrl
		imgElement.alt = `Photographie de Sophie Bluel : ${item.title}`
		// Création de la div qui va contenir l'icone poubelle //
		const divTrashIcon = document.createElement('div')
		divTrashIcon.classList.add('trash-icon')
		// Création du logo poubelle //
		const trashIcon = document.createElement('i')
		trashIcon.classList.add('fa-solid', 'fa-trash-can')
		trashIcon.setAttribute('aria-hidden', 'true')
		trashIcon.dataset.id = item.id
		// Ajout de l'icone poubelle dans son conteneur trashIcon //
		divTrashIcon.appendChild(trashIcon)
		// Ajout de la balise img et de la div contenant l'icone poubelle à la balise figure //
		figureElement.appendChild(imgElement)
		figureElement.appendChild(divTrashIcon)
		// Ajout de la balise figure dans la div gallery //
		modalGallery.appendChild(figureElement)
	}
	// Écoute d'évement sur chaque poubelle de la galerie
	const trash = document.querySelectorAll('.fa-trash-can')
	//Pour chaque élément contenu dans la constante trash ajoute un écouteur d'évenement
	for (let i = 0; i < trash.length; i++) {
		trash[i].addEventListener('click', (e) => {
			e.preventDefault()
			deletElement(trash[i].dataset.id)
		})
	}
}
//*Fonction qui permet de supprimer un travail //
//@param {number} trashElement
async function deletElement(trashElement) {
	const tokenData = JSON.parse(window.sessionStorage.getItem('token'))
	const token = `Bearer ${tokenData.token}`
	try {
		const response = await fetch(`http://localhost:5678/api/works/${trashElement}`, {
			method: 'DELETE',
			headers: {
				accept: '*/*',
				Authorization: token,
			},
		})
		if (!response.ok) {
			//Gérer l'erreur ici
			throw new Error(`HTTP ${response.status}`)
		} else if (response.ok) {
			await refreshWorks(true)
			await createModalGallery() //
			showMessageSnackbBar('Élément supprimé')
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error)
	}
}
//* Fonction qui permet de créer le contenu de la modale pour ajouter des projets //
function addModalElement() {
	const modalH2 = document.createElement('h2')
	//* Id permet de lier le titre à l'attribut aria-labelleby de la modale pour la liseuse //
	modalH2.id = 'title-modal'
	modalH2.innerText = 'Ajout photo'
	//Création d'un <hr> pour la séparation du formulaire et du bouton //
	const modalHr = document.createElement('hr')
	// Création d'un bouton pour valider l'envoi d'un fichier //
	const modalBtn = document.createElement('button')
	modalBtn.classList.add('button')
	modalBtn.innerText = 'Valider'
	// Récupération de l'élément du DOM modal-wrapper //
	const modalWrapper = document.querySelector('.modal-wrapper')
	// Ajout à cet élément les enfants ci-dessous //
	modalWrapper.appendChild(modalH2)
	modalWrapper.appendChild(modalHr)
	modalWrapper.appendChild(modalBtn)
	// Appel de la fonction qui va permetre de créer le formulaire //
	createFormAddElement()
	// Appel de la fonction qui va créer la div contenant la flèche de retour et la croix de fermeture //
	creatModalDivXMarkAndArrow()
	// Affichage de la flèche de retour qui était en visibilty : hidden //
	const leftArrow = document.querySelector('.fa-arrow-left')
	leftArrow.classList.add('show')
	// Fonction qui va permettre d'écouter la flèche de retour //
	listenModalEvents()
	// Fonction qui permet de fermer la modale avec un click sur la croix ou en dehors de la modale //
	closeModal()
}
//* Fonction qui permet de créer le formulaire dans la mmodale pour ajouter un projet //
function createFormAddElement() {
	const modalForm = document.createElement('form')
	modalForm.classList.add('form-style')
	modalForm.id = 'modal-form'
	modalForm.action = '#'
	modalForm.method = 'post'

	document.querySelector('.modal-wrapper hr').before(modalForm)

	creatInputAddPictureElement()
	creatInputTitleElement()
	//Récupération du localStorage des catégories
	const categories = JSON.parse(window.localStorage.getItem('categories'))
	creatSelectCategoriesElement(categories)
	creatContaineurSelectAndListOption(categories)
	manageSelectInteraction()
}

// * Fonction qui permet de créer l'input pour ajouter une photos au nouveau projet //
function creatInputAddPictureElement() {
	const inputImg = document.createElement('input')
	inputImg.classList.add('input-image')
	const modalForm = document.getElementById('modal-form')
	modalForm.appendChild(inputImg)
}

// * Fonction qui permet de créer l'input pour ajouter un titre au nouveau projet //
function creatInputTitleElement() {
	const labelInputTitle = document.createElement('label')
	labelInputTitle.innerText = 'Titre'
	labelInputTitle.classList.add('label-style')
	labelInputTitle.for = 'title'
	const inputTitle = document.createElement('input')
	inputTitle.classList.add('input-style')
	inputTitle.setAttribute('type', 'text')
	inputTitle.id = 'title'
	inputTitle.name = 'title'
	inputTitle.setAttribute('requierd', '')

	const modalForm = document.getElementById('modal-form')
	modalForm.appendChild(labelInputTitle)
	modalForm.appendChild(inputTitle)
}

// * Fonction qui permet de créer le select pour choisir une des catégories pour le  nouveau projet //
//? Paramètre [array] type string
function creatSelectCategoriesElement(categories) {
	const labelSelectCategories = document.createElement('label')
	labelSelectCategories.innerText = 'Catégorie'
	labelSelectCategories.classList.add('label-style')
	labelSelectCategories.for = 'categories'
	const selectCategories = document.createElement('select')
	selectCategories.classList.add('input-style')
	selectCategories.id = 'categories'
	selectCategories.name = 'categories'
	selectCategories.setAttribute('requierd', '')
	// Création des options pour chaque catégorie du tableau categories
	for (let category of categories) {
		const selectOption = document.createElement('option')
		const valueOption = category.name
		// const valueOption = category.name.replace(/ /g, '').replace(/&r/g, 'EtR')
		const textOption = category.name.replace(/Ho/g, 'Hô')
		selectOption.value = valueOption
		selectOption.innerText = textOption
		selectCategories.appendChild(selectOption)
	}

	const modalForm = document.getElementById('modal-form')
	modalForm.appendChild(labelSelectCategories)
	modalForm.appendChild(selectCategories)
}
//* Fonction qui permet de créer la fausse liste de séléction
//? Paramètre [array] type string
function creatContaineurSelectAndListOption(categories) {
	const containeurSelect = document.createElement('div')
	containeurSelect.classList.add('custom-select')
	const spanSelectOption = document.createElement('span')
	spanSelectOption.classList.add('selected-option')
	const ulOptions = document.createElement('ul')
	ulOptions.classList.add('options')

	for (let i = 0; i < categories.length; i++) {
		const li = document.createElement('li')
		li.setAttribute('data-value', `${categories[i].name}`)
		li.innerText = `${categories[i].name}`
		ulOptions.appendChild(li)
	}

	// Récupération de la balise Select pour l'introduire dans la div custom-select //
	const realSelect = document.getElementById('categories')
	// spanSelectOption.appendChild(chevronDown)
	containeurSelect.appendChild(spanSelectOption)
	containeurSelect.appendChild(ulOptions)
	containeurSelect.appendChild(realSelect)
	document.getElementById('modal-form').appendChild(containeurSelect)
}
//* Fonction qui gére l'affichage du faux select et qui modifie la value du vrai select //
//! Voir pour raccourcir la fonction
function manageSelectInteraction() {
	//Sécléction des différents éléments nécessaires pour gérer l'affichage //
	const modalForm = document.getElementById('modal-form')
	const customSelect = document.querySelector('.custom-select')
	const selectedOption = customSelect.querySelector('.selected-option')
	const optionList = customSelect.querySelector('.options')
	const realSelect = customSelect.querySelector('#categories')
	// Création de l'icone chevron vers le bas //
	const chevronDown = document.createElement('i')
	chevronDown.classList.add('fa-solid', 'fa-chevron-down')
	selectedOption.appendChild(chevronDown)
	// Création de l'icone trois barres //
	const barsOpen = document.createElement('i')
	barsOpen.classList.add('fa-solid', 'fa-bars')

	selectedOption.addEventListener('click', () => {
		optionList.style.display = optionList.style.display === 'block' ? 'none' : 'block'
		chevronDown.style.visibility = 'hidden'
		modalForm.style.marginBottom = '180px'
		selectedOption.appendChild(barsOpen)
		barsOpen.style.visibility = 'visible'
	})
	optionList.addEventListener('click', (event) => {
		if (event.target && event.target.tagName === 'LI') {
			selectedOption.textContent = event.target.textContent
			// Ajout de l'icone avec leur valeur car il est supprimé
			selectedOption.appendChild(chevronDown)
			realSelect.value = event.target.getAttribute('data-value')
			optionList.style.display = 'none'
			modalForm.style.marginBottom = '30px'
			chevronDown.style.visibility = 'visible'
			barsOpen.style.visibility = 'hidden'
		}
	})

	document.addEventListener('click', (event) => {
		if (event.target !== selectedOption) {
			optionList.style.display = 'none'
			modalForm.style.marginBottom = '30px'
			chevronDown.style.visibility = 'visible'
			barsOpen.style.visibility = 'hidden'
		}
	})
}

//* Fonction qui permet de créer la snack barre lorsque la modale est présente
function creationSnackBar() {
	const divSnackBar = document.getElementById('snackbar')
	if (divSnackBar === null) {
		const elementSnackBar = document.createElement('div')
		elementSnackBar.id = 'snackbar'
		document.querySelector('body').appendChild(elementSnackBar)
	}
}
// Fonction qui permet d'afficher un message lorsque un élément est supprié ou rajouté
//? Paramètre type string : le message à afficher (suppression ou ajout)
function showMessageSnackbBar(message) {
	const divSnackBar = document.getElementById('snackbar')
	divSnackBar.innerText = `${message}`
	divSnackBar.classList.add('show')
	setTimeout(() => {
		divSnackBar.classList.remove('show')
	}, 2000)
}
