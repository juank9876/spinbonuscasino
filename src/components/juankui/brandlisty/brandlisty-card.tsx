'use client'
import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Check, X, StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="mb-1 overflow-hidden rounded-lg border bg-white shadow-xl transition duration-500 hover:bg-gray-100">
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
          className={cn(`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 
              py-2 text-xs font-medium text-gray-700 transition-all duration-200 `, isExpanded ? `${getButtonColor(operator.review_button.color)} text-white hover:bg-gray-500` : 'hover:bg-gray-50')}
        >
          <span className='text-sm'>{isExpanded ? 'Less information' : 'More information'}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Features</h4>
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
                Pros
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
                Cons
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
              <h4 className="mb-2 text-sm font-semibold text-blue-800">Expert Valuation</h4>
              <p className="text-xs leading-relaxed text-blue-700">{operator.valuation}</p>
            </div>
          )}

          {/* Métodos de Pago */}
          {operator.payment_methods.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-800">Payment Methods</h4>
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
            href={operator.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex mx-auto w-1/2 justify-center items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 ${getButtonColor(operator.button.color)}`}
          >
            {operator.button.text}
          </a>
          {/* Botón Review */}
          <a
            href={operator.review_link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex mx-auto w-1/2 justify-center items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${getButtonColor(operator.review_button.color)}`}
          >
            {operator.review_button.text}
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
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex w-full flex-col lg:flex-row">
        {/* Columna Izquierda - Logo y Badge */}
        <div className="flex w-full flex-shrink-0 flex-col items-center bg-gradient-to-br from-gray-200 to-white pb-2 lg:w-1/3">

          <div className="relative flex w-full">
            {/* Número */}
            <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {index + 1}
            </div>

            {/* Badge */}
            {operator.badge.text && (
              <span
                className={`absolute top-0 right-0 z-50 rounded-full px-2 py-0.5 flex items-center justify-center text-xs font-semibold ${getBadgeColor(operator.badge.color)} z-20`}
              >
                {operator.badge.text}
              </span>
            )}
          </div>

          {/* Logo */}
          <div className="flex h-24 w-full items-center justify-center rounded-lg">
            <img
              src={operator.logo_url}
              alt={operator.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Nombre */}
          <h3 className="text-center text-base font-bold text-gray-900">{operator.name}</h3>

          {/* Rating */}
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            <span className="ml-1 text-sm font-semibold text-gray-700">{operator.stars_rating}/5</span>
          </div>
        </div>

        {/* Columna Central - Descripción */}
        <div className="flex flex-1 flex-col justify-between border-x border-gray-200 px-4 py-2">
          <div>
            <p className="text-xs leading-relaxed text-gray-600">
              {operator.description}
            </p>
          </div>

          {/* Botón desplegable */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 
              py-2 text-xs font-medium text-gray-700 transition-all duration-200 `, isExpanded ? `${getButtonColor(operator.review_button.color)} text-white hover:bg-gray-500` : 'hover:bg-gray-50')}
          >
            <span className='text-sm'>{isExpanded ? 'Less information' : 'More information'}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Columna Derecha - Payment Methods y Botones */}
        <div className="flex w-full flex-1 flex-col items-center justify-center py-4 lg:w-1/3">
          {/* Métodos de Pago */}
          {operator.payment_methods.length > 0 && (
            <div className="flex h-full flex-col items-center justify-center text-xs text-gray-600">
              <div className="mb-2 flex gap-1">
                <span className="text-blue-600">💳</span>
                <span>{operator.payment_methods.length} Payments</span>
              </div>
              {operator.features.length > 0 && (
                <div className="mb-2 flex gap-1">
                  <StarIcon className='h-3 w-3 text-blue-600' />
                  <span className='text-xs'>{operator.features[0]}</span>
                </div>
              )}
            </div>
          )}

          <div className='flex w-full flex-col items-center justify-center gap-2 px-5 lg:w-[200px]'>
            {/* Botón principal */}
            <a
              href={operator.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`mb-0 w-full rounded-lg py-2 text-center text-xs font-semibold transition-all duration-200 ${getButtonColor(operator.button.color)}`}
            >
              {operator.button.text}
            </a>

            {/* Botón Review */}
            <a
              href={operator.review_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg border-2 border-gray-300 bg-white py-2 text-center text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50"
            >
              {operator.review_button.text}
            </a>
          </div>
        </div>
      </div>

      {/* Sección Desplegable */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isExpanded
          ? 'grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Features */}
              {operator.features.length > 0 && (
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-gray-800">Features</h4>
                  <div className="space-y-2">
                    {operator.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="mr-2 text-blue-600">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pros */}
              {operator.pros.length > 0 && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <h4 className="mb-3 flex items-center text-sm font-semibold text-green-800">
                    <Check className="mr-2 h-4 w-4" />
                    Pros
                  </h4>
                  <ul className="space-y-2">
                    {operator.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start text-sm text-green-700">
                        <span className="mr-2">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {operator.cons.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="mb-3 flex items-center text-sm font-semibold text-red-800">
                    <X className="mr-2 h-4 w-4" />
                    Cons
                  </h4>
                  <ul className="space-y-2">
                    {operator.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start text-sm text-red-700">
                        <span className="mr-2">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Valoración */}
              {operator.valuation && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-blue-800">Expert Valuation</h4>
                  <p className="text-sm leading-relaxed text-blue-700">{operator.valuation}</p>
                </div>
              )}
            </div>

            {/* Métodos de Pago Expandidos */}
            {operator.payment_methods.length > 0 && (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-gray-800">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  {operator.payment_methods.map((method, idx) => (
                    <div key={idx} className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm">
                      {method.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer Legal */}
            {operator.legal_disclaimer && (
              <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-xs leading-relaxed text-gray-600">{operator.legal_disclaimer}</p>
              </div>
            )}
            <div className='flex flex-col gap-1 pt-4 lg:hidden'>
              {/* Botón Review */}
              <a
                href={operator.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex mx-auto w-1/2 justify-center items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 ${getButtonColor(operator.button.color)}`}
              >
                {operator.button.text}
              </a>
              {/* Botón Review */}
              <a
                href={operator.review_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex mx-auto w-1/2 justify-center items-center rounded-lg border-2 border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 ${getButtonColor(operator.review_button.color)}`}
              >
                {operator.review_button.text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}