## 📚 MongoDB Indexing - Notes

Indexing in MongoDB improves the performance of search queries by allowing the database engine to locate data faster.  
Without indexes, MongoDB performs a collection scan, which is inefficient for large datasets.

---

### 🔹 Why Use Indexes?

🚀 Speeds up data retrieval  
⚡ Improves query performance  
🧠 Reduces CPU and memory usage  
🏭 Essential for production-grade applications  

### 📌 Types of Indexes in MongoDB

| Type                   | Description                       | Example                                          |
|------------------------|------------------------------------|--------------------------------------------------|
| **Single Field Index** | Index on a single field            | { customerName: 1 }                            |
| **Compound Index**     | Index on multiple fields           | { status: 1, orderDate: -1 }                   |
| **Multikey Index**     | Index on array fields              | { "items.productName": 1 }                     |
| **Text Index**         | For full-text search               | { "items.productName": "text" }                |
| **Hashed Index**       | Hash-based, used for sharding      | { orderId: "hashed" }                          |
| **Geospatial Index**   | For location-based queries         | { location: "2dsphere" }                       |
| **TTL Index**          | Auto-deletes documents after time  | { createdAt: 1 }, { expireAfterSeconds: 3600 } |