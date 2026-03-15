import { useState, useEffect } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content/projects.json')
      .then(r => r.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : []
        setProjects(arr.sort((a, b) => (a.order || 0) - (b.order || 0)))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { projects, loading }
}

export function useAbout() {
  const [about, setAbout] = useState(null)

  useEffect(() => {
    fetch('/content/about.json')
      .then(r => r.json())
      .then(setAbout)
      .catch(() => {})
  }, [])

  return about
}
