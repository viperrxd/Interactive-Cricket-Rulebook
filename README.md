---

## 🕹️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/viperrxd/Interactive-Cricket-Rulebook.git](https://github.com/viperrxd/Interactive-Cricket-Rulebook.git)
    ```
2.  **Open the project:**
    Simply open `index.html` in any modern web browser. No local server or build steps required!

---

## 🤝 Contributing & Support

Contributions are welcome! If you'd like to add more rules (like Powerplay restrictionsThis is a fully merged, interactive-style `README.md` that combines the technical depth of your project with the high-energy aesthetic of the Matrix Development profile.

---

<div align="center">
  
  # 🏏 Interactive Cricket Rulebook
  **Making the Complex Laws of Cricket Simple**
  
  [![Repo Size](https://img.shields.io/github/repo-size/viperrxd/Interactive-Cricket-Rulebook?style=for-the-badge&color=FFD700)](https://github.com/viperrxd/Interactive-Cricket-Rulebook)
  [![License](https://img.shields.io/github/license/viperrxd/Interactive-Cricket-Rulebook?style=for-the-badge&color=008000)](https://github.com/viperrxd/Interactive-Cricket-Rulebook/blob/main/LICENSE)
  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Now-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://cricketrulebook.pages.dev/)

</div>

---

## 🚀 About the Project

The **Interactive Cricket Rulebook** is a specialized web application designed to demystify the most complex aspects of cricket: the **Duckworth-Lewis-Stern (DLS) Method** and the **Leg Before Wicket (LBW) Law**. 

Whether you're a fan trying to understand a rain-affected target or a player mastering the LBW zones, this tool provides a high-fidelity simulation to visualize the logic behind the umpire's decision.

---

## 🤖 Powerful Interactive Modules

### 📐 DLS Method Explorer
*Visualizing the "Resource" math behind rain-shortened matches.*
*   **Dual-Slider Control:** Adjust **Overs Remaining** (0–50) and **Wickets Lost** (0–10) for instant feedback.
*   **Dynamic Target Calculation:** Real-time calculation of Team 2's revised target.
*   **Animated Resource Gauge:** A visual bar that shifts from **Green** (high resources) to **Red** (critical).
*   **Heatmap Grid:** A comprehensive table of resource percentages with the current state highlighted.

### 🔴 LBW Simulator
*A bird's-eye view physics engine for the game's toughest call.*
*   **Interactive SVG Pitch:** Click-to-place **Pitching Point** (Blue) and **Impact Point** (Gold).
*   **Auto-Projection:** See the ball's trajectory color-coded by the final verdict.
*   **Smart Logic:** Toggles for **Shot Offered** and **LHB/RHB** stances that fundamentally change the verdict.
*   **Presets:** Load scenarios like "Classic Out," "Pitched Outside Leg," or "Umpire's Call" instantly.

---

## 📖 The Decision Logic

### LBW Rules Applied:
1.  **Pitching:** If the ball pitches outside the line of Leg Stump, it is **NOT OUT** 🟢.
2.  **Impact:** 
    *   If **In-line**: Can be **OUT** 🔴.
    *   If **Outside Off**: Only **OUT** if the umpire deems no genuine shot was offered.
3.  **Wickets:** Projected trajectory must hit the stumps. Margins result in **UMPIRE'S CALL** 🟡.

### DLS Formula:
The calculator follows the standard ICC resource percentage logic:
$$Revised Target = Team 1 Score \times \left( \frac{Team 2 Resources}{Team 1 Resources} \right)$$

---

## 👨‍💻 Meet the Developer

| Name | Role | Focus | GitHub |
| :--- | :--- | :--- | :--- |
| **Viperr XD** | Lead Developer | UI Design, Trajectory Physics, & DLS Logic | [@viperrxd](https://github.com/viperrxd) |

---

## 🛠️ Tech Stack & Structure

*   **Languages:** HTML5 (Semantic), CSS3 (Modern Flex/Grid), Vanilla JavaScript (ES6+).
*   **Graphics:** SVG for precise pitch and trajectory rendering.

**File Architecture:**
```text
├── index.html   # Core UI and SVG Structure
├── style.css    # Heatmap animations and responsive layout
├── app.js       # The "Brain" (DLS math and LBW logic)
└── README.md    # Documentation
