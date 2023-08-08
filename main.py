from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()
templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="static"), name="static")

# Site visit counter
site_visits = 0


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    global site_visits
    site_visits += 1
    return templates.TemplateResponse("main.html", {"request": request, "site_visits": site_visits})


@app.get("/contact", response_class=HTMLResponse)
async def read_contact(request: Request):
    return templates.TemplateResponse("form.html", {"request": request})


@app.post("/submit_email/")
async def submit_email(email: str = Form(...)):
    # Process the email submission (you can add more logic here)
    return {"message": "Email submitted successfully"}
