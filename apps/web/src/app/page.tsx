// import { Metadata } from 'next';

// import { siteConfig } from '../src/config/site';

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Books', 'Clubs', 'Social'],
//   authors: [
//     {
//       name: 'Marcus Rodrigues',
//       url: 'https://mrodrigues.me',
//     },
//   ],
//   creator: 'Marcus Rodrigues',
//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     url: siteConfig.url,
//     title: siteConfig.name,
//     description: siteConfig.description,
//     siteName: siteConfig.name,
//     images: [
//       {
//         url: siteConfig.ogImage,
//         width: 1920,
//         height: 1080,
//         alt: siteConfig.name,
//       },
//     ],
//   },
//   icons: {
//     icon: '/favicon.ico',
//   },
// };

const Page = () => {
  return (
    <main className="relative flex min-h-screen flex-col">
      <h1>Chatse</h1>
      <section className="p-2 text-red-500">
        <h2>Test</h2>
      </section>
    </main>
  );
};

export default Page;
