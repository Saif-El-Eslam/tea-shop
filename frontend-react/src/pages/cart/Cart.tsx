import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import {
  MUTATION_INSERT_ORDER,
  MUTATION_UPDATE_TEAS_BY_PK,
} from "../../graphQL/Mutations/ordersMutations";
import { useAppContext } from "../../context/AppContext";
import {
  removeCart,
  addCart,
  setCart,
  setRefetchOrders,
} from "../../context/AppActions";

import TeaLogo from "../../assets/buy-white.png";
import TeaImage from "../../assets/tea.png";
import CrossIcon from "../../assets/cross.png";
import PlusIcon from "../../assets/plus.png";
import MinusIcon from "../../assets/minus.png";
import Notify from "../../utils/Notify";

const CartPage: React.FC = () => {
  const [insertOrder] = useMutation(MUTATION_INSERT_ORDER);
  const [updateTeaQuantity] = useMutation(MUTATION_UPDATE_TEAS_BY_PK);
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const handleCheckout = async () => {
    const cartProducts = state.cart.map((item: any) => ({
      tea_id: item.productId,
      quantity: item.quantityInCart,
      price_per_unit: item.price_per_unit,
      total_price: item.subTotal,
    }));

    try {
      const operations = [
        insertOrder({
          variables: {
            totalPrice: state.cart.reduce(
              (acc, item) => acc + item.subTotal,
              0
            ),
            userId: state.user?.id,
            orderItems: cartProducts,
          },
        }),
        cartProducts.map((item) =>
          updateTeaQuantity({
            variables: {
              id: item.tea_id,
              quantity: -item.quantity,
            },
          })
        ),
      ];
      await Promise.all(operations);

      Notify.success("Order placed successfully");
      dispatch(setCart([]));
      dispatch(setRefetchOrders(true));
      navigate("/teas");
    } catch (err: any) {
      err?.errors
        ? Notify.error(err.errors[0].message)
        : Notify.error(err.message);
    }
  };

  return (
    <div>
      {state?.cart?.length <= 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center h-[60vh]">
          <h1 className="text-2xl font-bold text-brown">Your Cart is empty</h1>
          <div
            className="text-yellow hover:text-yellow-500 underline font-semibold text-lg transition-colors cursor-pointer"
            onClick={() => navigate("/teas")}
          >
            Go to shop
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-grow justify-center items-center">
          <div className="w-full flex items-center h-16 bg-gradient-to-r from-darkGreen to-[#98FF98] px-12 md:px-48">
            <img
              src={TeaLogo}
              alt="home-logo"
              className={`h-5 w-5 ${
                state.user?.role === "user" &&
                "cursor-pointer hover:scale-110 transform transition-transform"
              }`}
              onClick={() => {
                state.user?.role === "user" && navigate("/teas");
              }}
            />
            <h1 className="text-xs py-4 text-white">
              <span className="font-bold px-2">{">"}</span> Shopping Cart
            </h1>
          </div>

          <div className="flex justify-center items-center my-8">
            <h1 className="text-2xl font-bold text-[#556B2F]">
              My Shopping Card
            </h1>
          </div>

          <div className="w-full px-4 flex flex-col justify-center items-start gap-4 mb-4 lg:flex-row lg:gap-8 md:px-24">
            <table className="w-full bg-white rounded-2xl lg:basis-3/4">
              <thead className="text-[#949494] text-sm border-b-2 p-2">
                <tr>
                  <th className="font-medium py-2">PRODUCT</th>
                  <th className="font-medium py-2">PRICE</th>
                  <th className="font-medium py-2">QUANTITY</th>
                  <th className="font-medium py-2">SUBTOTAL</th>
                  <th className="font-medium py-2"></th>
                </tr>
              </thead>
              <tbody className="text-darkGray p-2">
                {state.cart.map((item) => {
                  const product = state.products.find(
                    (p) => p.id === item.productId
                  );

                  return (
                    <tr
                      key={item.productId}
                      className="text-center align-middle border-b-2"
                    >
                      <td className="font-semibold py-4 w-4/12">
                        <div className="flex flex-col items-center justify-center w-fit m-auto gap-2 sm:flex-row">
                          <img
                            className="m-auto w-12 h-12 sm:w-20 sm:h-20"
                            src={TeaImage}
                            alt={product?.name}
                            // width={50}
                          />
                          <span>{product?.name}</span>
                        </div>
                      </td>
                      <td className="font-semibold py-4 w-2/12">
                        ${item.price_per_unit}
                      </td>
                      <td className="font-semibold py-4 w-3/12">
                        <div className="flex flex-col w-fit align-center m-auto p-[4px] rounded-full border-2 border-[#dedede] sm:flex-row">
                          <div
                            className="bg-lightBeige text-white font-semibold px-2 py-2 rounded-full w-fit m-auto cursor-pointer active:scale-95 transition-transform"
                            onClick={() => {
                              dispatch(
                                addCart({
                                  productId: item.productId,
                                  price_per_unit: item.price_per_unit,
                                })
                              );
                            }}
                          >
                            <img src={PlusIcon} alt="plus" width={20} />
                          </div>
                          <span className="p-2 w-fit m-auto">
                            {item.quantityInCart}
                          </span>
                          <div
                            className="bg-lightBeige text-white font-semibold px-2 py-2 rounded-full w-fit m-auto cursor-pointer active:scale-95 transition-transform"
                            onClick={() => dispatch(removeCart(item.productId))}
                          >
                            <img src={MinusIcon} alt="minus" width={20} />
                          </div>
                        </div>
                      </td>
                      <td className="font-semibold py-4 w-2/12">
                        ${item.price_per_unit * item.quantityInCart}
                      </td>
                      <td className="font-semibold py-4 w-1/12">
                        <img
                          className="m-auto cursor-pointer"
                          src={CrossIcon}
                          alt="cross"
                          width={25}
                          onClick={() =>
                            dispatch(
                              setCart(
                                state.cart.filter(
                                  (p) => p.productId !== item.productId
                                )
                              )
                            )
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="w-full bg-white rounded-2xl flex flex-col  items-strat gap-4 p-4 lg:basis-1/4">
              <h1 className="text-2xl font-bold text-[#556B2F]">Cart Total</h1>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between border-b-2 border-[#dedede] pb-2">
                  <span>Subtotal:</span>
                  <span className="font-semibold">
                    $
                    {state.cart.reduce((acc, item) => {
                      const product = state.products.find(
                        (p) => p.id === item.productId
                      );
                      return (
                        acc + item.quantityInCart * product!.price_per_unit
                      );
                    }, 0)}
                  </span>
                </div>
                <div className="flex justify-between border-b-2 border-[#dedede] pb-2">
                  <span>Shipping:</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-semibold">
                    $
                    {state.cart.reduce((acc: number, item) => {
                      const product = state.products.find(
                        (p) => p.id === item.productId
                      );
                      return (
                        acc + item.quantityInCart * product!.price_per_unit
                      );
                    }, 0)}
                  </span>
                </div>

                <div className="flex justify-center">
                  <button
                    className="w-[90%] bg-darkGreen hover:bg-[#46572a] text-white font-semibold px-6 py-2 rounded-full mt-4 transition-colors active:scale-[99%] transition-transform"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
