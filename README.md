# parallel-text
This is a web app that displays two .txt files line by line

## Notes on running the back-end server in development and production

### Option 1: Run for development locally using venv

- Install dependencies using venv
- Run development server inside venv directly: 

```
python manage.py runserver
```

This is the reccomended way for active work on the back-end

### Option 2: Run for development locally using Docker

- Build docker image: 
```
docker build back/paralleltext/. -t nkuusik/django-paralleltext
```
- Push docker image to Docker Hub:
```
docker push nkuusik/django-paralleltext
```
- (Optional) Add Docker secrets in `$HOME/django_secrets/`
- run Docker locally using docker compose:
```
sudo docker compose up
``` 

This is useful for testing various configurations in `settings.py` before actual deployment

### Option 3: Run for production on remote server using Docker

- Add Docker secrets on remote server in `/root/django_secrets`
- Push to master prompting deployment via GitHub Action
    - For other branch, temporarily change branches value in `.github/workflows/deploy.yml`

If Docker secrets are not properly configured, the back-end will default to local access only.
