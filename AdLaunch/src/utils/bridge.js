/**
 * AdLaunch Platform Bridge Utilities
 */

export const generateShareLink = (platform, text, url = '') => {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const links = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    etsy: `https://www.etsy.com/share?text=${encodedText}`,
    instagram: `https://www.instagram.com/` // Direct text share not supported by web intent, user will paste
  };

  return links[platform] || '#';
};

export const getPlatformTemplate = (platform, description) => {
  const templates = {
    facebook: `Stop scrolling! 🚀\n\n${description}\n\nCheck it out here: [Your Link]\n\n#marketing #growth #facebookmarketing`,
    linkedin: `I am excited to share that we've been working on something special. 📈\n\n${description}\n\nFull details in the link below. Let's connect!\n\n#professional #innovation #networking`,
    etsy: `Handmade with love 🎨\n\n${description}\n\nFind this and more in my shop. Support small business!\n\n#etsyshop #handmade #creativebiz`,
    instagram: `Vibe Check ✨\n\n${description}\n\nLink in Bio! 🔗\n\n#instagram #lifestyle #growth #organic`
  };

  return templates[platform] || description;
};

export const PLATFORM_INFO = {
  facebook: {
    name: 'Facebook',
    tone: 'Community & Engagement',
    maxChars: 63206
  },
  linkedin: {
    name: 'LinkedIn',
    tone: 'Professional & Thought Leadership',
    maxChars: 3000
  },
  etsy: {
    name: 'Etsy',
    tone: 'Creative & Artisanal',
    maxChars: 5000
  },
  instagram: {
    name: 'Instagram',
    tone: 'Visual & Lifestyle',
    maxChars: 2200
  }
};
