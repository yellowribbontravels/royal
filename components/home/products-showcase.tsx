'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Product, Image as ProductImage, Brand, Category } from '@/src/prisma/client';
import { ProductCardActions } from '@/components/products/product-card-actions';

type FeaturedProduct = Product & {
    images: ProductImage[];
    brand: Brand | null;
    category: Category | null;
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function ProductsShowcase({ products }: { products: FeaturedProduct[] }) {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-royal-900 to-transparent opacity-50" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-royal-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-royal-500 font-bold uppercase tracking-widest text-sm mb-3 block font-oswald">Featured Catalogue</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white font-oswald tracking-tight">PREMIUM INDUSTRIAL <br /><span className="text-slate-500">SUPPLIES</span></h2>
                    </div>
                    <Link href="/products" className="group px-6 py-3 border border-white/10 hover:border-royal-500 text-slate-300 hover:text-white font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2">
                        View Full Inventory <ArrowRight size={16} className="text-royal-500 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={fadeInUp}
                            className="bg-white/5 border border-white/5 hover:border-royal-500/50 rounded-none overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col"
                        >
                            <Link href={`/products/${product.id}`} className="block flex flex-col">
                                <div className="relative aspect-square overflow-hidden bg-white/5 p-4 flex items-center justify-center">
                                    {product.images[0] ? (
                                        <div className="w-full h-full relative">
                                            <img
                                                src={product.images[0].url}
                                                alt={product.name}
                                                className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-500 relative z-10"
                                            />
                                            {/* Shine effect on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:-translate-y-full transition-transform duration-700 z-20" />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-700">
                                            <div className="w-12 h-12 bg-white/5 rounded-sm animate-pulse" />
                                        </div>
                                    )}
                                    {product.brand && (
                                        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-white/10 px-2 py-1 text-[10px] font-bold text-slate-300 uppercase tracking-wider z-20">
                                            {product.brand.name}
                                        </div>
                                    )}
                                </div>

                                <div className="p-5 flex-1 flex flex-col bg-slate-900/50">
                                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 leading-tight font-oswald uppercase tracking-wide group-hover:text-royal-400 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mb-4 font-mono">{product.category?.name || 'Industrial Supply'}</p>

                                    {/* Actions Component - Prevents link click propagation internally */}
                                    <ProductCardActions productName={product.name} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
