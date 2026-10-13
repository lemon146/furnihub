import { asyncHandler } from "../middlewares/asyncHandler";
import { Product } from "../models/product.models";
import { User } from "../models/user.models";

const getStats = asyncHandler(async (req, res) => {
  const [totalProducts, totalCustomers] = await Promise.all([
    Product.countDocuments(),
    User.countDocuments({ role: "USER" }),
  ]);

  return res.status(200).json({
    success: true,
    message: "Stats fetched successfully",
    stats: {
      totalProducts,
      totalCustomers,
    },
  });
});

export { getStats };
