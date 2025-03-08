// SEO configuration for your NFT collection
export const seoConfig = {
    // Base site info
    siteName: 'Aimsomnia NFT Collection',
    siteUrl: 'https://[your-icp-canister-id].raw.ic0.app',
    
    // Default meta info (can be overridden per page)
    defaultTitle: 'Aimsomnia NFT Collection | Unique Digital Art on ICP',
    defaultDescription: 'Discover exclusive NFT artworks in the Aimsomnia Collection. Unique digital collectibles hosted on the Internet Computer Protocol (ICP) blockchain.',
    defaultImage: '/og-image.jpg',
    
    // Social media handles
    twitter: '@yourtwitterhandle', // Replace with your Twitter handle
    
    // Collection info
    collectionSize: '10000', // Replace with your collection size
    blockchain: 'Internet Computer',
};

// Helper function to generate meta tags for each page
export function generateMetaTags(options: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}) {
    const {
        title = seoConfig.defaultTitle,
        description = seoConfig.defaultDescription,
        image = seoConfig.defaultImage,
        url = seoConfig.siteUrl,
    } = options;

    return {
        title,
        description,
        'og:title': title,
        'og:description': description,
        'og:image': `${seoConfig.siteUrl}${image}`,
        'og:url': url,
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': `${seoConfig.siteUrl}${image}`,
        'twitter:card': 'summary_large_image',
    };
} 