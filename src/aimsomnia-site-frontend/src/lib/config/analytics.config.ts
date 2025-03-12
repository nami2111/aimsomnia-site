export const ANALYTICS_CONFIG = {
  // Satellite ID for analytics
  satelliteId: 'njql7-pqaaa-aaaal-asagq-cai',
  
  // Analytics event names
  events: {
    PAGE_VIEW: 'page_view',
    COLLECTION_VIEW: 'collection_view',
    EXTERNAL_LINK_CLICK: 'external_link_click'
  },
  
  // Web Vitals configuration
  webVitals: {
    enabled: true
  }
} as const; 