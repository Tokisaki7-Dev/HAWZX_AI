FROM python:3.11-slim

WORKDIR /app

# Backend dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Frontend dependencies
COPY package.json package-lock.json ./ 
RUN npm install --legacy-peer-deps

# Copy project
COPY . .

# Expose ports
EXPOSE 5000 3000

# Start script
CMD ["/bin/bash", "start.sh"]
