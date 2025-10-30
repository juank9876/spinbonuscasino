import { Construction, Home, ArrowRight } from "lucide-react"
import { Link } from "./optionals/link"

export function UnderConstruction() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
                        <Construction className="w-24 h-24 text-yellow-500 animate-pulse relative" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        Página en Construcción
                    </h1>
                    <p className="text-xl text-gray-300">
                        Estamos trabajando en algo increíble
                    </p>
                </div>

                {/* Description */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-4">
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Nuestro equipo está trabajando arduamente para traerte una experiencia excepcional. 
                        Pronto podrás disfrutar de contenido nuevo y emocionante.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-yellow-500">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Link
                        href="/categories"
                        className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Ver Categorías
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Footer note */}
                <p className="text-sm text-gray-400 pt-8">
                    ¿Tienes alguna pregunta? Contáctanos y te ayudaremos encantados.
                </p>
            </div>
        </div>
    )
}
