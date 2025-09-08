interface FooterItem {
    id: number
    column_id: number
    title: string
    url: string
    target: string
    sort_order: number
    status: string
    created_at: string
    updated_at: string
}

interface FooterColumn {
    id: number
    project_id: number
    title: string
    sort_order: number
    status: string
    created_at: string
    updated_at: string
    items: FooterItem[]
}

interface LegalImage {
    id: number
    project_id: number
    image_url: string
    link_url: string
    alt_text: string
    title: string
    sort_order: number
    status: string
    created_at: string
    updated_at: string
}

interface LegalLink {
    id: number
    project_id: number
    link_type: string
    title: string
    url: string
    target: string
    status: string
    created_at: string
    updated_at: string
}

interface Copyright {
    id: number
    project_id: number
    start_year: number
    end_year: number
    company_name: string
    copyright_text: string
    status: string
    created_at: string
    updated_at: string
}

export interface Footer {
    columns: FooterColumn[]
    legal_images: LegalImage[]
    legal_links: LegalLink[]
    copyright: Copyright
}