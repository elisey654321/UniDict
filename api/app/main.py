from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
import uvicorn
import json

app = FastAPI()

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модели данных
class LoginModel(BaseModel):
    username: str
    password: str

class Item(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

# Моковая база данных
USERS_DB = {
    "admin": {
        "password": "admin",
        "token": "admin_token"
    }
}

db: Dict[int, Item] = {
    1: Item(id=1, title="First item", description="Test item 1"),
    2: Item(id=2, title="Second item", description="Test item 2"),
}

# Добавьте этот middleware первым в цепочке
@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type"
    return response

# Модифицируйте verify_token
async def verify_token(request: Request):
    if request.method == "OPTIONS":
        return
    
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing token")
    
    token = auth.split(" ")[1]
    valid_tokens = [user["token"] for user in USERS_DB.values()]
    if token not in valid_tokens:
        raise HTTPException(status_code=401, detail="Invalid token")

# Эндпоинты
@app.post("/auth/login")
async def login(data: LoginModel):
    user = USERS_DB.get(data.username)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"token": user["token"]}

@app.get("/{resource}")
async def get_list(resource: str, request: Request, _ = Depends(verify_token)):
    params = dict(request.query_params)
    
    try:
        range_ = json.loads(params.get("range", "[0, 9]"))
        sort = json.loads(params.get("sort", '["id", "ASC"]'))
        filter_ = json.loads(params.get("filter", "{}"))
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid query parameters")

    items = list(db.values())
    
    # Фильтрация
    if filter_:
        items = [item for item in items if all(
            getattr(item, k) == v for k, v in filter_.items()
        )]
    
    # Сортировка
    field, order = sort
    items.sort(key=lambda x: getattr(x, field), reverse=(order == "DESC"))
    
    # Пагинация
    start, end = map(int, range_)
    total = len(items)
    items = items[start:end+1]
    
    return {
        "data": items,
        "total": total
    }

@app.get("/{resource}/{id}")
async def get_one(resource: str, id: int, _ = Depends(verify_token)):
    if id not in db:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"data": db[id]}

@app.post("/{resource}")
async def create(resource: str, request: Request, _ = Depends(verify_token)):
    item_data = await request.json()
    item = Item(**item_data)
    if item.id in db:
        raise HTTPException(status_code=400, detail="Item already exists")
    db[item.id] = item
    return {"data": item}

@app.put("/{resource}/{id}")
async def update(resource: str, id: int, request: Request, _ = Depends(verify_token)):
    if id not in db:
        raise HTTPException(status_code=404, detail="Item not found")
    item_data = await request.json()
    db[id] = Item(**item_data)
    return {"data": db[id]}

@app.delete("/{resource}/{id}")
async def delete(resource: str, id: int, _ = Depends(verify_token)):
    if id not in db:
        raise HTTPException(status_code=404, detail="Item not found")
    del db[id]
    return {"data": {"id": id}}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)