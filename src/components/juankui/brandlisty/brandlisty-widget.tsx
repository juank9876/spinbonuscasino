"use client"

import { useEffect, useState, useRef } from "react"
import { toggleMoreInfo } from "./toggleMoreInfo"
import { debug, debugLog } from "@/config/debug-log"
import { transformHtmlForSidebar } from "@/components/juankui/css-content"

interface Props {
    apiKey: string
    listId: string
    boton?: string
    limit?: string
    dataWidget: string
    sidebarMode?: boolean // Nuevo prop para indicar si está en sidebar
}
function removeUniversalReset (cssString: string) {
    let exactRuleRegex = cssString.replace(/\*\s*{[^}]*}/g, '');
    exactRuleRegex = exactRuleRegex.replace(/onclick="[^"]*"/g, '');

    return exactRuleRegex
}

export default function BrandlistyWidget ({
    apiKey,
    listId,
    boton = "Visit now",
    limit = "10",
    dataWidget,
    sidebarMode
}: Props) {
    const [html, setHtml] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const contenedorRef = useRef<HTMLDivElement>(null);

    const test = `<div class="relative flex w-full flex-col overflow-auto rounded border bg-white shadow">
    <div class="external-casino-list-container max-w-full overflow-auto break-words">



        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap"
            rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
        <style>
            :root {
                --primary-color: #2563eb;
                --primary-hover: #1d4ed8;
                --secondary-color: #64748b;
                --success-color: #059669;
                --warning-color: #d97706;
                --danger-color: #dc2626;
                --info-color: #0891b2;
                --light-color: #f8fafc;
                --dark-color: #1e293b;
                --border-color: #e2e8f0;
                --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
                --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
                --radius: 0.5rem;
                --radius-lg: 0.75rem;
            }

            /*  */

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: var(--dark-color);
                background-color: #ffffff;
            }

            .brands-container {
                max-width: 1050px;
                margin: 0 auto;
                padding: 2rem 1rem;
            }

            .brands-header {
                text-align: center;
                margin-bottom: 3rem;
            }

            .brands-header h1 {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--dark-color);
                margin-bottom: 1rem;
            }

            .brands-header p {
                font-size: 1.125rem;
                color: var(--secondary-color);
                max-width: 600px;
                margin: 0 auto;
            }

            .filter-section {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                margin-bottom: 2rem;
                box-shadow: var(--shadow-sm);
            }

            .filter-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .filter-title {
                font-size: 1.125rem;
                font-weight: 600;
                color: var(--dark-color);
            }

            .results-count {
                font-size: 0.875rem;
                color: var(--secondary-color);
                background: var(--light-color);
                padding: 0.25rem 0.75rem;
                border-radius: var(--radius);
            }

            .category-filters {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
                align-items: center;
            }

            .filter-btn {
                padding: 0.5rem 1rem;
                border: 1px solid var(--border-color);
                background: white;
                color: var(--secondary-color);
                border-radius: var(--radius);
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                font-family: inherit;
            }

            .filter-btn:hover {
                background: var(--light-color);
                border-color: var(--primary-color);
                color: var(--primary-color);
            }

            .filter-btn.active {
                background: var(--primary-color);
                border-color: var(--primary-color);
                color: white;
            }

            .filter-btn .count {
                background: rgba(255, 255, 255, 0.2);
                padding: 0.125rem 0.375rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
            }

            .filter-btn:not(.active) .count {
                background: var(--light-color);
                color: var(--secondary-color);
            }

            .clear-filters {
                color: var(--danger-color);
                font-size: 0.875rem;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                background: transparent;
                border: none;
                cursor: pointer;
                font-family: inherit;
            }

            .clear-filters:hover {
                text-decoration: underline;
            }

            .brands-grid {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 2rem;
            }

            .brand-card {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                overflow: hidden;
                box-shadow: var(--shadow-md);
                transition: all 0.3s ease;
                position: relative;
                display: flex;
                flex-direction: column;
                min-height: 140px;
            }

            .brand-card-content {
                display: flex;
                align-items: stretch;
                flex: 1;
            }

            .brand-card:hover {
                transform: translateY(-2px);
                box-shadow: var(--shadow-lg);
            }

            .brand-left {
                flex: 0 0 240px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-right: 1px solid var(--border-color);
                padding: 1.5rem;
                position: relative;
                min-height: 160px;
            }

            .brand-center {
                flex: 1;
                padding: 1rem 1.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .brand-right {
                flex: 0 0 180px;
                padding: 1rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 0.75rem;
                background: var(--light-color);
                border-left: 1px solid var(--border-color);
            }

            .brand-header {
                position: static;
                padding: 0;
                background: none;
                border-bottom: none;
                text-align: center;
            }

            .brand-position {
                position: absolute;
                top: 0.5rem;
                left: 0.5rem;
                background: var(--primary-color);
                color: white;
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.75rem;
            }

            .brand-badge {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius);
                font-size: 0.625rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .badge-primary {
                background: var(--primary-color);
                color: white;
            }

            .badge-success {
                background: var(--success-color);
                color: white;
            }

            .badge-warning {
                background: var(--warning-color);
                color: white;
            }

            .badge-danger {
                background: var(--danger-color);
                color: white;
            }

            .badge-info {
                background: var(--info-color);
                color: white;
            }

            .badge-secondary {
                background: var(--secondary-color);
                color: white;
            }

            .badge-pill {
                border-radius: 9999px;
            }

            .badge-tag {
                border-radius: var(--radius);
                position: relative;
            }

            .badge-tag:before {
                content: '';
                position: absolute;
                left: -4px;
                top: 50%;
                transform: translateY(-50%);
                width: 0;
                height: 0;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
                border-right: 6px solid currentColor;
            }

            .brand-logo {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 0 0.5rem 0;
            }

            .brand-logo img {
                max-width: 200px;
                max-height: 90px;
                object-fit: contain;
            }

            .brand-name {
                text-align: center;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--dark-color);
                margin-bottom: 0.25rem;
                line-height: 1.2;
            }

            .brand-rating {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.25rem;
                margin-bottom: 0;
            }

            .stars {
                color: #fbbf24;
                font-size: 0.75rem;
            }

            .rating-value {
                font-weight: 600;
                color: var(--dark-color);
                font-size: 0.75rem;
            }

            .brand-body {
                padding: 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }

            .brand-main-info {
                margin-bottom: 0.75rem;
            }

            .brand-offers {
                margin-bottom: 0.75rem;
            }

            .offer-item {
                background: var(--light-color);
                padding: 0.375rem 0.5rem;
                border-radius: var(--radius);
                margin-bottom: 0.375rem;
                border-left: 3px solid var(--primary-color);
            }

            .offer-main {
                font-weight: 600;
                color: var(--dark-color);
                margin-bottom: 0.125rem;
                font-size: 0.75rem;
                line-height: 1.2;
            }

            .offer-secondary {
                font-size: 0.6875rem;
                color: var(--secondary-color);
                line-height: 1.2;
            }

            .brand-description {
                background: var(--light-color);
                padding: 0.5rem;
                border-radius: var(--radius);
                margin-bottom: 0.75rem;
                font-size: 0.75rem;
                color: var(--secondary-color);
                line-height: 1.3;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .brand-actions {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                align-items: stretch;
                margin-bottom: 0;
            }

            .btn {
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.75rem;
                text-align: center;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
                width: 100%;
            }

            .btn-primary {
                background: var(--primary-color);
                color: white;
            }

            .btn-primary:hover {
                background: var(--primary-hover);
            }

            .btn-secondary {
                background: white;
                color: var(--secondary-color);
                border: 1px solid var(--border-color);
            }

            .btn-secondary:hover {
                background: var(--light-color);
            }

            .btn-success {
                background: var(--success-color);
                color: white;
            }

            .btn-warning {
                background: var(--warning-color);
                color: white;
            }

            .btn-danger {
                background: var(--danger-color);
                color: white;
            }

            .btn-info {
                background: var(--info-color);
                color: white;
            }

            .min-deposit {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                background: var(--success-color);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius);
                font-size: 0.625rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                justify-content: center;
            }

            .more-info-toggle {
                width: 100%;
                background: var(--light-color);
                color: var(--secondary-color);
                border: 1px solid var(--border-color);
                padding: 0.375rem;
                border-radius: var(--radius);
                font-size: 0.75rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
                margin-top: 0.5rem;
            }

            .more-info-toggle:hover {
                background: #e2e8f0;
            }

            .more-info-toggle.active {
                background: var(--primary-color);
                color: white;
                border-color: var(--primary-color);
            }

            .more-info-content {
                display: none;
                background: #fafbfc;
                border-top: 1px solid var(--border-color);
                padding: 1.5rem;
                margin-top: 0;
                border-radius: 0 0 var(--radius-lg) var(--radius-lg);
                width: 100%;
            }

            .more-info-content.show {
                display: block;
                animation: slideDown 0.3s ease;
            }

            .brand-quick-info {
                display: flex;
                flex-direction: column;
                gap: 0.375rem;
                font-size: 0.75rem;
                color: var(--secondary-color);
                text-align: center;
            }

            .quick-info-item {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.25rem;
            }

            .quick-info-item i {
                color: var(--primary-color);
                font-size: 0.625rem;
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .info-section {
                margin-bottom: 1rem;
                width: 100%;
            }

            .info-section:last-child {
                margin-bottom: 0;
            }

            .more-info-content .info-section {
                margin-bottom: 1.5rem;
            }

            .more-info-content .info-section:last-child {
                margin-bottom: 0;
            }

            .info-section h4 {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--dark-color);
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .features-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                margin-bottom: 1.5rem;
                width: 100%;
            }

            .more-info-content .features-grid {
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
            }

            .more-info-content .features-grid.pros-cons {
                grid-template-columns: 1fr 1fr;
            }

            .more-info-content .features-grid.single-features {
                grid-template-columns: 1fr;
            }

            .more-info-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1.5rem;
                align-items: start;
                width: 100%;
            }

            .more-info-full-width {
                width: 100%;
                grid-column: 1 / -1;
            }

            .more-info-two-columns {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                width: 100%;
            }

            .more-info-three-columns {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 1.5rem;
                width: 100%;
            }

            .more-info-left,
            .more-info-right {
                width: 100%;
            }

            .feature-list {
                list-style: none;
                width: 100%;
            }

            .more-info-content .feature-list {
                padding: 0;
                margin: 0;
            }

            .feature-list li {
                padding: 0.25rem 0;
                font-size: 0.75rem;
                color: var(--secondary-color);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .feature-list.pros li:before {
                content: '✓';
                color: var(--success-color);
                font-weight: bold;
            }

            .feature-list.cons li:before {
                content: '✗';
                color: var(--danger-color);
                font-weight: bold;
            }

            .feature-list.features li:before {
                content: '•';
                color: var(--primary-color);
                font-weight: bold;
            }

            .brand-valuation {
                background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                border: 1px solid #bfdbfe;
                padding: 0.75rem;
                border-radius: var(--radius);
                margin-bottom: 1rem;
                width: 100%;
            }

            .more-info-content .brand-valuation {
                padding: 1rem;
                margin-bottom: 1.5rem;
            }

            .valuation-header {
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .valuation-text {
                font-size: 0.75rem;
                color: var(--secondary-color);
                line-height: 1.4;
            }

            .payment-methods h4 {
                font-size: 0.75rem;
                font-weight: 600;
                color: var(--dark-color);
                margin-bottom: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .payment-icons {
                display: flex;
                flex-wrap: wrap;
                gap: 0.375rem;
                width: 100%;
                justify-content: flex-start;
            }

            .more-info-content .payment-icons {
                justify-content: flex-start;
                gap: 0.75rem;
            }

            .payment-icon {
                background: white;
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                padding: 0.375rem 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.6875rem;
                color: var(--secondary-color);
            }

            /* CTA móvil - Oculto por defecto en desktop */
            .mobile-cta-section {
                display: none;
            }

            .mobile-cta-container {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                margin-top: 1rem;
            }

            .mobile-min-deposit {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
                background: var(--success-color);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: var(--radius);
                font-size: 0.875rem;
                font-weight: 600;
            }

            .mobile-brand-actions {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                width: 100%;
                max-width: 300px;
            }

            .mobile-brand-actions .btn {
                padding: 0.75rem 1.5rem;
                font-size: 0.875rem;
                font-weight: 600;
                border-radius: var(--radius);
            }

            .disclaimer {
                font-size: 0.6875rem;
                color: var(--secondary-color);
                padding: 0.75rem;
                background: var(--light-color);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                line-height: 1.3;
                width: 100%;
            }

            .more-info-content .disclaimer {
                padding: 1rem;
                font-size: 0.75rem;
                line-height: 1.4;
                text-align: left;
            }

            @media (max-width: 768px) {
                .brand-card {
                    flex-direction: column;
                    min-height: auto;
                }

                .brand-left {
                    flex: none;
                    border-right: none;
                    border-bottom: 1px solid var(--border-color);
                }

                .brand-center {
                    padding: 1rem;
                }

                .brand-right {
                    flex: none;
                    border-left: none;
                    border-top: 1px solid var(--border-color);
                    flex-direction: row;
                    justify-content: space-around;
                    gap: 0.5rem;
                }

                .brand-actions {
                    flex-direction: row;
                    gap: 0.5rem;
                }

                .filter-section {
                    margin: 0 0.5rem 1.5rem;
                }

                .more-info-grid {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .more-info-two-columns {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .more-info-three-columns {
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                .more-info-content .features-grid.pros-cons {
                    grid-template-columns: 1fr 1fr;
                }

                .more-info-content .features-grid.single-features {
                    grid-template-columns: 1fr;
                }

                /* Mostrar CTA móvil solo en dispositivos móviles */
                .mobile-cta-section {
                    display: block !important;
                }

                .mobile-brand-actions {
                    flex-direction: column;
                    gap: 0.5rem;
                    max-width: 300px;
                }

                .mobile-brand-actions .btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                }
            }

            @media (max-width: 480px) {
                .brands-container {
                    padding: 1rem 0.5rem;
                }

                .brand-left {
                    flex: 0 0 120px;
                    padding: 0.75rem;
                }

                .brand-logo img {
                    max-width: 100px;
                    max-height: 35px;
                }

                .brand-center {
                    padding: 0.75rem 1rem;
                }

                .brand-right {
                    flex: 0 0 auto;
                    padding: 0.75rem;
                }
            }

            .loading {
                text-align: center;
                padding: 3rem;
                color: var(--secondary-color);
            }

            .error {
                text-align: center;
                padding: 3rem;
                color: var(--danger-color);
                background: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: var(--radius);
                margin: 2rem;
            }

            .no-data {
                text-align: center;
                padding: 3rem;
                color: var(--secondary-color);
                background: var(--light-color);
                border: 1px solid var(--border-color);
                border-radius: var(--radius);
                margin: 2rem;
            }

            .empty-state {
                text-align: center;
                padding: 4rem 2rem;
                color: var(--secondary-color);
                background: var(--light-color);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-lg);
                margin: 2rem 0;
            }

            .empty-state h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                color: var(--dark-color);
            }

            .empty-state p {
                font-size: 1rem;
                margin-bottom: 1.5rem;
            }

            .empty-state .bi {
                font-size: 3rem;
                margin-bottom: 1rem;
                opacity: 0.5;
            }

            .filter-loading {
                display: none;
                text-align: center;
                padding: 2rem;
                color: var(--secondary-color);
            }

            .filter-loading.show {
                display: block;
            }

            .category-badge {
                position: absolute;
                top: 0.5rem;
                right: 3rem;
                background: var(--info-color);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius);
                font-size: 0.625rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .smooth-transition {
                transition: all 0.3s ease;
            }

            .fade-in {
                animation: fadeInUp 0.6s ease forwards;
                opacity: 0;
                transform: translateY(20px);
            }

            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .filter-btn:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }

            .brands-grid.loading {
                opacity: 0.5;
                pointer-events: none;
            }

            /* Tablet Layout */
            @media (max-width: 1024px) and (min-width: 769px) {
                .brands-container {
                    padding: 1.5rem 1rem;
                }

                .brand-card {
                    min-height: 140px;
                }

                .brand-left {
                    flex: 0 0 200px;
                    padding: 1.25rem;
                }

                .brand-logo img {
                    max-height: 80px;
                }

                .brand-center {
                    padding: 1rem 1.25rem;
                }

                .brand-right {
                    flex: 0 0 160px;
                    padding: 1rem 0.75rem;
                    gap: 0.5rem;
                }

                .brand-description {
                    font-size: 0.8rem;
                    line-height: 1.4;
                    -webkit-line-clamp: 3;
                    line-clamp: 3;
                }

                .offer-item {
                    padding: 0.25rem 0.375rem;
                    margin-bottom: 0.25rem;
                }

                .offer-main {
                    font-size: 0.7rem;
                }

                .offer-secondary {
                    font-size: 0.65rem;
                }

                .brand-quick-info {
                    gap: 0.5rem;
                    font-size: 0.7rem;
                }

                .quick-info-item i {
                    font-size: 0.6rem;
                }

                .btn {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.7rem;
                }

                .min-deposit {
                    font-size: 0.6rem;
                    padding: 0.2rem 0.4rem;
                }

                .more-info-toggle {
                    font-size: 0.7rem;
                    padding: 0.25rem;
                }

                .more-info-content {
                    padding: 1.25rem;
                }

                .more-info-three-columns {
                    grid-template-columns: 1fr 1fr;
                    gap: 1.25rem;
                }

                .feature-list li {
                    font-size: 0.7rem;
                }

                .payment-icons {
                    gap: 0.5rem;
                }

                .payment-icon {
                    padding: 0.25rem 0.375rem;
                    font-size: 0.65rem;
                }

                .filter-section {
                    margin: 0 0.75rem 1.5rem;
                    padding: 1.25rem;
                }

                .category-filters {
                    gap: 0.625rem;
                }

                .filter-btn {
                    padding: 0.375rem 0.875rem;
                    font-size: 0.8rem;
                }

                .brands-header h1 {
                    font-size: 2rem;
                }

                .brands-header p {
                    font-size: 1rem;
                }
            }

            /* Mobile Layout */
            @media (max-width: 768px) {
                .brands-container {
                    padding: 1rem 0.5rem;
                }

                .brand-card {
                    flex-direction: column;
                    min-height: auto;
                    border-radius: var(--radius);
                }

                .brand-card-content {
                    flex-direction: column;
                }

                .brand-left {
                    flex: none;
                    width: 100%;
                    min-height: 100px;
                    padding: 1rem;
                    border-right: none;
                    border-bottom: 1px solid var(--border-color);
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .brand-header {
                    flex: 1;
                    text-align: left;
                    margin-right: 1rem;
                }

                .brand-logo {
                    margin: 0 0 0.25rem 0;
                }

                .brand-logo img {
                    max-width: 80px;
                    max-height: 35px;
                }

                .brand-name {
                    font-size: 0.875rem;
                    text-align: left;
                    margin-bottom: 0.25rem;
                }

                .brand-rating {
                    justify-content: flex-start;
                }

                .brand-center {
                    padding: 1rem;
                    order: 2;
                }

                .brand-description {
                    -webkit-line-clamp: 4;
                    line-clamp: 4;
                    font-size: 0.8rem;
                    line-height: 1.4;
                    margin-bottom: 1rem;
                }

                .brand-right {
                    flex: none;
                    width: 100%;
                    padding: 1rem;
                    border-left: none;
                    border-top: 1px solid var(--border-color);
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    background: white;
                    order: 3;
                    gap: 0.75rem;
                }

                .brand-quick-info {
                    flex-direction: row;
                    gap: 1rem;
                    text-align: center;
                    justify-content: center;
                    margin-bottom: 0.5rem;
                }

                .brand-actions {
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-left: auto;
                    width: 100%;
                }

                .btn {
                    padding: 0.5rem 0.75rem;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    width: 100%;
                    text-align: center;
                }

                .min-deposit {
                    margin-bottom: 0.5rem;
                    margin-right: 0;
                    align-self: center;
                    width: auto;
                }

                .more-info-grid {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .more-info-three-columns {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .more-info-content .features-grid.pros-cons {
                    grid-template-columns: 1fr 1fr;
                }

                .filter-section {
                    margin: 0 0.5rem 1rem;
                    padding: 1rem;
                }

                .category-filters {
                    gap: 0.5rem;
                }

                .filter-btn {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.75rem;
                }

                .brands-header h1 {
                    font-size: 1.75rem;
                }

                .brands-header p {
                    font-size: 1rem;
                }
            }

            @media (max-width: 480px) {
                .brands-container {
                    padding: 0.5rem 0.25rem;
                }

                .brand-left {
                    padding: 0.75rem;
                    min-height: 80px;
                }

                .brand-logo img {
                    max-width: auto;
                    max-height: 100px;
                }

                .brand-center {
                    padding: 0.75rem;
                }

                .brand-description {
                    -webkit-line-clamp: 5;
                    line-clamp: 5;
                    font-size: 0.85rem;
                    line-height: 1.4;
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                }

                .brand-right {
                    padding: 0.75rem;
                    flex-direction: column;
                    gap: 0.75rem;
                    align-items: stretch;
                }

                .brand-quick-info {
                    flex-direction: column;
                    gap: 0.5rem;
                    text-align: center;
                }

                .brand-actions {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .btn {
                    width: 100%;
                    text-align: center;
                }

                .min-deposit {
                    align-self: center;
                    margin-bottom: 0.5rem;
                    margin-right: 0;
                    width: auto;
                }

                .more-info-content .features-grid.pros-cons {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .filter-section {
                    margin: 0 0.25rem 0.75rem;
                    padding: 0.75rem;
                }

                .category-filters {
                    flex-direction: column;
                    align-items: stretch;
                }

                .filter-btn {
                    width: 100%;
                    justify-content: center;
                }

                .brands-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .brands-header h1 {
                    font-size: 1.5rem;
                }
            }
        </style>



        <div class="brands-container" id="iframe_68f2389908f65">

            <div class="brands-grid">
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-primary">Mejor bono</div>
                            <div class="brand-position">1</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752785016_FDjur7Cy.png"
                                        alt="Codere" loading="lazy">
                                </div>

                                <div class="brand-name">Codere</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    Codere es uno de los pioneros del juego en nuestro país. Nos permite depositar y
                                    cobrar en sus locales, y es un operador de referencia en España y América Latina.
                                </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">

                            <div class="brand-quick-info">
                                <div class="quick-info-item">
                                    <i class="bi bi-star"></i>
                                    Amplia variedad de deportes
                                </div>

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    6 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/0oLpsGWJNHP2f0wzeBnBR7ePN" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->
                            <div class="info-section more-info-full-width">
                                <div class="brand-valuation">
                                    <div class="valuation-header">Expert Valuation</div>
                                    <div class="valuation-text">Codere ofrece una plataforma fiable y segura, donde las
                                        promociones se construyen sobre la lealtad y la transparencia, más que sobre una
                                        primera impresión "deslumbrante" que la ley ya no permite. Es una opción sólida
                                        para quienes buscan una experiencia de juego sostenida y regulada.</div>
                                </div>
                            </div>

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">
                                        <h4>Features</h4>
                                        <ul class="feature-list features">
                                            <li>Amplia variedad de deportes</li>
                                            <li>Diversos métodos de pago</li>
                                            <li>Atención al cliente en español</li>
                                        </ul>

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Seguridad y confianza.</li>
                                            <li>Amplia variedad de mercados.</li>
                                            <li>Facilidad de uso.</li>
                                            <li>Promociones regulares.</li>
                                            <li>Atención al cliente eficiente.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                        <h4>Cons</h4>
                                        <ul class="feature-list cons">
                                            <li>Velocidad en retiros lenta</li>
                                            <li>Faltan promociones personalizadas</li>
                                            <li>Algunos fallos en app móvil</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i
                                                class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i
                                                class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i
                                                class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-bank me-2"></i>
                                            Bank Transfer
                                        </div>
                                        <div class="payment-icon">
                                            <i
                                                class="bi bi-google me-2"></i>
                                            Google Pay
                                        </div>
                                        <div class="payment-icon">
                                            <i
                                                class="bi bi-apple me-2"></i>
                                            Apple Pay
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->
                            <div class="info-section more-info-full-width">
                                <div class="disclaimer">
                                    <strong>Legal Disclaimer:</strong> Para recibir el bono, se deberán realizar
                                    apuestas (con una cuota mínima de 2.00) por un valor equivalente al del depósito
                                    realizado. Codere opera legalmente en España bajo la licencia de la Dirección
                                    General de Ordenación del Juego (DGOJ). Codere ofrece herramientas como límites de
                                    depósito, autoexclusión y pausas temporales para promover prácticas de juego
                                    responsable.
                                </div>
                            </div>

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/0oLpsGWJNHP2f0wzeBnBR7ePN" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-primary">Mejor bono</div>
                            <div class="brand-position">2</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752785549_vetCLnWf.png"
                                        alt="Leovegas" loading="lazy">
                                </div>

                                <div class="brand-name">Leovegas</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    La casa de apuestas que mejor se adapta a los dispositivos móviles, con una
                                    excelente oferta de mercados y cuotas siempre competitivas. Un operador de
                                    referencia. </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">

                            <div class="brand-quick-info">

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    6 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/8d409adwmpvqIBrGbW0RxCChm" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->
                            <div class="info-section more-info-full-width">
                                <div class="brand-valuation">
                                    <div class="valuation-header">Expert Valuation</div>
                                    <div class="valuation-text">LeoVegas es un operador muy recomendable en España,
                                        especialmente para aquellos que buscan una experiencia de juego de casino de
                                        primer nivel en dispositivos móviles y una sección de apuestas deportivas
                                        robusta y con buenas cuotas. Su compromiso con la regulación y la experiencia
                                        del usuario la convierten en una elección fiable y gratificante para el jugador
                                        español.</div>
                                </div>
                            </div>

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Interfaz amigable.</li>
                                            <li>Variedad de mercados.</li>
                                            <li>Seguridad avanzada.</li>
                                            <li>Atención al cliente 24/7.</li>
                                            <li>Bonificaciones atractivas.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet2 me-2"></i>
                                            Neteller
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet-fill me-2"></i>
                                            Skrill
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-bank me-2"></i>
                                            Bank Transfer
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->
                            <div class="info-section more-info-full-width">
                                <div class="disclaimer">
                                    <strong>Legal Disclaimer:</strong> Al registrarte en LeoVegas.es, estás aceptando un
                                    contrato legal con LeoVegas Gaming Group, que opera bajo las licencias de la
                                    Dirección General de Ordenación del Juego (DGOJ) en España. Debes ser mayor de 18
                                    años y residir en España para usar el servicio. Toda la información personal que
                                    facilites (DNI/NIE, fecha de nacimiento, dirección) debe ser real y verificable.
                                    Debido a la normativa española (Real Decreto 958/2020), no hay bonos de bienvenida
                                    iniciales para nuevos usuarios. Las promociones solo se ofrecen a clientes con más
                                    de 30 días de antigüedad y cuenta verificada.
                                </div>
                            </div>

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/8d409adwmpvqIBrGbW0RxCChm" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-primary">Mejor bono</div>
                            <div class="brand-position">3</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752785702_i6RczKML.png"
                                        alt="Tonybet" loading="lazy">
                                </div>

                                <div class="brand-name">Tonybet</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    Ahora Circus es Tonybet, un operador con un gran potencial y cuotas de lo más
                                    competitivas cuando queremos apostar al favorito en cualquier evento. </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">

                            <div class="brand-quick-info">

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    8 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/XpLgpUZc7mi7IVwtCRl8MoIwH" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->
                            <div class="info-section more-info-full-width">
                                <div class="brand-valuation">
                                    <div class="valuation-header">Expert Valuation</div>
                                    <div class="valuation-text">TonyBet es una opción muy competente y segura para el
                                        jugador español que busca una experiencia completa con un catálogo amplio tanto
                                        en apuestas deportivas como en casino. Es una plataforma en la que se puede
                                        confiar, respaldada por la licencia de la DGOJ. Si bien podría pulir aspectos
                                        como la visibilidad de sus promociones para clientes fieles o la atención al
                                        cliente, su oferta principal y la solidez de su plataforma la convierten en un
                                        jugador a tener en cuenta en el mercado español.</div>
                                </div>
                            </div>

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Gran variedad de deportes y mercados.</li>
                                            <li>Programa VIP con beneficios exclusivos.</li>
                                            <li>Apuestas en vivo y cash out.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet-fill me-2"></i>
                                            Skrill
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet2 me-2"></i>
                                            Neteller
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-bank me-2"></i>
                                            Bank Transfer
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-safe-fill me-2"></i>
                                            Paysafecard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-apple me-2"></i>
                                            Apple Pay
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->
                            <div class="info-section more-info-full-width">
                                <div class="disclaimer">
                                    <strong>Legal Disclaimer:</strong> Debes ser mayor de 18 años (la edad legal en
                                    España) y residir en el territorio español. Toda la información personal que
                                    facilites (nombre completo, DNI/NIE, fecha de nacimiento, dirección) debe ser real y
                                    exacta. La normativa española establece un límite de depósito de 150€ hasta que tu
                                    identidad principal (DNI/NIE, nombre y fecha de nacimiento) haya sido verificada por
                                    el operador. Debido al Real Decreto 958/2020, los operadores NO pueden ofrecer bonos
                                    de bienvenida a nuevos usuarios.
                                </div>
                            </div>

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/XpLgpUZc7mi7IVwtCRl8MoIwH" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-danger">Mejor bono Bwin</div>
                            <div class="brand-position">4</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752784984_od2BAMXq.png"
                                        alt="Bwin" loading="lazy">
                                </div>

                                <div class="brand-name">Bwin</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    Se hizo un nombre gracias a los patrocinios deportivos, pero es una de las casas más
                                    grandes de Europa con una gran cobertura de eventos. Abre mercados con mucha
                                    antelación. </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">

                            <div class="brand-quick-info">

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    5 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/k6sqMfZXZcmkFGe4sxkxYVrJS" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->
                            <div class="info-section more-info-full-width">
                                <div class="brand-valuation">
                                    <div class="valuation-header">Expert Valuation</div>
                                    <div class="valuation-text">Bwin España es una opción altamente recomendable y de
                                        confianza para el jugador español. Si eres un aficionado a las apuestas
                                        deportivas, te beneficiarás de su vasta oferta de mercados, cuotas competitivas
                                        y la calidad de su streaming en vivo. Para los entusiastas del casino, su
                                        sección también es robusta y variada. Su solidez como marca y su estricto
                                        cumplimiento de la regulación DGOJ garantizan un entorno de juego seguro y
                                        fiable.</div>
                                </div>
                            </div>

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Amplia variedad de mercados y deportes.</li>
                                            <li>Streaming en vivo de alta calidad.</li>
                                            <li>Interfaz intuitiva y app móvil eficiente.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                        <h4>Cons</h4>
                                        <ul class="feature-list cons">
                                            <li>Términos de bonos algo restrictivos.</li>
                                            <li>Demoras ocasionales en los retiros.</li>
                                            <li>Atención al cliente mejorable en ciertos horarios.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet-fill me-2"></i>
                                            Skrill
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet2 me-2"></i>
                                            Neteller
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->
                            <div class="info-section more-info-full-width">
                                <div class="disclaimer">
                                    <strong>Legal Disclaimer:</strong> En España, Bwin opera bajo estricta licencia de
                                    la DGOJ, garantizando un marco legal y seguro. Esto implica la verificación
                                    obligatoria de identidad (KYC) para todos los usuarios, la implementación de
                                    herramientas de juego responsable (límites de depósito, autoexclusión) y la
                                    restricción de bonos de bienvenida a nuevos registros. Solo los clientes con cuenta
                                    verificada y 30+ días de antigüedad pueden acceder a promociones. Cumple con la
                                    normativa de protección de datos y asegura la transparencia en todos sus Términos y
                                    Condiciones.
                                </div>
                            </div>

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/k6sqMfZXZcmkFGe4sxkxYVrJS" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-primary">Mejor bono</div>
                            <div class="brand-position">5</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752784885_yc5PuYm4.png"
                                        alt="Betway" loading="lazy">
                                </div>

                                <div class="brand-name">Betway</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    Una casa de apuestas ideal para los aficionados a los eSports, también con una
                                    excelente oferta de apuestas en baloncesto o tenis... y, como no, en fútbol. </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">

                            <div class="brand-quick-info">

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    7 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/eF5t51J3ZdQRGUWyYemRGHkm8" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Variedad de mercados de apuestas.</li>
                                            <li>Interfaz fácil de usar.</li>
                                            <li>Grandes promociones y bonos.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-safe-fill me-2"></i>
                                            Paysafecard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet-fill me-2"></i>
                                            Skrill
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet2 me-2"></i>
                                            Neteller
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-bank me-2"></i>
                                            Bank Transfer
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/eF5t51J3ZdQRGUWyYemRGHkm8" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="brand-card smooth-transition" data-categories="all" data-iframe-id="iframe_68f2389908f65">
                    <div class="brand-card-content">
                        <!-- Columna izquierda: Logo y posición -->
                        <div class="brand-left">
                            <div class="brand-badge badge-top-right badge-pill badge-primary">Mejor bono</div>
                            <div class="brand-position">6</div>

                            <div class="brand-header">
                                <div class="brand-logo">
                                    <img src="https://pro.brandlisty.com/uploads/logos/logo_1752785608_wYgeHWsy.png"
                                        alt="Luckia" loading="lazy">
                                </div>

                                <div class="brand-name">Luckia</div>

                                <div class="brand-rating">
                                    <div class="stars"><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i
                                            class="bi bi-star"></i></div>
                                    <span class="rating-value">4.0/5</span>
                                </div>
                            </div>
                        </div>

                        <!-- Columna central: Información principal -->
                        <div class="brand-center">
                            <div class="brand-body">
                                <div class="brand-description">
                                    La casa de apuestas gallega dispone de una amplia red de locales en toda España y
                                    una web con excelentes cuotas en los deportes más populares entre los apostantes.
                                </div>


                                <button class="more-info-toggle">
                                    <span>More information</span>
                                    <i class="bi bi-chevron-down"></i>
                                </button>

                            </div>
                        </div>

                        <!-- Columna derecha: Acciones y datos clave -->
                        <div class="brand-right">
                            <div class="min-deposit">
                                <i class="bi bi-currency-dollar"></i>
                                Min: $5
                            </div>

                            <div class="brand-quick-info">

                                <div class="quick-info-item">
                                    <i class="bi bi-credit-card"></i>
                                    5 Payments
                                </div>
                            </div>

                            <div class="brand-actions">
                                <a href="https://clctracker.com/go/Q8DCkzTRCFBERz4mdEq0bbMag" target="_blank"
                                    rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                    class="btn btn-secondary">Review</a>
                            </div>
                        </div>

                    </div>

                    <!-- Contenido expandible que se muestra debajo de toda la tarjeta -->
                    <div class="more-info-content">
                        <div class="more-info-grid">
                            <!-- Expert Valuation - Ancho completo arriba -->
                            <div class="info-section more-info-full-width">
                                <div class="brand-valuation">
                                    <div class="valuation-header">Expert Valuation</div>
                                    <div class="valuation-text">Como experto, considero a Luckia España una opción muy
                                        sólida y fiable. Su gran ventaja es la integración omnicanal, combinando una
                                        robusta plataforma online con una extensa red de locales físicos, algo valorado
                                        por muchos usuarios. Ofrece una amplia variedad de mercados de apuestas
                                        deportivas y un casino completo con diversos juegos. Cumple estrictamente la
                                        regulación DGOJ, garantizando seguridad, transparencia y herramientas de juego
                                        responsable. Su enfoque en el mercado español y la familiaridad de su marca la
                                        convierten en una elección muy competitiva y confiable.</div>
                                </div>
                            </div>

                            <!-- Features, Pros y Contras - Tres columnas en la misma línea -->
                            <div class="info-section more-info-full-width">
                                <div class="more-info-three-columns">
                                    <!-- Columna 1: Features -->
                                    <div class="feature-section">

                                    </div>

                                    <!-- Columna 2: Pros -->
                                    <div class="feature-section">
                                        <h4>Pros</h4>
                                        <ul class="feature-list pros">
                                            <li>Interfaz fácil de usar y diseño responsivo.</li>
                                            <li>Amplia variedad de mercados y deportes emergentes.</li>
                                            <li>Métodos de pago modernos como Bizum y criptos.</li>
                                        </ul>
                                    </div>

                                    <!-- Columna 3: Contras -->
                                    <div class="feature-section">
                                        <h4>Cons</h4>
                                        <ul class="feature-list cons">
                                            <li>Promociones limitadas para ciertos mercados.</li>
                                            <li>Requisitos exigentes en algunos bonos.</li>
                                            <li>Tiempos de retiro variables según el método.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment Methods - Ancho completo -->
                            <div class="info-section more-info-full-width">
                                <div class="payment-methods">
                                    <h4>Payment Methods</h4>
                                    <div class="payment-icons">
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Visa
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-credit-card-fill me-2"></i>
                                            Mastercard
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-paypal me-2"></i>
                                            PayPal
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet-fill me-2"></i>
                                            Skrill
                                        </div>
                                        <div class="payment-icon">
                                            <i class="bi bi-wallet2 me-2"></i>
                                            Neteller
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Legal Disclaimer - Ancho completo abajo -->
                            <div class="info-section more-info-full-width">
                                <div class="disclaimer">
                                    <strong>Legal Disclaimer:</strong> Luckia opera en España bajo el estricto marco
                                    legal de la Dirección General de Ordenación del Juego (DGOJ). Esto implica total
                                    cumplimiento con la normativa de juego responsable, ofreciendo herramientas como
                                    límites de depósito y autoexclusión. Exige la verificación de identidad (KYC) para
                                    todos sus usuarios, un paso crucial para la seguridad y para permitir retiros. Las
                                    promociones y bonos, conforme a la ley, solo están disponibles para clientes con
                                    cuenta verificada y más de 30 días de antigüedad, eliminando bonos de bienvenida
                                    para nuevos registros.
                                </div>
                            </div>

                            <!-- CTA móvil - Solo visible en dispositivos móviles -->
                            <div class="info-section more-info-full-width mobile-cta-section">
                                <div class="mobile-cta-container">
                                    <div class="mobile-brand-actions">
                                        <a href="https://clctracker.com/go/Q8DCkzTRCFBERz4mdEq0bbMag" target="_blank"
                                            rel="nofollow noopener" class="btn btn-primary">Visit Site</a>
                                        <a href="https://estoesreview.com/1344" target="_blank" rel="nofollow noopener"
                                            class="btn btn-secondary">Review</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                // Funcionalidad de toggle independiente para cada tarjeta
                function toggleMoreInfo(button) {
                    const card = button.closest('.brand-card');
                    const content = card.querySelector('.more-info-content');
                    const icon = button.querySelector('i');
                    const spanText = button.querySelector('span');
                    const isCurrentlyExpanded = content.classList.contains('show');

                    // Simplemente alternar el estado de ESTA tarjeta únicamente
                    if (isCurrentlyExpanded) {
                        // Cerrar esta tarjeta
                        content.classList.remove('show');
                        button.classList.remove('active');
                        spanText.textContent = 'More information';
                        icon.className = 'bi bi-chevron-down';
                    } else {
                        // Abrir esta tarjeta
                        content.classList.add('show');
                        button.classList.add('active');
                        spanText.textContent = 'Less information';
                        icon.className = 'bi bi-chevron-up';

                        // Scroll suave hacia el contenido expandido después de la animación
                        setTimeout(() => {
                            content.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        }, 150);
                    }
                }

                // Independent filter functionality for multiple iframes
                document.addEventListener('DOMContentLoaded', function () {
                    const currentIframeId = 'iframe_68f2389908f65';
                    const currentContainer = document.getElementById(currentIframeId);

                    if (!currentContainer) return;

                    const filterButtons = currentContainer.querySelectorAll('.filter-btn, .clear-filters');
                    const brandsGrid = currentContainer.querySelector('.brands-grid');
                    const resultsCount = currentContainer.querySelector('.results-count');

                    // Add event listeners to filter buttons in this iframe only
                    filterButtons.forEach(button => {
                        button.addEventListener('click', function (e) {
                            e.preventDefault();

                            const targetCategory = this.getAttribute('data-category');
                            const iframeId = this.getAttribute('data-iframe-id');

                            // Only process if this button belongs to current iframe
                            if (iframeId !== currentIframeId) return;

                            // Update active states
                            filterButtons.forEach(btn => btn.classList.remove('active'));
                            if (targetCategory !== 'all') {
                                this.classList.add('active');
                            }

                            // Filter brands within this iframe only
                            filterBrandsInIframe(currentContainer, targetCategory);

                            // Update results count
                            updateResultsCount(currentContainer, targetCategory);

                            // Analytics tracking
                            const categoryName = this.textContent.trim().split('\n')[0];
                            
                        });
                    });

                    function filterBrandsInIframe(container, category) {
                        const brandCards = container.querySelectorAll('.brand-card[data-categories]');
                        let visibleCount = 0;

                        brandCards.forEach(card => {
                            const categories = card.getAttribute('data-categories').split(',');
                            const shouldShow = category === 'all' || categories.includes(category);

                            if (shouldShow) {
                                card.style.display = '';
                                card.classList.add('smooth-transition');
                                visibleCount++;
                            } else {
                                card.style.display = 'none';
                            }
                        });

                        // Show/hide empty state
                        const emptyState = container.querySelector('.empty-state');
                        if (emptyState) {
                            emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
                        }

                        return visibleCount;
                    }

                    function updateResultsCount(container, category) {
                        const resultsCount = container.querySelector('.results-count');
                        if (resultsCount) {
                            const visibleBrands = container.querySelectorAll('.brand-card[data-categories]:not([style*="display: none"])').length;
                            const resultText = visibleBrands + ' result' + (visibleBrands !== 1 ? 's' : '');
                            resultsCount.innerHTML = '<i class="bi bi-list-ul"></i> ' + resultText;
                        }
                    }
                });

                // Add click tracking for analytics
                document.querySelectorAll('a[href]').forEach(link => {
                    link.addEventListener('click', function (e) {
                        const brandName = this.closest('.brand-card')?.querySelector('.brand-name')?.textContent;
                        let actionType = 'unknown';

                        if (this.classList.contains('btn-secondary')) {
                            actionType = 'review';
                        } else if (this.classList.contains('filter-btn')) {
                            actionType = 'filter';
                        } else if (this.classList.contains('clear-filters')) {
                            actionType = 'clear_filter';
                        } else {
                            actionType = 'visit';
                        }

                        // You can add analytics tracking here
                       
                    });
                });

                // Track more info expansions
                document.querySelectorAll('.more-info-toggle').forEach(button => {
                    button.addEventListener('click', function () {
                        const brandName = this.closest('.brand-card')?.querySelector('.brand-name')?.textContent;
                        const isExpanding = !this.classList.contains('active');

                        // You can add analytics tracking here
                        
                    });
                });

                // Lazy loading for images
                if ('IntersectionObserver' in window) {
                    const imageObserver = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                img.src = img.dataset.src || img.src;
                                img.classList.remove('lazy');
                                imageObserver.unobserve(img);
                            }
                        });
                    });

                    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                        imageObserver.observe(img);
                    });
                }

                // Smooth animations for brand cards
                function animateBrandCards() {
                    const cards = document.querySelectorAll('.brand-card');
                    cards.forEach((card, index) => {
                        
                    });
                }

                // Initialize animations when page loads
                document.addEventListener('DOMContentLoaded', animateBrandCards);
            </script>


        </div>
    </div>
    <style>
        body {
            padding: 0px !important
        }

        * {}
    </style>
</div>`

    useEffect(() => {
        const fetchHtml = async () => {
            try {
                const params = new URLSearchParams({
                    apikey: apiKey,
                    hash: listId,
                    boton,
                    limit,
                    widget: dataWidget
                })

                //const url = `https://app.brandlisty.com/nowpcms.php?${params.toString()}`
                const url = `https://pro.brandlisty.com/nowph.php?${params.toString()}&category=all`
                const res = await fetch(url)

                debugLog(debug.brandlisty.url, '[+] Brandlisty URL:' + url)
                debugLog(debug.brandlisty.response, '[+] Brandlisty Response:' + res)

                if (!res.ok) throw new Error(`Error ${res.status}`)
                let htmlString = await res.text()

                debugLog(debug.brandlisty.html, '[+] Brandlisty HTML:' + htmlString)

                // Aplicar transformaciones
                let cleanedHtml = removeUniversalReset(htmlString)

                // Si está en modo sidebar, aplicar transformaciones CSS
                if (sidebarMode) {
                    console.log("[+] Aplicando transformaciones CSS para sidebar")
                    cleanedHtml = transformHtmlForSidebar(cleanedHtml)
                }

                setHtml(cleanedHtml)
            } catch (err) {
                console.error("Error al cargar Brandlisty:", err)
                setError("Error al cargar contenido de Brandlisty.")
            }
        }

        fetchHtml()
    }, [apiKey, listId, boton, limit, sidebarMode])


    //MORE INFO BUTTON
    useEffect(() => {
        const contenedor = contenedorRef.current;
        if (!contenedor) return;

        function handleClick (e: MouseEvent) {
            const target = e.target as HTMLElement;
            const button = target.closest('.more-info-toggle') as HTMLElement | null;
            if (button) {
                toggleMoreInfo(button, contenedorRef);
                return;
            }

            // --- Interceptar clicks en los filtros ---
            const filterLink = target.closest('a.filter-btn') as HTMLAnchorElement | null;
            if (filterLink) {
                e.preventDefault();

                const filterLinks = contenedor ? Array.from(contenedor.querySelectorAll('a.filter-btn')) : [];
                const parsedLink = new URL(filterLink.href);

                const url = `https://pro.brandlisty.com/nowph.php${parsedLink.search}`;
                //console.log(url)
                fetch(url)
                    .then(res => {
                        if (!res.ok) throw new Error(`Error ${res.status}`);
                        return res.text();
                    })
                    .then(htmlString => {
                        let cleanedHtml = removeUniversalReset(htmlString);

                        // Si está en modo sidebar, aplicar transformaciones CSS
                        if (sidebarMode) {
                            cleanedHtml = transformHtmlForSidebar(cleanedHtml);
                        }

                        setHtml(cleanedHtml);
                    })
                    .catch(err => {
                        setError("Error al cargar contenido de Brandlisty.");
                    });
            }
        }

        contenedor.addEventListener('click', handleClick);

        return () => {
            contenedor.removeEventListener('click', handleClick);
        };
    }, [html, apiKey, listId, boton, limit]);


    return (
        <div className="relative flex w-full flex-col overflow-auto rounded border bg-white shadow"
        //style={{ height: 800 }}
        >

            {error && <p className="text-sm text-red-600">{error}</p>}

            {!error && (
                <div
                    ref={contenedorRef}
                    className="external-casino-list-container max-w-full overflow-auto break-words"
                    dangerouslySetInnerHTML={{ __html: html }}
                    data-widget="1"
                />
            )}
            <style >{`
        body {
          padding: 0px !important
        }
        * {
        }
      `}</style>
        </div>
    )
}
