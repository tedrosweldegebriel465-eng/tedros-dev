import json
import time
from dataclasses import dataclass
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError


@dataclass(frozen=True)
class Repo:
    id: str
    owner: str
    name: str
    category: str
    image: str
    gallery: list[str]
    tags: list[str]
    highlights: list[str]


REPOS: list[Repo] = [
    Repo(
        id="graduate-job-connect",
        owner="tedrosweldegebriel465-eng",
        name="Aksum-University---Web-project",
        category="Web App",
        image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=700&fit=crop",
        gallery=[],
        tags=["PHP", "MySQL", "CSS", "JavaScript"],
        highlights=["Role-based auth", "Job posting & applications", "Admin dashboard", "CV upload"],
    ),
    Repo(
        id="ethiopian-gps",
        owner="tedrosweldegebriel465-eng",
        name="Design-and-Analysis-Algorithm-Project",
        category="Data / Algorithms",
        image="data/image%20samples%20GPS/image.png",
        gallery=[
            "data/image%20samples%20GPS/image%20copy.png",
            "data/image%20samples%20GPS/image%20copy%202.png",
            "data/image%20samples%20GPS/image%20copy%203.png",
        ],
        tags=["Python", "Flask", "Dijkstra", "Folium", "Data Viz"],
        highlights=["Shortest path routing", "Interactive dashboard", "Network analytics", "Visualizations"],
    ),
    Repo(
        id="inventory-system",
        owner="tedrosweldegebriel465-eng",
        name="Aksum-University---Web---project",
        category="Web App",
        image="data/image%20samples%20IMS/image.png",
        gallery=[
            "data/image%20samples%20IMS/image%20copy.png",
            "data/image%20samples%20IMS/image%20copy%202.png",
            "data/image%20samples%20IMS/image%20copy%203.png",
        ],
        tags=["PHP", "CSS", "JavaScript"],
        highlights=["Inventory workflows", "Management UI", "Responsive layout"],
    ),
]


AI_IN_PROGRESS = [
    {
        "id": "ai-tutor",
        "title": "AI Learning Tutor (In Progress)",
        "subtitle": "AI-based education assistant for students",
        "description": "An AI-based app to help students learn faster with explanations, practice, and personalized guidance. (Currently in development.)",
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=700&fit=crop",
        "tags": ["AI", "Education", "In Progress"],
        "category": "In Progress",
        "links": {},
        "highlights": ["Personalized learning support", "Practice + feedback loops", "Education-focused UX"],
        "status": "In Progress",
    },
    {
        "id": "ai-classroom",
        "title": "AI Classroom Tools (In Progress)",
        "subtitle": "AI utilities for teachers and learning content",
        "description": "AI tools focused on helping teachers and improving learning content workflows. (Currently in development.)",
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=700&fit=crop",
        "tags": ["AI", "Education", "In Progress"],
        "category": "In Progress",
        "links": {},
        "highlights": ["Teacher workflows", "Content support", "Better classroom experience"],
        "status": "In Progress",
    },
]


def gh_json(url: str) -> dict:
    req = Request(
        url,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "portfolio-data-generator",
        },
    )
    with urlopen(req, timeout=20) as res:
        return json.loads(res.read().decode("utf-8"))


def safe_slug(s: str) -> str:
    out = []
    for ch in s.lower():
        if ch.isalnum():
            out.append(ch)
        else:
            out.append("-")
    slug = "".join(out).strip("-")
    while "--" in slug:
        slug = slug.replace("--", "-")
    return slug or "project"


def main() -> None:
    items = []
    for repo in REPOS:
        api_url = f"https://api.github.com/repos/{repo.owner}/{repo.name}"
        try:
            data = gh_json(api_url)
        except (HTTPError, URLError) as e:
            raise SystemExit(f"Failed to fetch {api_url}: {e}") from e

        items.append(
            {
                "id": safe_slug(repo.id),
                "title": data.get("name", repo.name).replace("---", " — ").replace("--", " — "),
                "subtitle": data.get("description") or "",
                "description": data.get("description") or "",
                "image": repo.image,
                "gallery": repo.gallery,
                "tags": repo.tags,
                "category": repo.category,
                "links": {
                    "github": data.get("html_url"),
                    "live": data.get("homepage") or "",
                },
                "highlights": repo.highlights,
                "meta": {
                    "stars": data.get("stargazers_count", 0),
                    "forks": data.get("forks_count", 0),
                    "updated_at": data.get("updated_at", ""),
                    "language": data.get("language") or "",
                },
            }
        )
        time.sleep(0.2)

    items.extend(AI_IN_PROGRESS)

    out = {
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "projects": items,
    }

    with open("data/projects.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print("Wrote data/projects.json")


if __name__ == "__main__":
    main()

