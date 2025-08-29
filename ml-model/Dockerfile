# Stage 1: Build dependencies in a virtual environment
FROM python:3.12-slim AS builder

# Install system dependencies needed for compiling Python packages
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set working directory
WORKDIR /app

# Create a virtual environment
ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy requirements and install dependencies into the virtual environment
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Download spaCy model into the virtual environment
RUN python -m spacy download en_core_web_sm

# Stage 2: Final production image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy the virtual environment from the builder stage
ENV VIRTUAL_ENV=/opt/venv
COPY --from=builder $VIRTUAL_ENV $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy the application code
COPY . .

# Expose port and start the app
EXPOSE 5002
CMD ["gunicorn", "--bind", "0.0.0.0:5002", "app:app"]
