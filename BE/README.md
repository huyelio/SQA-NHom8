# TueTinh Backend

Monorepo chứa các microservices cho hệ thống Tuệ Tĩnh - Hệ thống chăm sóc sức khỏe tích hợp AI.

## 📋 Tổng quan

TueTinh Backend là một hệ thống được xây dựng để cung cấp các dịch vụ AI cho việc chăm sóc sức khỏe, bao gồm:
- Xác thực người dùng
- AI Coach thể dục và dinh dưỡng
- Phân tích da
- Nhận diện thực phẩm
- API Gateway để quản lý các services

## 🏗️ Kiến trúc

Hệ thống sử dụng kiến trúc microservices với các thành phần sau:

```
TueTinhBackend/
├── gateway/                      # API Gateway (Java)
├── AuthService/                  # Service xác thực (Java)
├── Fitness_Coach_AI/            # AI Coach service (Python/Flask)
├── Skin_Analyzer_Microservices/  # Phân tích da (Python)
├── Food_Detection_Microservices/ # Nhận diện thực phẩm (Python)
└── docker-compose.yml           # Orchestration
```

## 🔧 Các Microservices

### 1. Gateway
API Gateway được xây dựng bằng Java, đóng vai trò là điểm vào duy nhất cho tất cả các requests từ client, xử lý routing, load balancing và authentication.

### 2. AuthService
Service xác thực và quản lý người dùng, cung cấp:
- Đăng ký/Đăng nhập
- JWT token management
- User profile management

**Repository**: [DaLieuBackend/AuthService](https://github.com/kietjune2003/DaLieuBackend/tree/22d5bb0b8afe4af0a5dc3f7199b926ffbb1a9394)

### 3. Fitness_Coach_AI
AI Coach service sử dụng LLM và RAG để cung cấp:
- Chat với AI Coach
- Tạo kế hoạch tập luyện cá nhân hóa
- Tạo kế hoạch dinh dưỡng
- RAG từ tài liệu PDF về thể dục và dinh dưỡng

**Tech Stack**: Python, Flask, LangChain, ChromaDB, OpenAI/Ollama

**Repository**: [Fitness_Coach_AI](https://github.com/denghwee/Fitness_Coach_AI/tree/aea44292697c67d8480a575434a57f97b1fb5dfb)

### 4. Skin_Analyzer_Microservices
Service phân tích da sử dụng AI/ML để:
- Phân tích tình trạng da
- Đưa ra khuyến nghị chăm sóc da

**Repository**: [Skin_Analyzer_Microservices](https://github.com/denghwee/Skin_Analyzer_Microservices/tree/2f8cf65cff3955133b87be2eeb54b41283bb521d)

### 5. Food_Detection_Microservices
Service nhận diện thực phẩm sử dụng computer vision để:
- Nhận diện món ăn từ hình ảnh
- Phân tích thành phần dinh dưỡng
- Tính toán calories

**Repository**: [Food_Detection_Microservices](https://github.com/denghwee/Food_Detection_Microservices/tree/e2f384afaa16795f8bedabe3e15124c2e464e611)

## 🚀 Cài đặt và Chạy

### Yêu cầu

- Docker & Docker Compose
- Git
- Java 11+ (cho Gateway và AuthService)
- Python 3.11+ (cho các Python services)
- MySQL 5.7+ hoặc 8.0+

### Clone Repository với Submodules

```bash
# Clone repository chính
git clone https://github.com/kietjune2003/TueTinhBackend.git
cd TueTinhBackend

# Clone tất cả submodules
git submodule update --init --recursive
```

### Cấu hình môi trường

Tạo file `.env` trong thư mục gốc cho mỗi service hoặc sử dụng docker-compose environment variables.

### Chạy với Docker Compose

```bash
# Build và start tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Stop tất cả services
docker-compose down
```

### Chạy từng service riêng lẻ

Xem README của từng service trong thư mục tương ứng:
- `gateway/README.md`
- `AuthService/README.md`
- `Fitness_Coach_AI/README.md`
- `Skin_Analyzer_Microservices/README.md`
- `Food_Detection_Microservices/README.md`

## 📡 API Endpoints

### Gateway
Gateway là điểm vào chính, route requests đến các microservices tương ứng:

```
http://localhost:<gateway-port>/api/v1/...
```

### Các endpoints chính:

- **Authentication**: `/api/v1/auth/*`
- **Fitness Coach**: `/api/v3/agent/*`
- **Skin Analysis**: `/api/v1/skin/*`
- **Food Detection**: `/api/v1/food/*`

## 🔄 Quản lý Submodules

### Cập nhật submodules

```bash
# Cập nhật tất cả submodules lên commit mới nhất
git submodule update --remote

# Cập nhật submodule cụ thể
git submodule update --remote Fitness_Coach_AI
```

### Thay đổi submodule

```bash
# Di chuyển vào thư mục submodule
cd Fitness_Coach_AI

# Checkout branch/commit cụ thể
git checkout <branch-name>
git pull origin <branch-name>

# Quay lại root và commit thay đổi
cd ..
git add Fitness_Coach_AI
git commit -m "Update Fitness_Coach_AI submodule"
```

## 🛠️ Development

### Cấu trúc Development

1. Mỗi microservice là một repository riêng biệt
2. TueTinhBackend sử dụng git submodules để quản lý
3. Docker Compose để orchestrate các services trong development

### Workflow

1. Clone TueTinhBackend với submodules
2. Cấu hình environment variables
3. Chạy `docker-compose up` để start tất cả services
4. Develop trên từng service riêng lẻ
5. Commit changes vào repository của từng service
6. Update submodule reference trong TueTinhBackend

## 📦 Technologies

- **Gateway**: Java, Spring Boot (dự đoán)
- **AuthService**: Java
- **Fitness_Coach_AI**: Python, Flask, LangChain, ChromaDB
- **Skin_Analyzer**: Python
- **Food_Detection**: Python
- **Orchestration**: Docker Compose

## 🔒 Security

- JWT authentication qua AuthService
- API Gateway xử lý authentication và authorization
- Environment variables cho sensitive data
- CORS configuration

## 📝 Notes

- Đảm bảo tất cả submodules đã được clone trước khi chạy
- Mỗi service có thể chạy độc lập hoặc qua Docker Compose
- Kiểm tra ports trong docker-compose.yml để tránh conflicts

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

[Thêm license của bạn ở đây]

## 👥 Authors & Responsibilities

### **denghwee** – AI & Microservices Lead  
**Vai trò chính**:
- Thiết kế và phát triển các **AI microservices**:
  - Fitness_Coach_AI (LLM, RAG, LangChain, ChromaDB)
  - Skin_Analyzer_Microservices (phân tích da bằng DL)
  - Food_Detection_Microservices (computer vision, nhận diện thực phẩm)
- Xây dựng và huấn luyện **mô hình AI/DL**
- Thiết kế pipeline xử lý dữ liệu, inference và REST API cho các service AI
- Tối ưu hiệu năng, độ chính xác mô hình và khả năng scale của các Python services

**Chuyên môn**: AI/DL, LLM, Computer Vision, Flask Microservices

- **denghwee** - [GitHub](https://github.com/denghwee)

---

### **kietjune2003** – Backend & System Architect  
**Vai trò chính**:
- Thiết kế và phát triển **Java Backend** cho toàn hệ thống:
  - API Gateway (routing, authentication, authorization)
  - AuthService (JWT, user management, security)
- Thiết kế **kiến trúc microservices tổng thể**
- Tích hợp các AI services vào hệ thống backend
- Quản lý **Docker Compose orchestration**, networking, ports
- Thiết kế API contract giữa Gateway và các microservices

**Chuyên môn**: Java, Spring Boot, Distributed Systems, Security, System Architecture

- **kietjune2003** - [GitHub](https://github.com/kietjune2003)

## 🙏 Acknowledgments

- Các contributors của các microservices
- OpenAI, LangChain, ChromaDB communities
