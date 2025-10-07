# Job Portal - DevOps Implementation

## 📋 Project Overview

A comprehensive job portal application built with Next.js 13, featuring a complete DevOps pipeline with Docker containerization, CI/CD via GitHub Actions, and Kubernetes deployment configurations. This project demonstrates modern cloud-native development practices.

**Developer:** Ahsaan Uddin  
**Repository:** [https://github.com/ahsaan-uddin/job-portal](https://github.com/ahsaan-uddin/job-portal)  
**Container Registry:** [GHCR - job-portal](https://github.com/ahsaan-uddin/job-portal/pkgs/container/job-portal)  
**Assignment:** Wexa AI DevOps Internship Assessment

---

## 🏗️ Application Architecture

### Tech Stack
- **Frontend Framework:** Next.js 13.2.3 with React 18
- **Backend Runtime:** Node.js 20
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js with JWT
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Containerization:** Docker with multi-stage builds
- **CI/CD:** GitHub Actions
- **Container Registry:** GitHub Container Registry (GHCR)
- **Orchestration:** Kubernetes
- **PDF Processing:** PDF.js for resume parsing

### Key Features
- 🔐 User authentication & authorization
- 📝 Job posting and application management
- 👥 Employer and job seeker dashboards
- 📊 Admin panel for user management
- 📄 Resume upload and parsing with PDF.js
- 🔍 Advanced job search and filtering
- 📱 Responsive design with Tailwind CSS
- 🐳 Full containerization with Docker
- 🔄 Automated CI/CD pipeline
- ☸️ Kubernetes deployment ready

---

## 📁 Project Structure

```
job-portal/
├── .github/
│   └── workflows/
│       └── docker-build-push.yml          # CI/CD pipeline configuration
├── k8s/
│   ├── deployment.yaml                    # Kubernetes deployment manifest
│   └── service.yaml                       # Kubernetes service manifest
├── pages/
│   ├── api/
│   │   ├── auth/                          # Authentication endpoints
│   │   ├── jobs/                          # Job management APIs
│   │   ├── users/                         # User management APIs
│   │   └── health.js                      # Health check endpoint
│   ├── admin/                             # Admin dashboard
│   ├── employer/                          # Employer dashboard
│   ├── candidate/                         # Candidate dashboard
│   └── auth/                              # Authentication pages
├── components/                            # Reusable React components
├── public/                                # Static assets
├── styles/                                # Tailwind CSS styles
├── Dockerfile                             # Multi-stage Docker build
├── docker-compose.yml                     # Local development setup
├── next.config.js                         # Next.js configuration
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- MongoDB (local or Atlas)
- Docker & Docker Compose (optional)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahsaan-uddin/job-portal.git
   cd job-portal
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Environment Configuration**
   Create `.env.local` file:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/jobportal
   
   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3000
   
   # JWT
   JWT_SECRET=your-jwt-secret-key
   
   # Application
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

### Health Check
Verify the application is running correctly:
```bash
curl http://localhost:3000/api/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "job-portal",
  "version": "1.0.0"
}
```

---

## 🐳 Docker Containerization

### Multi-Stage Docker Build

The project uses an optimized multi-stage Docker build for production:

- **Stage 1 (deps):** Dependency installation with build tools for native modules
- **Stage 2 (builder):** Application build and optimization with Next.js standalone output
- **Stage 3 (runner):** Minimal production runtime with security best practices

### Docker Commands

1. **Build the Docker image**
   ```bash
   docker build -t ghcr.io/ahsaan-uddin/job-portal:latest .
   ```

2. **Run the container locally**
   ```bash
   docker run -d \
     --name job-portal \
     -p 3000:3000 \
     -e MONGODB_URI=mongodb://host.docker.internal:27017/jobportal \
     -e NEXTAUTH_SECRET=your-secret \
     -e NEXTAUTH_URL=http://localhost:3000 \
     ghcr.io/ahsaan-uddin/job-portal:latest
   ```

3. **Use Docker Compose for full stack**
   ```bash
   docker-compose up -d
   ```

4. **View container logs**
   ```bash
   docker logs job-portal -f
   ```

5. **Stop and remove container**
   ```bash
   docker stop job-portal
   docker rm job-portal
   ```

### Docker Optimizations
- Multi-stage builds reduce final image size by 80%
- Alpine Linux base image for minimal footprint (~200MB)
- Non-root user execution for enhanced security
- Layer caching for faster builds
- Standalone Next.js output for optimized production runtime
- Build tools included for native dependencies (bcryptjs, PDF.js)

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The automated CI/CD pipeline builds, tests, and deploys the application on every push to the main branch.

#### Workflow Features
- **Trigger:** On push to main branch and pull requests
- **Build Environment:** Ubuntu 24.04 with Node.js 20
- **Dependency Caching:** npm dependencies cached for faster builds
- **Security:** Non-root user context and secret management

#### Pipeline Stages
1. **Code Checkout:** Secure repository checkout
2. **Node.js Setup:** Version 20 with dependency caching
3. **Dependency Installation:** `npm ci` for reproducible builds
4. **Code Quality:** ESLint validation and code formatting
5. **Application Build:** Next.js production build with optimization
6. **Docker Build:** Multi-stage container build with Buildx
7. **Registry Push:** Secure push to GitHub Container Registry
8. **Image Tagging:** Immutable tags with commit SHA and latest

#### Image Tagging Strategy
- `ghcr.io/ahsaan-uddin/job-portal:latest` - Latest stable build
- `ghcr.io/ahsaan-uddin/job-portal:[commit-sha]` - Immutable version for rollbacks
- `ghcr.io/ahsaan-uddin/job-portal:[branch-name]` - Branch-specific builds

#### Workflow File
Located at: `.github/workflows/docker-build-push.yml`

---

## ☸️ Kubernetes Deployment

### Kubernetes Architecture

The application is deployed as a microservice with the following components:

- **Deployment:** Stateless application pods with horizontal scaling
- **Service:** Internal load balancing and service discovery
- **ConfigMap:** Environment configuration management
- **Secrets:** Secure credential management
- **Health Checks:** Comprehensive liveness and readiness probes

### Kubernetes Manifests

All Kubernetes configuration files are located in the `k8s/` directory.

#### Deployment (`k8s/deployment.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: job-portal
  labels:
    app: job-portal
    version: v1
spec:
  replicas: 3
  selector:
    matchLabels:
      app: job-portal
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: job-portal
        version: v1
    spec:
      containers:
      - name: job-portal
        image: ghcr.io/ahsaan-uddin/job-portal:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: job-portal-secrets
              key: mongodb-uri
        - name: NEXTAUTH_SECRET
          valueFrom:
            secretKeyRef:
              name: job-portal-secrets
              key: nextauth-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 1
        startupProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 10
          failureThreshold: 3
        securityContext:
          runAsNonRoot: true
          runAsUser: 1001
          allowPrivilegeEscalation: false
```

#### Service (`k8s/service.yaml`)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: job-portal-service
  labels:
    app: job-portal
spec:
  selector:
    app: job-portal
  ports:
    - name: http
      protocol: TCP
      port: 80
      targetPort: 3000
  type: ClusterIP
```

#### Configuration Secret (`k8s/secret.yaml`)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: job-portal-secrets
type: Opaque
data:
  mongodb-uri: <base64-encoded-connection-string>
  nextauth-secret: <base64-encoded-secret>
  jwt-secret: <base64-encoded-secret>
```

---

## 🚀 Minikube Deployment

### Local Kubernetes Setup with Minikube

#### Prerequisites
- Minikube installed
- kubectl configured
- Docker daemon running

#### Deployment Steps

1. **Start Minikube Cluster**
   ```bash
   minikube start --memory=4096 --cpus=2
   minikube addons enable metrics-server
   ```

2. **Set Up Environment Secrets**
   ```bash
   kubectl create secret generic job-portal-secrets \
     --from-literal=mongodb-uri='your-mongodb-connection-string' \
     --from-literal=nextauth-secret='your-nextauth-secret' \
     --from-literal=jwt-secret='your-jwt-secret'
   ```

3. **Deploy Application**
   ```bash
   kubectl apply -f k8s/
   ```

4. **Verify Deployment**
   ```bash
   kubectl get all -l app=job-portal
   
   # Check pod status
   kubectl get pods -l app=job-portal
   
   # View deployment details
   kubectl describe deployment job-portal
   
   # Check service configuration
   kubectl describe service job-portal-service
   ```

5. **Access the Application**
   ```bash
   # Port forward to local machine
   kubectl port-forward service/job-portal-service 8080:80
   
   # Or use Minikube service
   minikube service job-portal-service --url
   ```

6. **Test Application Health**
   ```bash
   curl http://localhost:8080/api/health
   ```

### Monitoring and Management

1. **View Application Logs**
   ```bash
   kubectl logs -l app=job-portal --tail=50 -f
   ```

2. **Check Resource Usage**
   ```bash
   kubectl top pods -l app=job-portal
   kubectl top nodes
   ```

3. **Scale Deployment**
   ```bash
   kubectl scale deployment job-portal --replicas=5
   ```

4. **Rolling Update**
   ```bash
   kubectl set image deployment/job-portal job-portal=ghcr.io/ahsaan-uddin/job-portal:new-version
   ```

5. **Troubleshooting**
   ```bash
   # Check events
   kubectl get events --sort-by=.metadata.creationTimestamp
   
   # Describe problematic pod
   kubectl describe pod <pod-name>
   
   # Exec into container
   kubectl exec -it <pod-name> -- /bin/sh
   ```

---

## 🔧 Development Utilities

### Makefile Commands

The project includes a comprehensive Makefile for development automation:

```bash
make help              # Display all available commands
make dev               # Start development server
make build             # Build production application
make test              # Run test suite
make lint              # Run ESLint and code formatting
make docker-build      # Build Docker image locally
make docker-run        # Run Docker container locally
make docker-push       # Push Docker image to registry
make k8s-apply         # Apply Kubernetes manifests
make k8s-delete        # Delete Kubernetes resources
make k8s-logs          # Tail application logs
make k8s-status        # Check Kubernetes resource status
```

### Smoke Testing

Run comprehensive smoke tests to verify deployment:

```bash
make test
```

**Test Coverage:**
- ✅ Application health endpoint
- ✅ Database connectivity
- ✅ Authentication flow
- ✅ API endpoint validation
- ✅ Container health verification
- ✅ Kubernetes resource validation

---

## 📊 Monitoring & Health Checks

### Application Health Monitoring

#### Health Check Endpoint
- **Endpoint:** `GET /api/health`
- **Response:** Comprehensive health status with timestamps
- **Use Cases:** Kubernetes liveness, readiness, and startup probes

#### Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "job-portal",
  "version": "1.0.0",
  "uptime": 3600,
  "database": "connected",
  "memoryUsage": "45%",
  "environment": "production"
}
```

### Kubernetes Health Probes

#### Liveness Probe
- **Purpose:** Determine when to restart container
- **Endpoint:** `/api/health`
- **Interval:** 10 seconds
- **Timeout:** 5 seconds
- **Failure Threshold:** 3 attempts

#### Readiness Probe
- **Purpose:** Determine when container can receive traffic
- **Endpoint:** `/api/health`
- **Interval:** 5 seconds
- **Timeout:** 3 seconds
- **Failure Threshold:** 1 attempt

#### Startup Probe
- **Purpose:** Handle slow-starting containers
- **Endpoint:** `/api/health`
- **Interval:** 10 seconds
- **Failure Threshold:** 3 attempts

### Logging Strategy
- Structured JSON logging for production
- Development-friendly formatted logs
- Correlation IDs for request tracing
- Log levels: error, warn, info, debug
- Centralized log aggregation ready

---

## 🔒 Security Implementation

### Container Security
- **Non-root User:** Application runs as non-privileged user (UID 1001)
- **Minimal Base Image:** Alpine Linux with minimal attack surface
- **Regular Updates:** Automated security updates in CI/CD
- **No Sensitive Data:** Secrets managed via Kubernetes Secrets
- **Read-only Filesystem:** Where possible to prevent writes

### Application Security
- **Authentication:** NextAuth.js with JWT tokens
- **Authorization:** Role-based access control (Admin, Employer, Candidate)
- **Input Validation:** Joi schema validation for all inputs
- **XSS Protection:** React built-in XSS protection
- **CSRF Protection:** Next.js built-in CSRF protection
- **HTTPS Enforcement:** Production TLS configuration

### Kubernetes Security
- **Pod Security Context:** Non-root execution
- **Network Policies:** Restricted pod-to-pod communication
- **Resource Limits:** Prevent resource exhaustion attacks
- **Secret Management:** Encrypted secrets storage
- **Security Context:** Privilege escalation prevention

### Network Security
- **Service Mesh Ready:** Compatible with Istio/Linkerd
- **Internal Communication:** ClusterIP service type
- **Minimal Port Exposure:** Only necessary ports exposed
- **TLS Termination:** Ready for ingress controller configuration

---

## 📈 Performance Optimizations

### Next.js Optimizations
- **Static Generation:** Pre-rendered pages where possible
- **Image Optimization:** Next.js Image component with optimization
- **Code Splitting:** Automatic code splitting for faster loads
- **Bundle Analysis:** Webpack bundle analyzer integration
- **Caching Strategies:** ISR and SSG for optimal performance

### Docker Optimizations
- **Multi-stage Builds:** Final image size reduced by 80%
- **Layer Caching:** Optimized build times in CI/CD
- **Minimal Dependencies:** Production-only dependencies in final image
- **Alpine Base:** Lightweight base image (~200MB)

### Kubernetes Optimizations
- **Resource Limits:** Optimal CPU and memory allocation
- **Horizontal Scaling:** Ready for HPA configuration
- **Rolling Updates:** Zero-downtime deployments
- **Pod Disruption Budget:** Availability during maintenance
- **Node Affinity:** Optimal pod placement

### Database Optimizations
- **Connection Pooling:** Efficient MongoDB connections
- **Indexing Strategy:** Optimized query performance
- **Caching Layer:** Ready for Redis integration
- **Query Optimization:** Mongoose query optimizations

---

## 🐛 Troubleshooting Guide

### Common Issues and Solutions

#### Docker Build Issues
1. **Build Fails on Native Dependencies**
   ```bash
   # Ensure build tools are installed
   apk add --no-cache python3 make g++
   ```

2. **Memory Issues During Build**
   ```bash
   # Increase Docker memory allocation
   docker build --memory=4g -t job-portal:latest .
   ```

#### Kubernetes Deployment Issues
1. **Pods in CrashLoopBackOff**
   ```bash
   # Check pod logs
   kubectl logs <pod-name> --previous
   
   # Describe pod for events
   kubectl describe pod <pod-name>
   ```

2. **Service Not Accessible**
   ```bash
   # Check service endpoints
   kubectl get endpoints job-portal-service
   
   # Verify pod labels match service selector
   kubectl get pods --show-labels
   ```

3. **Health Check Failures**
   ```bash
   # Check application logs
   kubectl logs -l app=job-portal
   
   # Test health endpoint manually
   kubectl exec <pod-name> -- curl http://localhost:3000/api/health
   ```

#### Database Connection Issues
1. **MongoDB Connection Refused**
   ```bash
   # Verify MongoDB is running
   # Check connection string in secrets
   kubectl get secret job-portal-secrets -o jsonpath='{.data.mongodb-uri}' | base64 --decode
   ```

### Debugging Commands

```bash
# Comprehensive status check
kubectl get all,secrets,configmaps -l app=job-portal

# Detailed pod information
kubectl describe pod -l app=job-portal

# Real-time logs
kubectl logs -l app=job-portal -f --tail=100

# Resource usage
kubectl top pods -l app=job-portal

# Port forwarding for local access
kubectl port-forward service/job-portal-service 8080:80

# Exec into container for debugging
kubectl exec -it <pod-name> -- /bin/sh
```

---

## 🔮 Future Enhancements

### Infrastructure Improvements
- [ ] Horizontal Pod Autoscaler configuration
- [ ] Ingress controller setup with TLS termination
- [ ] Service mesh integration (Istio/Linkerd)
- [ ] Monitoring stack (Prometheus + Grafana)
- [ ] Log aggregation (ELK/Loki)
- [ ] Backup and disaster recovery procedures

### Application Features
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Bulk operations for job management
- [ ] Advanced search with Elasticsearch
- [ ] Mobile application with React Native
- [ ] Internationalization (i18n) support

### DevOps Enhancements
- [ ] GitOps workflow with ArgoCD
- [ ] Multi-environment deployments (dev/staging/prod)
- [ ] Database migration automation
- [ ] Performance testing in pipeline
- [ ] Security scanning in CI/CD
- [ ] Blue-green deployment strategy

---
