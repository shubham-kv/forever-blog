const Joi = require('joi')

const validateRegitserData = (data) => {
	const schema = Joi.object({
		name: Joi.object({
			first: Joi.string().required().trim().max(256)
				.messages({
					'any.required':	`First name is required!`,
					'string.base':	`First name should be of type 'text'.`,
					'string.empty':	`First name is required!`,
					'string.max':	`First name cannot be more than 256 characters!`,
				}),

			last: Joi.string().required().trim().max(256)
				.messages({
					'any.required':	`Last name is required!`,
					'string.base':	`Last name should be of type 'text'.`,
					'string.empty':	`Last name is required!`,
					'string.max':	`Last name cannot be more than 256 characters!`,
				}),
		}).required()
			.messages({
				'object.base':	`Name must be an object with keys 'first' and 'last'.`,
				'any.required': `First and last names are required!`,
				'any.empty':	`First and last names are required!`
			}),

		gender: Joi.string().required().trim().max(6)
			.valid('male', 'female')
			.messages({
				'any.required':	`Gender is required!`,
				'string.base':	`Gender should be of type 'text'.`,
				'string.empty':	`Gender is required!`,
				'string.max':	`Gender cannot be more than 6 characters!`,
			}),

		dateOfBirth: Joi.date().required()
			.messages({
				'any.required':	`Date of birth is required!`,
				'any.empty':	`Date of birth is required!`,
				'date.base':	`Date of birth should be of type 'date'.`,
			}),

		username: Joi.string().required().trim().max(256)
			.messages({
				'any.required':	`Username is required!`,
				'string.base':	`Username should be of type 'text'.`,
				'string.empty':	`Username is required!`,
				'string.max':	`Username cannot be more than 256 characters!`,
			}),

		password: Joi.string().required().min(8).max(256)
			.messages({
				'any.required':	`Password is required!`,
				'string.base':	`Password should be of type 'text'.`,
				'string.empty':	`Password is required!`,
				'string.min':	`Password should be atleast 8 characters long.`,
				'string.max':	`Password cannot be more than 256 characters!`,
			}),
	})

	return schema.validate(data)
}

const validateLoginData = (data) => {
	const schema = Joi.object({
		username: Joi.string().required().trim().max(256)
			.messages({
				'any.required':	`Username is required!`,
				'string.base':	`Username should be of type 'text'.`,
				'string.empty':	`Username is required!`,
				'string.max':	`Username cannot be more than 256 characters!`,
			}),

		password: Joi.string().required().min(8).max(256)
			.messages({
				'any.required':	`Password is required!`,
				'string.base':	`Password should be of type 'text'.`,
				'string.empty':	`Password is required!`,
				'string.min':	`Password should be atleast 8 characters long.`,
				'string.max':	`Password cannot be more than 256 characters!`,
			})
	})

	return schema.validate(data)
}

const validatePostData = (data) => {
	const schema = Joi.object({
		title: Joi.string().required().trim()
			.messages({
				'any.required':	`Title is required!`,
				'string.base':	`Title should be of type 'text'.`,
				'string.empty':	`Title is required!`,
				'string.min':	`Title should be atleast 2 characters long.`
			}),

		body: Joi.string().required().trim().min(30)
			.messages({
				'any.required':	`Post's Body is required!`,
				'string.base':	`Post's Body should be of type 'text'.`,
				'string.empty':	`Post's Body is required!`,
				'string.min':	`Post's Body should be atleast 30 characters long.`
			})
	})
	return schema.validate(data)
}

module.exports = {
	validateRegitserData,
	validateLoginData,
	validatePostData
}
