const errors = require('./errors')
const logger = require('./logger')

exports.function = (method, handler) => {
  const middlewareFunctions = [validateHttpMethod(method), parseBody, handler]
  return async (event, context) => {
    for (const middlewareFunction of middlewareFunctions) {
      try {
        const response = await middlewareFunction(event, context)
        if (response) return response
      } catch (error) {
        return exports.error(error)
      }
    }
  }
}

const validateHttpMethod = (method) => async (event, context) => {
  if (event.httpMethod !== method) {
    return {
      ...exports.error(errors.MethodNotAllowed, 405),
      headers: { Allow: method },
    }
  }
}

const parseBody = async (event, context) => {
  if (event.body) {
    try {
      event.body = JSON.parse(event.body)
    } catch (error) {
      return exports.error(errors.BadRequest, 400)
    }
  }
}

exports.json = (body) => {
  const stringifiedBody = JSON.stringify(body)
  logger.log(stringifiedBody)
  return {
    statusCode: 200,
    body: stringifiedBody,
  }
}

exports.error = (error, statusCode) => {
  logger.error(error.toString())
  return {
    statusCode: statusCode || 500,
    body: error.toString() || errors.InternalServerError,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  }
}
