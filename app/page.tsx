import { prisma } from '@/lib/prisma';
import { HeroSection } from '@/components/home/hero-section';
import { ProductsShowcase } from '@/components/home/products-showcase';
import { CategoriesGrid } from '@/components/home/categories-grid';
import Link from 'next/link';
import { CheckCircle2, Phone, Mail } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Premier Industrial Distributor',
  description: 'Authorized distributor for Loctite, CRC, 3M, and industrial maintenance solutions in Secunderabad. Genuine products, technical expertise.',
};

export const revalidate = 0;

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch featured products (random selection via priority)
  const featuredProducts = await prisma.product.findMany({
    where: {
      status: { in: ['PUBLISHED', 'DRAFT'] }
    },
    take: 8,
    include: {
      images: true,
      brand: true,
      category: true,
    },
    orderBy: {
      priority: 'desc'
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">

      {/* Hero Section (Client) */}
      <HeroSection />

      {/* Brands Ticker (Static) */}
      <section className="py-8 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold text-royal-500 uppercase tracking-[0.2em] mb-8 font-oswald">Trusted Partners</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['LOCTITE', 'CRC', '3M', 'Pidilite', 'Bosch', 'Dr.Fixit'].map((brand) => (
              <span key={brand} className="text-2xl font-bold text-white/40 hover:text-white transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase (Client with Data) */}
      <ProductsShowcase products={featuredProducts} />

      {/* Categories Grid (Client) */}
      <CategoriesGrid />

      {/* About / Trust Section */}
      <section className="py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-royal-800 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white font-oswald uppercase tracking-tight">Why Choose Royal?</h2>
            <p className="text-xl text-slate-400 mb-16 leading-relaxed">
              We don't just supply products; we provide <span className="text-white font-bold">technical expertise</span> and reliable supply chain solutions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                { title: 'Authentic Products', desc: '100% Genuine products sourced directly from manufacturers.' },
                { title: 'Technical Support', desc: 'Expert guidance on product selection and application.' },
                { title: 'Inventory Ready', desc: 'Massive stock ready for immediate dispatch across India.' },
                { title: 'Wholesale Pricing', desc: 'Competitive rates for bulk industrial requirements.' },
              ].map((feat, i) => (
                <div key={i} className="bg-slate-900/50 backdrop-blur border border-white/5 p-8 hover:bg-white/5 transition-colors group">
                  <h4 className="flex items-center gap-3 font-bold text-lg mb-3 text-white font-oswald uppercase tracking-wide">
                    <CheckCircle2 className="text-royal-500 group-hover:text-green-400 transition-colors" size={24} />
                    {feat.title}
                  </h4>
                  <p className="text-slate-400 text-sm ml-9 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-royal-950 border-t border-white/10 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-gradient-to-br from-royal-900/50 to-slate-900/50 border border-white/10 p-12 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-royal-600/10 rounded-full blur-[80px]" />

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-oswald uppercase tracking-tight">Need a Custom Quote?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Our team is ready to assist you with bulk orders and specific technical requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/contact"
                className="bg-royal-600 text-white px-10 py-5 font-bold hover:bg-royal-500 transition-all font-oswald uppercase tracking-wider text-lg"
              >
                Get in Touch
              </Link>
              <a
                href="tel:+919849044455"
                className="bg-transparent text-white border border-white/20 px-10 py-5 font-bold hover:bg-white/5 transition-all font-oswald uppercase tracking-wider text-lg flex items-center justify-center gap-2"
              >
                <Phone size={20} className="text-royal-400" /> +91 98490 44455
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
