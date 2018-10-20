const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:1337";

const headers = {
    Accept: "application/json"
};

export const publish = (movements, daysPerWeek, name) =>
    fetch(`${api}/program`, {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            movements : movements,
            daysPerWeek : daysPerWeek,
            name : name
        })
    }).then((res) => res.json());