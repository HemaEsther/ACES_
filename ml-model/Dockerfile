# Use a lightweight Python image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy project files to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5002 for the Flask API
EXPOSE 5002

# Run the application
CMD ["python3", "app.py"]
