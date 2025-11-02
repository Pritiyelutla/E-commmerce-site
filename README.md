E-Commerce Cart Project

    A simple full-stack e-commerce cart system built using Express.js and React.js.



Folder Structure

    FrontEnd :  node_modules
                public
              -src - componenets -CartItem.jsx
                                  -Navbar.jsx
                                  -ProductCard.jsx
                    - context -CartContext.jsx
                    - Pages - CartPage.jsx
                              Checkout.jsx
                              ProductPage.jsx
                    - api.jsx
                    - App.jsx
                    - index.css
                    - index.js
                - .gitignore
                - package-lock.json
                - package.json
                - README.md

    Backend: -controllers   -CartController.js
                            -ProductController.js
             -models        -cart.js
                            -Product.js
             -node_modules
             -routes        -cartRoutes.js
                            -ProductRoutes.js
             -.env
             -package-lock.json
             -package.json
             -server.js


Features
- Display a list of mock products  
- Add products to cart  
- Remove items from cart  
- Display cart total  
- Checkout form with success message  
- RESTful backend using Express.js  



Setup Instructions

    -Backend Setup
        cd backend
        npm install
        npm start


Backend will start on http://localhost:5000

    -Frontend Setup
        cd frontend
        npm install
        npm start

    
Frontend will start on http://localhost:3000

How It Works

-Products are displayed on the frontend.

-User can add/remove items from the cart.

-Cart total is shown.

-Clicking “Checkout” opens a form.

-After submitting, it shows “Checkout successful”.



Screenshots - 

    1.frontend/screentshots/Project-Dashboard.png
    2.frontend/screentshots/Project-Cart.png
    3.frontend/screentshots/Project-Checkout-Success.png
    4.frontend/screentshots/Project-Checkout.png 