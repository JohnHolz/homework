import requests

base_url = "http://localhost:5000"

# 1. Teste /ping
r1 = requests.get(f"{base_url}/ping")
print(r1.status_code == 200)

# 2. Teste POST /polls
poll_data = {
    "name": "Qual sua linguagem favorita?2",
    "choices": ["Python", "JavaScript", "Go"],
    "description": "",
}
r2 = requests.post(f"{base_url}/polls", json=poll_data)
print(r2.status_code == 200)

# 3. Teste POST /vote/1
vote_data = {"identifier": "user@email.com", "choice": "Python", "poll_id": 1}
r3 = requests.post(f"{base_url}/vote/1", json=vote_data)
print(r3.status_code == 200)

# 4. Teste GET /vote/result/1
r4 = requests.get(f"{base_url}/vote/result/1")
result_json = r4.json()
print(r4.status_code == 200 and "Python" in result_json)
