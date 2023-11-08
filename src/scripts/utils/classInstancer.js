/**
 * @template {new (...args: any[]) => {}} T
 * @param {T} classElement - A classe que será instanciada.
 * @param {...any} params - Parâmetros para a classe.
 * @returns {InstanceType<T>} - Uma nova instância da classe.
 */
function classInstancer(classElement = class {}, ...params) {
	try {
		if (typeof classElement == 'function') return new classElement(...params)
		else throw new Error('Classe inválida')
	} catch (error) {
		console.log(
			`
erro ao instanciar classe ${classElement.name}. 
Motivo: ${error}
            `
		)
	}
}
