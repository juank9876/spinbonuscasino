'use client'
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface PaymentMethod {
  method: string;
  text: string;
  icon: string;
}

interface Badge {
  text: string;
  style: string;
  color: string;
  custom_color: string;
  position: string;
}

interface Button {
  text: string;
  color: string;
  custom_color: string;
}

export interface BrandlistyCardType {
  id: string;
  name: string;
  logo_url: string;
  position: string;
  stars_rating: string;
  cantidad: string;
  frase_oferta: string;
  frase2: string;
  affiliate_link: string;
  review_link: string;
  tracking_url: string;
  custom_bonus_text: string;
  description: string;
  valuation: string;
  review_header: string;
  min_deposit: number | null;
  legal_disclaimer: string;
  category: string | null;
  geo: string[] | string;
  pros: string[];
  cons: string[];
  features: string[];
  extra_features: string[];
  payment_methods: PaymentMethod[];
  badge: Badge;
  button: Button;
  review_button: Button;
  //custom_fields: CustomFields;
}

interface BrandlistyIndex {
  operator: BrandlistyCardType;
  index: number;
}

export function BrandlistyCardSidebar ({ operator, index }: BrandlistyIndex) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-500 text-white',
      danger: 'bg-red-600 text-white',
      secondary: 'bg-gray-600 text-white',
    };
    return colors[color] || colors.primary;
  };

  const getButtonColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    };
    return colors[color] || colors.primary;
  };

  const stars = parseFloat(operator.stars_rating) || 0;

  return (
    <div className="mb-1 overflow-hidden rounded-lg border bg-white shadow-xl transition duration-500 hover:scale-105 hover:bg-gray-100">
      {/* Sección Principal - Siempre Visible */}
      <div className="p-2">
        {/* Header con número de posición y badge */}
        <div className="mb-1 flex items-start justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </div>
          {operator.badge.text && (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(operator.badge.color)}`}>
              {operator.badge.text}
            </span>
          )}
        </div>

        {/* Logo y nombre */}
        <div className="mb-1 flex justify-center">
          <div className="rounded-lg border border-gray-100 bg-white p-3">
            <img
              src={operator.logo_url}
              alt={operator.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <h3 className="padding-none mb-1 text-center text-lg font-bold text-gray-800">{operator.name}</h3>

        {/* Rating */}
        <div className="mb-1 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">{operator.stars_rating}/5</span>
        </div>

        {/* Descripción */}
        <p className="mb-1 text-center text-xs leading-relaxed text-gray-600">
          {operator.description}
        </p>

        {/* Botón principal */}
        <a
          href={operator.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-2.5 px-4 rounded-lg font-semibold text-center text-sm transition-colors duration-200 mb-2 ${getButtonColor(operator.button.color)}`}
        >
          {operator.button.text}
        </a>

        {/* Botón desplegable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
        >
          <span>More information</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
          />
        </button>
      </div>

      {/* Sección Desplegable */}
      {isExpanded && (
        <div className={`space-y-4 overflow-hidden p-4 transition-all duration-300 ease-in-out
          ${isExpanded
            ? ' opacity-100'
            : ' opacity-0'
          }`}
        >
          {/* Features */}
          {operator.features.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Características:</h4>
              <div className="space-y-1">
                {operator.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros */}
          {operator.pros.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <h4 className="mb-2 flex items-center text-sm font-semibold text-green-800">
                <Check className="mr-1 h-4 w-4" />
                Ventajas
              </h4>
              <ul className="space-y-1">
                {operator.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start text-xs text-green-700">
                    <span className="mr-2">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {operator.cons.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <h4 className="mb-2 flex items-center text-sm font-semibold text-red-800">
                <X className="mr-1 h-4 w-4" />
                Desventajas
              </h4>
              <ul className="space-y-1">
                {operator.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start text-xs text-red-700">
                    <span className="mr-2">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Valoración */}
          {operator.valuation && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <h4 className="mb-2 text-sm font-semibold text-blue-800">Valoración:</h4>
              <p className="text-xs leading-relaxed text-blue-700">{operator.valuation}</p>
            </div>
          )}

          {/* Métodos de Pago */}
          {operator.payment_methods.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Métodos de pago:</h4>
              <div className="flex flex-wrap gap-2">
                {operator.payment_methods.slice(0, 6).map((method, idx) => (
                  <div key={idx} className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm">
                    {method.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Legal */}
          {operator.legal_disclaimer && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-xs leading-relaxed text-gray-600">{operator.legal_disclaimer}</p>
            </div>
          )}

          {/* Botón Review */}
          <a
            href={operator.review_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            Review
          </a>
        </div>
      )}
    </div>
  );
}

export function BrandlistyCardOriginal ({ operator, index }: BrandlistyIndex) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-600 text-white',
      success: 'bg-green-600 text-white',
      warning: 'bg-yellow-500 text-white',
      danger: 'bg-red-600 text-white',
      secondary: 'bg-gray-600 text-white',
    };
    return colors[color] || colors.primary;
  };

  const getButtonColor = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    };
    return colors[color] || colors.primary;
  };

  const stars = parseFloat(operator.stars_rating) || 0;

  return (
    <div className="mb-1 overflow-hidden rounded-lg border bg-white shadow-xl transition duration-500 hover:scale-105 hover:bg-gray-100">
      {/* Sección Principal - Siempre Visible */}
      <div className="p-2">
        {/* Header con número de posición y badge */}
        <div className="mb-1 flex items-start justify-between">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {index + 1}
          </div>
          {operator.badge.text && (
            <span className={`px-2 py-1 rounded text-xs font-semibold ${getBadgeColor(operator.badge.color)}`}>
              {operator.badge.text}
            </span>
          )}
        </div>

        {/* Logo y nombre */}
        <div className="mb-1 flex justify-center">
          <div className="rounded-lg border border-gray-100 bg-white p-3">
            <img
              src={operator.logo_url}
              alt={operator.name}
              className="h-10 w-auto object-contain"
            />
          </div>
        </div>

        <h3 className="padding-none mb-1 text-center text-lg font-bold text-gray-800">{operator.name}</h3>

        {/* Rating */}
        <div className="mb-1 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm font-semibold text-gray-700">{operator.stars_rating}/5</span>
        </div>

        {/* Descripción */}
        <p className="mb-1 text-center text-xs leading-relaxed text-gray-600">
          {operator.description}
        </p>

        {/* Botón principal */}
        <a
          href={operator.affiliate_link}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full py-2.5 px-4 rounded-lg font-semibold text-center text-sm transition-colors duration-200 mb-2 ${getButtonColor(operator.button.color)}`}
        >
          {operator.button.text}
        </a>

        {/* Botón desplegable */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200"
        >
          <span>More information</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
          />
        </button>
      </div>

      {/* Sección Desplegable */}
      {isExpanded && (
        <div className={`space-y-4 overflow-hidden p-4 transition-all duration-300 ease-in-out
          ${isExpanded
            ? ' opacity-100'
            : ' opacity-0'
          }`}
        >
          {/* Features */}
          {operator.features.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Características:</h4>
              <div className="space-y-1">
                {operator.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-gray-700">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pros */}
          {operator.pros.length > 0 && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <h4 className="mb-2 flex items-center text-sm font-semibold text-green-800">
                <Check className="mr-1 h-4 w-4" />
                Ventajas
              </h4>
              <ul className="space-y-1">
                {operator.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start text-xs text-green-700">
                    <span className="mr-2">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {operator.cons.length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <h4 className="mb-2 flex items-center text-sm font-semibold text-red-800">
                <X className="mr-1 h-4 w-4" />
                Desventajas
              </h4>
              <ul className="space-y-1">
                {operator.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start text-xs text-red-700">
                    <span className="mr-2">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Valoración */}
          {operator.valuation && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
              <h4 className="mb-2 text-sm font-semibold text-blue-800">Valoración:</h4>
              <p className="text-xs leading-relaxed text-blue-700">{operator.valuation}</p>
            </div>
          )}

          {/* Métodos de Pago */}
          {operator.payment_methods.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Métodos de pago:</h4>
              <div className="flex flex-wrap gap-2">
                {operator.payment_methods.slice(0, 6).map((method, idx) => (
                  <div key={idx} className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700 shadow-sm">
                    {method.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer Legal */}
          {operator.legal_disclaimer && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-xs leading-relaxed text-gray-600">{operator.legal_disclaimer}</p>
            </div>
          )}

          {/* Botón Review */}
          <a
            href={operator.review_link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100"
          >
            Review
          </a>
        </div>
      )}
    </div>
  );
};