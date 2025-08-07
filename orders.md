
# MongoDB Aggregation Queries and Indexes

## Aggregation Queries

### 1. Find Total Revenue Generated (sum of `totalAmount`)
```js
db.orders.aggregate([
 {
     $group:{ _id:null, totalRevenue:{"$sum":"$totalAmount"}}
 }
])
```

### 2. Find Total Number of Orders by Status (Pending, Shipped, Delivered)
```js
db.orders.aggregate([
 {
     $group:{ _id:"$status", count:{"$sum":1}}
 }
])
```

### 3. Find the Top 3 Customers Who Spent the Most (Sort by `totalAmount`)
```js
db.orders.aggregate([
  {$sort:{totalAmount:-1}},
  {$limit:3}
])
```

### 4. Get the Average Order Amount per Customer
```js
db.orders.aggregate([
  {	
	$group:{
	  _id:"$customerName",
	  averageAmount:{$avg:"$totalAmount"}
	}
  }
])
```

### 5. Find Products That Were Sold More Than 10 Times (Total Quantity)
```js
db.orders.aggregate([
{$unwind:"$items"},
 {
	$group:{
		_id:"$items.productName",
		quantity:{$sum:"$items.quantity"}
	}
 },
 {$match:{
 	quantity:{$gt:10}
 }}
])
```

### 6. List Monthly Revenue (Group by Month-Year) for the Last 6 Months
```js
db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))  
      }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$orderDate" },
        month: { $month: "$orderDate" }
      },
      totalRevenue: { $sum: "$totalAmount" } 
    }
  },
  {
    $sort: { "_id.year": -1, "_id.month": -1 }
  }
]);
```

### 7. Find All Customers Who Placed More Than 2 Orders
```js
db.orders.aggregate([
	{
	   $group:{
	   	_id:"$customerName",
	   	orderCount:{$sum:1}
	   }
	},
	{
	    $match:{orderCount:{$gt:2}}
	}
])
```

### 8. Extract Only the Product Names from All Orders Using `$unwind` and `$project`
```js
db.orders.aggregate([
	{$unwind:"$items"},
	{
	   $project:{
	      _id:0,
	      productName:"$items.productName"
	   }
	}
])
```

### 9. Filter by Delivered Orders and Calculate Revenue
```js
db.orders.aggregate([
 {   
    $match:{status:"Delivered"}
 },
 {
    $group:{
      _id:null,
      totalRevenue:{$sum:"$totalAmount"}
    }
 },
 {
    $project:{
    	totalRevenue:1
    }	
 }
])
```

### 10. Calculate Total Quantity and Revenue per Product
```js
db.orders.aggregate([
{$unwind:"$items"},
{
   $group:{
      _id:"$items.productName",
      totalQuantity:{$sum:"$items.quantity"},
      totalRevenue:{$sum:{$multiply:["$items.price","$items.quantity"]}}
   }
}
])
```

---

## Indexing Queries

### Q1. Check Indexes on the Collection
```js
db.orders.getIndexes()
```

### Q2. Create Index on `customerName` and Analyze Performance
```js
db.orders.createIndex({customerName:1})
db.orders.find({customerName:"Ava White"}).explain("executionStats")
```

### Q3. Create Compound Index on `status` and `orderDate`, Compare Performance
```js
db.orders.createIndex({status:1,orderDate:-1})
db.orders.find({ status: 'Delivered', orderDate: { $gte: new Date('2025-06-01') } }).explain('executionStats');
```

### Q4. Create Text Index on `items.productName` and Perform a Text Search
```js
db.orders.createIndex({"items.productName":"text"})
db.orders.find({$text:{$search:"Air Purifier"}}).explain('executionStats');
```

### Q5. Drop an Index and Observe Performance Difference
```js
db.orders.dropIndex({status:1,orderDate:-1})
```