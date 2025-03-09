// const { db } = require("./firebaseconfig");

// const collection = "customers";

// exports.createCustomer = async (req, res) => {
//   try {
//     const data = req.body;
//     const docRef = await db.collection(collection).add(data);
//     res.status(201).json({ message: "Customer saved!", id: docRef.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllCustomers = async (req, res) => {
//   try {
//     const snapshot = await db.collection(collection).get();
//     if (snapshot.empty) {
//       return res.status(404).json({ message: "No customers found" });
//     }
//     const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     res.status(200).json({ message: "Customers found!", customers: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getCustomerById = async (req, res) => {
//   try {
//     const docRef = db.collection(collection).doc(req.params.id);
//     const doc = await docRef.get();
//     if (!doc.exists) {
//       return res.status(404).json({ message: "Customer not found" });
//     }
//     res.status(200).json({ message: "Customer found!", customer: { id: doc.id, ...doc.data() } });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateCustomerById = async (req, res) => {
//   try {
//     const docRef = db.collection(collection).doc(req.params.id);
//     await docRef.update(req.body);
//     res.status(200).json({ message: "Customer updated successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteCustomerById = async (req, res) => {
//   try {
//     await db.collection(collection).doc(req.params.id).delete();
//     res.status(200).json({ message: "Customer deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
