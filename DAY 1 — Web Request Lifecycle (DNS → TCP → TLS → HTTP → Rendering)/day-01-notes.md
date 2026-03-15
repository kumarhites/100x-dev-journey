# Full URL Journey

Every day, we type a URL into the browser and press **Enter** without thinking twice. In a fraction of a second, a fully designed webpage appears on the screen.

But behind that simple action is a complex journey involving **networks, servers, security, and browser engines**.

Let’s walk through what _really_ happens when you hit **Enter**.

---

## 1. You Type a URL

Example:

```bash
https://www.example.com/products
```

| Part              | Meaning                                 |
| ----------------- | --------------------------------------- |
| `https`           | Protocol (how to communicate securely)  |
| `www.example.com` | The domain name (address of the server) |
| `/products`       | The specific page/resource              |

Think of it like sending a **letter**:

- Protocol → Delivery method
- Domain → Building address
- Path → Apartment number

---

## 2. Browser Cache Check

Before contacting the internet, the browser checks if it already has the data stored

Browsers cache:

- Images
- CSS
- JavaScript
- Sometimes HTML

This is why pages load **faster the second time**.

---

## 3. DNS Lookup

Computers communicate using **IP addresses**, not domain names.

Example:

```text
www.example.com → 93.184.216.34
```

DNS works like the **phonebook of the internet**.

Lookup order:

1. Browser cache
2. OS cache
3. Router cache
4. ISP DNS
5. Root DNS servers

---

## 4. TCP Connection (3‑Way Handshake)

Before data transfer, the browser establishes a TCP connection.

```text
Client → SYN
Server → SYN-ACK
Client → ACK
```

This creates a **reliable communication channel**.

---

## 5. TLS Handshake (HTTPS Security)

HTTPS encrypts the connection.

Steps:

- Verify server certificate
- Generate encryption keys
- Secure communication

This is why browsers show the **🔒 lock icon**.

---

## 6. HTTP Request

Example request:

```http
GET /products HTTP/1.1
Host: www.example.com
User-Agent: Chrome
Accept: text/html
```

The request tells the server:

- what page is needed
- what browser is used
- what content types are accepted

---

## 7. Server Processing

Typical server flow:

```text
Browser → Web Server → Application Server → Database
```

Server tasks may include:

1. Running backend code
2. Fetching database data
3. Building HTML dynamically

---

## 8. HTTP Response

Example:

```http
HTTP/1.1 200 OK
Content-Type: text/html
```

Example HTML:

```html
<html>
  <head>
    <title>Products</title>
  </head>
  <body>
    <h1>Our Products</h1>
  </body>
</html>
```

---

## 9. Browser Rendering

### Build DOM

HTML → DOM tree

```html
<h1>Hello</h1>
<p>Welcome</p>
```

DOM structure:

```text
Document
 ├── h1
 └── p
```

### Build CSSOM

```css
h1 {
  color: red;
}
```

### Render Tree

```
DOM + CSSOM = Render Tree
```

### Layout

Calculate positions and sizes.

### Paint

Pixels are drawn on screen.

---

## 10. Additional Requests

HTML often references more resources:

```html
<script src="app.js"></script>
<link rel="stylesheet" href="style.css" />
<img src="logo.png" />
```

Browsers may request **20–100 additional files**.

---

## 11. JavaScript Execution

Example:

```javascript
fetch("/api/products");
```

JavaScript enables:

- dynamic UI updates
- API calls
- event handling

---

# HTTP Versions

## HTTP/1.1

Problem solved: **Too many TCP connections**

Persistent connections:

```http
Connection: keep-alive
```

But it still had **Head-of-Line blocking**.

---

## HTTP/2

Key improvement: **Multiplexing**

Multiple requests share one connection.

```
Single Connection
 ├── HTML
 ├── CSS
 ├── JS
 └── Images
```

Additional features:

- Header compression (HPACK)
- Binary framing

Still uses **TCP**, so packet loss pauses all streams.

---

## HTTP/3

HTTP/3 uses **QUIC over UDP**.

Benefits:

- Eliminates TCP Head‑of‑Line blocking
- Faster connection setup
- Better performance on mobile networks

---

## HTTP Version Comparison

| Version  | Key Feature            | Problem Solved              |
| -------- | ---------------------- | --------------------------- |
| HTTP/1.1 | Persistent connections | Reduced connection overhead |
| HTTP/2   | Multiplexing           | Removed request queuing     |
| HTTP/3   | QUIC over UDP          | Eliminated TCP HOL blocking |

---

# TCP vs UDP

## TCP

Reliable, ordered, connection-based.

Features:

- Guaranteed delivery
- Packet ordering
- Retransmission

Handshake:

```text
Client → SYN
Server → SYN-ACK
Client → ACK
```

### TCP Use Cases

| Application    | Reason                   |
| -------------- | ------------------------ |
| HTTP / HTTPS   | Page must load correctly |
| Email          | Data integrity           |
| File downloads | Reliable transfer        |
| APIs           | Ordered responses        |

---

## UDP

Fast, connectionless.

Characteristics:

- No handshake
- No guarantee of delivery
- No ordering

### UDP Use Cases

| Application     | Reason                  |
| --------------- | ----------------------- |
| Video streaming | Small losses acceptable |
| VoIP            | Low latency             |
| Gaming          | Real-time updates       |
| DNS             | Fast lookup             |

---

## TCP vs UDP Comparison

| Feature      | TCP              | UDP            |
| ------------ | ---------------- | -------------- |
| Connection   | Connection-based | Connectionless |
| Reliability  | Guaranteed       | Not guaranteed |
| Packet Order | Maintained       | Not guaranteed |
| Speed        | Slower           | Faster         |

---

## Rule of Thumb

- Use **TCP** when data must arrive correctly.
- Use **UDP** when speed matters more than perfect delivery.
