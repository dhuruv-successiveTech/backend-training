# Middleware in Express.js

## Introduction

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle. Middleware functions can perform the following tasks:

- Execute any code.
- Modify the request and the response objects.
- End the request-response cycle.
- Call the next middleware function.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function.

## Types of Middleware

1. **Application-level middleware**
2. **Router-level middleware**
3. **Error-handling middleware**
4. **Built-in middleware**
5. **Third-party middleware**

---

## 1. Application-Level Middleware

Application-level middleware is bound to an instance of the Express application using `app.use()` or `app.METHOD()`.

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

app.get('/', (req, res) => {
  res.send('Home Page');
});
```

## 2. Router-Level Middleware

Router-level middleware works in the same way as application-level middleware, except it is bound to an instance of `express.Router()`.

```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router Middleware');
  next();
});

router.get('/', (req, res) => {
  res.send('Router Home');
});

app.use('/router', router);
```

## 3. Error-Handling Middleware

Error-handling middleware is defined with four arguments. Express identifies it as error-handling middleware.

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## 4. Built-in Middleware

Express comes with some built-in middleware functions starting from version 4.x:

- `express.static` – Serves static assets.
- `express.json` – Parses incoming requests with JSON payloads.
- `express.urlencoded` – Parses incoming requests with URL-encoded payloads.

```javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
```

## 5. Third-party Middleware

Third-party middleware is used to add functionality like logging, authentication, etc. Example: `morgan` for logging.

```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## Conclusion

Middleware is a powerful feature of Express.js that helps in managing the request-response lifecycle effectively. Understanding and using middleware appropriately is essential for building scalable and maintainable Express applications.
