E-Commerce Product List Builder

Features

1. Product List
Displays a list of selected products with their images, names, and variants.
Variants are collapsible, allowing users to toggle visibility via "Show Variants" / "Hide Variants" buttons.
Users can:
Add flat or percentage discounts to products or variants.
Remove products from the list (with the condition: the "Remove" button is hidden when only one product is present).
Reorder products and variants via drag and drop.

2. Product Picker Dialog
A modal that allows users to:
Fetch products from the API with scroll-based pagination (loads 10 products at a time).
Search products by name using a search bar.
Select multiple products/variants to replace an existing product in the list.
Replaces the clicked product with the selected products/variants while maintaining the correct order.

3. Add Product Button
Adds an empty product to the end of the list, allowing users to manually configure it.


Tech Stack

Frontend Framework:
React JS: For building the UI.

State Management:
Redux Toolkit: To manage application state efficiently.
Redux Async Thunk: For handling API calls and asynchronous data fetching.

Drag-and-Drop:
react-beautiful-dnd: To implement smooth drag-and-drop functionality for reordering products and variants.

Styling:
Tailwind CSS: For responsive and modern styling.

API Integration:
Utilizes the provided GET API to fetch product data dynamically with search and pagination capabilities.