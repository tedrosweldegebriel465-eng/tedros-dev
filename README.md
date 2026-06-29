# Tedros Portfolio

This is a **personal portfolio website** built with **HTML, CSS, and JavaScript**, featuring a responsive design, interactive user interface, and a small **Python automation tool** that synchronizes the Projects section with GitHub repositories.

## 📸 Screenshots

### 🏠 Home (Hero Section)

![Hero Section](screenshots/hero.png)

### 👨‍💻 About Me

![About Section](screenshots/about.png)

### 🚀 Projects

![Projects Section](screenshots/projects.png)

### 💻 Technical Skills

![Skills Section](screenshots/skills.png)

---

## 🚀 Run Locally

Open `index.html` in your preferred web browser.

Or use a local development server if desired.

---

## 🔄 Update Projects from GitHub

Generate `data/projects.json` using the GitHub API:

```bash
python tools/update_projects.py
```

After running the script, refresh your browser to see the updated project list.

---

## 🌐 Deployment

### Option 1 — GitHub Pages

1. Create a GitHub repository (for example, `portfolio`).
2. Upload the project files.
3. Navigate to **Settings → Pages**.
4. Select your branch (e.g., `main`) and the **root (`/`)** directory.
5. Save the settings. GitHub will generate a public website URL.

### Option 2 — Netlify

1. Drag and drop the project folder into Netlify, or connect your GitHub repository.
2. Leave the **Build Command** empty.
3. Set the **Publish Directory** to the project root.
4. Deploy your site.

---

## 📂 Project Structure

```
portfolio/
│── screenshots/
│   ├── hero.png
│   ├── about.png
│   ├── projects.png
│   └── skills.png
│
│── data/
│   └── projects.json
│
│── tools/
│   └── update_projects.py
│
│── index.html
│── style.css
│── script.js
│── sitemap.xml
│── README.md
```

---

## 🛠 Technologies Used

* HTML5
* CSS3
* JavaScript
* Python
* Git & GitHub
* Netlify

---

## 📬 Contact

**Tedros Weldegebriel**

* GitHub: https://github.com/tedrosweldegebriel465-eng
* LinkedIn: https://www.linkedin.com/in/tedros-dev369/
* Email: [tedrosweldegebriel465@gmail.com](mailto:tedrosweldegebriel465@gmail.com)
