import db from "../config/db.js";

export const placeOrder = (req, res) => {
  const { userId, items, amount, address } = req.body;

  db.query(
    "INSERT INTO orders (userId, amount, address, status, payment) VALUES (?,?,?,?,?)",
    [userId, amount, address, "Processing", false],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: err.message });

      const orderId = result.insertId;

      items.forEach(item => {
        db.query(
          "INSERT INTO order_items (orderId, name, price, quantity) VALUES (?,?,?,?)",
          [orderId, item.name, item.price, item.quantity]
        );
      });

      res.json({ success: true, orderId });
    }
  );
};

// ✅ Fix userOrders to return nested items
export const userOrders = (req, res) => {
  const { userId } = req.body;

  // Join orders with order_items
  const sql = `
    SELECT o.id AS orderId, o.amount, o.status, o.address, 
           oi.id AS itemId, oi.name, oi.price, oi.quantity
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.orderId
    WHERE o.userId = ?
    ORDER BY o.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    // Group items by orderId
    const ordersMap = {};
    results.forEach(row => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          id: row.orderId,
          amount: row.amount,
          status: row.status,
          address: row.address,
          items: []
        };
      }
      if (row.itemId) {
        ordersMap[row.orderId].items.push({
          id: row.itemId,
          name: row.name,
          price: row.price,
          quantity: row.quantity
        });
      }
    });

    const orders = Object.values(ordersMap);
    res.json({ success: true, data: orders });
  });
};

// List all orders (admin)
export const listOrders = (req, res) => {
  const sql = `
    SELECT o.id AS orderId, o.amount, o.status, o.address,
           oi.id AS itemId, oi.name, oi.price, oi.quantity
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.orderId
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });

    // Group items by orderId
    const ordersMap = {};
    results.forEach(row => {
      if (!ordersMap[row.orderId]) {
        ordersMap[row.orderId] = {
          id: row.orderId,
          amount: row.amount,
          status: row.status,
          address: row.address,
          items: []
        };
      }
      if (row.itemId) {
        ordersMap[row.orderId].items.push({
          id: row.itemId,
          name: row.name,
          price: row.price,
          quantity: row.quantity
        });
      }
    });

    const orders = Object.values(ordersMap);
    res.json({ success: true, data: orders });
  });
};

// Update order status
export const updateStatus = (req, res) => {
  const { orderId, status } = req.body;

  db.query(
    "UPDATE orders SET status=? WHERE id=?",
    [status, orderId],
    () => {
      res.json({ success: true });
    }
  );
};