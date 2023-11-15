import { refreshWorks } from './script.js' // Import de la fonction refreshWorks qui permet d'actualiser le localStorage (works) //
//! CRÉATION ET GESTION DE LA MODALE //
//* Fonction qui permet de créer la modale
export function creatModal() {
	const modalContaineur = document.createElement('aside') // Création de l'aside qui contiendra la modale //
	modalContaineur.id = 'modal'
	modalContaineur.setAttribute('aria-modal', 'true')
	modalContaineur.setAttribute('aria-labelleby', 'title-modal') // Est jumelé avec l'id sur le tire h2 de la modale utilisé
	modalContaineur.role = 'dialog'

	const modalWrapper = document.createElement('div') // Création du modalWrapper //
	modalWrapper.classList.add('modal-wrapper')
	modalContaineur.appendChild(modalWrapper) // Ajout de modalWrapper dans le conaineurModal //

	document.querySelector('.gallery').before(modalContaineur)

	deleteProjectModal() // Affichage du contenu de la modale de suppression des projets //
	addAriaHidden() // Ajout des attributs aria-hidden pour l'accésibilité //
	creationSnackBar() // Création de la SnackBar à afficher lors de la suppression et ajout d'un projet //
	closeModalOutside() // Ajout d'écouteur d'évenement à l'extérieur de la modal pour la fermeture //
}
//* Fonction qui permet de créer une div dans la modale avec une flèche et une croix
function creatModalDivXMarkAndArrow() {
	const moadalDivXMark = document.createElement('div') // Création d'une div qui contiendra la xMark //
	moadalDivXMark.classList.add('iconsXMarkArrowReturn')

	const modalArrowReturn = document.createElement('i') // Création de la flèche de retour de la modale ajout élément //
	modalArrowReturn.classList.add('fa-solid', 'fa-arrow-left')
	modalArrowReturn.setAttribute('aria-hidden', 'true')

	const modalXMark = document.createElement('i') // Création de la croix de fermeture de la modale //
	modalXMark.classList.add('fa-solid', 'fa-xmark')
	modalXMark.setAttribute('aria-hidden', 'true')

	moadalDivXMark.appendChild(modalArrowReturn) // Ajout de la flèche retour et de la croix dans leur conteneur //
	moadalDivXMark.appendChild(modalXMark)

	document.getElementById('title-modal').before(moadalDivXMark) // Ajout de la div qui contient la croix de fermture dans le modalWrapper //
}

//* Fonction qui permet de fermer la modale //
function closeModalOutside() {
	document.getElementById('modal').addEventListener('click', (e) => {
		// Supprime la modale si l'utilisateur click en dehors //
		if (e.target === e.currentTarget) {
			// Permet d'éviter de fermer la modale si on clique dans l'enfant de la cide écoutée
			document.getElementById('modal').remove() // Suppression de la modale //
			removeAriaHidden() // Suppresion des attributs aria-hidden //
		}
	})
}

function closeModalCross() {
	document.querySelector('#modal .fa-xmark').addEventListener('click', () => {
		// Supprime la modale si click su la croix de fermeture //
		document.getElementById('modal').remove() // Suppression de la modale //
		removeAriaHidden() // Suppresion des attributs aria-hidden //
	})
}
//* Fonction qui permet d'ajouter l'attribut aria-hidden à tous les éléments qui non pas besoin d'être visible quand la modale est ouverte //
function addAriaHidden() {
	//Ajout de l'attribut aria-hidden pour qu'il ne reste plus que la modale de visible pour les outils d'accésibilité
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
	document.querySelector('header').removeAttribute('aria-hidden', true)
	document.querySelector('footer').removeAttribute('aria-hidden', true)
	document.querySelector('.edit-mode').removeAttribute('aria-hidden', true)
	document.getElementById('introduction').removeAttribute('aria-hidden', true)
	document.getElementById('contact').removeAttribute('aria-hidden', true)
	document.getElementById('user-modifications').removeAttribute('aria-hidden', true)
	document.querySelector('.gallery').removeAttribute('aria-hidden', true)
}

//! SWITCH ENTRE MODALE //
//* Fonction qui permet de vider le containeur de la modale pour basculer d'une modale à l'autre //
function deleteModalContent() {
	const modalWrapper = document.querySelector('.modal-wrapper') // Récupération de le l'élément du DOM modal-wrapper //
	modalWrapper.innerHTML = '' // Ajout d'une chaîne vide à l'élément pour le vider //
}
//* Fonction qui permet d'écouter un évenement pour passer à la modale d'ajout et de retourner à la modale de suppression
function listenModalEvents() {
	const buttonAddPicture = document.querySelector('.modal-wrapper .add-picture') // Récupération de l'élément du DOM add-picture de type button //

	if (buttonAddPicture !== null) {
		// Si l'élément séléctionné est différent de null alors ajoute un écouteur d'événement sur le bouton //
		buttonAddPicture.addEventListener('click', () => {
			deleteModalContent() // Supprime le contenue de la modale en utilisation //
			addModalProject() // Créer la modale d'ajout de projet //
		})
	}
	const leftReturnArrow = document.querySelector('.show') // Récupération de l'élément du DOM show de type i //

	if (leftReturnArrow !== null) {
		// Si l'élément séléctionné est différent de null alors ajoute un écouteur d'événement sur la fléche //
		leftReturnArrow.addEventListener('click', () => {
			deleteModalContent() // Supprime le contenue de la modale en utilisation //
			deleteProjectModal() // Créer la modale de suppresion de projet //
		})
	}
}

//! SNACKBAR SUPPRESSION ET AJOUT DE PROJET !//
//* Fonction qui permet de créer la snack barre lorsque la modale est présente //
function creationSnackBar() {
	const divSnackBar = document.getElementById('snackbar') // Récupération de l'élément du DOM snackbar //
	if (divSnackBar === null) {
		// Si divSnackBar est strictement égal à null alors on le creait //
		const elementSnackBar = document.createElement('div') // Création d'une div qui sera le containeur pour la snackBar //
		elementSnackBar.id = 'snackbar'
		document.querySelector('body').appendChild(elementSnackBar)
	}
}
// Fonction qui permet d'afficher un message lorsque un élément est supprié ou rajouté
//? Paramètre type string : le message à afficher (suppression ou ajout) //
function showMessageSnackbBar(message) {
	const divSnackBar = document.getElementById('snackbar') // Récupération de la snackBar //
	divSnackBar.innerText = `${message}` // Affichage du message //
	divSnackBar.classList.add('show') // Ajout de la class show qui permet de rendre visible la snackBar //
	// Ajout d'un timmer qui permet l'affichage progressif pendant 2 seconde avant de retirer la class show //
	setTimeout(() => {
		divSnackBar.classList.remove('show')
	}, 2000)
}

//! MODALE SUPPRESSION DE PROJET !//
//* Fonction qui permet de créer le contenu de la modale pour supprimer des projets //
function deleteProjectModal() {
	const modalH2 = document.createElement('h2') // Création du titre pour la modale de suppresion des travaux //
	modalH2.id = 'title-modal' // l'id permet de lier le titre à l'attribut aria-labelleby de la modale pour la liseuse //
	modalH2.innerText = 'Galerie photo'

	const modalGalleryContaineur = document.createElement('div') // Création d'une div modal-gallery qui contiendra la gallerie en CSS-grid //
	modalGalleryContaineur.id = 'modal-gallery'

	const modalHr = document.createElement('hr') //Création d'un <hr> pour la séparation de la partie gallery et du bouton //

	const modalBtn = document.createElement('button') // Création d'un bouton pour passer à la modale d'ajout d'un travau //
	modalBtn.classList.add('button', 'add-picture')
	modalBtn.innerText = 'Ajouter une photo'

	const modalWrapper = document.querySelector('.modal-wrapper') // Récupération de l'élément du DOM modal-wrapper //
	modalWrapper.appendChild(modalH2)
	modalWrapper.appendChild(modalGalleryContaineur)
	modalWrapper.appendChild(modalHr)
	modalWrapper.appendChild(modalBtn)

	creatModalDivXMarkAndArrow() // Ajout de la div contenant la flèche retour et la croix de fermeture //
	createModalGallery() // Ajout de la gallerie pour la suppression des projets //
	listenModalEvents() // Ajout des écouteurs d'événement qui permettront de switcher entre les modales //
	closeModalCross() // Ajout d'un écouteur d'évévenemnt sur la croix de fermeture de la modale //
}
//* Fonction qui permet d'afficher chaque projet la modale //
async function createModalGallery() {
	const works = JSON.parse(window.localStorage.getItem('works')) // Récupération des objets works dans le localStorage //

	const modalGallery = document.getElementById('modal-gallery') // Récupération de l'élément du DOM dans lequel sera affiché la galerie //

	modalGallery.innerHTML = '' // Vide l'élémenent pour être sur qu'il n'y ai pas de doublont //

	for (let i = 0; i < works.length; i++) {
		// Itération pour chaque élément du tableau //
		const item = works[i] // Stockage dans une variable item de l'élément //

		const figureElement = document.createElement('figure') // Création d'une balise figure //

		const imgElement = document.createElement('img') // Création de la balise img //
		imgElement.src = item.imageUrl
		imgElement.alt = `Photographie de Sophie Bluel : ${item.title}`

		const divTrashIcon = document.createElement('div') // Création de la div qui va contenir l'icone poubelle //
		divTrashIcon.classList.add('trash-icon')

		const trashIcon = document.createElement('i') // Création du logo poubelle //
		trashIcon.classList.add('fa-solid', 'fa-trash-can')
		trashIcon.setAttribute('aria-hidden', 'true')
		trashIcon.dataset.id = item.id

		divTrashIcon.appendChild(trashIcon) // Ajout de l'icone poubelle dans son conteneur trashIcon //

		figureElement.appendChild(imgElement) // Ajout de la balise img et de la div contenant l'icone poubelle à la balise figure //
		figureElement.appendChild(divTrashIcon)

		modalGallery.appendChild(figureElement) // Ajout de la balise figure dans la div gallery //
	}

	const trash = document.querySelectorAll('.fa-trash-can') // Récupération de tous les icones poubelles //
	for (let i = 0; i < trash.length; i++) {
		//Pour chaque élément contenu dans la constante trash ajoute un écouteur d'évenement //
		trash[i].addEventListener('click', (e) => {
			e.preventDefault() // Supprime le rafraichissement automatique de la page //
			deletProjet(trash[i].dataset.id) // Appel de la fonction qui va permettre de supprimer un projet de la base de données et envoi de son id à la fonction //
		})
	}
}
//*Fonction qui permet de supprimer un projet de la base de données //
//? Paramètre type number : id du trashElement //
async function deletProjet(trashElement) {
	const tokenData = JSON.parse(window.sessionStorage.getItem('token')) // Récupération du token dans le sessionStorage //
	const token = `Bearer ${tokenData.token}` // Stockage du token dans la variable token //
	try {
		const response = await fetch(`http://localhost:5678/api/works/${trashElement}`, {
			method: 'DELETE',
			headers: {
				accept: '*/*',
				Authorization: token,
			},
		})
		if (!response.ok) {
			// Gére l'erreur ici //
			throw new Error(`HTTP ${response.status}`)
		} else if (response.ok) {
			await refreshWorks(true) // Force le rafraichissement du localStorage //
			await createModalGallery() // Force la mise à jour de la galerie avec le projet en moins //
			showMessageSnackbBar('Élément supprimé') // Affiche le message élément supprimé dans la snackBar //
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error) // Affiche le message d'erreur dans la console avec le status de la requète //
	}
}

//! MODALE AJOUT DE PROJET !//
//* Fonction qui permet de créer le contenu de la modale pour ajouter des projets //
function addModalProject() {
	const modalH2 = document.createElement('h2')
	modalH2.id = 'title-modal' // Id permet de lier le titre à l'attribut aria-labelleby de la modale pour la liseuse //
	modalH2.innerText = 'Ajout photo'

	const modalHr = document.createElement('hr') //Création d'un <hr> pour la séparation du formulaire et du bouton //

	const modalBtn = document.createElement('button') // Création d'un bouton pour valider l'envoi d'un fichier //
	modalBtn.classList.add('button')
	modalBtn.id = 'submit-button'
	modalBtn.innerText = 'Valider'

	const modalWrapper = document.querySelector('.modal-wrapper') // Récupération de l'élément du DOM modal-wrapper //
	modalWrapper.appendChild(modalH2)
	modalWrapper.appendChild(modalHr)
	modalWrapper.appendChild(modalBtn)

	createFormAddElement() // Appel de la fonction qui va permetre de créer le formulaire //
	creatModalDivXMarkAndArrow() // Ajout de la div contenant la flèche retour et la croix de fermeture //

	const leftArrow = document.querySelector('.fa-arrow-left') // Affichage de la flèche de retour qui était en visibilty : hidden //
	leftArrow.classList.add('show')

	listenModalEvents() // Ajout des écouteurs d'événement qui permettront de switcher entre les modales //
	closeModalCross() // Ajout d'un écouteur d'évévenemnt sur la croix de fermeture de la modale //
	ListenEventForm() // Ajout des écouteurs d'événement qui vont permettre de vérifier le changement de chaque champs du formulaire //
}
//* Fonction qui permet de créer le formulaire dans la mmodale pour ajouter un projet //
function createFormAddElement() {
	const modalForm = document.createElement('form') // Création de la balise form //
	modalForm.classList.add('form-style')
	modalForm.id = 'modal-form'
	modalForm.action = '#'
	modalForm.method = 'post'

	const divInputFile = document.createElement('div') // Création d'une div qui va contenir les différents éléments de l'input files //
	divInputFile.classList.add('containeur-input-files')

	const spanErrorMessage = document.createElement('span') // Création d'un span permettant d'afficher une erreur en rapport avec l'input file //
	spanErrorMessage.id = 'error-message-files'

	modalForm.appendChild(divInputFile)
	modalForm.appendChild(spanErrorMessage)

	document.querySelector('.modal-wrapper hr').before(modalForm)

	creatInputFile() // Ajout de l'input type files //
	creatInputTitleElement() // Ajout de l'input type text //

	const categories = JSON.parse(window.localStorage.getItem('categories')) // Récupération du localStorage des catégories //

	creatSelectfField(categories) // Ajout du select field avec comme paramètre les catégories du localStorage //
	creatCustomSelectfField(categories) // Ajout du select field custom avec comme paramètre les catégories du localStorage //
	manageSelectInteraction() // Ajout de la gestion du select field et du select field custom //
	checkFormValidity() // Ajout de la vérification des champs du formulaire //
}

// * Fonction qui permet de créer l'input pour ajouter une photos au nouveau projet //
function creatInputFile() {
	const containeurLabelInput = document.createElement('div') // Création du containeur de l'input type file //
	containeurLabelInput.classList.add('containeur-label-input')

	const labelInputFile = document.createElement('label') // Création du label de l'input //
	labelInputFile.classList.add('label-input-file')
	labelInputFile.setAttribute('for', 'input-file')

	const iconInputFile = document.createElement('i') // Création de l'icone image de l'input //
	iconInputFile.classList.add('fa-regular', 'fa-image')
	iconInputFile.setAttribute('aria-hidden', true)

	const spanInputFileText = document.createElement('span') // Création d'un span message "ajouter photo" pour l'input //
	spanInputFileText.innerHTML = '+ Ajouter photo'
	spanInputFileText.classList.add('span-input-file-text')

	const spanInputFileSizeMax = document.createElement('span') // Création d'un span pour afficher les conditions  //
	spanInputFileSizeMax.classList.add('span-input-file-size')
	spanInputFileSizeMax.innerText = 'jpg, png : 4mo max'

	const inputFile = document.createElement('input') // Création de l'input //
	inputFile.type = 'file'
	inputFile.id = 'input-file'
	inputFile.accept = '.jpg,.png'
	inputFile.setAttribute('requierd', '')

	const image = document.createElement('img') // Création d'une balise img qui contiendra la photo une fois chargé //
	image.src = '#'
	image.alt = ''
	image.id = 'preview-image'

	labelInputFile.appendChild(iconInputFile)
	labelInputFile.appendChild(spanInputFileText)
	labelInputFile.appendChild(spanInputFileSizeMax)

	containeurLabelInput.appendChild(labelInputFile)
	containeurLabelInput.appendChild(inputFile)

	const containeurInputFiles = document.querySelector('.containeur-input-files') // Récupération de l'élément du DOM containeur-input-file pour y introduire les différents éléments //
	containeurInputFiles.appendChild(containeurLabelInput)
	containeurInputFiles.appendChild(image)

	previewPicture() // Ajoute la gestion d'affichage de l'image une fois insérée dans l'input //
}

// * Fonction qui permet de créer l'input pour ajouter un titre au nouveau projet //
function creatInputTitleElement() {
	const labelInputTitle = document.createElement('label') // Création du abel de l'input type texte //
	labelInputTitle.innerText = 'Titre'
	labelInputTitle.classList.add('label-style')
	labelInputTitle.setAttribute('for', 'input-title')

	const inputTitle = document.createElement('input') // Création de l'input //
	inputTitle.classList.add('input-style')
	inputTitle.setAttribute('type', 'text')
	inputTitle.id = 'input-title'
	inputTitle.name = 'input-title'
	inputTitle.setAttribute('requierd', '')

	const modalForm = document.getElementById('modal-form') // Récupération de l'élément du DOM modal-form pour y insérer l'input type text et son label //
	modalForm.appendChild(labelInputTitle)
	modalForm.appendChild(inputTitle)
}

// * Fonction qui permet de créer le select pour choisir une des catégories pour le  nouveau projet //
//? Paramètre [array] type string //
function creatSelectfField(categories) {
	const labelSelectCategories = document.createElement('label') // Création du label du select field //
	labelSelectCategories.innerText = 'Catégorie'
	labelSelectCategories.classList.add('label-style')
	labelSelectCategories.setAttribute('for', 'select-field')

	const selectCategories = document.createElement('select') // Création du select //
	selectCategories.classList.add('input-style')
	selectCategories.id = 'select-field'
	selectCategories.name = 'select-field'
	selectCategories.setAttribute('requierd', '')

	const selectOptionDisabled = document.createElement('option') // Création de l'options "vide" du select qui sera focus des sont chargement //
	selectOptionDisabled.setAttribute('selected', '')
	selectOptionDisabled.setAttribute('disabled', '')
	selectCategories.appendChild(selectOptionDisabled)

	let compteur = 1 // Initialisation d'un compteur à 1 //
	for (let i = 0; i < categories.length; i++) {
		// Itération de la création des options pour chaque catégorie du tableau categories //
		const item = categories[i] // Stockage de la categorie dans la variale item //
		const selectOption = document.createElement('option') // Création d'une balise option //
		const valueOption = compteur
		compteur++ // A chaque tour de boucle incrémente 1 //

		const textOption = item.name.replace(/Ho/g, 'Hô') // Remplace si Ho par Hô //
		selectOption.value = valueOption
		selectOption.innerText = textOption
		selectCategories.appendChild(selectOption)
	}
	const modalForm = document.getElementById('modal-form') // Récupération de l'élément du DOM modal-form pour y ajouter le select //
	modalForm.appendChild(labelSelectCategories)
	modalForm.appendChild(selectCategories)
}
//* Fonction qui permet de créer la fausse liste de séléction //
//? Paramètre [array] type string //
function creatCustomSelectfField(categories) {
	const containeurSelect = document.createElement('div') // création de la div qui contiendra le cutsom select //
	containeurSelect.classList.add('custom-select')

	const spanSelectOption = document.createElement('span') // Création du span pour l'affichage de l'option choisie //
	spanSelectOption.classList.add('selected-option')

	const ulOptions = document.createElement('ul') // Création d'une liste non ordonnée //
	ulOptions.classList.add('options')

	for (let i = 0; i < categories.length; i++) {
		// Pour chaque élément contenue dans le tableau categories itére l'action suivante //
		const item = categories[i] // Récupération de l'élément et stockage dans la variabkle item //
		const li = document.createElement('li') // Création du puce li //
		li.dataset.id = item.id
		li.innerText = `${item.name.replace(/Ho/g, 'Hô')}`
		ulOptions.appendChild(li) // Ajout de cette puce dans la liste ul //
	}

	// Récupération de la balise Select pour l'introduire dans la div custom-select //
	const realSelect = document.getElementById('select-field')
	// spanSelectOption.appendChild(chevronDown)
	containeurSelect.appendChild(spanSelectOption)
	containeurSelect.appendChild(ulOptions)
	containeurSelect.appendChild(realSelect)
	document.getElementById('modal-form').appendChild(containeurSelect)
}
//* Fonction qui permet de créer un icone chevron vers le bas //
function creatChevronDown() {
	const selectedOption = document.querySelector('.selected-option')

	const chevronDown = document.createElement('i') // Création de l'icone chevron vers le bas //
	chevronDown.classList.add('fa-solid', 'fa-chevron-down')
	chevronDown.setAttribute('aria-hidden', true)
	selectedOption.appendChild(chevronDown)
}
//* Fonction qui permet de créer un icone trois barres //
function creatBarsOpen() {
	const selectedOption = document.querySelector('.selected-option')
	const barsOpen = document.createElement('i') // Création de l'icone des trois barres //
	barsOpen.classList.add('fa-solid', 'fa-bars')
	barsOpen.setAttribute('aria-hidden', true)
	selectedOption.appendChild(barsOpen)
}

//* Fonction qui gére l'affichage du faux select et qui modifie la value du vrai select //
function manageSelectInteraction() {
	//Sécléction des différents éléments nécessaires pour gérer l'affichage //
	const modalWrapper = document.querySelector('.modal-wrapper')
	const modalForm = document.getElementById('modal-form')
	const selectedOption = document.querySelector('.selected-option')
	const optionList = document.querySelector('.options')
	const realSelect = document.getElementById('select-field')

	creatChevronDown() // Affichage de l'icone chevron vers le bas //

	selectedOption.addEventListener('click', () => {
		// Écoute de l'événement au click sur le span du faux select //
		optionList.style.display = optionList.style.display === 'block' ? 'none' : 'block' // Opération térnaire, si optionList est strictement égal à block, tu actives none ou block sinon //
		if (modalForm.style.marginBottom !== '180px') {
			// Si le margin-bottom de la modalForm est différent de 180px //
			document.querySelector('.fa-chevron-down').style.visibility = 'hidden' // Cache le chevron vers le bas //
			creatBarsOpen() // Ajoute l'icone des trois barres //
			modalForm.style.marginBottom = '180px' // Ajoute 180px de mare-bottom à la modalForm //
		} else {
			// Sinon //
			document.querySelector('.fa-bars').remove() // Supprime l'icone des trois barres //
			modalForm.style.marginBottom = '30px' // Modifie le margin-bottom à 30 px //
			document.querySelector('.fa-chevron-down').style.visibility = 'visible' // Affiche le chevron vers le bas //
		}

		const clickHandler = (event) => {
			if (event.target !== selectedOption) {
				optionList.style.display = 'none'
				modalForm.style.marginBottom = '30px'
				document.querySelector('.fa-chevron-down').style.visibility = 'visible'
				modalWrapper.removeEventListener('click', clickHandler) // Utiliser la même fonction pour supprimer l'écouteur
				if (document.querySelector('.fa-bars') !== null) {
					document.querySelector('.fa-bars').remove()
				}
			}
		}

		modalWrapper.addEventListener('click', clickHandler)
	})

	optionList.addEventListener('click', (event) => {
		// Écoute de l'événement au click sur la liste d'options //
		if (event.target && event.target.tagName === 'LI') {
			// Si le click sur l'option et si le cick sur l'option est une balise li alors  //
			selectedOption.textContent = event.target.textContent // Ajoute au span le text de la balise li ciblée //
			creatChevronDown() // Ajout de l'icone chevron vers le bas, car supprimé lors du rajout du text //
			realSelect.value = event.target.getAttribute('data-id') // Modifie la valeur du vrai select par le data-id de la balise Li //
			optionList.style.display = 'none' // Désactive l'affichage de la liste d'option //
			modalForm.style.marginBottom = '30px' // Modifie le margin-bottom à 30 px //

			if (document.querySelector('.fa-bars') !== null) {
				// Si l'icone est présent alors on le supprime //
				document.querySelector('.fa-bars').remove()
			}
		}
	})
}

//* Fonction qui permet de vérifier si les champs sont bien rempli //
function checkFormValidity() {
	const modalForm = document.getElementById('modal-form')
	if (modalForm !== null) {
		// Séléction des différents élément du DOM nécessaire //
		const inputFile = document.getElementById('input-file')
		const inputTitle = document.getElementById('input-title').value
		const selectField = document.getElementById('select-field').value
		const submitButton = document.getElementById('submit-button')

		if (inputFile.files.length > 0 && inputTitle.trim() !== '' && selectField !== '') {
			// Si l'input type file contien un fichier et si l'input type et le select field ne sont pas vide //
			submitButton.removeAttribute('disabled', '') // Activer le bouton
			manageFormAddProject()
		} else {
			submitButton.setAttribute('disabled', '') // Désactiver le bouton
		}
	}
}
//* Fonction qui permet d'écouter les événements changes et click des inputs et du select du formulaire //
function ListenEventForm() {
	document.getElementById('input-file').addEventListener('change', checkFormValidity)
	document.querySelector('.selected-option').addEventListener('click', () => {
		setTimeout(checkFormValidity, 2000) // Permet de laisser un délai avant d'exécuter la fonction checkFormValidity //
	})
	document.getElementById('input-title').addEventListener('input', checkFormValidity)
}
//* Fonction qui permet de gérer les données du formulaire //
async function manageFormAddProject() {
	document.getElementById('submit-button').addEventListener('click', (event) => {
		event.preventDefault() // Supprime le rafraichissement automatique de la page //
		// Récupération des différentes données des champs //
		const inputFile = document.getElementById('input-file').files[0]
		const inputTitleValue = document.getElementById('input-title').value
		const selectFieldId = document.getElementById('select-field').value
		// Création d'un nouvel objet de type formData //
		const formData = new FormData()
		// Stockage des différentes données dans l'objet formData par clé/valeur //
		formData.append('image', inputFile)
		formData.append('title', inputTitleValue)
		formData.append('category', selectFieldId)

		addProject(formData) // Ajoute le projet avec comme paramètre l'objet fromData //
	})
}
//* Fonction qui permet d'ajouter un projet dans la base de données //
//? Paramètre type objet fromData //
async function addProject(formData) {
	const tokenData = JSON.parse(window.sessionStorage.getItem('token')) // Récupération du token dans le sessionStorage //
	const token = `Bearer ${tokenData.token}` // Stockage du token dans la variable token //

	try {
		const response = await fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				Authorization: token,
			},
			body: formData,
		})
		if (!response.ok) {
			//Gére l'erreur ici
			throw new Error(`HTTP ${response.status}`)
		} else if (response.ok) {
			await refreshWorks(true) // Force le rafraichissement du localStorage //
			deleteModalContent() // Vide le contenue de la modale //
			addModalProject() // Affiche la modale d'ajout de projet //
			showMessageSnackbBar('Élément ajouté') // Affiche le message élément supprimé dans la snackBar //
		}
	} catch (error) {
		console.error("Une erreur s'est produite", error) // Affiche le message d'erreur dans la console avec le status de la requète //
	}
}
//* Fonction qui permet de gerer l'affichage dans l'input type file //
function previewPicture() {
	// Séléction des différents éléments du DOM nécessaire //
	const uploadFile = document.getElementById('input-file')
	const picturePreview = document.getElementById('preview-image')
	const divLabelInput = document.querySelector('.containeur-label-input')

	uploadFile.addEventListener('change', () => {
		const [picture] = uploadFile.files //Récupération de l'objet image  //
		const types = ['image/jpg', 'image/jpeg', 'image/png'] // Tableau type qui reprend les type de fichier autorisé //
		const pictureSize = picture.size / (1024 * 1024) // Converti la taille de l'image en mo //
		const pictureType = picture.type // Récupération du type de l'image //
		const pictureExtension = `.${pictureType.split('/').pop()}` // Récupération de l'extension du fichier grace au type de l'image//

		if (!types.includes(pictureType)) {
			// Si le type ne contient pas le format de l'image alors //
			clearAndReshow() // Réaffiche l'input //
			showMessageErrorTypeOrSize(
				//Affiche le message d'erreur suivant //
				`Le fichier que vous essayez d'insérer : ${pictureExtension} n'est pas valide `
			)
		} else if (pictureSize > 4) {
			// Sinon, si la taille de l'image fait plus de 4mo alors //
			clearAndReshow() // Réaffiche l'input //
			showMessageErrorTypeOrSize(
				//Affiche le message d'erreur suivant //
				`Ce fichier pèse ${pictureSize.toFixed(2)} mo, il est trop volumineux (4mo max)`
			)
		} else {
			// Sinon //
			divLabelInput.style.display = 'none' // Cache le containeur de l'input //

			let reader = new FileReader() // Création d'un containeur de type fileReader //
			reader.readAsDataURL(uploadFile.files[0]) // Lancement de la lecture du fichier //
			reader.onload = () => {
				// Une fois que le fichier est lu //
				picturePreview.alt = 'Image upload' // Créait un alt pour l'image //
				picturePreview.src = reader.result // Créait la source avec les resultat du reader //
				picturePreview.style.display = 'block' // Affiche la balise image //
				showMessageErrorTypeOrSize('') // Vide le message d'erreur, s'il est la //
			}
		}
	})
}
//* Fonction qui permet de nettoyer et de réafficher l'input pour la photo //
function clearAndReshow() {
	const containeurInputFile = document.querySelector('.containeur-input-files') // Sélection du conataineur de l'input pour le fichier à insérer //
	containeurInputFile.innerHTML = '' // Vide avec une string vide //
	creatInputFile() // Réaffichage des éléments dans le containeur //
}
//* Fonction qui va permettre d'afficher le message d'erreur en fonction du type d'erreur //
//? Paramètre type string : message d'erreur //
function showMessageErrorTypeOrSize(errorMessage) {
	const spanErrorMessage = document.getElementById('error-message-files')
	spanErrorMessage.innerText = errorMessage // Affichage du message d'erreur //
}
