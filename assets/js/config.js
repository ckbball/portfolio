/* Global site configuration. Single source of truth for identity + nav.
   Exposed as window.SITE so plain <script> files can read it without modules. */
window.SITE = {
  name: 'Caesar Ladion',
  titleSuffix: ' — Caesar Ladion',
  tagline: 'AI Engineer · Backend & Data Systems · Agent Evaluation',
  baseUrl: 'https://caesarladion.com',
  email: 'caesar.ladion@gmail.com',
  social: {
    github: 'https://github.com/ckbball',
    linkedin: 'https://www.linkedin.com/in/caesarladion',
    email: 'mailto:caesar.ladion@gmail.com',
  },
  nav: [
    { label: 'Projects', href: '/projects/' },
    { label: 'Writing', href: '/writing/' },
    { label: 'About', href: '/about.html' },
    { label: 'Resume', href: '/resume.html' },
  ],
};
