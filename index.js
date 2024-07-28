import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors()); //Cross-Origin Resource Sharing,

//Server side values
const taxRate = 5;
const discountPercentage = 10;
const loyaltyRate = 2;

//Home
app.get("/", (req, res) => {
  res.send("Hello, Welcome to FlipDeal...");
});

//Endpoint 1: Calculate the total price of items in the cart
function calculateTotalPrice(newItemPrice, cartTotal) {
  let totalPrice = newItemPrice + cartTotal;
  return totalPrice.toString();
};

app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalPrice(newItemPrice, cartTotal));
});

//Endpoint 2 : Apply a discount based on membership status
function calculateMembershipDiscount(cartTotal, isMember) {
  if (isMember === "true") {
    let discountAmount = cartTotal - (cartTotal / 100) * discountPercentage;
    return discountAmount.toString();
  } else {
    return "No discount applied. Please buy a membership for the discount";
  }
};

app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(calculateMembershipDiscount(cartTotal, isMember));
});

//Endpoint 3 : Calculate tax on the cart total
function calculateTaxRate(cartTotal) {
  let cartAmount = (cartTotal / 100) * taxRate;
  return cartAmount.toString();
};

app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTaxRate(cartTotal));
});

//Endpoint 4 : Estimate delivery time based on shipping method
function calculateEstDelivery(shippingMethod, distance) {
  if (shippingMethod === "standard") {
    let days = distance / 50;
    return days;
  } else if (shippingMethod === "express") {
    let days = distance / 100;
    return days;
  } else {
    return "Please select the correct shipping method.";
  }
};

app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateEstDelivery(shippingMethod, distance).toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
function calculateShippingCost(weight, distance) {
  let finalPrice = weight * distance * 0.1;
  return finalPrice.toString();
};

app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;
  return loyaltyPoints.toString();
};

app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
