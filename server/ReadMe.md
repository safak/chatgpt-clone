# Backend Setup and Documentation

This document outlines the setup process for the backend, along with details of resolved issues and recent improvements.

---

## **Backend Directory Structure**

To maintain an organized backend project, create the following directories under `learning/src`:

```sh
mkdir controllers db middlewares models routes utils
```

### Directory Overview:
- **controllers:** Contains business logic for handling requests.
- **db:** Database connection and configuration.
- **middlewares:** Custom middleware for authentication, validation, etc.
- **models:** Database schemas and models.
- **routes:** API endpoint definitions and route handlers.
- **utils:** Utility functions and helper modules.

---

## **Resolved Issues**

### **Issue: PDF Parser Debugging Code Crash**
**Problem:**
The `pdf-parse` library caused the app to crash due to unnecessary debugging code in `node_modules/pdf-parse/index.js`. This debug code tried to read a nonexistent test file (`./test/data/05-versions-space.pdf`).

**Solution:**
1. Removed the problematic debug block in the library's `index.js` file.
2. Options to ensure persistence:
   - Forked the library repository and removed the debug block.
   - Used `patch-package` to automate the fix:
     ```bash
     npm install patch-package
     npx patch-package pdf-parse
     ```

**Impact:** The app no longer crashes during runtime, and the library works as expected when parsing PDFs.

---

## **Recent Fixes and Improvements**

### Commit Message:
✅ **Fix Avatar Validation & Improve Development Environment Setup**

### **Changes:**

1. **Avatar Field Validation:**
   - Ensured the `avatar` field is mandatory in requests.
   - Added clear error handling: returns *"Avatar is required"* if the field is missing.

2. **Error Handling Improvements:**
   - Resolved `undefined` errors when `avatar` is not provided using optional chaining (`?.`).

3. **Cover Image Handling:**
   - Added a graceful fallback for the optional `coverImage` field.
   - Prevented crashes if `coverImage` is missing from the request.

4. **Postman Environment Setup:**
   - Created a structured Postman testing environment.
   - Configured reusable environment variables, including:
     - `API_BASE_URL`
     - Dynamic paths for APIs.

5. **Environment Variables:**
   - Added `.env` variables for:
     - `CLOUDINARY_URL`: For managing image uploads.
     - `TEMP_DIRECTORY_PATH`: For temporary storage during processing.

### **Impact:**
- Enhanced error handling ensures smoother API responses and better debugging clarity.
- Streamlined testing process with reusable Postman variables.
- Improved maintainability and scalability with environment variable configuration.

---

## **Setup Instructions**

### 1. **Install Dependencies:**
Run the following command to install required packages:
```sh
npm install
```

### 2. **Environment Variables:**
Create a `.env` file in the root directory and include the following variables:
```env
CLOUDINARY_URL=<Your Cloudinary URL>
TEMP_DIRECTORY_PATH=<Path to temporary storage>
```

### 3. **Start the Development Server:**
Run the server with `nodemon` for automatic reloads during development:
```sh
npm run dev
```

### 4. **Testing with Postman:**
Import the provided Postman collection and configure the following environment variables:
- `API_BASE_URL`: Base URL of your backend API.
- Ensure other dynamic paths are set up as required.

---

## **Using the PDF Parser**

### Functionality:
The `parseAndVectorizePDF` function processes PDF files by downloading, parsing, and converting their content into vectorized data for storage.

### Steps:
1. Download the PDF using Axios.
2. Parse the PDF content using `pdf-parse`.
3. Convert the parsed text into vectors (placeholder logic: word lengths).
4. Store the vectorized data in the database using `VectorData`.

### Example Usage:
```javascript
parseAndVectorizePDF(fileId, fileUrl)
  .then(() => console.log('PDF processing complete.'))
  .catch((err) => console.error('Error processing PDF:', err));
```

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

## **Contributing**
Feel free to contribute to this project by submitting issues or pull requests. Follow the project's [contribution guidelines](CONTRIBUTING.md).

s