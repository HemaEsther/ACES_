# ACES - AI Powered Resume Builder and ATS Score Prediction
## About the Project
ACES (AI-Powered Career Enhancement System) build by (Ahmad, China, Esther, Shivam) is an innovative tool designed to optimize your resume-building experience and evaluate its compatibility with job applications. Powered by machine learning (ML) and natural language processing (NLP) techniques, ACES offers the following features:
ATS Score Checker: Analyze your resume's Applicant Tracking System (ATS) compatibility score based on the job description and role you’re applying for.
Multiple Resume Templates - ACES generates pixel perfect pdf's using pupeeteer.
AI Chatbot: Access a fine-tuned chatbot to answer all your resume-related questions and provide personalized guidance.
Resume creation - users can create professional grade resume and can even download them as pdf(with industry standar resume format, future plan - to include multiple formats)
With ACES, you can enhance your resume, ensure it aligns with job requirements, and get expert advice—all in one place.

## Tech Stack

### Frontend:
- **React.js** – For building the user interface.
- **ShadCN UI** – For pre-built, customizable UI components.
- **React Hook Form** – For efficient form handling.
- **Framer Motion** - For Dynamic UI
- **Debouncing** - For rate limiting

### Backend:
- **Node.js** – For server-side execution.
- **Express.js** – For building RESTful APIs.
- **MongoDB** – For database storage and management.
- **Puppeteer** – Headless chromium and dynamically populating HTML to generate pdf with pixel perfect pdfs.

### AI Integration:
- **NLP Text Preprocessing** – Tokkenization, Stop word removal, Lemmatization, Word Embeddings.
- **Model** - Sentence BERT(self attention mechanism), creates contexualized Embediings for sentence simantic similarity(cosine similarity).
- **Pipeline** Training - Model trained for over 10000+ Resume Samples to calculate ATS Score based on Job descriptiona nd Job role.
- **Fine-Tuning** – For enhancing model performance with custom training.
- **AI Chatbot - Open AI API** – For conversational AI capabilities(Fine tuned)

### Containerization
- **Docker** - Whole application dockerized for scalable deployment
- **Continous Integration** - Implemented CI using Github Actions
- **Continous Deployment** - Handled by Render service


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

### To run as container image
```sh
docker compose up --build #initially to run
# Stop containers ctrl + c
# To Delete containers
docker compose down
````
