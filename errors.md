
# 📄 errors.md — HTTP Error Codes Documentation

## 📘 Overview

HTTP status codes are issued by a server in response to a client's request made to the server. They help in identifying the status of a request — whether it has been successfully processed, redirected, or failed due to client or server error.

---

## 🟢 1xx: Informational Responses

| Code | Meaning                   | Description                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 100  | Continue                  | The server has received the request headers. The client should proceed.    |
| 101  | Switching Protocols       | Server is switching protocols as requested by the client.                  |
| 102  | Processing (WebDAV)       | Server has received and is processing the request, but no response yet.    |
| 103  | Early Hints               | Preload resources before the final response.                               |

---

## 🟡 2xx: Success

| Code | Meaning                   | Description                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 200  | OK                        | Request was successful.                                                    |
| 201  | Created                   | Resource has been created successfully.                                    |
| 202  | Accepted                  | Request accepted but not yet processed.                                    |
| 203  | Non-Authoritative Info    | Response from a third-party source.                                        |
| 204  | No Content                | Success, but no content to return.                                         |
| 205  | Reset Content             | Instructs client to reset the document view.                               |
| 208  | Already Reported          | Resource already reported in a previous response.                          |

---

## 🟠 3xx: Redirection

| Code | Meaning                   | Description                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 300  | Multiple Choices          | Multiple options for the resource.                                          |
| 301  | Moved Permanently         | Resource has been permanently moved to a new URL.                          |
| 302  | Found                     | Resource temporarily moved to a different URL.                             |
| 303  | See Other                 | Redirect using GET method to another URL.                                  |
| 304  | Not Modified              | Resource has not been modified. Use cached version.                        |

---

## 🔴 4xx: Client Errors

| Code | Meaning                   | Description                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 400  | Bad Request               | The server cannot process the malformed request.                           |
| 401  | Unauthorized              | Authentication required.                                                   |
| 402  | Payment Required          | Reserved for future use (sometimes used for subscription systems).         |
| 403  | Forbidden                 | Client does not have permission.                                           |
| 404  | Not Found                 | The requested resource could not be found.                                 |
| 405  | Method Not Allowed        | HTTP method is not allowed for this resource.                              |
| 406  | Not Acceptable            | Server cannot produce content acceptable by client.                        |
| 407  | Proxy Authentication Required | Must authenticate with proxy.                                          |
| 408  | Request Timeout           | Server timed out waiting for request.                                      |
| 409  | Conflict                  | Conflict in request (e.g., resource version mismatch).                     |
| 410  | Gone                      | Resource is permanently unavailable.                                       |
| 411  | Length Required           | Content-Length header is required.                                         |
| 425  | Too Early                 | Server is unwilling to process a request that might be replayed.           |
| 426  | Upgrade Required          | Upgrade to a different protocol is required.                               |
| 429  | Too Many Requests         | Rate-limiting in effect. Client sent too many requests.                    |
| 451  | Unavailable for Legal Reasons | Resource is blocked for legal reasons.                                 |

---

## 🔴 5xx: Server Errors

| Code | Meaning                   | Description                                                                 |
|------|---------------------------|-----------------------------------------------------------------------------|
| 500  | Internal Server Error     | Generic server error.                                                       |
| 501  | Not Implemented           | Server does not recognize the request method.                              |
| 502  | Bad Gateway               | Invalid response from upstream server.                                     |
| 503  | Service Unavailable       | Server is currently unavailable (e.g., overload or maintenance).           |
| 504  | Gateway Timeout           | Upstream server failed to respond in time.                                 |
| 505  | HTTP Version Not Supported| Server does not support the HTTP version used.                             |
| 507  | Insufficient Storage      | Server has no space to store the representation.                           |
| 510  | Not Extended              | Further extensions required to fulfill the request.                        |
| 511  | Network Authentication Required | Network requires authentication (e.g., Wi-Fi portal).                 |

---

## 📌 Common Developer Tips

- **401 vs 403**: 401 means “you’re not authenticated”; 403 means “you are authenticated but not allowed.”
- **500 vs 502 vs 503**: 500 is internal failure, 502 is gateway failure, 503 is temporary unavailability.

---

## ✅ Conclusion

Understanding these HTTP status codes is crucial for debugging, API design, and improving user experience. They form the backbone of proper communication between client and server in RESTful applications.