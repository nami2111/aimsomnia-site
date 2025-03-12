<script lang="ts">
  import '../app.scss';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { analyticsService } from '$lib/services/analytics.service';

  onMount(async () => {
    try {
      // Initialize analytics
      await analyticsService.initialize();
      
      // Track initial page view
      await analyticsService.trackPageView($page.url.pathname);
      
      // Track subsequent page views
      page.subscribe(async ({ url }) => {
        await analyticsService.trackPageView(url.pathname);
      });
    } catch (error) {
      console.error('Failed to setup analytics:', error);
    }
  });
</script>

<slot /> 