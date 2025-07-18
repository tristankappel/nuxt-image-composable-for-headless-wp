# Nuxt useImage Composable for headless WordPress

A Nuxt composable to fetch WordPress media by ID and return image URLs in various sizes, including WebP URLs via WebP Express integration.

## Features

- Fetches WordPress media data using the REST API
- Returns original and resized image URLs (`thumbnail`, `medium`, `large`, etc.)
- Also provides WebP URLs for all image sizes (with WP WebP Express Plugin)
- Handles errors and non-image media gracefully

## Installation

Copy the `useImage.ts` composable into your Nuxt 4 project's composables directory.

## Usage

```ts
<script setup lang="ts">
const mediaId = 123; // WordPress media ID
const image = await useImage(mediaId);
</script>

<template>
  <picture v-if="image?.medium && images?.mediumWebp">
    <source :srcset="image.mediumWebp" type="image/webp" />
    <img :src="image.medium" alt="Image" loading="lazy" />
  </picture>
</template>
