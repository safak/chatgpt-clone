**Backend**

to create the respective dir in learning/src

```sh
mkdir controllers db middlewares models routes utils
```


**Commit Message:**  
✅ **Fix Avatar Validation & Improve Development Environment Setup**  

**Changes:**  
- Added validation to ensure the `avatar` field is provided in the request.  
  - Returns a clear error *"Avatar is required"* if missing.  
- Resolved the `undefined` error issue when `avatar` is not included in the request by adding robust checks using optional chaining.  
- Improved handling of the optional `coverImage` field:  
  - Graceful fallback if `coverImage` is not provided in the request.  
- Set up an organized Postman environment for testing:  
  - Configured environment variables for `API_BASE_URL` and related paths to streamline API requests.  
- Added `.env` variables for the Cloudinary URL and temp directory paths to enhance portability and maintainability.  

**Impact:**  
- Ensures better error handling and clarity for developers and users when working with image uploads.  
- Simplifies the testing process with a clean and reusable Postman setup.  
- Strengthens overall project maintainability and scalability.