curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.cargo/bin:$PATH"

ip addr show eth0 | grep inet
172.29.80.156

http://host.docker.internal:8000/openapi.json

uvx mcpo --host 0.0.0.0 --port 8000 -- uv run server.py

uvx mcpo --port 8000 -- npx -y @modelcontextprotocol/server-filesystem /path/to/your/folder
uvx mcpo --host 0.0.0.0 --port 8000 -- npx -y @modelcontextprotocol/server-filesystem .