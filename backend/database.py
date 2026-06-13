from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from config import settings

# SQLite local database configuration
engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},
    echo=False  # Set to True for SQL query debugging
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def run_migrations():
    """
    Lightweight, non-destructive migrations for SQLite.

    `Base.metadata.create_all` creates new tables but does NOT add new columns to
    tables that already exist. This adds any missing columns via ALTER TABLE so an
    existing quickcommerce.db keeps working without being recreated.
    """
    from sqlalchemy import inspect, text

    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()

    # (table, column, column definition) tuples to ensure exist
    required_columns = {
        "orders": [
            ("delivery_address", "TEXT DEFAULT ''"),
            ("payment_method", "VARCHAR DEFAULT ''"),
            ("payment_status", "VARCHAR DEFAULT 'unpaid'"),
        ],
        "user_profiles": [
            ("weight_loss_mode", "BOOLEAN DEFAULT 0"),
        ],
    }

    with engine.begin() as conn:
        for table, columns in required_columns.items():
            if table not in existing_tables:
                continue  # create_all will handle brand-new tables
            present = {col["name"] for col in inspector.get_columns(table)}
            for col_name, col_def in columns:
                if col_name not in present:
                    conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {col_name} {col_def}"))
