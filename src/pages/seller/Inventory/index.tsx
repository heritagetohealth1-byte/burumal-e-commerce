import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';
import { productService } from '../../../services/productService';

export default function SellerInventory() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productService.initializeMockProducts();
    setProducts(productService.getAllProducts());
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'in-stock') return product.stock > 5 && matchesSearch;
    if (filter === 'low-stock') return product.stock > 0 && product.stock <= 5 && matchesSearch;
    if (filter === 'out-of-stock') return product.stock === 0 && matchesSearch;
    return matchesSearch;
  });

  const getStatusColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock <= 5) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusLabel = (stock: number) => {
    if (stock === 0) return 'OUT OF STOCK';
    if (stock <= 5) return 'LOW STOCK';
    return 'IN STOCK';
  };

  const stockCounts = {
    all: products.length,
    inStock: products.filter(p => p.stock > 5).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 5).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  const handleQuickUpdate = (productId: string, newStock: number) => {
    productService.updateProduct(productId, { stock: newStock });
    setProducts(productService.getAllProducts());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">📦 Inventory</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="card text-center">
                <p className="text-3xl font-bold">{stockCounts.all}</p>
                <p className="text-gray-600 text-sm">Total Products</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-green-600">{stockCounts.inStock}</p>
                <p className="text-gray-600 text-sm">In Stock</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-orange-600">{stockCounts.lowStock}</p>
                <p className="text-gray-600 text-sm">Low Stock</p>
              </div>
              <div className="card text-center">
                <p className="text-3xl font-bold text-red-600">{stockCounts.outOfStock}</p>
                <p className="text-gray-600 text-sm">Out of Stock</p>
              </div>
            </div>

            {/* Low Stock Alert */}
            {stockCounts.lowStock > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <p className="font-semibold text-orange-800">{stockCounts.lowStock} products are low in stock</p>
                    <p className="text-sm text-orange-600">Consider restocking soon to avoid running out</p>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filter */}
            <div className="card mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All ({stockCounts.all})
                  </button>
                  <button
                    onClick={() => setFilter('in-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'in-stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    In Stock ({stockCounts.inStock})
                  </button>
                  <button
                    onClick={() => setFilter('low-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'low-stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Low Stock ({stockCounts.lowStock})
                  </button>
                  <button
                    onClick={() => setFilter('out-of-stock')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === 'out-of-stock' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Out of Stock ({stockCounts.outOfStock})
                  </button>
                </div>
              </div>
            </div>

            {/* Inventory List */}
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">SKU</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Quick Update</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={product.images[0] || 'https://via.placeholder.com/100'}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.price.toLocaleString()} BIF</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{product.sku || 'N/A'}</td>
                        <td className="p-4 text-sm">{product.category}</td>
                        <td className="p-4 font-bold">{product.stock}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.stock)}`}>
                            {getStatusLabel(product.stock)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={product.stock}
                              min="0"
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                              id={`quick-stock-${product.id}`}
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                const input = document.getElementById(`quick-stock-${product.id}`) as HTMLInputElement;
                                handleQuickUpdate(product.id, parseInt(input.value));
                              }}
                            >
                              Update
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Edit</Button>
                            <Button variant="secondary" size="sm">History</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
