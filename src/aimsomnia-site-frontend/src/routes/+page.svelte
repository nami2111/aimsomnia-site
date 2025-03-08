<script>
  import "../index.scss";
  import { onMount } from "svelte";
  import collections from "../lib/collections.json";
  import EmptyStateIllustration from "../lib/Logo.svelte";

  let isLoading = true;
  let error = null;
  let collectionsData = [];
  let filteredCollections = [];
  let searchQuery = "";
  let currentPage = 1;
  let isDarkMode = false;
  const itemsPerPage = 9;

  $: visibleCollections = filteredCollections.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  $: totalPages = Math.ceil(filteredCollections.length / itemsPerPage);

  onMount(async () => {
    try {
      collectionsData = collections.collections;
      filteredCollections = collectionsData;
      console.log('Collections loaded:', collectionsData);
    } catch (err) {
      console.error('Error loading collections:', err);
      error = err.message || "Failed to load collections";
    } finally {
      isLoading = false;
    }
  });

  function handleSearch() {
    filteredCollections = collectionsData.filter(collection =>
      collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      collection.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
    currentPage = 1;
  }

  function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
  }
</script>

<style lang="scss">
  /* Import the global styles from the script section */
  :global {

    :root {
      --primary-color: #ffffff;
      --background-color: #000000;
      --text-color: #ffffff;
      --card-bg: #111111;
      --accent-color: #444444;
      --button-color: #333333;
      --button-hover: #555555;
    }

    body {
      font-family: 'IBM Plex Mono', monospace;
      background-color: var(--background-color);
      background-image: 
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
      background-size: 50px 50px;
      color: var(--text-color);
      transition: background-color 0.3s, color 0.3s;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .logo-title {
    display: flex;
    flex-direction: column;
  }

  .logo-title h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: var(--primary-color);
  }

  .logo-title h2 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0.25rem 0 0 0;
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    margin-left: 1rem;
  }

  .search-bar {
    flex: 1;
    max-width: 400px;
    padding: 0.75rem 1rem;
    border: 2px solid var(--primary-color);
    border-radius: 6px;
    font-size: 1rem;
    background-color: var(--card-bg);
    color: var(--text-color);
  }

  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .collection-card {
    background: #000000;
    display: flex;
    flex-direction: column;
    height: 450px;
    width: 100%;
    overflow: hidden;
  }

  .collection-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 16 / 9;
  }

  .card-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .collection-name {
    font-size: 14px;
    color: #ffffff;
    margin: 0 0 8px 0;
    font-weight: normal;
  }

  .description-container {
    height: 120px;
    overflow-y: auto;
    margin-bottom: 16px;
    border: none;
    padding: 0;
    
    &::-webkit-scrollbar {
      width: 2px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #333333;
    }
  }

  .collection-description {
    font-size: 12px;
    color: #666666;
    margin: 0;
    line-height: 1.5;
  }

  .metadata {
    margin-bottom: 16px;
    font-size: 12px;
    color: #666666;
  }

  .collection-card a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: var(--button-color);
    color: var(--text-color);
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    border: 1px solid var(--accent-color);
    transition: background-color 0.2s, transform 0.2s;
  }

  .collection-card a:hover {
    background-color: var(--button-hover);
    transform: translateY(-2px);
  }

  .skeleton {
    background: #e2e8f0;
    border-radius: 8px;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
  }

  .pagination button {
    background: var(--button-color);
    color: var(--text-color);
    border: 1px solid var(--accent-color);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
  }

  .pagination button:hover:not(:disabled) {
    background-color: var(--button-hover);
    transform: translateY(-2px);
  }

  .pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
  }

  .empty-state h2 {
    margin: 1.5rem 0 0.5rem;
    font-size: 1.5rem;
  }

  .empty-state p {
    margin-bottom: 1.5rem;
    color: var(--text-color);
    opacity: 0.8;
  }

  .empty-state button {
    background: var(--button-color);
    color: var(--text-color);
    border: 1px solid var(--accent-color);
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.2s;
  }

  .empty-state button:hover {
    background-color: var(--button-hover);
    transform: translateY(-2px);
  }

  .footer {
    padding: 2rem;
    background-color: var(--card-bg);
    margin-top: 4rem;
    text-align: center;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  .social-links a {
    color: var(--text-color);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.2s, transform 0.2s;
  }

  .social-links a:hover {
    opacity: 1;
    transform: translateY(-3px);
  }

  .social-icon {
    width: 24px;
    height: 24px;
    stroke: var(--text-color);
    transition: stroke 0.2s;
  }

  .social-links a:hover .social-icon {
    stroke: var(--primary-color);
  }

  @media (max-width: 768px) {
    .portfolio-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 480px) {
    .portfolio-grid {
      grid-template-columns: 1fr;
    }

    .header {
      flex-direction: column;
      gap: 1rem;
    }

    .search-bar {
      width: 100%;
    }
  }
</style>

<main>
  <div class="header">
    <div class="header-left">
      <div class="logo-title">
        <h1>AIMSOMNIA</h1>
        <h2>Collections</h2>
      </div>
    </div>
    <div class="header-right">
      <input
        class="search-bar"
        type="text"
        placeholder="Search collections..."
        bind:value={searchQuery}
        on:input={handleSearch}
      />
    </div>
  </div>

  {#if isLoading}
    <div class="portfolio-grid">
      {#each Array(6) as _}
        <div class="collection-card skeleton" style="height: 200px"></div>
      {/each}
    </div>
  {:else if error}
    <div class="empty-state">
      <EmptyStateIllustration />
      <h2>Something went wrong</h2>
      <p>{error}</p>
      <button on:click={() => window.location.reload()}>Try Again</button>
    </div>
  {:else if filteredCollections.length === 0}
    <div class="empty-state">
      <EmptyStateIllustration />
      <h2>No collections found</h2>
      <p>Try adjusting your search or check back later.</p>
    </div>
  {:else}
    <div class="portfolio-grid">
      {#each visibleCollections as collection}
        <div class="collection-card">
          <img src={collection.image} alt={collection.name} />
          <div class="card-content">
            <h3 class="collection-name">{collection.name}</h3>
            <div class="description-container">
              <p class="collection-description">{collection.description}</p>
            </div>
            <div class="metadata">
              <span>Type: {collection.type}</span>
              <span>Items: {collection.count}</span>
            </div>
            <a href={collection.externalUrl} class="view-collection" target="_blank" rel="noopener noreferrer">
              VIEW COLLECTION
            </a>
          </div>
        </div>
      {/each}
    </div>

    {#if totalPages > 1}
      <div class="pagination">
        <button
          on:click={() => currentPage--}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          on:click={() => currentPage++}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    {/if}
  {/if}
</main>

<footer class="footer">
  <div class="social-links">
    <a href="https://x.com/aimsomnia" target="_blank" rel="noopener noreferrer">
      <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
      </svg>
    </a>
    <a href="https://taggr.network/user/aimsomnia" target="_blank" rel="noopener noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <g fill="currentColor">
          <rect x="4" y="2" width="3" height="20" rx="0.5"/>
          <rect x="17" y="2" width="3" height="20" rx="0.5"/>
          <rect x="2" y="6.5" width="20" height="3" rx="0.5"/>
          <rect x="2" y="14.5" width="20" height="3" rx="0.5"/>
        </g>
      </svg> 
    </a>
    <a href="https://distrikt.app/u/aimsomnia" target="_blank" rel="noopener noreferrer">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <g fill="currentColor" fill-rule="evenodd">
          <path d="M0.5,10 L3.5,10 C3.776,10 4,10.224 4,10.5 L4,19.5 C4,19.776 4.224,20 4.5,20 L13.5,20 C13.776,20 14,20.224 14,20.5 L14,23.5 C14,23.776 13.776,24 13.5,24 L0.5,24 C0.224,24 0,23.776 0,23.5 L0,10.5 C0,10.224 0.224,10 0.5,10 Z"/>
          <path d="M5.5,4 L18.5,4 C18.776,4 19,4.224 19,4.5 L19,17.5 C19,17.776 18.776,18 18.5,18 L15.5,18 C15.224,18 15,17.776 15,17.5 L15,8.5 C15,8.224 14.776,8 14.5,8 L5.5,8 C5.224,8 5,7.776 5,7.5 L5,4.5 C5,4.224 5.224,4 5.5,4 Z"/>
          <path d="M20.5,0 L23.5,0 C23.776,0 24,0.224 24,0.5 L24,3.5 C24,3.776 23.776,4 23.5,4 L20.5,4 C20.224,4 20,3.776 20,3.5 L20,0.5 C20,0.224 20.224,0 20.5,0 Z"/>
        </g>
      </svg>
    </a>
    <a href="https://github.com/nami2111" target="_blank" rel="noopener noreferrer">
      <svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>
  </div>
  <p>&copy; {new Date().getFullYear()} AIMSOMNIA. All rights reserved.</p>
</footer>