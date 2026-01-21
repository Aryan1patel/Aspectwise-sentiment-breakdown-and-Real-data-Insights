# ABSA Insights - Aspect-Based Sentiment Analysis

A production-ready **Aspect-Based Sentiment Analysis (ABSA)** system that extracts granular product insights from customer reviews. Unlike traditional sentiment analysis, ABSA identifies sentiment for specific product features (battery, camera, display, etc.), revealing actionable feedback hidden behind star ratings.

![ABSA Demo](https://img.shields.io/badge/Status-Production%20Ready-success)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)

## 🎯 Key Features

- **Aspect Detection**: Identifies 6 product aspects (battery, camera, display, performance, build, price)
- **Sentiment Classification**: 90% accuracy using TF-IDF + Logistic Regression
- **Fast Inference**: <100ms API response time
- **Interactive Dashboard**: Real-time analysis with business insights
- **Production Ready**: Fully dockerized with FastAPI backend and Next.js frontend

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/absa-insights.git
cd absa-insights

# Start with Docker Compose
docker-compose up -d --build

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Manual Setup

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn api:app --reload
```

#### Frontend

```bash
cd frontend-nextjs
npm install
npm run dev
```

## 📊 Tech Stack

- **Backend**: Python, FastAPI, Scikit-learn, Pandas
- **Frontend**: Next.js 16, React, Tailwind CSS, Framer Motion
- **ML**: TF-IDF Vectorization, Logistic Regression
- **Deployment**: Docker, Docker Compose

## 🏗️ Project Structure

```
absa-insights/
├── backend/
│   ├── api.py              # FastAPI application
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile
├── frontend-nextjs/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   └── components/    # React components
│   ├── package.json
│   └── Dockerfile
├── notebooks/             # Jupyter notebooks for development
├── data/                  # Data files (not included in repo)
├── docker-compose.yml     # Docker orchestration
└── README.md
```

## 📈 Model Performance

- **Overall Accuracy**: 90.0%
- **Positive Class**: 100% accuracy
- **Negative Class**: 80% accuracy
- **Neutral Class**: 90% accuracy
- **Inference Time**: <100ms per review

## 🎨 Features

### Live Demo
- Interactive review analysis
- Real-time aspect extraction
- Sentiment prediction with confidence scores

### Business Insights Dashboard
- Aspect sentiment distribution
- Rating vs sentiment mismatch analysis
- Root cause analysis for product issues

### Project Journey
- Complete development walkthrough
- Code snippets from notebooks
- Data transformation pipeline visualization

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
BACKEND_PORT=8000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
FRONTEND_PORT=3000
```

## 📝 API Endpoints

- `POST /analyze` - Analyze a single review
- `GET /insights/aspect-sentiment` - Get aspect sentiment distribution
- `GET /insights/rating-mismatch` - Get rating vs sentiment mismatch data
- `GET /docs` - Interactive API documentation

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild after changes
docker-compose up -d --build
```

## 📚 Methodology

1. **Sentence Segmentation**: Split reviews into clauses using contrast words
2. **Aspect Detection**: Rule-based keyword matching for product features
3. **Sentiment Classification**: TF-IDF + Logistic Regression for explainability
4. **Confidence Aggregation**: Select highest-confidence predictions

## 🎓 Use Cases

- Product development teams identifying pain points
- Customer support prioritizing issues
- Marketing teams understanding customer preferences
- E-commerce platforms improving product recommendations

## 📄 License

MIT License - feel free to use this project for learning and commercial purposes.

## 👨‍💻 Author

**Aryan Patel**

- GitHub: [@Aryan1patel](https://github.com/Aryan1patel)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 Acknowledgments

- Dataset: Amazon Product Reviews
- Inspired by modern ABSA research papers
- Built with production-ready best practices

---

⭐ **Star this repo if you find it useful!**