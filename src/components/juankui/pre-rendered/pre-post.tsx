import { HeroPost } from '@/components/juankui/hero/hero'
import { MainWrapper } from '@/components/juankui/wrappers/main-wrapper'
import { Post } from '@/types/types'
import { ReactNode } from 'react'
import { ParticlesFull } from '../hero/particles'
import { isParticles } from '@/config/options'
import { Section } from '../wrappers/section'
import Image from 'next/image';
import { fetchAuthorById } from '@/api-fetcher/fetcher'

async function AuthorCard({ name, avatar, bio, author_id }: { name: string, avatar?: string, bio?: string, author_id: string }) {
  const author = await fetchAuthorById(author_id);
  let socialLinks: Record<string, string> = {};
  if (typeof author.social_links === 'string') {
    try {
      socialLinks = JSON.parse(author.social_links);
    } catch {
      socialLinks = {};
    }
  } else if (typeof author.social_links === 'object' && author.social_links !== null) {
    // Nos aseguramos de que sea un objeto plano con claves string y valores string
    socialLinks = Object.fromEntries(
      Object.entries(author.social_links).filter(
        ([k, v]) => typeof k === 'string' && typeof v === 'string'
      )
    );
  }

  const SOCIAL_LINKS = [
    {
      href: socialLinks.facebook, label: "Facebook", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
      )
    },
    {
      href: socialLinks.twitter, label: "Twitter", icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
      )
    },
    {
      href: socialLinks.instagram, label: "Instagram", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
      )
    },
    {
      href: socialLinks.youtube, label: "YouTube", icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
      )
    },
    {
      href: socialLinks.linkedin, label: "LinkedIn", icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><rect x="4" y="4" width="16" height="16" rx="2" /><line x1="8" y1="11" x2="8" y2="16" /><line x1="8" y1="8" x2="8" y2="8.01" /><line x1="12" y1="16" x2="12" y2="11" /><line x1="16" y1="16" x2="16" y2="13.5" /><path d="M12 11h4" /></svg>
      )
    },
  ];
  const validLinks = SOCIAL_LINKS.filter(link => !!link.href);

  // Si no hay enlaces válidos, no renderices la fila de iconos
  return (
    <div className="border-t border-b py-6 px-10 flex items-center gap-4 my-6 rounded-lg hover:to-[var(--color-primary-semi-dark)] transition-colors bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary-dark)]">
      <div className="flex-shrink-0">
        <Image
          src={avatar || 'https://api.dicebear.com/7.x/lorelei/svg?seed=default'}
          alt={name}
          width={56}
          height={56}
          className="rounded-full border object-cover"
        />
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="font-bold text-xl text-white pl-1">{name}</h3>
        {bio && <div className="text-slate-200 text-sm pl-1">{bio}</div>}
        {validLinks.length > 0 && (
          <div className="flex space-x-4 justify-start items-center mt-2">
            {validLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                className="text-slate-200 hover:text-white transition-colors"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export async function PrePost({ children, post }: { children: ReactNode, post: Post }) {
  return (
    <MainWrapper>
      {isParticles && <ParticlesFull />}
      <HeroPost {...post} />

      <Section>
        {children}
        {/* Card de autor MeriStation */}
        {post.author_name && (
          <AuthorCard
            author_id={post.author_id}
            name={post.author_name}
            avatar={post.author_avatar}
            bio={post.author_bio}
          />
        )}
      </Section>
    </MainWrapper>
  )
}