# HR Application for Practicing React

## Week 4

### Step 1
1. Install `react-router-dom` to manage routing in your application.
2. Create pages for `Root`, `Login`, `ErrorPage`, `List`, and `Form`.
3. Set up routes:
   - The `Root` page will include the `Header`, `Outlet`, and `Footer` components.
4. Test your routes by entering the following paths in the URL:
   - `/login`
   - `/employees`
   - `/new`
   - `/something` (to verify that the `ErrorPage` is displayed correctly).

### Step 2
1. Modify the `Header` to include a menu with navigation links:
   - **Employees**: Links to `/employees`.
   - **Add New**: Links to `/new`.
2. Ensure the `List` component displays the employees list.
3. Prepare the `Form` component:
   - Add inputs for all fields matching the structure in `personData`.
   - Use `useState` to manage form data. (Optional: use `useRef` instead of `useState`)
   - Log the form data to the console upon submission (functionality to save the data will be added later).

### Step 3
1. Add login functionality:
   - On landing, the user will see the `Login` component.
   - The `Login` component should include fields for a username and password.
   - Add a condition to allow the user to log in only with the correct credentials.
2. After successful login, display the `Root` component to the user.