const BASE_URL = "http://localhost:5000";

export async function ping() {
  const res = await fetch(`${BASE_URL}/ping`);
  return res.status === 200;
}

export async function createPoll(data: { name: string; choices: any; description?: string }) {
  const res = await fetch(`${BASE_URL}/polls`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.status === 200 ? await res.json() : null;
}

export async function votePoll(pollId: number, data: { identifier: string; choice: string; poll_id: number }) {
  const res = await fetch(`${BASE_URL}/vote/${pollId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.status === 200 ? await res.json() : null;
}

export async function getAllPolls() {
  const res = await fetch(`${BASE_URL}/polls`);
  return res.status === 200 ? await res.json() : [];
}

export async function updatePoll(pollId: number, data: { choices?: any; description?: string }) {
  const res = await fetch(`${BASE_URL}/polls/${pollId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.status === 200 ? await res.json() : null;
}

export async function getPollResult(pollId: number) {
  const res = await fetch(`${BASE_URL}/vote/result/${pollId}`);
  return res.status === 200 ? await res.json() : null;
}