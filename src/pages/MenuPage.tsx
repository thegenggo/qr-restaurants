import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronUp, Info } from "lucide-react";
import CategoryMenu from "../components/CategoryMenu";
import { getAllCategories, getMenuItemsByCategory } from "../data/menuData";
import { getTableById } from "../data/tablesData";
import { useCart } from "../contexts/useCart";
import { Category, MenuItem } from "../types";

const MenuPage = () => {
  const { tableId } = useParams<{ tableId: string }>();
  const navigate = useNavigate();
  const { state, setTable } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tableName, setTableName] = useState("");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if (!tableId) {
      navigate("/scan");
      return;
    }
    // Set the table ID in cart context
    setTable(tableId);
    // Load table info
    const tableInfo = getTableById(tableId);
    if (tableInfo) {
      setTableName(`Table ${tableInfo.number} (${tableInfo.section})`);
    } else {
      setTableName(`Table ${tableId}`);
    }
    // Load categories and menu items
    const allCategories = getAllCategories();
    setCategories(allCategories);
    const allItems: MenuItem[] = [];
    allCategories.forEach((category) => {
      const items = getMenuItemsByCategory(category.id);
      allItems.push(...items);
    });
    setMenuItems(allItems);
  }, [tableId, navigate, setTable]);

  const handleViewCart = () => {
    navigate("/cart");
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  if (!tableId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Table info banner */}
      <div className="bg-primary-500 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            <span className="font-medium">{tableName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Our Menu</h1>
        <p className="text-neutral-600 mb-6">
          Browse our selection of delicious food and drinks
        </p>

        <CategoryMenu categories={categories} menuItems={menuItems} />
      </div>

      {/* Fixed cart button at bottom */}
      {state.items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-neutral-200 p-4 animate-slide-up">
          <div className="max-w-7xl mx-auto">
            <div
              className={`transition-all duration-300 overflow-hidden ${showCart ? "max-h-60" : "max-h-0"
                }`}
            >
              <div className="py-3 px-1 space-y-2 mb-3">
                {state.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-neutral-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
                {state.items.length > 3 && (
                  <div className="text-sm text-neutral-500 italic text-center">
                    +{state.items.length - 3} more items
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowCart(!showCart)}
                className="flex items-center text-primary-600 font-medium"
              >
                <ChevronUp
                  className={`h-5 w-5 mr-1 transition-transform duration-300 ${showCart ? "rotate-180" : ""
                    }`}
                />
                {state.totalItems} {state.totalItems === 1 ? "item" : "items"}
              </button>

              <div className="flex items-center">
                <span className="mr-4 font-bold">
                  {formatPrice(state.totalPrice)}
                </span>
                <button
                  onClick={handleViewCart}
                  className="btn btn-primary flex items-center"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
