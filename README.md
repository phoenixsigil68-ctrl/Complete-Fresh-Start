tgit # Firebase Studio Project - विद्यार्थी સહાયક

This is a Next.js application built within Firebase Studio. It's an educational platform for students in grades 9-12 in Gujarat.

## Running Your Project Locally

You can run a complete copy of this project on your local computer. This allows you to work with your own code editor and run the app without needing to open Firebase Studio. This project is backed by a Git repository, and the best way to work with it locally is to clone it.

Follow these steps to get your project onto your PC:

### 1. Prerequisites:
   - **Node.js:** Make sure you have Node.js (which includes `npm`) installed. You can download it from [nodejs.org](https://nodejs.org/).
   - **Git:** Install Git on your computer if you don't have it already. Download it from [git-scm.com](https://git-scm.com/).

### 2. Set Up a GitHub Repository:
   a. Go to [GitHub](https://github.com/) and create a new, empty repository. Do **not** initialize it with a README, .gitignore, or license file.
   b. After creating the repository, copy its URL. It will look something like this: `https://github.com/your-username/your-repository-name.git`.

### 3. Initialize Git and Push Your Code:
   Open a terminal or command prompt **in your project's directory within Firebase Studio's terminal** and run the following commands one by one.

   a. **Initialize a new Git repository:**
      ```bash
      git init -b main
      ```

   b. **Add all your project files to Git:**
      ```bash
      git add .
      ```

   c. **Create your first commit (a snapshot of your code):**
      ```bash
      git commit -m "Initial commit"
      ```

   d. **Link your local repository to the GitHub repository you created:**
      *(Replace `<your-repository-url>` with the URL you copied from GitHub)*
      ```bash
      git remote add origin <your-repository-url>
      ```

   e. **Push your code to GitHub:**
      ```bash
      git push -u origin main
      ```

### 4. Clone to Your Local PC:
   Now, open a terminal **on your own computer**, navigate to the folder where you want to store your project, and run the `git clone` command with your repository URL:

   ```bash
   git clone <your-repository-url>
   ```

### 5. Install Dependencies and Run:
   a. **Navigate into your new project folder:**
      ```bash
      cd your-repository-name
      ```
   b. **Install all the necessary packages:**
      ```bash
      npm install
      ```
   c. **Start the local development server:**
      ```bash
      npm run dev
      ```

Your app should now be running locally! You can open the project folder in your favorite code editor (like VS Code) and start making changes.

---
*To get started with the app's code, take a look at `src/app/page.tsx`.*