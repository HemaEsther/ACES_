# Base Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed for packages like spaCy
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy language model during build
RUN python -m spacy download en_core_web_sm

# Now copy the rest of your app (after installing deps for cache efficiency)
COPY . .

# Expose your Flask port (use 5002 if that's what you're using)
EXPOSE 5002

# Run the Flask app
CMD ["python3", "app.py"]
