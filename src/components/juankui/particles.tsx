
import { Particles } from "../magicui/particles";

export function ParticlesFull ({ color: _color }: { color?: string }) {
  const color = _color ? _color : "#fff"

  return (
    <Particles
      className="absolute inset-0 z-0"
      quantity={100}
      ease={80}
      color={_color || color}
      refresh
    />
  )
}