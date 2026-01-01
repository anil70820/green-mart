import CartPage from "@/components/cart/CartPage";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const page = () => {
  return (
    <div>
      <ProtectedRoute>
        <CartPage />
      </ProtectedRoute>
    </div>
  );
};

export default page;
