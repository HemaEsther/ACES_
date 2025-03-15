# ACES - AI Powered Resume Builder and ATS Score Prediction
## About the Project
ACES (AI-Powered Career Enhancement System) build by (Ahmad, China, Esther, Shivam) is an innovative tool designed to optimize your resume-building experience and evaluate its compatibility with job ### applications. Powered by machine learning (ML) and natural language processing (NLP) techniques, ACES offers the following features:
ATS Score Checker: Analyze your resume's Applicant Tracking System (ATS) compatibility score based on the job description and role you’re applying for.
AI Chatbot: Access a fine-tuned chatbot to answer all your resume-related questions and provide personalized guidance.
LaTeX Resume Builder: Create professional resumes using an integrated LaTeX editor, similar to Overleaf, for precise formatting and design.
With ACES, you can enhance your resume, ensure it aligns with job requirements, and get expert advice—all in one place.

## Tech Stack

### Frontend:
- **React.js** – For building the user interface.
- **TailwindCSS** – For styling with utility-first CSS.
- **ShadCN UI** – For pre-built, customizable UI components.
- **React Hook Form** – For efficient form handling.
- **Framer Motion** - For Dynamic UI

### Backend:
- **Node.js** – For server-side execution.
- **Express.js** – For building RESTful APIs.
- **MongoDB** – For database storage and management.
- **Latext Text Editor** – Integration of complex latex text editor for creating industry ready resumes

### AI Integration:
- **NLP Text Preprocessing** – Tokkenization, Stop word removal, Lemmatization, Word Embeddings.
- **Model** Training - Model trained for over 10000+ Resume Samples to calculate ATS Score with Accuracy of 97% using XGBoost.
- **Dataset** - From Kaggle with over 10000+ tuples.
- **Fine-Tuning** – For enhancing model performance with custom training.
- **AI Chatbot - Open AI API** – For conversational AI capabilities(Fine tuned)



# How to get Started

## 1. Fork the Repository
## 2. Clone the Repository  
git clone https://github.com/<your_repo_name>

## 3. Open the Project Locally
cd <project_folder>



## 4. Setup Frontend
``` bash
npm install
npm run dev
```
## 5. Setup Backend
``` bash
npm install
npm run server
```

## ATS-ML-Model
### 1. Create a Virtual Environment   
```bash
python3 -m venv .venv
```
### 2. Activate the Virtual Environment
For Mac
```bash
source .venv/bin/activate
```
For Windows
```bash
.venv\Scripts\activate

```

### 3. Install Required Dependencies
``` bash
pip install -r requirements.txt
```

### 4. Save Installed Packages for Future Use
```bash
pip freeze > requirements.txt
```

### 5. Deactivate the Virtual Environment
``` bash
deactivate
```


