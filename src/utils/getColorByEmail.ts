export const getColorByEmail = (email: string) : string => {
  let hash: number = 0
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash)
  }
  return `hsl(${Math.abs(hash) % 360}, 70%, 75%)`
}