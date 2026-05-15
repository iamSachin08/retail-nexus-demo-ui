import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function ProductSelectorSidebarLink() {
  const location = useLocation();
  const active = location.pathname.startsWith('/product-selector');
  return (
    <Link
      to="/product-selector"
      className={`block px-4 py-2 rounded transition ${active ? 'bg-blue-600 text-white' : 'text-gray-800 hover:bg-gray-100'}`}
    >
      Product Selector & KYP
    </Link>
  );
} 