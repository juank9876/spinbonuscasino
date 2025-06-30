'use client'

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import "./ripple-effect.css"
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";


export function rippleEffect (
  event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>
) {
  const btn = event.currentTarget as HTMLElement;

  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (btn.getBoundingClientRect().left + radius)}px`;
  circle.style.top = `${event.clientY - (btn.getBoundingClientRect().top + radius)}px`;
  circle.classList.add("ripple");

  const ripple = btn.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }
  console.log("click")
  btn.appendChild(circle);
}

export function ButtonRipple ({ /*id,*/ children, className }: { id: string, children: React.ReactNode, className?: string }) {
  /*
  function handleClick (event: React.MouseEvent<HTMLButtonElement>) {
    rippleEffect(event);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
*/
  return (
    <HoverBorderGradient

      as="button"
      className={`${className} h-full flex items-center justify-center font-semibold  px-5 py-3 min-w-max overflow-hidden relative transition-all duration-300 shadow-lg hover:shadow-xl`}
      duration={1}
    >
      <div className="relative">
        {children}
      </div>
    </HoverBorderGradient>
  )
}

export function LinkRipple ({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  function handleClick (event: React.MouseEvent<HTMLAnchorElement>) {
    rippleEffect(event);
  }

  return (
    <div className="flex h-full flex-row">
      <BackgroundGradient>
        <Link
          href={href}
          type="button"
          className={`${className} flex bg-transparent rounded-xl justify-center items-center font-bold px-3 py-1 lg:px-5 lg:py-3 overflow-hidden relative hover:bg-opacity-90 transition-all duration-300`}
          onClick={handleClick}
        >
          {children}
        </Link>
      </BackgroundGradient>
    </div>
  )
}

