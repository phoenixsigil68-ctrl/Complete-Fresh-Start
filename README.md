# Firebase Studio Project - विद्यार्थी સહાયક

This is a Next.js application built within Firebase Studio. It's an educational platform for students in grades 9-12 in Gujarat, featuring AI-powered learning tools.

## Project Structure Overview

This project is built with Next.js and follows the App Router paradigm. Here’s a guide to help you navigate the codebase and make your own changes.

### Core Directories

- **`src/app`**: The heart of the application. Each folder inside represents a page or URL route.
  - `page.tsx`: The homepage of the app.
  - `layout.tsx`: The main layout that wraps all pages. It's where global styles and fonts are imported.
  - `globals.css`: The global stylesheet, including Tailwind CSS configuration and your app's color theme.
  - `learn/[...slug]/page.tsx`: The dynamic learning page that displays content for a specific chapter.
  - `quiz-from-image/page.tsx`: The page for the "Create Quiz from Image" feature.
  - `actions.ts`: Contains Server Actions, which are functions that run on the server for handling forms and calling AI models.

- **`src/components`**: Contains all the reusable React components.
  - `ui/`: Core UI building blocks from ShadCN, like `Button.tsx`, `Card.tsx`, and `Select.tsx`.
  - `home/`: Components specifically for the homepage (e.g., `SelectionForm.tsx`).
  - `learn/`: Components for the learning page (e.g., `ContentDisplay.tsx`, `FlashcardView.tsx`).
  - `language-toggle.tsx`: The component that allows users to switch between English and Gujarati.

- **`src/lib`**: A library of shared code, data, and configurations.
  - `data.ts`: Contains all the structured content for grades, subjects, and chapters. **To add a new chapter or subject, you would edit this file.**
  - `types.ts`: Defines the TypeScript types for your data structures (e.g., `Chapter`, `Grade`).
  - `i18n/`: Holds the translation files (`en.json`, `gu.json`) for English and Gujarati text.
  - `utils.ts`: Utility functions, such as the `cn` function for merging Tailwind CSS classes.

- **`src/ai`**: Home to all the generative AI functionality, powered by Genkit.
  - `genkit.ts`: Initializes and configures the connection to Google's AI models.
  - `flows/`: Contains the AI "flows." Each file defines a specific task, such as generating quiz questions (`generate-quiz-questions.ts`) or summarizing content (`summarize-content-flow.ts`). The prompts sent to the AI are defined in these files.

- **`public`**: For static files that are publicly accessible.
  - This is where you would place images, favicons, and other assets that don't need to be processed by the build system.

- **Configuration Files**
  - `tailwind.config.ts`: Configures Tailwind CSS, including custom fonts and animations.
  - `next.config.ts`: Configuration for Next.js, such as allowing images from external domains.
  - `package.json`: Lists all project dependencies (like React, Next.js, and Genkit) and scripts (like `npm run dev`).

---

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
