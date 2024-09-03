FROM python:3.11

ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app
RUN --mount=type=secret,id=SPECIAL_KEY
RUN pip install -r requirements.txt
EXPOSE 8000

CMD ["gunicorn", "paralleltext.wsgi:application", "--bind", "0.0.0.0:8000"]

# docker image build --secret "id=SPECIAL_KEY"