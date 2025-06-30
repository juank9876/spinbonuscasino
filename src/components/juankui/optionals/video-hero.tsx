import { heroVideoUrl, isVideoHero } from "@/config/options";

export function VideoHero () {

  if (isVideoHero)
    return (
      <>
        {/* Video de fondo */}
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src={heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Capa de oscurecimiento para mejorar contraste del texto */}
        <div className="absolute inset-0 z-10 h-full bg-slate-900/80" />
      </>
    )
  return (
    <>
      {/*
          <div className="absolute inset-0 mb-0 h-full bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary-semi-dark)] pb-0" />
      */}
    </>
  )
}