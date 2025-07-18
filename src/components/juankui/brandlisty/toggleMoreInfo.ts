export function toggleMoreInfo(button: HTMLElement, contenedorRef: React.RefObject<HTMLDivElement | null>) {
    const card = button.closest('.brand-card');
    if (!card) return;
    const content = card.querySelector('.more-info-content') as HTMLElement | null;
    const icon = button.querySelector('i');
    const span = button.querySelector('span');
    if (!content || !icon || !span) return;

    const isExpanded = content.classList.contains('show');

    // Cerrar otros abiertos
    if (!isExpanded) {
        const contenedor = contenedorRef.current;
        if (contenedor) {
            contenedor.querySelectorAll('.more-info-content.show').forEach((otherContent: any) => {
                const otherCard = otherContent.closest('.brand-card');
                if (!otherCard) return;
                const otherButton = otherCard.querySelector('.more-info-toggle');
                const otherIcon = otherButton?.querySelector('i');
                const otherSpan = otherButton?.querySelector('span');

                otherContent.classList.remove('show');
                if (otherButton) otherButton.classList.remove('active');
                if (otherSpan) otherSpan.textContent = 'More information';
                if (otherIcon) otherIcon.className = 'bi bi-chevron-down';
            });
        }
    }

    if (isExpanded) {
        content.classList.remove('show');
        button.classList.remove('active');
        span.textContent = 'More information';
        icon.className = 'bi bi-chevron-down';
    } else {
        content.classList.add('show');
        button.classList.add('active');
        span.textContent = 'Less information';
        icon.className = 'bi bi-chevron-up';

        setTimeout(() => {
            content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}