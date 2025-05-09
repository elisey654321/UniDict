# UniDict

**UniDict** — это универсальный справочный микросервис с единой таблицей для хранения структурированных данных (контрагенты, товары, адреса и т.д.). Поддерживает динамическое добавление полей и быстрый поиск через API.


## 🔹 Возможности
- **Гибкое хранение**: Все данные в одной таблице PostgreSQL (JSONB-поля).
- **Мгновенный поиск**: Кеширование в Redis.
- **Динамические поля**: Добавление новых атрибутов без изменения схемы БД.
- **Swagger-документация**: Готовый API-интерфейс.
- **Docker-поддержка**: Простое развертывание.

## 🛠 Технологии
- **Backend**: FastAPI (Python)
- **База данных**: PostgreSQL + Redis (кеш)
- **Фронтенд**: React (опционально)
- **Инфраструктура**: Docker

## 🚀 Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://github.com/yourusername/unidict.git
cd unidict
```

### 2. Запуск через Docker
```bash
docker-compose up -d --build
```

Сервисы будут доступны:
- **API**: `http://localhost:8000`
- **Swagger UI**: `http://localhost:8000/docs`
- **PostgreSQL**: Порт `5432`
- **Redis**: Порт `6379`

### 3. Ручная установка (без Docker)
```bash
# Установка зависимостей
pip install -r api/requirements.txt

# Запуск сервера
uvicorn api.app.main:app --reload
```

## 📚 Документация API

### Основные эндпоинты
| Метод | Путь            | Описание                  |
|-------|-----------------|--------------------------|
| GET   | `/items/{id}`   | Получить запись по ID    |
| POST  | `/items/`       | Добавить новую запись    |
| PUT   | `/items/{id}`   | Обновить запись          |

**Пример запроса**:
```bash
curl -X POST "http://localhost:8000/items/" \
  -H "Content-Type: application/json" \
  -d '{"id": "123", "type": "product", "data": {"name": "Телефон"}}'
```

## 🌐 Админка (опционально)
Чтобы включить React-фронтенд:
1. Перейдите в папку `frontend/`
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите:
   ```bash
   npm start
   ```
Интерфейс будет доступен на `http://localhost:3000`.

## 📦 Структура проекта
```
unidict/
├── api/          # FastAPI-бэкенд
├── frontend/     # React-админка
├── docker-compose.yml
└── README.md
```