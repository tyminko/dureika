---
title: Simple Image Demo
description: A demonstration of the simplified prop-based image system
image: /images/demo-hero.jpg
tags: [demo, images, props]
date: 2024-01-15
---

# Simple Image Demo

This project demonstrates the simplified image system using explicit props instead of automatic context detection.

## Hero Image

The hero image uses explicit width, height, and crop settings:

```vue
<ContentImage 
  src="/images/demo-hero.jpg"
  :width="1200"
  :height="600"
  :crop="'center'"
  :focus="'auto'"
  alt="Hero Image"
/>
```

## Content Images

Regular content images can use simpler settings:

```vue
<ContentImage 
  src="/images/demo-content.jpg"
  :width="800"
  alt="Content Image"
/>
```

## Gallery Images

Gallery images with consistent sizing:

```vue
<ContentImage 
  src="/images/demo-gallery.jpg"
  :width="800"
  :height="600"
  :crop="'center'"
  alt="Gallery Image"
/>
```

## Benefits of This Approach

1. **Explicit Control**: You decide exactly how each image should be transformed
2. **No Magic**: No automatic guessing or context detection
3. **Predictable**: Same props always produce the same results
4. **Flexible**: Easy to customize for specific needs
5. **Simple**: Straightforward prop-based API

## Usage Examples

### Card Images
```vue
<ContentImage 
  src="/images/card.jpg"
  :width="400"
  :height="300"
  :crop="'center'"
  :quality="80"
  format="webp"
  alt="Card Image"
/>
```

### Thumbnail Images
```vue
<ContentImage 
  src="/images/thumb.jpg"
  :width="200"
  :height="150"
  :crop="'center'"
  :quality="70"
  format="webp"
  alt="Thumbnail"
/>
```

### Full-Width Images
```vue
<ContentImage 
  src="/images/full.jpg"
  :width="1200"
  :quality="90"
  format="webp"
  alt="Full Width Image"
/>
```

The system automatically transforms local URLs like `/images/photo.jpg` to ImageKit URLs, and then applies the transformations you specify via props. 