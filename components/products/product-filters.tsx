'use client';

import { useState } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ChevronRight, Filter, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brand, Category, Purpose } from '@/src/prisma/client';

interface ProductFiltersProps {
    brands: Brand[];
    categories: Category[];
    purposes: Purpose[];
    selectedBrandId?: string;
    selectedCategoryId?: string;
    selectedPurposeId?: string;
}

export function ProductFilters({
    brands,
    categories,
    purposes,
    selectedBrandId,
    selectedCategoryId,
    selectedPurposeId,
}: ProductFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    const FilterContent = () => (
        <div className="space-y-8">
            {/* Categories */}
            <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4 border-b border-white/10 pb-2 font-oswald flex items-center gap-2">
                    Categories
                </h3>
                <div className="space-y-1">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?categoryId=${cat.id}${selectedBrandId ? `&brandId=${selectedBrandId}` : ''}${selectedPurposeId ? `&purposeId=${selectedPurposeId}` : ''}`}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                "flex items-center justify-between group px-3 py-2 text-sm transition-all border-l-2",
                                selectedCategoryId === cat.id
                                    ? "border-royal-500 bg-white/5 text-white pl-4"
                                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-600 hover:pl-4"
                            )}
                        >
                            <span className="uppercase tracking-wide text-xs font-semibold">{cat.name}</span>
                            {selectedCategoryId === cat.id && <ChevronRight size={14} className="text-royal-500" />}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Purposes */}
            <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4 border-b border-white/10 pb-2 font-oswald">Applications</h3>
                <div className="space-y-1">
                    {purposes.map((purpose) => (
                        <Link
                            key={purpose.id}
                            href={`/products?purposeId=${purpose.id}${selectedBrandId ? `&brandId=${selectedBrandId}` : ''}${selectedCategoryId ? `&categoryId=${selectedCategoryId}` : ''}`}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                "flex items-center justify-between group px-3 py-2 text-sm transition-all border-l-2",
                                selectedPurposeId === purpose.id
                                    ? "border-royal-500 bg-white/5 text-white pl-4"
                                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-600 hover:pl-4"
                            )}
                        >
                            <span className="uppercase tracking-wide text-xs font-semibold">{purpose.name}</span>
                            {selectedPurposeId === purpose.id && <ChevronRight size={14} className="text-royal-500" />}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Brands */}
            <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-[0.15em] mb-4 border-b border-white/10 pb-2 font-oswald">Manufacturers</h3>
                <div className="space-y-1">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            href={`/products?brandId=${brand.id}${selectedCategoryId ? `&categoryId=${selectedCategoryId}` : ''}${selectedPurposeId ? `&purposeId=${selectedPurposeId}` : ''}`}
                            onClick={() => setIsOpen(false)}
                            className={clsx(
                                "flex items-center justify-between group px-3 py-2 text-sm transition-all border-l-2",
                                selectedBrandId === brand.id
                                    ? "border-royal-500 bg-white/5 text-white pl-4"
                                    : "border-transparent text-slate-400 hover:text-white hover:border-slate-600 hover:pl-4"
                            )}
                        >
                            <span className="uppercase tracking-wide text-xs font-semibold">{brand.name}</span>
                            {selectedBrandId === brand.id && <ChevronRight size={14} className="text-royal-500" />}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop View */}
            <div className="hidden lg:block">
                <FilterContent />
            </div>

            {/* Mobile View Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-slate-900 border border-white/10 text-white py-3 px-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
                >
                    <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider font-oswald">
                        <Filter size={16} className="text-royal-500" /> Filter Inventory
                    </span>
                    <SlidersHorizontal size={16} className="text-slate-500" />
                </button>
            </div>

            {/* Mobile Sidebar / Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 w-[300px] bg-slate-950 border-l border-white/10 shadow-2xl z-50 lg:hidden overflow-y-auto"
                        >
                            <div className="p-5 flex justify-between items-center bg-royal-950/50 border-b border-white/5 sticky top-0 backdrop-blur-md z-10">
                                <h2 className="text-xl font-bold text-white font-oswald uppercase tracking-wide">Filters</h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6">
                                <FilterContent />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
