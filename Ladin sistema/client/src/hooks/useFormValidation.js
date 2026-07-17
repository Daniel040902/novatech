// ============================================================
// useFormValidation.js — Hook para validacion de formularios
// ============================================================
// Este hook maneja el estado de campos, errores y "touched"
// para formularios con validacion en tiempo real
import { useState } from 'react'
import { validateEmail, validateName, validateMessage, sanitizeInput } from '../utils/validators'

// Estado inicial del formulario: campos vacios
const INITIAL_VALUES = { name: '', email: '', message: '' }

/**
 * Hook personalizado para gestionar formularios con validacion
 * @returns {object} { values, errors, touched, handleChange, handleBlur, isValid, resetForm }
 */
export function useFormValidation() {
  // Estado de los valores de cada campo
  const [values, setValues] = useState(INITIAL_VALUES)
  // Estado de errores por campo (vacio = sin error)
  const [errors, setErrors] = useState({})
  // Estado de campos que ya fueron tocados (perdieron foco al menos una vez)
  const [touched, setTouched] = useState({})

  /**
   * Maneja cambios en cualquier campo del formulario
   * Sanitiza el input y valida en tiempo real si el campo ya fue tocado
   */
  function handleChange(e) {
    const { name, value } = e.target
    // Sanitizamos el valor para prevenir XSS
    setValues(prev => ({ ...prev, [name]: sanitizeInput(value) }))
    // Si el campo ya fue tocado, validamos en tiempo real
    if (touched[name]) validateField(name, value)
  }

  /**
   * Maneja el evento blur (campo pierde el foco)
   * Marca el campo como tocado y ejecuta validacion
   */
  function handleBlur(e) {
    const { name, value } = e.target
    // Marcamos el campo como tocado para mostrar errores
    setTouched(prev => ({ ...prev, [name]: true }))
    // Ejecutamos validacion al perder el foco
    validateField(name, value)
  }

  /**
   * Valida un campo especifico y actualiza el estado de errores
   * @param {string} name - Nombre del campo
   * @param {string} value - Valor a validar
   */
  function validateField(name, value) {
    let error = ''
    // Validamos segun el tipo de campo
    if (name === 'name' && !validateName(value)) {
      error = 'El nombre debe tener entre 2 y 100 caracteres'
    }
    if (name === 'email' && !validateEmail(value)) {
      error = 'Ingrese un correo electrónico válido'
    }
    if (name === 'message' && !validateMessage(value)) {
      error = 'El mensaje debe tener entre 10 y 1000 caracteres'
    }
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  /**
   * Verifica si el formulario completo es valido
   * @returns {boolean} true si todos los campos son validos
   */
  function isValid() {
    // Validamos todos los campos contra sus reglas
    return (
      validateName(values.name) &&
      validateEmail(values.email) &&
      validateMessage(values.message)
    )
  }

  /**
   * Reinicia el formulario a su estado inicial
   */
  function resetForm() {
    setValues(INITIAL_VALUES)
    setErrors({})
    setTouched({})
  }

  // Retornamos todo lo necesario para el formulario
  return { values, errors, touched, handleChange, handleBlur, isValid, resetForm }
}
