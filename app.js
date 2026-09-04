// EduShield Application Engine

// ==========================================
// 1. Initial Mock Database
// ==========================================
const INITIAL_DATABASE = {
  subjects: {
    math: {
      id: "math",
      name: "Mathematics",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
      topics: [
        {
          id: "fractions",
          name: "Fractions & Decimals",
          sequence: 1,
          notes: {
            concept: "A fraction represents a part of a whole. A decimal is another way of writing a fraction whose denominator is a power of ten (10, 100, 1000, etc.). To convert a fraction to a decimal, divide the numerator by the denominator.",
            example: "Convert 3/4 to a decimal. Divide 3 by 4: 3 ÷ 4 = 0.75. To convert 0.6 to a fraction: 0.6 = 6/10, which simplifies to 3/5.",
            mistake: "Mistaking 1/5 for 0.15 instead of 0.20. Remember, 1/5 is equivalent to 2/10, which is written as 0.2.",
            practice: [
              { question: "Convert 2/5 to a decimal.", type: "text", answer: "0.4" },
              { question: "What is 0.75 written as a simplified fraction?", type: "text", answer: "3/4" }
            ],
            quiz: [
              {
                question: "What is the decimal equivalent of 7/8?",
                options: ["0.78", "0.825", "0.875", "0.915"],
                answer: 2
              },
              {
                question: "Add 0.4 and 3/5. What is the answer in decimals?",
                options: ["0.7", "0.9", "1.0", "1.4"],
                answer: 2
              },
              {
                question: "Convert 0.08 to a simplified fraction.",
                options: ["8/100", "4/50", "2/25", "1/25"],
                answer: 2
              }
            ]
          },
          simplerNotes: {
            concept: "Think of a fraction as slicing a pizza. If you slice a pizza into 10 equal pieces, and you eat 6 of them, you have eaten 6/10 of the pizza. In decimals, this is written as 0.6 (six tenths). Decimals are just a quick way of counting parts out of 10 or 100.",
            example: "If you have half of a candy bar, you have 1 out of 2 pieces (1/2). To find the decimal, make the bottom number 10. Multiply top and bottom by 5: (1*5)/(2*5) = 5/10. Five tenths is written as 0.5.",
            mistake: "Thinking 0.05 is the same as 0.5. 0.5 is 5 out of 10 (half), while 0.05 is 5 out of 100 (a tiny sliver!).",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            videoTitle: "Introduction to Fractions & Decimals (Visual Walkthrough)",
            retryQuiz: [
              {
                question: "If you have 1/2 of a cake, what is it in decimals?",
                options: ["0.2", "0.5", "1.2", "0.05"],
                answer: 1
              },
              {
                question: "What is 3 tenths written as a decimal?",
                options: ["0.03", "0.3", "3.0", "0.33"],
                answer: 1
              }
            ]
          }
        },
        {
          id: "linear_equations",
          name: "Linear Equations in One Variable",
          sequence: 2,
          notes: {
            concept: "A linear equation in one variable is an equation of the form ax + b = 0, where a and b are constants and x is a variable. The goal is to isolate the variable on one side by performing the same inverse operations on both sides (addition/subtraction, then multiplication/division).",
            example: "Solve 3x + 5 = 17.\n1. Subtract 5 from both sides: 3x = 12\n2. Divide both sides by 3: x = 4.",
            mistake: "Forgetting to change signs when moving terms across the equals sign. For example, in 2x - 4 = 6, adding 4 to both sides gives 2x = 10, NOT subtracting 4 to get 2x = 2.",
            practice: [
              { question: "Solve for y: 4y - 7 = 9.", type: "text", answer: "4" },
              { question: "Solve for z: 2z + 8 = z + 12.", type: "text", answer: "4" }
            ],
            quiz: [
              {
                question: "Solve the equation: 5x - 12 = 18",
                options: ["x = 1.2", "x = 4", "x = 6", "x = 30"],
                answer: 2
              },
              {
                question: "Solve the equation: 3(x - 4) = 15",
                options: ["x = 9", "x = 7", "x = 1", "x = 19"],
                answer: 0
              },
              {
                question: "Find the value of p: p/4 + 6 = 11",
                options: ["p = 1.25", "p = 20", "p = 68", "p = 44"],
                answer: 1
              }
            ]
          },
          simplerNotes: {
            concept: "Think of an equation as a balanced seesaw. Whatever weight you add or remove on one side, you MUST add or remove the exact same amount on the other side to keep it balanced. Our goal is to get the letter (like x) completely by itself on one side.",
            example: "Solve: x + 4 = 10. The seesaw has x and 4 on the left, and 10 on the right. To get x alone, take away 4 from both sides. Left side becomes x, right side becomes 10 - 4 = 6. So, x = 6.",
            mistake: "Dividing before subtracting. In 2x + 6 = 12, subtract 6 FIRST to get 2x = 6, then divide by 2 to get x = 3. If you divide first, you must divide EVERYTHING (including the 6!), which is much harder.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            videoTitle: "Balancing Equations: The Seesaw Method",
            retryQuiz: [
              {
                question: "Solve for x: x - 5 = 7",
                options: ["x = 2", "x = 12", "x = 35", "x = 7/5"],
                answer: 1
              },
              {
                question: "Solve for y: 2y = 10",
                options: ["y = 8", "y = 5", "y = 20", "y = 12"],
                answer: 1
              }
            ]
          }
        },
        {
          id: "ratios",
          name: "Ratio & Proportion",
          sequence: 3,
          notes: {
            concept: "A ratio is a comparison of two numbers by division, written as a:b or a/b. A proportion is an equation stating that two ratios are equal: a/b = c/d. To solve proportions, use cross-multiplication: a * d = b * c.",
            example: "Solve for x: 3/5 = x/15. Cross-multiply: 3 * 15 = 5 * x -> 45 = 5x -> x = 9.",
            mistake: "Writing ratios in the wrong order. If the ratio of boys to girls is 3:4, boys represents 3 units and girls represents 4 units. Do not swap them to 4:3.",
            practice: [
              { question: "Simplify the ratio 12:18.", type: "text", answer: "2:3" },
              { question: "Solve for x: 2/3 = 8/x.", type: "text", answer: "12" }
            ],
            quiz: [
              {
                question: "A class has 15 boys and 20 girls. What is the simplified ratio of boys to total students?",
                options: ["3:4", "4:3", "3:7", "4:7"],
                answer: 2
              },
              {
                question: "If 4 books cost $24, how much will 10 books cost?",
                options: ["$40", "$50", "$60", "$80"],
                answer: 2
              },
              {
                question: "Are the ratios 2:3 and 8:12 proportional?",
                options: ["Yes, because 2*12 = 3*8 = 24", "No, because 8-2 is not 12-3", "Yes, because both add up to 20", "No, because 12 is larger than 8"],
                answer: 0
              }
            ]
          },
          simplerNotes: {
            concept: "A ratio is like a cooking recipe. If a recipe says '2 cups of water for every 1 cup of rice', the ratio is 2:1. If you want to make double the food, you scale it up: 4 cups of water and 2 cups of rice. This is still 4:2, which simplifies back to 2:1. They are proportional!",
            example: "If you have 3 blue marbles and 6 red marbles, you have twice as many red marbles. The ratio is 3:6, which is the same as 1:2.",
            mistake: "Comparing parts to wholes when you shouldn't. If there are 2 dogs and 3 cats, the ratio of dogs to cats is 2:3. The ratio of dogs to total animals is 2:5.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            videoTitle: "Scaling Recipes: Understanding Ratios Visually",
            retryQuiz: [
              {
                question: "If a map scale is 1 cm = 5 km, how many km is 3 cm?",
                options: ["5 km", "10 km", "15 km", "8 km"],
                answer: 2
              },
              {
                question: "Simplify the ratio 5:10.",
                options: ["1:2", "2:1", "1:5", "5:1"],
                answer: 0
              }
            ]
          }
        }
      ]
    },
    science: {
      id: "science",
      name: "Science",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 3-2 3s4.5-.5 6-2c1.5-1.5 1.5-4.5 1.5-4.5s-3 0-5.5 1.5z"></path><path d="M13.5 7.5c-1.5 1.26-2 3-2 3s4.5-.5 6-2c1.5-1.5 1.5-4.5 1.5-4.5s-3 0-5.5 1.5z"></path><path d="M12 12l9 9"></path><path d="M12 12L3 3"></path></svg>`,
      topics: [
        {
          id: "photosynthesis",
          name: "Photosynthesis",
          sequence: 1,
          notes: {
            concept: "Photosynthesis is the process by which green plants utilize sunlight, carbon dioxide, and water to synthesize glucose (food) and release oxygen. It occurs primarily in the chloroplasts of leaf cells using the green pigment chlorophyll.",
            example: "The chemical equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂.",
            mistake: "Thinking plants photosynthesize only to make oxygen. Plants make glucose for their own energy; oxygen is a byproduct released into the atmosphere.",
            practice: [
              { question: "What is the green pigment in plants called?", type: "text", answer: "chlorophyll" },
              { question: "What gas is taken in by plants during photosynthesis?", type: "text", answer: "carbon dioxide" }
            ],
            quiz: [
              {
                question: "Where in a plant cell does photosynthesis take place?",
                options: ["Nucleus", "Chloroplast", "Mitochondria", "Cell wall"],
                answer: 1
              },
              {
                question: "Which of the following is NOT required for photosynthesis?",
                options: ["Sunlight", "Water", "Oxygen", "Carbon dioxide"],
                answer: 2
              },
              {
                question: "What is the main carbohydrate produced by plants?",
                options: ["Sucrose", "Glucose", "Starch", "Cellulose"],
                answer: 1
              }
            ]
          },
          simplerNotes: {
            concept: "Think of a leaf as a tiny solar-powered kitchen. The chef (Chlorophyll) takes in three ingredients: water from the roots, carbon dioxide from the air, and sunlight from the sky. The chef cooks them up to make sweet plant food (Glucose) and throws out the trash (Oxygen) which we breathe!",
            example: "Just like we eat food to get energy, plants cook their own food (sugar) using sunlight. Without sun, the kitchen closes!",
            mistake: "Thinking plants do not breathe oxygen. Plants do respiration just like us, but during the day, they produce much more oxygen than they consume.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            videoTitle: "The Leaf Kitchen: How Plants Cook Food",
            retryQuiz: [
              {
                question: "What is the plant's food called?",
                options: ["Water", "Glucose (Sugar)", "Soil", "Carbon dioxide"],
                answer: 1
              },
              {
                question: "What energy source powers the leaf kitchen?",
                options: ["Sunlight", "Soil nutrients", "Wind", "Rain"],
                answer: 0
              }
            ]
          }
        },
        {
          id: "newtons_laws",
          name: "Newton's Laws of Motion",
          sequence: 2,
          notes: {
            concept: "Sir Isaac Newton formulated three laws describing the relationship between forces acting on a body and its motion.\n1. Law of Inertia: Objects stay at rest or in uniform motion unless acted upon by a net external force.\n2. F=ma: Force equals mass times acceleration.\n3. Action-Reaction: For every action, there is an equal and opposite reaction.",
            example: "For the First Law: A passenger jerking forward when a car brakes suddenly. For the Second Law: Pushing an empty shopping cart is much easier than pushing a loaded one. For the Third Law: Recoil of a gun when a bullet is fired.",
            mistake: "Believing that an object requires a constant force to keep moving. In frictionless space, an object will move forever at a constant speed without any force (Inertia). Force causes acceleration, not velocity itself.",
            practice: [
              { question: "What is the unit of force?", type: "text", answer: "Newton" },
              { question: "If mass is doubled and force remains constant, acceleration is multiplied by what?", type: "text", answer: "0.5" }
            ],
            quiz: [
              {
                question: "Which law explains why a skateboarder flies forward when the board hits a curb and stops?",
                options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravitation"],
                answer: 0
              },
              {
                question: "How much force is needed to accelerate a 5 kg mass at 4 m/s²?",
                options: ["1.25 N", "9 N", "20 N", "40 N"],
                answer: 2
              },
              {
                question: "A rocket launches by pushing exhaust gases downwards. This is an example of:",
                options: ["First Law: Inertia", "Second Law: F=ma", "Third Law: Action-Reaction", "Centripetal Force"],
                answer: 2
              }
            ]
          },
          simplerNotes: {
            concept: "Newton's three laws are simple rules of movement:\n1. Lazy Rule (Inertia): Things keep doing what they are already doing. Still things stay still. Moving things keep moving, unless blocked.\n2. Heavy Rule (F=ma): Heavy things need a bigger push to speed up.\n3. Bounce Rule: Push something, and it pushes back. (Like jumping off a small boat: you jump forward, the boat slides backward).",
            example: "Lazy Rule: If you leave a book on your desk, it won't crawl away. It stays there until someone pushes it.",
            mistake: "Thinking action and reaction cancel out. They act on DIFFERENT objects. If you push a wall, you push the wall (Object A) and the wall pushes you (Object B). Both forces are felt on separate bodies.",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            videoTitle: "Lazy Objects & Opposite Pushes: Newton Explained",
            retryQuiz: [
              {
                question: "Which rule says a heavy box is harder to push than a light box?",
                options: ["Rule 1: Lazy Rule", "Rule 2: Heavy Rule (F=ma)", "Rule 3: Bounce Rule", "None of these"],
                answer: 1
              },
              {
                question: "If you push against a wall, what does the wall do?",
                options: ["Stands still and does not push", "Pushes back against you with the same force", "Crumbles down immediately", "Pulls you closer"],
                answer: 1
              }
            ]
          }
        }
      ]
    }
  },
  users: {
    s1: {
      id: "s1",
      role: "student",
      name: "Amit Sharma",
      grade: "Grade 8-A",
      avatarInitials: "AS",
      remarks: "Amit has made good progress in basic fractions but is currently struggling with isolating variables in linear equations."
    },
    s2: {
      id: "s2",
      role: "student",
      name: "Priya Patel",
      grade: "Grade 8-A",
      avatarInitials: "PP",
      remarks: "Priya is excellent in sciences. In math, she needs careful visualization to solve word problems."
    },
    t1: {
      id: "t1",
      role: "teacher",
      name: "Mrs. Sunita Rao",
      grade: "Grade 8-A Class Teacher",
      avatarInitials: "SR"
    },
    st1: {
      id: "st1",
      role: "staff",
      name: "Mr. Rajesh Kumar",
      subject: "math",
      title: "Mathematics HOD",
      avatarInitials: "RK"
    },
    st2: {
      id: "st2",
      role: "staff",
      name: "Ms. Ananya Sen",
      subject: "science",
      title: "Senior Science Advisor",
      avatarInitials: "AS"
    },
    a1: {
      id: "a1",
      role: "admin",
      name: "Principal Dr. V. K. Mehta",
      avatarInitials: "VM"
    }
  },
  // Progress states: mapping studentId -> topicId -> progressData
  progress: {
    s1: {
      fractions: {
        status: "passed",
        remedialStep: 6,
        preTestScore: 40,
        practiceCompleted: true,
        quizScore: 100,
        retryQuizScore: null,
        teacherRemarks: "Excellent job converted all calculations accurately.",
        overrideActive: false
      },
      linear_equations: {
        status: "failed", // Amit is stuck here
        remedialStep: 4, // Shows simpler notes page
        preTestScore: 30,
        practiceCompleted: true,
        quizScore: 33, // Failed (under 70%)
        retryQuizScore: null,
        teacherRemarks: "Amit needs to review simple equations with a balanced scale concept.",
        overrideActive: false
      },
      ratios: {
        status: "locked",
        remedialStep: 0,
        preTestScore: 0,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      },
      photosynthesis: {
        status: "gap_identified",
        remedialStep: 0,
        preTestScore: 45,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      },
      newtons_laws: {
        status: "locked",
        remedialStep: 0,
        preTestScore: 0,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      }
    },
    s2: {
      fractions: {
        status: "passed",
        remedialStep: 6,
        preTestScore: 50,
        practiceCompleted: true,
        quizScore: 80,
        retryQuizScore: null,
        teacherRemarks: "Satisfactory conversion skills shown.",
        overrideActive: false
      },
      linear_equations: {
        status: "failed", // Priya is also stuck here to show multiple stuck students!
        remedialStep: 4,
        preTestScore: 40,
        practiceCompleted: true,
        quizScore: 33,
        retryQuizScore: null,
        teacherRemarks: "Struggling with inverse operations.",
        overrideActive: false
      },
      ratios: {
        status: "locked",
        remedialStep: 0,
        preTestScore: 0,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      },
      photosynthesis: {
        status: "passed",
        remedialStep: 6,
        preTestScore: 60,
        practiceCompleted: true,
        quizScore: 100,
        retryQuizScore: null,
        teacherRemarks: "Excellent visual kitchen model understanding.",
        overrideActive: false
      },
      newtons_laws: {
        status: "gap_identified",
        remedialStep: 0,
        preTestScore: 50,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      }
    }
  },
  // Remedial groups scheduled
  remedialGroups: [
    {
      id: "rg1",
      topicId: "linear_equations",
      topicName: "Linear Equations in One Variable",
      subject: "Mathematics",
      dateTime: "2026-08-28T14:30",
      students: ["Amit Sharma", "Priya Patel"],
      remarks: "Focus on balancing equations using the Seesaw analogy."
    }
  ],
  // Messages log
  messages: [
    {
      id: "m1",
      from: "Mrs. Sunita Rao",
      to: "Mr. Rajesh Kumar",
      content: "Both Amit and Priya are stuck on Linear Equations. Let's align on simpler worksheets.",
      timestamp: "2026-08-25T14:00"
    }
  ]
};

// ==========================================
// 2. State Controller (LocalStorage Wrapper)
// ==========================================
const AppState = {
  db: null,
  currentUser: null,
  activeTab: "dashboard",
  selectedSubject: null,
  selectedTopic: null,

  init() {
    const raw = localStorage.getItem("edushield_db");
    if (raw) {
      try {
        this.db = JSON.parse(raw);
      } catch (e) {
        this.db = JSON.parse(JSON.stringify(INITIAL_DATABASE));
      }
    } else {
      this.db = JSON.parse(JSON.stringify(INITIAL_DATABASE));
      this.save();
    }
    
    // Set default current user to Amit (s1, Student)
    this.currentUser = this.db.users.s1;
  },

  save() {
    localStorage.setItem("edushield_db", JSON.stringify(this.db));
  },

  switchUser(userId) {
    if (this.db.users[userId]) {
      this.currentUser = this.db.users[userId];
      this.activeTab = "dashboard";
      this.selectedSubject = null;
      this.selectedTopic = null;
      showToast(`Logged in as ${this.currentUser.name} (${this.currentUser.role.toUpperCase()})`, "success");
      renderApp();
    }
  },

  updateTopicProgress(studentId, topicId, key, value) {
    if (!this.db.progress[studentId]) this.db.progress[studentId] = {};
    if (!this.db.progress[studentId][topicId]) {
      this.db.progress[studentId][topicId] = {
        status: "locked",
        remedialStep: 0,
        preTestScore: 0,
        practiceCompleted: false,
        quizScore: null,
        retryQuizScore: null,
        teacherRemarks: "",
        overrideActive: false
      };
    }
    this.db.progress[studentId][topicId][key] = value;
    this.save();
  },

  computeSubjectProgress(studentId, subjectId) {
    const subject = this.db.subjects[subjectId];
    if (!subject) return 0;
    const topics = subject.topics;
    let completed = 0;
    topics.forEach(t => {
      const p = this.db.progress[studentId]?.[t.id];
      if (p && (p.status === "passed" || p.overrideActive)) {
        completed++;
      }
    });
    return Math.round((completed / topics.length) * 100);
  }
};

// ==========================================
// 3. UI Helpers & Utilities
// ==========================================
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function formatDate(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// Global modal helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("open");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("open");
  }
}

// ==========================================
// 4. View Controllers & Render Core
// ==========================================
function renderApp() {
  renderSidebar();
  renderHeader();
  renderContent();
}

function renderSidebar() {
  const sidebar = document.getElementById("app-sidebar");
  if (!sidebar) return;

  const role = AppState.currentUser.role;
  let navItems = "";

  if (role === "student") {
    navItems = `
      <li class="nav-item ${AppState.activeTab === "dashboard" ? "active" : ""}">
        <a onclick="switchTab('dashboard')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          Dashboard
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "subjects" ? "active" : ""}">
        <a onclick="switchTab('subjects')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>
          Remedial Hub
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "progress" ? "active" : ""}">
        <a onclick="switchTab('progress')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          Marks & Progress
        </a>
      </li>
    `;
  } else if (role === "teacher") {
    navItems = `
      <li class="nav-item ${AppState.activeTab === "dashboard" ? "active" : ""}">
        <a onclick="switchTab('dashboard')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          Dashboard
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "stuck" ? "active" : ""}">
        <a onclick="switchTab('stuck')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Stuck Students
          <span class="badge badge-danger" style="margin-left:auto; padding: 2px 6px; font-size: 0.65rem;">${getStuckCount()}</span>
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "roster" ? "active" : ""}">
        <a onclick="switchTab('roster')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Class Monitor
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "communications" ? "active" : ""}">
        <a onclick="switchTab('communications')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Communications
        </a>
      </li>
    `;
  } else if (role === "staff") {
    navItems = `
      <li class="nav-item ${AppState.activeTab === "dashboard" ? "active" : ""}">
        <a onclick="switchTab('dashboard')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          Dashboard
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "editor" ? "active" : ""}">
        <a onclick="switchTab('editor')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
          Remedial Creator
        </a>
      </li>
    `;
  } else if (role === "admin") {
    navItems = `
      <li class="nav-item ${AppState.activeTab === "dashboard" ? "active" : ""}">
        <a onclick="switchTab('dashboard')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
          Dashboard
        </a>
      </li>
      <li class="nav-item ${AppState.activeTab === "users" ? "active" : ""}">
        <a onclick="switchTab('users')">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          User Accounts
        </a>
      </li>
    `;
  }

  sidebar.innerHTML = `
    <div class="logo-container">
      <div class="logo-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
      </div>
      <span class="logo-text">EduShield</span>
    </div>
    <ul class="nav-links">
      ${navItems}
    </ul>
    <div class="sidebar-footer">
      <div class="user-avatar">${AppState.currentUser.avatarInitials}</div>
      <div class="user-meta">
        <span class="user-name">${AppState.currentUser.name}</span>
        <span class="user-role-label">${AppState.currentUser.grade || AppState.currentUser.title || role.toUpperCase()}</span>
      </div>
    </div>
  `;
}

function getStuckCount() {
  let count = 0;
  Object.keys(AppState.db.progress).forEach(studentId => {
    Object.keys(AppState.db.progress[studentId]).forEach(topicId => {
      const prog = AppState.db.progress[studentId][topicId];
      if (prog.status === "failed" && !prog.overrideActive) {
        count++;
      }
    });
  });
  return count;
}

function renderHeader() {
  const header = document.getElementById("app-header");
  if (!header) return;

  const currentRole = AppState.currentUser.role;
  let selectorOptions = "";
  Object.keys(AppState.db.users).forEach(uid => {
    const u = AppState.db.users[uid];
    const isSelected = u.id === AppState.currentUser.id ? "selected" : "";
    selectorOptions += `<option value="${u.id}" ${isSelected}>${u.name} (${u.role.toUpperCase()})</option>`;
  });

  header.innerHTML = `
    <div class="header-title-area">
      <h2>${getViewTitle()}</h2>
    </div>
    <div class="header-actions">
      <div class="role-switcher-container">
        <span class="role-switcher-label">Act as:</span>
        <select class="role-selector" onchange="AppState.switchUser(this.value)">
          ${selectorOptions}
        </select>
      </div>
    </div>
  `;
}

function getViewTitle() {
  const role = AppState.currentUser.role;
  if (role === "student") {
    if (AppState.activeTab === "dashboard") return "My Portal";
    if (AppState.activeTab === "subjects") return "Remedial Study Hub";
    if (AppState.activeTab === "progress") return "My Academic Reports";
  } else if (role === "teacher") {
    if (AppState.activeTab === "dashboard") return "Class Teacher Dashboard";
    if (AppState.activeTab === "stuck") return "Stuck Student Roster";
    if (AppState.activeTab === "roster") return "Class Performance Tracker";
    if (AppState.activeTab === "communications") return "Communication Desk";
  } else if (role === "staff") {
    if (AppState.activeTab === "dashboard") return "Staff Dashboard";
    if (AppState.activeTab === "editor") return "Remedial Curriculum Builder";
  } else if (role === "admin") {
    if (AppState.activeTab === "dashboard") return "School Admin Dashboard";
    if (AppState.activeTab === "users") return "User Account Management";
  }
  return "EduShield System";
}

function switchTab(tabName) {
  AppState.activeTab = tabName;
  AppState.selectedSubject = null;
  AppState.selectedTopic = null;
  renderApp();
}

function renderContent() {
  const root = document.getElementById("app-content-root");
  if (!root) return;
  root.innerHTML = "";
  
  const container = document.createElement("div");
  container.className = "content-body fade-in";
  
  const role = AppState.currentUser.role;
  
  if (role === "student") {
    renderStudentViews(container);
  } else if (role === "teacher") {
    renderTeacherViews(container);
  } else if (role === "staff") {
    renderStaffViews(container);
  } else if (role === "admin") {
    renderAdminViews(container);
  }
  
  root.appendChild(container);
}

// ==========================================
// 5. Student Views
// ==========================================
function renderStudentViews(container) {
  const studentId = AppState.currentUser.id;

  if (AppState.activeTab === "dashboard") {
    // 1. Stats Grid
    let totalAssigned = 0;
    let totalPassed = 0;
    let totalStuck = 0;

    Object.keys(AppState.db.progress[studentId] || {}).forEach(tid => {
      const p = AppState.db.progress[studentId][tid];
      if (p.status !== "locked") totalAssigned++;
      if (p.status === "passed" || p.overrideActive) totalPassed++;
      if (p.status === "failed" && !p.overrideActive) totalStuck++;
    });

    const progressMath = AppState.computeSubjectProgress(studentId, "math");
    const progressSci = AppState.computeSubjectProgress(studentId, "science");

    container.innerHTML = `
      <div class="dashboard-grid">
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Assigned Remedial Topics</span>
            <span class="stat-value">${totalAssigned}</span>
          </div>
          <div class="stat-icon-wrapper primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>
          </div>
        </div>
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Cleared Topics</span>
            <span class="stat-value">${totalPassed}</span>
          </div>
          <div class="stat-icon-wrapper success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        </div>
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Stuck / Needs Revision</span>
            <span class="stat-value">${totalStuck}</span>
          </div>
          <div class="stat-icon-wrapper danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
        </div>
      </div>

      <div class="dashboard-row">
        <!-- Main Subject Progress List -->
        <div class="glass-panel panel-card">
          <div class="section-header">
            <h3>Active Subjects Overview</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="progress-container" onclick="switchTab('subjects')" style="cursor:pointer; background:rgba(255,255,255,0.01); padding:16px; border-radius:10px; border:1px solid var(--border-light)">
              <div class="progress-header">
                <span class="progress-label" style="font-weight:600; font-size:1rem; color:#fff">Mathematics Remedial Stream</span>
                <span class="progress-val">${progressMath}% Complete</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${progressMath >= 100 ? 'success' : ''}" style="width: ${progressMath}%"></div>
              </div>
            </div>

            <div class="progress-container" onclick="switchTab('subjects')" style="cursor:pointer; background:rgba(255,255,255,0.01); padding:16px; border-radius:10px; border:1px solid var(--border-light)">
              <div class="progress-header">
                <span class="progress-label" style="font-weight:600; font-size:1rem; color:#fff">Science Remedial Stream</span>
                <span class="progress-val">${progressSci}% Complete</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${progressSci >= 100 ? 'success' : ''}" style="width: ${progressSci}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Latest Remarks -->
        <div class="glass-panel panel-card">
          <div class="section-header">
            <h3>Teacher Remarks</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:16px; justify-content:center; align-items:center; flex-grow:1; text-align:center;">
            <div class="user-avatar" style="width:60px; height:60px; font-size:1.5rem">SR</div>
            <h4 style="font-weight:600; color:#fff">Mrs. Sunita Rao</h4>
            <p style="font-size:0.875rem; color:var(--text-muted); font-style:italic">
              "${AppState.currentUser.remarks || 'No remarks added yet.'}"
            </p>
          </div>
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "subjects") {
    if (!AppState.selectedTopic) {
      // Subject selection lists
      let html = `<div class="student-subject-grid">`;
      
      Object.keys(AppState.db.subjects).forEach(subId => {
        const sub = AppState.db.subjects[subId];
        const progressVal = AppState.computeSubjectProgress(studentId, subId);
        
        html += `
          <div class="glass-panel subject-card">
            <div class="subject-header">
              <div style="display:flex; align-items:center; gap:12px;">
                <div style="padding:10px; background:rgba(99,102,241,0.15); border-radius:10px; color:#818cf8">${sub.icon}</div>
                <span class="subject-name">${sub.name}</span>
              </div>
            </div>
            
            <div class="progress-container" style="margin-bottom:20px;">
              <div class="progress-header">
                <span class="progress-label">Subject Completion</span>
                <span class="progress-val">${progressVal}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" style="width: ${progressVal}%"></div>
              </div>
            </div>

            <div class="topic-list-nested">
        `;

        sub.topics.forEach((topic, idx) => {
          const prog = AppState.db.progress[studentId]?.[topic.id];
          const isPrevPassed = idx === 0 || 
            (AppState.db.progress[studentId]?.[sub.topics[idx-1].id]?.status === "passed" || 
             AppState.db.progress[studentId]?.[sub.topics[idx-1].id]?.overrideActive);
          
          let statusBadge = "";
          let clickHandler = "";
          let isLocked = false;

          if (prog) {
            if (prog.status === "passed" || prog.overrideActive) {
              statusBadge = `<span class="badge badge-success">Passed</span>`;
              clickHandler = `onclick="selectTopic('${subId}', '${topic.id}')"`;
            } else if (prog.status === "failed") {
              statusBadge = `<span class="badge badge-danger">Stuck: Needs Revision</span>`;
              clickHandler = `onclick="selectTopic('${subId}', '${topic.id}')"`;
            } else if (prog.status === "gap_identified" || prog.status === "notes_viewed" || prog.status === "practice_completed") {
              statusBadge = `<span class="badge badge-warning">In Progress</span>`;
              clickHandler = `onclick="selectTopic('${subId}', '${topic.id}')"`;
            } else {
              isLocked = true;
            }
          } else {
            isLocked = true;
          }

          // If locked, check if we can unlock it now based on sequence
          if (isLocked && isPrevPassed) {
            isLocked = false;
            statusBadge = `<span class="badge badge-info">Start Learning</span>`;
            // Trigger auto-initialization of status if clicked
            clickHandler = `onclick="initializeTopicAndSelect('${subId}', '${topic.id}')"`;
          }

          if (isLocked) {
            html += `
              <div class="topic-row-pill locked">
                <div class="topic-pill-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-dim)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <span>${topic.name}</span>
                </div>
                <span class="badge badge-secondary" style="background:rgba(255,255,255,0.03); color:var(--text-dim)">Locked</span>
              </div>
            `;
          } else {
            html += `
              <div class="topic-row-pill" ${clickHandler} style="cursor:pointer;">
                <div class="topic-pill-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#818cf8"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg>
                  <span>${topic.name}</span>
                </div>
                ${statusBadge}
              </div>
            `;
          }
        });

        html += `
            </div>
          </div>
        `;
      });

      html += `</div>`;
      container.innerHTML = html;
    } else {
      // Topic detailed learning interface!
      renderStudyPortal(container);
    }
  } else if (AppState.activeTab === "progress") {
    // Academic report card
    let subjectRows = "";
    Object.keys(AppState.db.subjects).forEach(subId => {
      const sub = AppState.db.subjects[subId];
      sub.topics.forEach(topic => {
        const prog = AppState.db.progress[studentId]?.[topic.id];
        let statusText = "Not Started";
        let badgeClass = "badge-secondary";
        let scoreText = "--";

        if (prog) {
          if (prog.status === "passed" || prog.overrideActive) {
            statusText = prog.overrideActive ? "Passed (Override)" : "Passed";
            badgeClass = "badge-success";
            scoreText = `${prog.quizScore || 100}%`;
          } else if (prog.status === "failed") {
            statusText = "Needs Revision";
            badgeClass = "badge-danger";
            scoreText = `${prog.quizScore}%`;
          } else if (prog.status === "gap_identified" || prog.status === "notes_viewed" || prog.status === "practice_completed") {
            statusText = "Learning In Progress";
            badgeClass = "badge-warning";
            scoreText = "--";
          }
        }

        subjectRows += `
          <tr>
            <td style="font-weight:600;">${sub.name}</td>
            <td>${topic.name}</td>
            <td><span class="badge ${badgeClass}">${statusText}</span></td>
            <td style="font-family:monospace; font-weight:700;">${scoreText}</td>
            <td style="font-size:0.8125rem; color:var(--text-muted); font-style:italic;">${prog?.teacherRemarks || "No remarks"}</td>
          </tr>
        `;
      });
    });

    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Progress & Assessments Report</h3>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Weekly Quiz Score</th>
                <th>Teacher Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${subjectRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// Student selects a topic from remedial hub
function selectTopic(subjectId, topicId) {
  AppState.selectedSubject = subjectId;
  AppState.selectedTopic = topicId;
  renderApp();
}

function initializeTopicAndSelect(subjectId, topicId) {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, topicId, "status", "gap_identified");
  AppState.updateTopicProgress(studentId, topicId, "remedialStep", 0);
  // generate a mock low pre-test score indicating gap identified
  const randomGapScore = Math.floor(Math.random() * 20) + 30; // 30 - 50%
  AppState.updateTopicProgress(studentId, topicId, "preTestScore", randomGapScore);
  
  selectTopic(subjectId, topicId);
}

function renderStudyPortal(container) {
  const studentId = AppState.currentUser.id;
  const sub = AppState.db.subjects[AppState.selectedSubject];
  const topic = sub.topics.find(t => t.id === AppState.selectedTopic);
  const prog = AppState.db.progress[studentId][topic.id];

  const currentStep = prog.remedialStep;
  const hasFailed = prog.status === "failed" && !prog.overrideActive;

  // Let's output the portal layout
  container.innerHTML = `
    <div style="margin-bottom: 12px;">
      <button class="btn btn-secondary btn-sm" onclick="exitTopic()">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Remedial Hub
      </button>
    </div>

    <div class="study-portal-grid">
      <!-- Steps Sidebar -->
      <div class="study-sidebar">
        <!-- Step 0: Gap Identified -->
        <button class="study-step-btn ${currentStep === 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}" onclick="goToStep(0)">
          <span class="step-num">1</span>
          <span>Gap Identified</span>
        </button>

        <!-- Step 1: Short Notes -->
        <button class="study-step-btn ${currentStep === 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''} ${currentStep < 1 ? 'disabled' : ''}" ${currentStep >= 1 ? 'onclick="goToStep(1)"' : 'disabled'}>
          <span class="step-num">2</span>
          <span>Short Notes</span>
        </button>

        <!-- Step 2: Practice Assignment -->
        <button class="study-step-btn ${currentStep === 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''} ${currentStep < 2 ? 'disabled' : ''}" ${currentStep >= 2 ? 'onclick="goToStep(2)"' : 'disabled'}>
          <span class="step-num">3</span>
          <span>Short Practice</span>
        </button>

        <!-- Step 3: Weekly Assessment -->
        <button class="study-step-btn ${currentStep === 3 ? 'active' : ''} ${prog.status === "passed" || prog.overrideActive ? 'completed' : ''} ${currentStep < 3 ? 'disabled' : ''}" ${currentStep >= 3 ? 'onclick="goToStep(3)"' : 'disabled'}>
          <span class="step-num">4</span>
          <span>Weekly Assessment</span>
        </button>

        <!-- Retry Flow Steps (only show if hasFailed is true or remedialStep >= 4) -->
        ${(hasFailed || currentStep >= 4) ? `
          <div style="height:1px; background:var(--border-light); margin: 8px 0;"></div>
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--color-danger); font-weight:700; padding-left:12px; margin-bottom:4px;">Failure Remediation</div>
          
          <!-- Step 4: Simpler Notes & Resources -->
          <button class="study-step-btn ${currentStep === 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}" onclick="goToStep(4)">
            <span class="step-num" style="border-color:var(--color-danger)">5</span>
            <span>Simpler Notes & Video</span>
          </button>

          <!-- Step 5: Retry Quiz -->
          <button class="study-step-btn ${currentStep === 5 ? 'active' : ''} ${prog.status === "passed" || prog.overrideActive ? 'completed' : ''} ${currentStep < 5 ? 'disabled' : ''}" ${currentStep >= 5 ? 'onclick="goToStep(5)"' : 'disabled'}>
            <span class="step-num" style="border-color:var(--color-danger)">6</span>
            <span>Retry Quiz</span>
          </button>
        ` : ''}
      </div>

      <!-- Main Study Area -->
      <div class="glass-panel study-content-panel" id="study-panel-body">
        <!-- Rendered dynamically by step controller -->
      </div>
    </div>
  `;

  renderStepContent(currentStep, topic, prog);
}

function exitTopic() {
  AppState.selectedSubject = null;
  AppState.selectedTopic = null;
  renderApp();
}

function goToStep(stepNum) {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", stepNum);
  renderApp();
}

// Renders the specific step in the study portal
function renderStepContent(stepNum, topic, prog) {
  const panel = document.getElementById("study-panel-body");
  if (!panel) return;
  panel.innerHTML = "";

  const notes = topic.notes;

  if (stepNum === 0) {
    // Gap Identified View
    panel.innerHTML = `
      <div class="study-header-block">
        <h4>Topic Gap Identified</h4>
        <p>Your baseline evaluation shows a minor knowledge gap here. Let's fix it!</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:24px; max-width:600px;">
        <div style="background:rgba(245,158,11,0.05); border:1px solid var(--color-warning-border); padding:20px; border-radius:10px;">
          <h5 style="color:var(--color-warning); font-weight:600; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Diagnostic Score: ${prog.preTestScore}%
          </h5>
          <p style="font-size:0.875rem; color:var(--text-muted)">
            A score under 60% in school assessments indicates that certain core sub-concepts need reinforcement. We have customized a micro-learning flow to help you master this topic.
          </p>
        </div>

        <div>
          <button class="btn btn-primary" onclick="proceedToNotes()">
            Begin Short Notes
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    `;
  } else if (stepNum === 1) {
    // Short Notes View
    panel.innerHTML = `
      <div class="study-header-block">
        <h4>Topic-wise Short Notes</h4>
        <p>Read the concepts carefully. These are structured for fast, focused revision.</p>
      </div>
      <div class="notes-container">
        <div class="notes-section concept">
          <div class="notes-title" style="color:#818cf8">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>
            Key Concept
          </div>
          <p>${notes.concept}</p>
        </div>

        <div class="notes-section example">
          <div class="notes-title" style="color:var(--color-success)">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Step-by-Step Example
          </div>
          <p style="white-space: pre-line;">${notes.example}</p>
        </div>

        <div class="notes-section mistake">
          <div class="notes-title" style="color:var(--color-danger)">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
            Common Mistake to Avoid
          </div>
          <p>${notes.mistake}</p>
        </div>

        <div>
          <button class="btn btn-primary" onclick="proceedToPractice()">
            Proceed to Practice Assignment
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </div>
      </div>
    `;
  } else if (stepNum === 2) {
    // Short Practice Assignment
    let questionsHtml = "";
    notes.practice.forEach((q, qidx) => {
      questionsHtml += `
        <div class="question-card">
          <div class="question-text">Q${qidx + 1}: ${q.question}</div>
          <div>
            <input type="text" class="form-input practice-ans-input" data-idx="${qidx}" placeholder="Type your answer here..." style="max-width:300px;" value="${prog.practiceCompleted ? q.answer : ''}" ${prog.practiceCompleted ? 'disabled' : ''}>
          </div>
        </div>
      `;
    });

    panel.innerHTML = `
      <div class="study-header-block">
        <h4>Short Practice Assignment</h4>
        <p>Short concepts require short practice. Let's solve these single-concept questions.</p>
      </div>
      <div>
        ${questionsHtml}
        <div style="margin-top:24px;">
          ${prog.practiceCompleted ? `
            <div style="margin-bottom:16px; display:flex; align-items:center; gap:8px; color:var(--color-success)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              <strong>Practice Assignment Completed! Answers submitted for teacher grading.</strong>
            </div>
            <button class="btn btn-primary" onclick="proceedToAssessment()">
              Go to Weekly Assessment
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          ` : `
            <button class="btn btn-success" onclick="submitPractice()">
              Submit Practice Assignment
            </button>
          `}
        </div>
      </div>
    `;
  } else if (stepNum === 3) {
    // Weekly Assessment
    renderQuizView(panel, notes.quiz, false, prog);
  } else if (stepNum === 4) {
    // Simpler Notes & Resources (Failed state)
    const simplerNotes = topic.simplerNotes;
    panel.innerHTML = `
      <div class="failed-alert-banner">
        <div class="failed-icon-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <div class="failed-text-box">
          <h5>Review Required - Score under 70%</h5>
          <p>Don't worry! Let's approach the concept differently. Below are simpler visual notes, a revision video, and a retry quiz.</p>
        </div>
      </div>

      <div class="simpler-resource-card">
        <div class="resource-header" style="color:var(--color-warning)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          Simpler Notes (Visual Analogy)
        </div>
        <div class="resource-body">
          <div class="notes-container">
            <div class="notes-section concept" style="border-color:var(--color-warning); background:rgba(245,158,11,0.03);">
              <div class="notes-title" style="color:var(--color-warning)">Concept Explained Simply</div>
              <p>${simplerNotes.concept}</p>
            </div>
            <div class="notes-section example" style="border-color:var(--color-success);">
              <div class="notes-title" style="color:var(--color-success)">Simple Everyday Example</div>
              <p>${simplerNotes.example}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="simpler-resource-card">
        <div class="resource-header" style="color:var(--color-info)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
          Revision Video Resource
        </div>
        <div class="resource-body">
          <h5 style="margin-bottom:12px; color:#fff;">${simplerNotes.videoTitle}</h5>
          
          <!-- Interactive Mock Video Player -->
          <div class="mock-video-player" id="mock-video-player">
            <div class="video-overlay-play" id="video-play-btn" onclick="simulateVideoPlay()">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            </div>
            <div style="position:absolute; width:100%; height:100%; background:#1e293b; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:1.2rem; font-weight:700;">
              EduShield Visual Media Player
            </div>
            <div class="video-controls">
              <button style="background:none; border:none; color:white; cursor:pointer;" onclick="simulateVideoPlay()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </button>
              <div class="video-slider">
                <div class="video-slider-fill" id="video-progress-bar" style="width: 0%;"></div>
              </div>
              <div class="video-time" id="video-time-label">0:00 / 2:30</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button class="btn btn-primary" onclick="proceedToRetryQuiz()">
          Go to Retry Quiz
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    `;
  } else if (stepNum === 5) {
    // Retry Quiz
    const simplerNotes = topic.simplerNotes;
    renderQuizView(panel, simplerNotes.retryQuiz, true, prog);
  } else if (stepNum === 6) {
    // Passed / Finished View
    panel.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:24px; text-align:center; align-items:center; justify-content:center; padding: 40px 0;">
        <div style="background:var(--color-success-bg); border: 2px solid var(--color-success); border-radius:50%; width:80px; height:80px; display:flex; align-items:center; justify-content:center; color:var(--color-success); box-shadow:var(--shadow-glow-success)">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
          <h4 style="font-size:1.75rem; color:#fff; margin-bottom:8px;">Topic Completed!</h4>
          <p style="color:var(--text-muted); max-width:500px; font-size:0.9375rem;">
            Excellent work! You have successfully resolved this topic gap. The next topic in your curriculum stream is now unlocked.
          </p>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-light); padding:20px; border-radius:10px; text-align:left; width:100%; max-width:500px;">
          <div style="font-size:0.75rem; color:var(--text-dim); text-transform:uppercase; font-weight:700; margin-bottom:8px;">Final Diagnostic Log</div>
          <div style="display:flex; justify-content:between; margin-bottom:4px; font-size:0.875rem;">
            <span>Initial Score:</span>
            <span style="margin-left:auto; font-weight:600; color:var(--color-danger)">${prog.preTestScore}%</span>
          </div>
          <div style="display:flex; justify-content:between; margin-bottom:4px; font-size:0.875rem;">
            <span>Weekly Quiz Score:</span>
            <span style="margin-left:auto; font-weight:600; color:${prog.quizScore >= 70 ? 'var(--color-success)' : 'var(--color-danger)'}">${prog.quizScore}%</span>
          </div>
          ${prog.retryQuizScore ? `
            <div style="display:flex; justify-content:between; margin-bottom:4px; font-size:0.875rem;">
              <span>Retry Quiz Score:</span>
              <span style="margin-left:auto; font-weight:600; color:var(--color-success)">${prog.retryQuizScore}%</span>
            </div>
          ` : ''}
          ${prog.overrideActive ? `
            <div style="display:flex; justify-content:between; font-size:0.875rem; color:var(--color-warning); font-weight:600;">
              <span>Teacher Override:</span>
              <span style="margin-left:auto;">Active (Bypassed quiz limit)</span>
            </div>
          ` : ''}
        </div>
        <div>
          <button class="btn btn-primary" onclick="exitTopic()">
            Return to Remedial Hub
          </button>
        </div>
      </div>
    `;
  }
}

// Interactive Quiz Handler
let quizSelectedAnswers = {};

function renderQuizView(panel, quizQuestions, isRetry = false, prog) {
  // Check if student has already passed this quiz
  const isPassedState = prog.status === "passed" || prog.overrideActive;

  let questionsHtml = "";
  quizQuestions.forEach((q, qidx) => {
    const selectedAns = quizSelectedAnswers[qidx];
    let optionsHtml = "";

    q.options.forEach((opt, oidx) => {
      let cssClass = "";
      if (isPassedState) {
        // If passed, show correctness
        if (oidx === q.answer) cssClass = "correct";
        else if (selectedAns === oidx) cssClass = "incorrect";
      } else {
        if (selectedAns === oidx) cssClass = "selected";
      }

      optionsHtml += `
        <button class="option-btn ${cssClass}" onclick="selectQuizOption(${qidx}, ${oidx}, ${isRetry})" ${isPassedState ? 'disabled' : ''}>
          <span>${opt}</span>
          ${isPassedState && oidx === q.answer ? `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--color-success)"><polyline points="20 6 9 17 4 12"></polyline></svg>
          ` : ''}
        </button>
      `;
    });

    questionsHtml += `
      <div class="question-card">
        <div class="question-text">Q${qidx + 1}: ${q.question}</div>
        <div class="options-list">
          ${optionsHtml}
        </div>
      </div>
    `;
  });

  const allAnswered = Object.keys(quizSelectedAnswers).length === quizQuestions.length;

  panel.innerHTML = `
    <div class="study-header-block">
      <h4>${isRetry ? 'Assessment Retry Quiz' : 'Weekly Assessment'}</h4>
      <p>${isRetry ? 'Take this shorter diagnostic retry quiz to unlock progression.' : 'Demonstrate concept mastery by scoring 70% or higher.'}</p>
    </div>
    <div>
      ${questionsHtml}
      <div style="margin-top:24px;">
        ${isPassedState ? `
          <div style="margin-bottom:16px; display:flex; align-items:center; gap:8px; color:var(--color-success)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            <strong>Quiz Cleared! Topic Completed successfully.</strong>
          </div>
          <button class="btn btn-primary" onclick="proceedToCompleted()">
            Proceed to Final Report
          </button>
        ` : `
          <button class="btn btn-success" onclick="gradeQuiz(${isRetry})" ${allAnswered ? '' : 'disabled style="opacity:0.5; cursor:not-allowed;"'}>
            Submit Quiz Answers
          </button>
        `}
      </div>
    </div>
  `;
}

function selectQuizOption(qidx, oidx, isRetry) {
  quizSelectedAnswers[qidx] = oidx;
  const sub = AppState.db.subjects[AppState.selectedSubject];
  const topic = sub.topics.find(t => t.id === AppState.selectedTopic);
  const prog = AppState.db.progress[AppState.currentUser.id][topic.id];
  const questions = isRetry ? topic.simplerNotes.retryQuiz : topic.notes.quiz;
  const panel = document.getElementById("study-panel-body");
  if (panel) {
    renderQuizView(panel, questions, isRetry, prog);
  }
}

function gradeQuiz(isRetry) {
  const studentId = AppState.currentUser.id;
  const topicId = AppState.selectedTopic;
  const sub = AppState.db.subjects[AppState.selectedSubject];
  const topic = sub.topics.find(t => t.id === topicId);
  const questions = isRetry ? topic.simplerNotes.retryQuiz : topic.notes.quiz;

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (quizSelectedAnswers[idx] === q.answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);
  
  if (isRetry) {
    AppState.updateTopicProgress(studentId, topicId, "retryQuizScore", percentage);
    if (percentage >= 70) {
      AppState.updateTopicProgress(studentId, topicId, "status", "passed");
      AppState.updateTopicProgress(studentId, topicId, "remedialStep", 6);
      showToast(`Congratulations! You passed the retry quiz with ${percentage}%!`, "success");
    } else {
      showToast(`Score: ${percentage}%. Please review the simpler notes and try again!`, "error");
      quizSelectedAnswers = {}; // Clear selections for retry
    }
  } else {
    AppState.updateTopicProgress(studentId, topicId, "quizScore", percentage);
    if (percentage >= 70) {
      AppState.updateTopicProgress(studentId, topicId, "status", "passed");
      AppState.updateTopicProgress(studentId, topicId, "remedialStep", 6);
      showToast(`Quiz Passed! Score: ${percentage}%`, "success");
    } else {
      AppState.updateTopicProgress(studentId, topicId, "status", "failed");
      AppState.updateTopicProgress(studentId, topicId, "remedialStep", 4); // Redirect to simpler notes
      showToast(`Score: ${percentage}%. Topic locked. Let's study simpler concepts.`, "error");
    }
  }

  quizSelectedAnswers = {};
  renderApp();
}

function proceedToNotes() {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "status", "notes_viewed");
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", 1);
  renderApp();
}

function proceedToPractice() {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", 2);
  renderApp();
}

function submitPractice() {
  const studentId = AppState.currentUser.id;
  const topicId = AppState.selectedTopic;
  
  // Mark completed
  AppState.updateTopicProgress(studentId, topicId, "practiceCompleted", true);
  AppState.updateTopicProgress(studentId, topicId, "remedialStep", 3);
  showToast("Practice assignment submitted successfully!", "success");
  
  renderApp();
}

function proceedToAssessment() {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", 3);
  renderApp();
}

function proceedToRetryQuiz() {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", 5);
  renderApp();
}

function proceedToCompleted() {
  const studentId = AppState.currentUser.id;
  AppState.updateTopicProgress(studentId, AppState.selectedTopic, "remedialStep", 6);
  renderApp();
}

// Simulates standard HTML video playback time increments on click
let videoProgressInterval = null;
function simulateVideoPlay() {
  const overlay = document.getElementById("video-play-btn");
  const bar = document.getElementById("video-progress-bar");
  const time = document.getElementById("video-time-label");
  if (!bar || !time) return;

  if (videoProgressInterval) {
    clearInterval(videoProgressInterval);
    videoProgressInterval = null;
    if (overlay) overlay.style.display = "flex";
    showToast("Video Paused", "info");
    return;
  }

  if (overlay) overlay.style.display = "none";
  showToast("Playing Concept video...", "info");
  
  let currentPct = parseFloat(bar.style.width) || 0;
  
  videoProgressInterval = setInterval(() => {
    currentPct += 5;
    if (currentPct > 100) {
      currentPct = 100;
      clearInterval(videoProgressInterval);
      videoProgressInterval = null;
      if (overlay) overlay.style.display = "flex";
      showToast("Video Completed! Key concepts unlocked.", "success");
    }
    
    bar.style.width = `${currentPct}%`;
    const totalSeconds = 150; // 2m 30s
    const elapsed = Math.round((currentPct / 100) * totalSeconds);
    const m = Math.floor(elapsed / 60);
    const s = String(elapsed % 60).padStart(2, "0");
    time.innerText = `${m}:${s} / 2:30`;
  }, 350);
}

// ==========================================
// 6. Class Teacher Views
// ==========================================
function renderTeacherViews(container) {
  if (AppState.activeTab === "dashboard") {
    // Stat Overview Cards
    const studentCount = Object.keys(AppState.db.users).filter(uid => AppState.db.users[uid].role === "student").length;
    const stuckCount = getStuckCount();
    const reviewsCount = 1; // Pending review simulation
    const groupsCount = AppState.db.remedialGroups.length;

    container.innerHTML = `
      <div class="dashboard-grid">
        <div class="glass-panel stat-card" onclick="switchTab('roster')" style="cursor:pointer;">
          <div class="stat-info">
            <span class="stat-label">Total Roster Students</span>
            <span class="stat-value">${studentCount}</span>
          </div>
          <div class="stat-icon-wrapper primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
        </div>
        <div class="glass-panel stat-card" onclick="switchTab('stuck')" style="cursor:pointer;">
          <div class="stat-info">
            <span class="stat-label">Stuck on Core Concepts</span>
            <span class="stat-value" style="color:var(--color-warning)">${stuckCount}</span>
          </div>
          <div class="stat-icon-wrapper warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
        </div>
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Active Remedial Groups</span>
            <span class="stat-value" style="color:var(--color-success)">${groupsCount}</span>
          </div>
          <div class="stat-icon-wrapper success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
        </div>
      </div>

      <div class="dashboard-row">
        <!-- Stuck list card -->
        <div class="glass-panel panel-card">
          <div class="section-header">
            <h3>Remedial Red Flags</h3>
            <button class="btn btn-secondary btn-sm" onclick="switchTab('stuck')">Manage Stuck</button>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${getStuckStudentsHTML(3)}
          </div>
        </div>

        <!-- Class Groups List -->
        <div class="glass-panel panel-card">
          <div class="section-header">
            <h3>Remedial Sessions</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            ${getRemedialGroupsHTML()}
          </div>
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "stuck") {
    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Students Stuck on Specific Concepts</h3>
          <button class="btn btn-primary btn-sm" onclick="openScheduleGroupModal()">
            Schedule Small Remedial Group
          </button>
        </div>
        
        <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:12px;">
          Students who failed a quiz and are currently on Simpler Notes are categorized below. You can send a direct curriculum override to bypass passing requirements.
        </p>

        <div style="display:flex; flex-direction:column; gap:16px;">
          ${getStuckStudentsHTML()}
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "roster") {
    // Monitor student roster
    let rosterRows = "";
    Object.keys(AppState.db.users).forEach(uid => {
      const u = AppState.db.users[uid];
      if (u.role !== "student") return;

      const progressMath = AppState.computeSubjectProgress(u.id, "math");
      const progressSci = AppState.computeSubjectProgress(u.id, "science");

      rosterRows += `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="user-avatar">${u.avatarInitials}</div>
              <div style="display:flex; flex-direction:column;">
                <strong style="color:#fff;">${u.name}</strong>
                <span style="font-size:0.75rem; color:var(--text-dim);">${u.grade}</span>
              </div>
            </div>
          </td>
          <td>
            <div class="progress-container" style="width:200px;">
              <div class="progress-header" style="font-size:0.75rem;">
                <span>Math</span>
                <span>${progressMath}%</span>
              </div>
              <div class="progress-track" style="height:6px;">
                <div class="progress-fill" style="width: ${progressMath}%"></div>
              </div>
            </div>
          </td>
          <td>
            <div class="progress-container" style="width:200px;">
              <div class="progress-header" style="font-size:0.75rem;">
                <span>Science</span>
                <span>${progressSci}%</span>
              </div>
              <div class="progress-track" style="height:6px;">
                <div class="progress-fill" style="width: ${progressSci}%"></div>
              </div>
            </div>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="openTeacherRemarksModal('${u.id}')">
              Remarks / Review
            </button>
          </td>
        </tr>
      `;
    });

    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Class Performance Monitor</h3>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Mathematics Stream</th>
                <th>Science Stream</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rosterRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "communications") {
    // Communication Log
    let commsHtml = "";
    AppState.db.messages.forEach(msg => {
      commsHtml += `
        <div class="list-item">
          <div class="item-main">
            <div class="item-avatar-icon" style="color:var(--color-info);">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div class="item-details">
              <div class="item-title">${msg.content}</div>
              <div class="item-subtitle">From: ${msg.from} | To: ${msg.to} | ${formatDate(msg.timestamp)}</div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Communication History</h3>
          <button class="btn btn-primary btn-sm" onclick="openNewMessageModal()">Send Message</button>
        </div>
        <div class="item-list">
          ${commsHtml}
        </div>
      </div>
    `;
  }
}

// Generates lists of stuck students
function getStuckStudentsHTML(limit = 99) {
  let html = "";
  let renderedCount = 0;
  
  Object.keys(AppState.db.progress).forEach(studentId => {
    const student = AppState.db.users[studentId];
    if (!student) return;

    Object.keys(AppState.db.progress[studentId]).forEach(topicId => {
      if (renderedCount >= limit) return;
      const prog = AppState.db.progress[studentId][topicId];
      
      // Let's find topic details
      let topicName = "";
      let subjectName = "";
      Object.keys(AppState.db.subjects).forEach(subId => {
        const sub = AppState.db.subjects[subId];
        const t = sub.topics.find(top => top.id === topicId);
        if (t) {
          topicName = t.name;
          subjectName = sub.name;
        }
      });

      if (prog.status === "failed" && !prog.overrideActive) {
        renderedCount++;
        html += `
          <div class="stuck-student-pill">
            <div class="stuck-meta">
              <span class="stuck-tag">STUCK</span>
              <strong style="color:#fff; font-size:1rem;">${student.name}</strong>
              <span style="font-size:0.8125rem; color:var(--text-muted);">${subjectName} • ${topicName}</span>
              <span style="font-size:0.75rem; color:var(--color-danger); font-weight:600;">Last Score: ${prog.quizScore}% (Threshold: 70%)</span>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-success btn-sm" onclick="applyTeacherOverride('${studentId}', '${topicId}')">
                Approve Unlock Override
              </button>
            </div>
          </div>
        `;
      }
    });
  });

  if (renderedCount === 0) {
    html = `<p style="color:var(--text-dim); text-align:center; padding: 20px 0;">No students are currently flagged as stuck.</p>`;
  }
  return html;
}

function getRemedialGroupsHTML() {
  let html = "";
  AppState.db.remedialGroups.forEach(rg => {
    html += `
      <div class="list-item">
        <div class="item-main">
          <div class="item-avatar-icon" style="color:var(--color-success)">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
          <div class="item-details">
            <div class="item-title">${rg.topicName}</div>
            <div class="item-subtitle">${rg.subject} • Scheduled: ${formatDate(rg.dateTime)}</div>
            <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Students: ${rg.students.join(", ")}</div>
          </div>
        </div>
      </div>
    `;
  });
  if (AppState.db.remedialGroups.length === 0) {
    html = `<p style="color:var(--text-dim); text-align:center;">No remedial groups scheduled.</p>`;
  }
  return html;
}

function applyTeacherOverride(studentId, topicId) {
  AppState.updateTopicProgress(studentId, topicId, "overrideActive", true);
  AppState.updateTopicProgress(studentId, topicId, "status", "passed");
  AppState.updateTopicProgress(studentId, topicId, "remedialStep", 6);
  showToast("Teacher override applied! Student has been unlocked.", "success");
  renderApp();
}

// Modal Form functions for Teacher View
function openScheduleGroupModal() {
  // Populate students checklist in the form
  const container = document.getElementById("schedule-students-container");
  if (!container) return;
  
  let studentsHtml = "";
  Object.keys(AppState.db.users).forEach(uid => {
    const u = AppState.db.users[uid];
    if (u.role === "student") {
      studentsHtml += `
        <label style="display:flex; align-items:center; gap:8px; margin-bottom:8px; font-size:0.875rem;">
          <input type="checkbox" name="schedule-student-check" value="${u.name}">
          <span>${u.name}</span>
        </label>
      `;
    }
  });
  container.innerHTML = studentsHtml;
  openModal("schedule-group-modal");
}

function submitScheduleGroup(event) {
  event.preventDefault();
  const topicId = document.getElementById("schedule-topic").value;
  const dateTime = document.getElementById("schedule-datetime").value;
  const remarks = document.getElementById("schedule-remarks").value;

  const checks = document.querySelectorAll('input[name="schedule-student-check"]:checked');
  const students = Array.from(checks).map(el => el.value);

  if (students.length === 0) {
    showToast("Please select at least one student.", "error");
    return;
  }

  let topicName = "";
  let subjectName = "";
  Object.keys(AppState.db.subjects).forEach(subId => {
    const sub = AppState.db.subjects[subId];
    const t = sub.topics.find(top => top.id === topicId);
    if (t) {
      topicName = t.name;
      subjectName = sub.name;
    }
  });

  const newGroup = {
    id: "rg" + (AppState.db.remedialGroups.length + 1),
    topicId,
    topicName,
    subject: subjectName,
    dateTime,
    students,
    remarks
  };

  AppState.db.remedialGroups.push(newGroup);
  AppState.save();
  closeModal("schedule-group-modal");
  showToast("Remedial group session scheduled!", "success");
  renderApp();
}

let activeRemarksStudentId = null;
function openTeacherRemarksModal(studentId) {
  activeRemarksStudentId = studentId;
  const u = AppState.db.users[studentId];
  const remarkTextarea = document.getElementById("remarks-content");
  if (remarkTextarea) {
    remarkTextarea.value = u.remarks || "";
  }
  openModal("teacher-remarks-modal");
}

function submitRemarks(event) {
  event.preventDefault();
  const remarks = document.getElementById("remarks-content").value;
  if (activeRemarksStudentId) {
    AppState.db.users[activeRemarksStudentId].remarks = remarks;
    AppState.save();
    showToast("Student remarks updated successfully!", "success");
  }
  closeModal("teacher-remarks-modal");
  renderApp();
}

function openNewMessageModal() {
  openModal("new-message-modal");
}

function submitMessage(event) {
  event.preventDefault();
  const to = document.getElementById("msg-to").value;
  const content = document.getElementById("msg-content").value;

  const newMessage = {
    id: "m" + (AppState.db.messages.length + 1),
    from: AppState.currentUser.name,
    to,
    content,
    timestamp: new Date().toISOString()
  };

  AppState.db.messages.push(newMessage);
  AppState.save();
  closeModal("new-message-modal");
  showToast("Message sent successfully!", "success");
  renderApp();
}

// ==========================================
// 7. Staff (Subject Teacher) Views
// ==========================================
function renderStaffViews(container) {
  const staffSubject = AppState.currentUser.subject || "math";
  const sub = AppState.db.subjects[staffSubject];

  if (AppState.activeTab === "dashboard") {
    // Subject stats
    let totalAssigned = 0;
    let totalStuck = 0;
    Object.keys(AppState.db.progress).forEach(sid => {
      sub.topics.forEach(t => {
        const p = AppState.db.progress[sid]?.[t.id];
        if (p) {
          totalAssigned++;
          if (p.status === "failed" && !p.overrideActive) totalStuck++;
        }
      });
    });

    container.innerHTML = `
      <div class="dashboard-grid" style="margin-bottom:32px;">
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Assigned Topics in Stream</span>
            <span class="stat-value">${sub.topics.length}</span>
          </div>
          <div class="stat-icon-wrapper primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"></path></svg>
          </div>
        </div>
        <div class="glass-panel stat-card" onclick="switchTab('editor')" style="cursor:pointer;">
          <div class="stat-info">
            <span class="stat-label">Total Student Audits</span>
            <span class="stat-value">${totalAssigned}</span>
          </div>
          <div class="stat-icon-wrapper success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </div>
        </div>
        <div class="glass-panel stat-card" style="border-color:var(--color-warning-border);">
          <div class="stat-info">
            <span class="stat-label">Students Flagged Stuck</span>
            <span class="stat-value" style="color:var(--color-warning)">${totalStuck}</span>
          </div>
          <div class="stat-icon-wrapper warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon></svg>
          </div>
        </div>
      </div>

      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Your Subject Material Curriculum</h3>
          <button class="btn btn-primary btn-sm" onclick="switchTab('editor')">Manage Curriculum</button>
        </div>
        <p style="font-size:0.875rem; color:var(--text-muted); margin-top:-10px;">
          As a Subject Teacher, you can create and modify short notes, practice sheets, assessments, and failure mitigation simpler resources.
        </p>
        <div class="item-list">
          ${sub.topics.map(t => `
            <div class="list-item">
              <div class="item-main">
                <div class="item-avatar-icon" style="color:var(--color-info);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                </div>
                <div class="item-details">
                  <div class="item-title">${t.name}</div>
                  <div class="item-subtitle">${t.notes.quiz.length} Questions Quiz | ${t.notes.practice.length} Practice Items</div>
                </div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="openEditMaterialModal('${t.id}')">Edit Materials</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "editor") {
    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Remedial Curriculum Builder</h3>
        </div>
        <div class="item-list">
          ${sub.topics.map(t => `
            <div class="list-item">
              <div class="item-main">
                <div class="item-avatar-icon" style="color:var(--color-info);">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                </div>
                <div class="item-details">
                  <div class="item-title">${t.name}</div>
                  <div class="item-subtitle">${t.notes.quiz.length} Assessment Questions • ${t.simplerNotes.retryQuiz.length} Retry Questions</div>
                </div>
              </div>
              <button class="btn btn-primary btn-sm" onclick="openEditMaterialModal('${t.id}')">Edit Materials</button>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }
}

// Material Curriculum Editor Modal Form
let activeEditTopicId = null;
function openEditMaterialModal(topicId) {
  activeEditTopicId = topicId;
  const staffSubject = AppState.currentUser.subject || "math";
  const sub = AppState.db.subjects[staffSubject];
  const t = sub.topics.find(topic => topic.id === topicId);
  
  if (!t) return;

  document.getElementById("edit-topic-name").innerText = t.name;
  
  // Set normal notes values
  document.getElementById("editor-notes-concept").value = t.notes.concept;
  document.getElementById("editor-notes-example").value = t.notes.example;
  document.getElementById("editor-notes-mistake").value = t.notes.mistake;
  
  // Set simpler notes values
  document.getElementById("editor-simpler-concept").value = t.simplerNotes.concept;
  document.getElementById("editor-simpler-example").value = t.simplerNotes.example;
  document.getElementById("editor-simpler-videotitle").value = t.simplerNotes.videoTitle;

  openModal("edit-materials-modal");
}

function submitEditMaterials(event) {
  event.preventDefault();
  if (!activeEditTopicId) return;

  const staffSubject = AppState.currentUser.subject || "math";
  const sub = AppState.db.subjects[staffSubject];
  const t = sub.topics.find(topic => topic.id === activeEditTopicId);

  if (t) {
    t.notes.concept = document.getElementById("editor-notes-concept").value;
    t.notes.example = document.getElementById("editor-notes-example").value;
    t.notes.mistake = document.getElementById("editor-notes-mistake").value;

    t.simplerNotes.concept = document.getElementById("editor-simpler-concept").value;
    t.simplerNotes.example = document.getElementById("editor-simpler-example").value;
    t.simplerNotes.videoTitle = document.getElementById("editor-simpler-videotitle").value;

    AppState.save();
    closeModal("edit-materials-modal");
    showToast("Curriculum materials updated successfully!", "success");
    renderApp();
  }
}

// ==========================================
// 8. Admin Views
// ==========================================
function renderAdminViews(container) {
  if (AppState.activeTab === "dashboard") {
    // School-wide statistics
    const studentCount = Object.keys(AppState.db.users).filter(uid => AppState.db.users[uid].role === "student").length;
    const staffCount = Object.keys(AppState.db.users).filter(uid => AppState.db.users[uid].role === "staff").length;
    const subjectsCount = Object.keys(AppState.db.subjects).length;

    container.innerHTML = `
      <div class="dashboard-grid">
        <div class="glass-panel stat-card" onclick="switchTab('users')" style="cursor:pointer;">
          <div class="stat-info">
            <span class="stat-label">Active Users Accounts</span>
            <span class="stat-value">${Object.keys(AppState.db.users).length}</span>
          </div>
          <div class="stat-icon-wrapper primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
          </div>
        </div>
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">School Classes Managed</span>
            <span class="stat-value">1</span>
          </div>
          <div class="stat-icon-wrapper success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
          </div>
        </div>
        <div class="glass-panel stat-card">
          <div class="stat-info">
            <span class="stat-label">Remedial Effectiveness Index</span>
            <span class="stat-value" style="color:var(--color-success)">+45%</span>
          </div>
          <div class="stat-icon-wrapper success">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
          </div>
        </div>
      </div>

      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>School-wide Remedial Impact Report</h3>
        </div>
        
        <p style="font-size:0.875rem; color:var(--text-muted); margin-top:-10px;">
          This comparative analytics metrics displays students' baseline diagnostic pre-test vs. final assessment quiz score changes.
        </p>

        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Subject Topic</th>
                <th>Diagnostic Pre-Test</th>
                <th>Weekly Post-Test</th>
                <th>Improvement Margin</th>
              </tr>
            </thead>
            <tbody>
              ${getAdminAnalyticsHTML()}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (AppState.activeTab === "users") {
    let rowsHtml = "";
    Object.keys(AppState.db.users).forEach(uid => {
      const u = AppState.db.users[uid];
      rowsHtml += `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="user-avatar">${u.avatarInitials}</div>
              <strong>${u.name}</strong>
            </div>
          </td>
          <td><span class="badge badge-info">${u.role.toUpperCase()}</span></td>
          <td>${u.grade || u.title || (u.subject ? `Subject: ${u.subject.toUpperCase()}` : '--')}</td>
          <td>
            <button class="btn btn-danger btn-sm" onclick="deleteUser('${uid}')" ${uid === 'a1' ? 'disabled' : ''}>Delete</button>
          </td>
        </tr>
      `;
    });

    container.innerHTML = `
      <div class="glass-panel panel-card">
        <div class="section-header">
          <h3>Active Accounts Database</h3>
          <button class="btn btn-primary btn-sm" onclick="openAddUserModal()">Create New Account</button>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>User Account</th>
                <th>Role</th>
                <th>Designation / Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

function getAdminAnalyticsHTML() {
  let html = "";
  Object.keys(AppState.db.progress).forEach(studentId => {
    const student = AppState.db.users[studentId];
    if (!student) return;

    Object.keys(AppState.db.progress[studentId]).forEach(topicId => {
      const prog = AppState.db.progress[studentId][topicId];
      if (prog.status === "passed" || prog.overrideActive) {
        let topicName = "";
        Object.keys(AppState.db.subjects).forEach(subId => {
          const sub = AppState.db.subjects[subId];
          const t = sub.topics.find(top => top.id === topicId);
          if (t) topicName = t.name;
        });

        const pre = prog.preTestScore;
        const post = prog.retryQuizScore || prog.quizScore || 100;
        const diff = post - pre;

        html += `
          <tr>
            <td style="font-weight:600; color:#fff;">${student.name}</td>
            <td>${topicName}</td>
            <td style="font-family:monospace; color:var(--color-danger); font-weight:700;">${pre}%</td>
            <td style="font-family:monospace; color:var(--color-success); font-weight:700;">${post}%</td>
            <td style="font-family:monospace; font-weight:700; color:var(--color-success);">+${diff}%</td>
          </tr>
        `;
      }
    });
  });

  if (!html) {
    html = `<tr><td colspan="5" style="text-align:center; color:var(--text-dim);">No completed reports available.</td></tr>`;
  }
  return html;
}

function openAddUserModal() {
  openModal("add-user-modal");
}

function submitAddUser(event) {
  event.preventDefault();
  const name = document.getElementById("user-add-name").value;
  const role = document.getElementById("user-add-role").value;
  const detail = document.getElementById("user-add-detail").value;

  const words = name.split(" ");
  const initials = words.map(w => w.charAt(0)).join("").toUpperCase();

  const newId = "user" + (Object.keys(AppState.db.users).length + 1);

  const newUser = {
    id: newId,
    role,
    name,
    avatarInitials: initials.substring(0, 2)
  };

  if (role === "student") {
    newUser.grade = detail || "Grade 8-A";
    newUser.remarks = "";
    // Seed blank progress
    AppState.db.progress[newId] = {};
  } else if (role === "teacher") {
    newUser.grade = detail || "Grade 8-A Class Teacher";
  } else if (role === "staff") {
    newUser.subject = detail || "math";
    newUser.title = `${detail === 'math' ? 'Mathematics' : 'Science'} Instructor`;
  }

  AppState.db.users[newId] = newUser;
  AppState.save();
  closeModal("add-user-modal");
  showToast(`Account for ${name} created successfully!`, "success");
  renderApp();
}

function deleteUser(uid) {
  if (confirm(`Are you sure you want to delete ${AppState.db.users[uid].name}?`)) {
    delete AppState.db.users[uid];
    if (AppState.db.progress[uid]) {
      delete AppState.db.progress[uid];
    }
    AppState.save();
    showToast("User account deleted.", "error");
    renderApp();
  }
}

// ==========================================
// 9. Initial Entry Hook
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  AppState.init();
  renderApp();

  // Attach modal close-out click handlers
  const overlays = document.querySelectorAll(".modal-overlay");
  overlays.forEach(o => {
    o.addEventListener("click", (e) => {
      if (e.target === o) {
        closeModal(o.id);
      }
    });
  });
});
