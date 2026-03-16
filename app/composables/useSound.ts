export function useSound() {
  function playSound(name: string) {
    const audio = new Audio(`/sounds/${name}.mp3`)
    audio.play().catch(() => {
    })
  }

  return { playSound }
}
