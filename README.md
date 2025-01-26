# ValueAlLabs_Assignment

# **Text Analysis Tool**

A web-based application that performs detailed text analysis using Azure Document Intelligence. The tool allows users to upload documents, extract text, and analyze it for various statistics like word frequency, character count, and more.

---

## **Features**
- **Text Extraction**: Extracts text using Azure Document Intelligence (Form Recognizer).
- **Comprehensive Text Analysis**:
  - Word count
  - Character count (with and without spaces)
  - Sentence count
  - Average word length
  - Word frequency analysis
- **Interactive UI**:
  - Checkboxes to select words for deletion dynamically.
  - Smooth animations for enhanced user experience.
- **Backend Integration**:
  - A Node.js server handles requests and integrates with Azure APIs.
- **Environment Configuration**:
  - Easily customizable with environment variables.
- **Responsive Design**: Accessible across various devices.

---

## **Setup Instructions**

Follow these steps to set up the project locally:

### **Prerequisites**
1. **Node.js**: Ensure Node.js is installed on your system.
2. **Azure Form Recognizer Resource**:
   - Set up an Azure Form Recognizer resource in your Azure portal.
   - Obtain your **Endpoint** and **Key** from the resource.

---

### **Steps**

#### **Clone the Repository**
```bash
git clone https://github.com/i-m-Paras/ValueAlLabs_Assignment.git
```

#### **Set Up the Backend**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory using the `.envsample` file provided:
   ```
   AZURE_FORM_RECOGNIZER_ENDPOINT=<Your Azure Endpoint>
   AZURE_FORM_RECOGNIZER_KEY=<Your Azure Key>
   ```

4. Start the backend server:
   ```bash
   node app.js
   ```

#### **Set Up the Frontend**

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

4. Access the application in your browser at:
   ```text
   http://localhost:3000
   ```

---

## **Folder Structure**

```
frequency-analysis-tool/
├── backend/
│   ├── index.js
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   └── .envsample
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.js
│   └── .envsample
├── README.md
└── package.json
```

---

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Node.js + Express
- **API Integration**: Azure Document Intelligence (Form Recognizer)
- **Styling**: CSS with animations

---

