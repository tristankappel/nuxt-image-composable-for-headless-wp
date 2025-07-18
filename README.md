# useImage Composable

A Nuxt 3 composable to fetch WordPress media by ID and return image URLs in various sizes, including WebP URLs via WebP Express integration.

## Features

- Fetches WordPress media data using the REST API
- Returns original and resized image URLs (`thumbnail`, `medium`, `large`, etc.)
- Automatically generates WebP URLs for all image sizes (compatible with WebP Express)
- Handles errors and non-image media gracefully

## Installation

Copy the `useImage.ts` composable into your Nuxt 4 project's composables directory.

## Usage

```ts
<script setup lang="ts">
const mediaId = 123; // WordPress media ID
const images = await useImage(mediaId);
</script>

<template>
  <picture v-if="images?.medium && images?.mediumWebp">
    <source :srcset="images.mediumWebp" type="image/webp" />
    <img :src="images.medium" alt="Image" loading="lazy" />
  </picture>
</template>
