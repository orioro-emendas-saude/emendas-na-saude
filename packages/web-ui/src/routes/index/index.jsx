import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Index() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/mapa/INEAB/pais/brasil', {
      replace: true,
    })
  }, [])

  return null
}
