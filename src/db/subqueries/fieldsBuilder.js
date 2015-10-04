import { isNil } from '../../util';

const fieldsBuilder = (() => {
	const checkFields = (fieldsToCheck) => {
		if (isNil(fieldsToCheck)) {
			return true;
		}

		if (!Array.isArray(fieldsToCheck)) {
			throw new Error('Query fields must be an array');
		}

		return true;
	};

	const getFieldsString = (fields) => {
		if (isNil(fields) || fields.length === 0) {
			return '*';
		}

		return fields.join(', ');
	};

	const getFields = (fields) => {
		checkFields(fields);
		const fieldArray = [].concat(fields).filter((field) => !isNil(field));
		return getFieldsString(fieldArray);
	};

	return Object.freeze({
		getFields
	});
})();

export default fieldsBuilder;
