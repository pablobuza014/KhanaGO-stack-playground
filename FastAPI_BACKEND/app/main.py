import os
from datetime import datetime
from typing import Optional, List, Union, Generator
from pathlib import Path

from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, String, Integer, Text, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker, Session
from dotenv import load_dotenv

# =========================
# FastAPI
# =========================
app = FastAPI(title="Gymkhana API", version="0.1.0")

# =========================
# Configuración DB (robusta)
# =========================
load_dotenv()

def make_engine():
    url_str = os.getenv("DATABASE_URL", "sqlite:///./dev.db")

    # SQLite
    if url_str.startswith("sqlite"):
        return create_engine(
            url_str,
            connect_args={"check_same_thread": False},
            pool_pre_ping=True,
        )

    # PostgreSQL (psycopg2)
    if url_str.startswith("postgresql"):
        return create_engine(
            url_str,
            pool_pre_ping=True,
            connect_args={"options": "-c client_encoding=UTF8"},
        )

    # Otros drivers (sin args especiales)
    return create_engine(url_str, pool_pre_ping=True)

engine = make_engine()
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

class Base(DeclarativeBase):
    pass

# =========================
# Modelo ORM
# =========================
class Gymkhana(Base):
    __tablename__ = "gymkhanas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    starts_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    ends_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

# =========================
# Schemas Pydantic
# =========================
class GymkhanaBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=120)
    description: Optional[str] = None
    location: Optional[str] = None
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None

class GymkhanaCreate(GymkhanaBase):
    pass

class GymkhanaUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=3, max_length=120)
    description: Optional[str] = None
    location: Optional[str] = None
    starts_at: Optional[datetime] = None
    ends_at: Optional[datetime] = None

class GymkhanaOut(GymkhanaBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# =========================
# Dependencias DB
# =========================
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# =========================
# Endpoints de prueba
# =========================
@app.get("/")
def read_root_original():
    return {"Hello": "World"}

@app.get("/gymkhana/create")
def read_root_gymkhana_create():
    return {"GymkhanaName": "gymkhana1", "Description": "This is a test gymkhana"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# =========================
# CRUD completo Gymkhana
# =========================
@app.post("/gymkhanas", response_model=GymkhanaOut, status_code=status.HTTP_201_CREATED, tags=["gymkhanas"])
def create_gymkhana(payload: GymkhanaCreate, db: Session = Depends(get_db)):
    if db.query(Gymkhana).filter(Gymkhana.name == payload.name).first():
        raise HTTPException(status_code=409, detail="Gymkhana name already exists")
    obj = Gymkhana(
        name=payload.name,
        description=payload.description,
        location=payload.location,
        starts_at=payload.starts_at,
        ends_at=payload.ends_at,
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@app.get("/gymkhanas", response_model=List[GymkhanaOut], tags=["gymkhanas"])
def list_gymkhanas(skip: int = 0, limit: int = 50, q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Gymkhana)
    if q:
        like = f"%{q}%"
        query = query.filter((Gymkhana.name.ilike(like)) | (Gymkhana.location.ilike(like)))
    return query.order_by(Gymkhana.created_at.desc()).offset(skip).limit(min(limit, 100)).all()

@app.get("/gymkhanas/{gymkhana_id}", response_model=GymkhanaOut, tags=["gymkhanas"])
def get_gymkhana(gymkhana_id: int, db: Session = Depends(get_db)):
    obj = db.get(Gymkhana, gymkhana_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Gymkhana not found")
    return obj

@app.put("/gymkhanas/{gymkhana_id}", response_model=GymkhanaOut, tags=["gymkhanas"])
def update_gymkhana(gymkhana_id: int, payload: GymkhanaUpdate, db: Session = Depends(get_db)):
    obj = db.get(Gymkhana, gymkhana_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Gymkhana not found")

    if payload.name and payload.name != obj.name:
        if db.query(Gymkhana).filter(Gymkhana.name == payload.name).first():
            raise HTTPException(status_code=409, detail="Gymkhana name already exists")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)

    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

@app.delete("/gymkhanas/{gymkhana_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["gymkhanas"])
def delete_gymkhana(gymkhana_id: int, db: Session = Depends(get_db)):
    obj = db.get(Gymkhana, gymkhana_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Gymkhana not found")
    db.delete(obj)
    db.commit()
    return None
