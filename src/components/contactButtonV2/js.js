const modalManager = classInstancer(
	KeepFocusManager,
	'#modal-whatsapp-v2',
	'main'
)
// modalManager.attachFocus()

class ContactButtonV2 {
	/**
	 * @param {HTMLElementTagNameMap} containerSelector
	 * */
	constructor(
		containerSelector,
		options = {closeModalWhenClickInBackground: true}
	) {

		this.options = options

		/** @private */
		this.containerSelector = containerSelector

		/** @private */
		this.containerHtmlElement = document.querySelector(this.containerSelector)

		/** @private */
		this.attributes = {
			menu: {
				attibuteDatasetTag: 'data-whatsappmodalv2-menuname'
			}
		}

		/** @private */
		this.defaultMenu = 'main'

		this.setMenu(this.defaultMenu)

		/** @private */
		this.menuIsOpen = false

		if(this.options.closeModalWhenClickInBackground){
			this.closeModalWhenClickInBackground()
		}
	}

	openModal() {
		this.menuIsOpen = true
	}
	toggleModal() {
		this.menuIsOpen = !this.menuIsOpen
	}
	closeModal() {
		this.menuIsOpen = false
	}
	closeModalWhenClickInBackground() {
		// deploy listener
		this.containerHtmlElement.addEventListener('click', (click) => {
			if(click.target.id == this.containerHtmlElement.id){
				this.closeModal()
			}
		})
	}

	/**
	 * @param {boolean} value
	 */
	set menuIsOpen(value) {
		this._menuIsOpen = value

		// this._menuIsOpen ? overflowHidden() : overflowShow()
		this.containerHtmlElement.setAttribute(
			'data-whatsappmodalv2-status',
			this._menuIsOpen ? 'open' : 'close'
		)
		// this.containerHtmlElement.style.display = this._menuIsOpen ? 'flex' : 'none'

		// set defaults menu when modal closed
		if (!this._menuIsOpen) this.setMenu(this.defaultMenu)
	}

	get menuIsOpen() {
		return this._menuIsOpen
	}
	/**
	 * @param {string} menu
	 */
	setMenu(menu) {
		const menuArray = this.containerHtmlElement.querySelectorAll(
			`[${this.attributes.menu.attibuteDatasetTag}]`
		)

		// show only selected menu
		menuArray.forEach((element) => {
			const menuName = element.attributes.getNamedItem(
				this.attributes.menu.attibuteDatasetTag
			)

			element.style.display = menuName.value == menu ? 'flex' : 'none'
		})
	}
}

const contactButtonV2 = classInstancer(ContactButtonV2, '#modal-whatsapp-v2')
