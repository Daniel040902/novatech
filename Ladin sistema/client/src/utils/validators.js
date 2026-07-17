// ============================================================
// validators.js — Utilidades de validacion y sanitizacion
// ============================================================

/**
 * Valida un email con expresion regular simple pero efectiva
 * @param {string} email - Correo electronico a validar
 * @returns {boolean} true si el formato es valido
 */
export function validateEmail(email) {
  // Regex estandar para formato email: algo@algo.algo
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return EMAIL_REGEX.test(email)
}

/**
 * Sanitiza texto eliminando caracteres peligrosos (XSS)
 * Sin usar el DOM, ideal para entornos SSR
 * @param {string} value - Texto a sanitizar
 * @returns {string} Texto seguro
 */
export function sanitizeInput(value) {
  // Reemplaza caracteres HTML especiales por sus entidades seguras
  // Esto previene inyeccion XSS en el servidor
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Valida que el nombre tenga entre 2 y 100 caracteres
 * @param {string} name - Nombre a validar
 * @returns {boolean} true si es valido
 */
export function validateName(name) {
  // El nombre debe tener al menos 2 caracteres y maximo 100
  return name.trim().length >= 2 && name.trim().length <= 100
}

/**
 * Valida que el mensaje tenga entre 10 y 1000 caracteres
 * @param {string} message - Mensaje a validar
 * @returns {boolean} true si es valido
 */
export function validateMessage(message) {
  // El mensaje debe tener al menos 10 caracteres y maximo 1000
  return message.trim().length >= 10 && message.trim().length <= 1000
}
