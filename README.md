<h1 align="center">🛒 Carpet Depot - Official Website</h1>

<p align="center">
  Discount Carpet, Vinyl, and Hardwood Flooring Installation Since 1992
</p>

<br />

<h2>🧭 Table of Contents</h2>
<ul>
  <li><a href="#about">About</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#technologies">Technologies Used</a></li>
  <li><a href="#setup">Setup Instructions</a></li>
  <li><a href="#components">Core Components</a></li>
  <li><a href="#screenshots">Screenshots</a></li>
  <li><a href="#license">License</a></li>
</ul>

<br />

<h2 id="about">📖 About</h2>
<p>
<strong>Carpet Depot</strong> is a full-service flooring store that has been providing high-quality carpet, vinyl flooring, hardwood flooring, and more since 1992. 
This website offers a modern digital experience for users — allowing them to visualize flooring products inside their own rooms, locate nearby stores, and navigate seamlessly.
</p>

<br />

<h2 id="features">✨ Features</h2>
<ul>
  <li>🖼️ <strong>See In My Room:</strong> Upload your room photo, detect floor and wall areas with AI, and preview flooring textures.</li>
  <li>📍 <strong>Google Maps Integration:</strong> Find nearby Carpet Depot stores, calculate distance, and get shortest route directions.</li>
  <li>🛠️ <strong>Dynamic Page Builder:</strong> Fully customizable pages with modular content blocks.</li>
  <li>⚡ <strong>SEO Optimized:</strong> Fast loading, semantic HTML, and dynamic metadata management.</li>
  <li>📂 <strong>Local Storage:</strong> Save visualization preferences across sessions automatically.</li>
  <li>📱 <strong>Responsive Design:</strong> Works beautifully across mobile, tablet, and desktop devices.</li>
</ul>

<br />

<h2 id="technologies">🛠️ Technologies Used</h2>
<ul>
  <li><strong>Frontend:</strong> Next.js 14 (App Router), React.js, Tailwind CSS</li>
  <li><strong>State Management:</strong> Zustand</li>
  <li><strong>Canvas and Transformations:</strong> react-perspective-transform, HTML Canvas API</li>
  <li><strong>Image Comparison:</strong> react-compare-slider</li>
  <li><strong>APIs:</strong> 
    <ul>
      <li>Wizart API - Floor and Wall Detection (AI segmentation)</li>
      <li>Google Maps API - Geolocation, Directions, Distance Matrix</li>
    </ul>
  </li>
  <li><strong>Content Management:</strong> Directus Headless CMS</li>
  <li><strong>Package Manager:</strong> Bun</li>
</ul>

<br />

<h2 id="setup">⚙️ Setup Instructions</h2>
<ol>
  <li>Clone the repository:</li>
  <pre><code>git clone https://github.com/your-username/carpet-depot.git</code></pre>

  <li>Install dependencies:</li>
  <pre><code>bun install</code></pre>

  <li>Create a <code>.env.local</code> file with the following variables:</li>
  <pre><code>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
WIZART_API_TOKEN=your_wizart_api_token
NEXT_PUBLIC_DEFAULT_ROOM_IMAGE=/rooms/bedroom.jpg
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
  </code></pre>

  <li>Run the development server:</li>
  <pre><code>bun dev</code></pre>
</ol>

<br />

<h2 id="components">🧩 Core Components</h2>
<ul>
  <li><strong>SeeInRoomSegmented.tsx</strong> - Main orchestrator for room visualization</li>
  <li><strong>CanvasCompare.tsx</strong> - Render textures using perspective transformations</li>
  <li><strong>SidebarControls.tsx</strong> - Tile and wall color selections</li>
  <li><strong>TileSelector.tsx</strong> - Choose floor textures</li>
  <li><strong>WallColorSelector.tsx</strong> - Pick wall paint colors</li>
  <li><strong>TransformControls.tsx</strong> - Rotate, scale, and skew textures</li>
  <li><strong>Toolbar.tsx</strong> - Settings, reset, and other utilities</li>
  <li><strong>LocationMap.tsx</strong> - Google Map integration showing nearby stores and directions</li>
  <li><strong>PageBuilder.tsx</strong> - Dynamic content page builder with SEO optimizations</li>
</ul>

<br />

<h2 id="screenshots">📸 Screenshots</h2>

<p align="center">
  <img src="path_to_uploaded_screenshot1.png" alt="See In My Room Upload and Visualize" width="600" />
</p>

<p align="center">
  <img src="path_to_uploaded_screenshot2.png" alt="Google Map Store Locator" width="600" />
</p>

<p align="center">
  <img src="path_to_uploaded_screenshot3.png" alt="Dynamic Page Builder Blocks" width="600" />
</p>

<br />

<h2 id="license">📜 License</h2>
<p>This project is licensed under the <strong>MIT License</strong>.</p>

<br />

<hr />
<p align="center">
  Built with ❤️ by the Carpet Depot Development Team using Next.js, Tailwind CSS, Wizart AI, and Google APIs.
</p>
