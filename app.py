import os
from src import create_app

if __name__ == "__main__":
    hostname = os.environ.get("HOST", "0.0.0.0")

    app = create_app()

    print(f"Started {hostname}:9030...")

    app.run(host=hostname)
