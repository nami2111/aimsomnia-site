import { initSatellite } from '@junobuild/core';
import { trackEvent } from '@junobuild/analytics';
import { ANALYTICS_CONFIG } from '../config/analytics.config';

/**
 * Analytics Service
 * Handles initialization and tracking of analytics events
 */
class AnalyticsService {
  private initialized = false;

  /**
   * Initialize analytics
   * This should be called once when the app starts
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      console.warn('Analytics already initialized');
      return;
    }

    try {
      // Initialize the satellite
      await initSatellite({
        satelliteId: ANALYTICS_CONFIG.satelliteId
      });
      
      this.initialized = true;
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
      throw error;
    }
  }

  /**
   * Track a page view
   * @param path - The path of the page being viewed
   */
  async trackPageView(path: string): Promise<void> {
    if (!this.initialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      await trackEvent({
        name: ANALYTICS_CONFIG.events.PAGE_VIEW,
        metadata: {
          path
        }
      });
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  /**
   * Track a collection view
   * @param collectionName - The name of the collection being viewed
   */
  async trackCollectionView(collectionName: string): Promise<void> {
    if (!this.initialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      await trackEvent({
        name: ANALYTICS_CONFIG.events.COLLECTION_VIEW,
        metadata: {
          collection_name: collectionName
        }
      });
    } catch (error) {
      console.error('Failed to track collection view:', error);
    }
  }

  /**
   * Track an external link click
   * @param url - The URL being clicked
   */
  async trackExternalLink(url: string): Promise<void> {
    if (!this.initialized) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      await trackEvent({
        name: ANALYTICS_CONFIG.events.EXTERNAL_LINK_CLICK,
        metadata: {
          url
        }
      });
    } catch (error) {
      console.error('Failed to track external link:', error);
    }
  }
}

// Export a singleton instance
export const analyticsService = new AnalyticsService(); 