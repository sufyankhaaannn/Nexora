# NEXORA

A modern technology e-commerce storefront built with React and Vite.

NEXORA provides a clean shopping experience for browsing technology products, viewing product details, managing a cart, completing checkout, and reviewing previous orders.

## Features

- Technology-focused product catalog
- Product search
- Product category filtering
- Product sorting
- Product details pages
- Responsive product grid
- Add-to-cart functionality
- Persistent shopping cart
- Cart quantity management
- Checkout flow
- Order confirmation
- Order history
- Individual order details
- Responsive design for desktop, tablet, and mobile
- Loading skeletons for product data
- Empty and error states
- Responsive navigation
- About page
- Contact page
- FAQ section
- Scroll-to-top navigation
- Client-side routing with React Router

## Tech Stack

- **React 19**
- **Vite**
- **React Router**
- **Lucide React**
- **JavaScript (ES Modules)**
- **CSS**
- **DummyJSON Products API**

## Project Structure

```text
nexora/
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── products/
│   │
│   ├──context/
│   ├── CartContext.jsx
│   ├── CartContextDefinition.js
│   └── useCart.js
│   │
│   ├── hooks/
│   │   ├── useCategories.js
│   │   ├── useProduct.js
│   │   └── useProducts.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   │
│   ├── services/
│   │   └── productService.js
│   │
│   ├── utils/
│   │   └── productUtils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

Check your installed versions:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone https://github.com/sufyankhaaannn/Nexora.git
```

Move into the project directory:

```bash
cd Nexora
```

Install dependencies:

```bash
npm install
```

### Development

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

### Production Build

Create a production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Available Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/shop` | Product catalog |
| `/product/:id` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/order-confirmation` | Order confirmation |
| `/orders` | Order history |
| `/orders/:orderId` | Individual order details |
| `/about` | About NEXORA |
| `/contact` | Contact page |

## Development Notes

NEXORA currently uses the DummyJSON Products API as its product data source.

The storefront filters the API data to display technology-related products rather than exposing unrelated product categories.

Cart and order functionality are handled on the client side for the current application implementation.

## Quality Checks

Before committing changes, run:

```bash
npm run lint
npm run build
```

Both commands should complete successfully before changes are pushed.

## Status

NEXORA is an actively developed e-commerce frontend project.

The application is being developed incrementally with a focus on:

- Maintainable React architecture
- Reusable components
- Responsive UI
- Clean user flows
- Production-oriented code quality
- Reliable shopping and checkout interactions

## Author

**Sufyan Khan**

GitHub: [@sufyankhaaannn](https://github.com/sufyankhaaannn)

## Repository

[github.com/sufyankhaaannn/Nexora](https://github.com/sufyankhaaannn/Nexora)