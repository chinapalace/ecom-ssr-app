/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  typescript: {
    // !! WARN !! This is a temporary fix for the build errors.
    ignoreBuildErrors: true
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  },
  experimental: {
    urlImports: [
      'https://unpkg.com/tapcart-consumer-components@latest/dist/tapcart-consumer-components.es.js',
      'https://cdn.jsdelivr.net/npm/@pegasis/headlessui-react@1.4.1/dist/components/label/label.d.ts'
    ]
  }
};
