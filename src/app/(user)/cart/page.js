import CartPage from "@/components/user/cart/CartPage";
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
