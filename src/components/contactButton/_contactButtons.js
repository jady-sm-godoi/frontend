// CONSTANTS
const CONFIG_CONSTS = {
	maxPhoneLength: 15,
	minPhoneLength: 14,

	minNameLength: 1,
	maxNameLength: 64
}
let CONFIG_VARS = {
	defaultButtonActive: false,
	areaCode: null,

	phone: null,
	isValidAreaCode: false,

	modalState: false,

	isPhoneComplete: false,
	isNameComplete: false,

	mapFocusedScreens: {},
	keysPressed: {},

	defaultCurrentScreenShowing: 'cttbtn_main',
	defaultStartChatBtn: false,

	deployWhatsappButton: false
}

const verifyStartChatBtn = () => {
	const getNameInput = document.getElementById('cttbtn_inputNameContent_field')
	const getPhoneInput = document.getElementById(
		'cttbtn_inputPhoneContent_field'
	)
	const getDDDInputHidden = document.getElementById(
		'cttbtn_chatbotinputhidden_ddd'
	)
	const getPhoneInputHidden = document.getElementById(
		'cttbtn_chatbotinputhidden_phone'
	)
	const getSubmitButton = document.getElementById('cttbtn_chatbotsubmit')

	CONFIG_VARS.defaultStartChatBtn =
		CONFIG_VARS.isValidAreaCode &&
		CONFIG_VARS.isNameComplete &&
		CONFIG_VARS.isPhoneComplete

	getDDDInputHidden.value = CONFIG_VARS.areaCode
	getPhoneInputHidden.value = CONFIG_VARS.phone
	getNameInput.dataset['errormessage'] = CONFIG_VARS.isNameComplete
		? ''
		: 'O nome é obrigatório'

	!CONFIG_VARS.isValidAreaCode &&
		(getPhoneInput.dataset['errormessage'] = 'Insira um DDD válido')
	!CONFIG_VARS.isPhoneComplete &&
		(getPhoneInput.dataset['errormessage'] = 'O telefone é obrigatório')
	CONFIG_VARS.isValidAreaCode &&
		CONFIG_VARS.isPhoneComplete &&
		(getPhoneInput.dataset['errormessage'] = '')

	getSubmitButton.disabled = !CONFIG_VARS.defaultStartChatBtn
}
const phoneValidation = (e) => {
	e.value = e.value
		.substring(0, CONFIG_CONSTS.maxPhoneLength) //Limita a quantidade de caracteres em 15
		.replace(/\D/g, '') //Remove tudo o que não é dígito
		.replace(/^(\d{2})(\d)/g, `($1) $2`) //Coloca parênteses em volta dos dois primeiros dígitos
		.replace(/(\d)(\d{4})$/, '$1-$2') //Coloca hífen entre o quarto e o quinto dígitos

	CONFIG_VARS.phone = e.value
		.replace(/\D/g, '')
		.substring(2, `${e.value}`.length)

	CONFIG_VARS.areaCode = e.value.replace(/\D/g, '').substring(0, 2)

	CONFIG_VARS.isValidAreaCode = !!BrasilStates[CONFIG_VARS.areaCode]
	CONFIG_VARS.isPhoneComplete =
		`${e.value}`.length >= CONFIG_CONSTS.minPhoneLength &&
		`${e.value}`.length <= CONFIG_CONSTS.maxPhoneLength

	verifyStartChatBtn()
	return e.value
}
const nameValidation = (e) => {
	CONFIG_VARS.isNameComplete =
		`${e.value}`.length >= CONFIG_CONSTS.minNameLength &&
		`${e.value}`.length <= CONFIG_CONSTS.maxNameLength

	e.value = e.value
		.replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
		.substring(0, CONFIG_CONSTS.maxNameLength)

	verifyStartChatBtn()
	return e.value
}

const changeWhatsappModalState = (e) => {
	CONFIG_VARS.modalState = !CONFIG_VARS.modalState

	const getExternalContent = document.getElementById('cttbtn_externalContainer')
	const getContactButtonModal = document.getElementById('cttbtn_cardButtons')
	const getBackgroudMask = document.getElementById('cttbtn_exitmask')

	getExternalContent.style.display = CONFIG_VARS.modalState ? 'unset' : 'none'
	getExternalContent.style.top = CONFIG_VARS.modalState ? '0' : 'unset'

	getContactButtonModal.style.height = CONFIG_VARS.modalState ? '464px' : '0px'

	getBackgroudMask.style.top = CONFIG_VARS.modalState ? '0' : 'unset'
	getBackgroudMask.style.opacity = CONFIG_VARS.modalState ? '100%' : '0%'

	// change page scroll when modal is open
	CONFIG_VARS.modalState ? overflowHidden() : overflowShow()

	CONFIG_VARS.modalState &&
		CONFIG_VARS.mapFocusedScreens[
			CONFIG_VARS.defaultCurrentScreenShowing
		].setCurrentFocus()
}

const toggleRenderComponent = ({ show, hidden, focus }) => {
	show && (document.querySelector(show).style.display = 'unset')
	hidden && (document.querySelector(hidden).style.display = 'none')

	focus && (CONFIG_VARS.defaultCurrentScreenShowing = focus)
	focus &&
		CONFIG_VARS.mapFocusedScreens[
			CONFIG_VARS.defaultCurrentScreenShowing
		].setCurrentFocus()
}

class cttbtn_keepFocus {
	constructor(data = { renderScreen }) {
		this.renderScreen = data.renderScreen
		this.childrens = document.querySelectorAll(
			`[data-focusedScreen='${data.renderScreen}']`
		)
		this.childrenCount = {
			max: this.childrens.length - 1,
			min: 0,
			current: 0
		}
	}

	next() {
		this.childrenCount.current++

		if (this.childrenCount.current > this.childrenCount.max)
			this.childrenCount.current = this.childrenCount.min

		this.setCurrentFocus()
	}
	back() {
		this.childrenCount.current--

		if (this.childrenCount.current < this.childrenCount.min)
			this.childrenCount.current = this.childrenCount.max

		this.setCurrentFocus()
	}

	setCurrentFocus() {
		this.childrens[this.childrenCount.current].focus()
	}

	setFirstFocus() {
		this.childrens[0].focus()
	}
}

const changeFocusedItem = () => {
	CONFIG_VARS.keysPressed['Shift']
		? CONFIG_VARS.mapFocusedScreens[
				CONFIG_VARS.defaultCurrentScreenShowing
		  ].back()
		: CONFIG_VARS.mapFocusedScreens[
				CONFIG_VARS.defaultCurrentScreenShowing
		  ].next()
}

// Mapping screens by data-focusedScreen
document.querySelectorAll('.cttbtn_tabeable').forEach((e) => {
	!CONFIG_VARS.mapFocusedScreens[e.dataset.focusedscreen] &&
		(CONFIG_VARS.mapFocusedScreens[e.dataset.focusedscreen] =
			new cttbtn_keepFocus({
				renderScreen: e.dataset.focusedscreen
			}))
})

if (CONFIG_VARS.deployWhatsappButton) {
	// LISTNER TO KEYDOWN
	document
		.getElementById('cttbtn_cardButtons')
		.addEventListener('keydown', (keydown) => {
			keydown.key == 'Tab' && keydown.preventDefault()

			keydown.key == 'Shift' && (CONFIG_VARS.keysPressed[keydown.key] = true)
			keydown.key == 'Tab' && changeFocusedItem()
			keydown.key == 'Escape' && changeWhatsappModalState()
		})

	// LISTNER TO KEYUP
	document
		.getElementById('cttbtn_cardButtons')
		.addEventListener('keyup', (keyup) => {
			keyup.key == 'Shift' && (CONFIG_VARS.keysPressed[keyup.key] = false)
		})
}
