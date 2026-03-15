import { useState, useEffect } from 'react'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/content/projects.json')
      .then(r => r.json())
      .then(data => {
        const sorted = [...data].sort((a, b) => (a.order || 0) - (b.order || 0))
        setProjects(sorted)
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
