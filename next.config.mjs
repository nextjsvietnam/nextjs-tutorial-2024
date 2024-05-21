import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        // redirect to default language
        source: "/",
        destination: "/vi",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
