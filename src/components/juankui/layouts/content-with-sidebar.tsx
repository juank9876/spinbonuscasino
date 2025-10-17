import { ReactNode } from 'react';
import { Section } from '../wrappers/section';
import { LatestPosts } from '../sidebar-with-posts/latest-posts';
import { AuthorPosts } from '../sidebar-with-posts/author-posts';
import { CategoryPosts } from '../sidebar-with-posts/category-posts';
import { TagPosts } from '../sidebar-with-posts/tag-posts';
import { config } from '@/config/config';
import { BrandlistyLite } from '../sidebar-with-posts/brandlisty-lite';

interface SidebarConfig {
    latest?: boolean;
    author?: boolean;
    categories?: boolean;
    tags?: boolean;
    related?: boolean;
    brandlistyLite?: boolean;
}

interface SidebarData {
    author?: { id: string; name: string; avatar: string; bio: string };
    category?: { id: string | undefined; name: string | undefined; slug: string | undefined };
    tag?: { id: string | undefined; name: string | undefined; slug: string | undefined };
    postId?: string;
}

interface ContentWithSidebarProps {
    children: ReactNode;
    sidebarConfig?: SidebarConfig;
    sidebarData?: SidebarData;
    contentMaxWidth?: string;
    className?: string;
}

export function ContentWithSidebar({
    children,
    sidebarConfig,
    sidebarData,
    contentMaxWidth = 'max-w-[90vw] lg:max-w-[60vw]',
    className = ''
}: ContentWithSidebarProps) {
    // Verificar si al menos un componente del sidebar está habilitado
    const showSidebar = sidebarConfig && (
        sidebarConfig.latest ||
        sidebarConfig.author ||
        sidebarConfig.categories ||
        sidebarConfig.tags
    );

    // Obtener configuración del sidebar desde config
    const layoutWidth = `${config.components.layout.width.base} ${config.components.layout.width.lg} ${config.components.layout.width.xl}`;
    const sidebarWidth = `${config.components.sidebar.width.base} ${config.components.sidebar.width.lg} ${config.components.sidebar.width.xl}`;
    const containerGap = config.components.sidebar.gap;
    const spacerEnabled = config.components.sidebar.spacer.enabled;
    const spacerWidth = config.components.sidebar.spacer.width;

    return (
        <Section className={`pt-20 flex justify-center items-center ${className}`}>
            <div className={showSidebar ? `flex flex-row justify-center ${containerGap} ${layoutWidth}` : `flex justify-center ${contentMaxWidth}`}>
                {/* Spacer izquierdo solo si hay sidebar y está habilitado */}
                {/*showSidebar && spacerEnabled && <div className={`${spacerWidth} hidden lg:block`} />*/}

                {/* Contenido principal */}
                <div className={showSidebar ? ' w-full' : 'w-full'}>
                    {children}
                </div>

                {/* Sidebar */}
                {showSidebar && (
                    <div className={`flex-col ${containerGap} lg:flex hidden ${sidebarWidth}`}>
                        {sidebarConfig.brandlistyLite && <BrandlistyLite />}
                        {sidebarConfig.latest && <LatestPosts postId={sidebarData?.postId} />}
                        {sidebarConfig.author && sidebarData?.author && (
                            <AuthorPosts author={sidebarData.author} postId={sidebarData?.postId} />
                        )}
                        {sidebarConfig.categories && sidebarData?.category && (
                            <CategoryPosts category={sidebarData.category} postId={sidebarData?.postId} />
                        )}
                        {sidebarConfig.tags && sidebarData?.tag && (
                            <TagPosts tag={sidebarData.tag} postId={sidebarData?.postId} />
                        )}
                    </div>
                )}
            </div>
        </Section>
    );
}
