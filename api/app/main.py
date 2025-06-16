from fastapi import FastAPI
import uvicorn

# 1. Инициализация приложения
app = FastAPI(
    title="UniDict API",
    description="Справочник с единой таблицей",
    version="0.1.0"
)

# 2. Пример эндпоинта
@app.get("/")
async def root():
    return {"message": "UniDict работает!"}

# 3. Эндпоинт для проверки здоровья
@app.get("/health")
async def health_check():
    return {"status": "OK"}

if __name__ == "__main__":
     uvicorn.run(
        "main:app",
        host="0.0.0.0",  # Доступ с любого IP
        port=8000,       # Порт 8000
        reload=True      # Автоперезагрузка (опционально)
    )