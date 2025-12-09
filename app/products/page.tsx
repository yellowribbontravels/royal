import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { clsx } from 'clsx';
import { Search, Filter, Tag, X, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { ProductCardActions } from '@/components/products/product-card-actions';
import { ProductFilters } from '@/components/products/product-filters';

export const dynamic = 'force-dynamic';

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product Catalog | Royal Industrial Corp',
    description: 'Browse our extensive catalog of industrial adhesives, sealants, lubricants, and maintenance products from top global brands.',
};

export default async function ProductsPage({ searchParams }: Props) {
    const params = await searchParams;
    const brandId = typeof params.brandId === 'string' ? params.brandId : undefined;
    const categoryId = typeof params.categoryId === 'string' ? params.categoryId : undefined;
    const purposeId = typeof params.purposeId === 'string' ? params.purposeId : undefined;
    const search = typeof params.q === 'string' ? params.q : undefined;

    // Fetch filters
    const [allBrands, allCategories, allPurposes] = await Promise.all([
        prisma.brand.findMany({ orderBy: { name: 'asc' } }),
        prisma.category.findMany({ orderBy: { name: 'asc' } }),
        prisma.purpose.findMany({ orderBy: { name: 'asc' } }),
    ]);

    // Construct query
    const where: any = { status: { in: ['PUBLISHED', 'DRAFT'] } };
    if (brandId) where.brandId = brandId;
    if (categoryId) where.categoryId = categoryId;
    if (purposeId) where.purposeId = purposeId;
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    // Fetch Products with relations
    const products = await prisma.product.findMany({
        where,
        include: {
            brand: true,
            category: true,
            purpose: true,
            images: true, // Fetch images
        },
        orderBy: { priority: 'desc' },
    });

    // Group by Purpose if showing detailed view (Brand/Category selected)
    const isGroupedView = (!!brandId || !!categoryId) && !search && !purposeId;

    // Grouping Logic
    const groupedProducts: Record<string, typeof products> = {};
    if (isGroupedView) {
        products.forEach(p => {
            const purposeName = p.purpose?.name || 'General';
            if (!groupedProducts[purposeName]) groupedProducts[purposeName] = [];
            groupedProducts[purposeName].push(p);
        });
    }

    return (
        <div className="bg-slate-950 min-h-screen pt-28">
            {/* Header Banner - Dark Industrial */}
            <div className="relative bg-royal-950 border-y border-white/5 py-12 md:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-600/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <span className="text-royal-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block font-oswald">Industrial Catalog</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-oswald uppercase tracking-tight">
                        {brandId ? allBrands.find(b => b.id === brandId)?.name :
                            categoryId ? allCategories.find(c => c.id === categoryId)?.name :
                                purposeId ? allPurposes.find(p => p.id === purposeId)?.name : 'Inventory'}
                    </h1>
                    <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-royal-600 pl-6">
                        Explore our comprehensive range of high-performance industrial adhesives, sealants, and maintenance solutions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Dark Glass */}
                    <aside className="lg:w-72 shrink-0 space-y-8">
                        {/* Search */}
                        <div className="relative group">
                            <form action="/products" method="GET">
                                <input
                                    name="q"
                                    type="text"
                                    defaultValue={search}
                                    placeholder="SEARCH SKU / NAME..."
                                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/10 rounded-none focus:outline-none focus:border-royal-500 text-white placeholder-slate-500 font-mono text-sm transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                                />
                                <Search className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-royal-500 transition-colors" size={16} />
                            </form>
                        </div>

                        {/* Active Filters */}
                        {(brandId || categoryId || purposeId) && (
                            <div className="bg-royal-900/20 p-4 border border-royal-500/30 backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-royal-400 uppercase tracking-widest flex items-center gap-2">
                                        <SlidersHorizontal size={14} /> Active Filters
                                    </span>
                                    <Link href="/products" className="text-[10px] text-slate-400 hover:text-white uppercase tracking-wider transition-colors border-b border-transparent hover:border-white">Clear All</Link>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {brandId && (
                                        <span className="inline-flex items-center gap-2 bg-royal-600/20 px-3 py-1 text-xs font-mono text-royal-200 border border-royal-500/30">
                                            {allBrands.find(b => b.id === brandId)?.name}
                                            <Link href={`/products?${new URLSearchParams({ ...(categoryId && { categoryId }), ...(purposeId && { purposeId }) }).toString()}`}><X size={12} className="hover:text-white cursor-pointer" /></Link>
                                        </span>
                                    )}
                                    {categoryId && (
                                        <span className="inline-flex items-center gap-2 bg-royal-600/20 px-3 py-1 text-xs font-mono text-royal-200 border border-royal-500/30">
                                            {allCategories.find(c => c.id === categoryId)?.name}
                                            <Link href={`/products?${new URLSearchParams({ ...(brandId && { brandId }), ...(purposeId && { purposeId }) }).toString()}`}><X size={12} className="hover:text-white cursor-pointer" /></Link>
                                        </span>
                                    )}
                                    {purposeId && (
                                        <span className="inline-flex items-center gap-2 bg-royal-600/20 px-3 py-1 text-xs font-mono text-royal-200 border border-royal-500/30">
                                            {allPurposes.find(p => p.id === purposeId)?.name}
                                            <Link href={`/products?${new URLSearchParams({ ...(brandId && { brandId }), ...(categoryId && { categoryId }) }).toString()}`}><X size={12} className="hover:text-white cursor-pointer" /></Link>
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <ProductFilters
                            brands={allBrands}
                            categories={allCategories}
                            purposes={allPurposes}
                            selectedBrandId={brandId}
                            selectedCategoryId={categoryId}
                            selectedPurposeId={purposeId}
                        />

                    </aside>

                    {/* Product Grid / Groups */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Showing {products.length} Results</span>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-32 bg-slate-900/30 border border-white/5">
                                <div className="w-16 h-16 bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500 rounded-full">
                                    <Search size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 font-oswald uppercase tracking-wide">No products found</h3>
                                <p className="text-slate-500 mb-6 text-sm">Try adjusting your search criteria or clearing filters.</p>
                                <Link href="/products" className="text-royal-400 font-bold hover:text-white uppercase tracking-wider text-xs border border-royal-900 bg-royal-900/20 px-6 py-3 hover:bg-royal-900/50 transition-colors">Clear all filters</Link>
                            </div>
                        ) : isGroupedView ? (
                            // GROUPED VIEW
                            <div className="space-y-16">
                                {Object.entries(groupedProducts).map(([purpose, items]) => (
                                    <div key={purpose} className="relative">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="h-px bg-white/10 flex-1" />
                                            <h2 className="text-2xl font-bold text-white font-oswald uppercase tracking-wider px-4 border border-white/10 py-2 bg-slate-900/50 backdrop-blur">{purpose}</h2>
                                            <div className="h-px bg-white/10 flex-1" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {items.map(product => <ProductCard key={product.id} product={product} />)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // FLAT GRID VIEW
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => <ProductCard key={product.id} product={product} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: any }) {
    return (
        <Link
            href={`/products/${product.id}`}
            className="group bg-slate-900/40 border border-white/5 hover:border-royal-500/50 transition-all duration-300 flex flex-col h-full overflow-hidden hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative"
        >
            {/* Tech Deco Lines */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[linear-gradient(45deg,transparent_50%,rgba(59,130,246,0.1)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="aspect-square bg-white/5 relative p-6 flex items-center justify-center border-b border-white/5 overflow-hidden">
                {/* Grid Background in Image Area */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px]" />

                {product.images?.[0] ? (
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-contain relative z-10 group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-16 h-16 bg-white/5 rounded-none flex items-center justify-center text-slate-600 text-2xl font-bold font-oswald">
                        {product.name.charAt(0)}
                    </div>
                )}

                {product.brand && (
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-white/10 z-20">
                        {product.brand.name}
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1 relative">
                <div className="mb-2 text-[10px] font-bold text-royal-500 uppercase tracking-widest font-mono">{product.category?.name || 'General Supply'}</div>
                <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-royal-400 transition-colors line-clamp-2 font-oswald uppercase tracking-wide">{product.name}</h3>

                {/* Description - subtle */}
                <p className="text-xs text-slate-500 line-clamp-2 mb-6 flex-1 border-l border-white/10 pl-3 leading-relaxed">
                    {product.description || 'Professional grade industrial component. Contact for specifications.'}
                </p>

                <ProductCardActions productName={product.name} />
            </div>
        </Link>
    );
}
